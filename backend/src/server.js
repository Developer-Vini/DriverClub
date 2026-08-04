require('dotenv').config();
const express = require('express');
const http = require('http');
const authRoutes = require('./modules/auth/auth.routes');
const driversRoutes = require('./modules/drivers/drivers.routes');
const configurarSocket = require('./websocket/socket');
const { conectarRedis } = require('./config/redis');
const { limparMotoristasInativos } = require('./modules/location/location.service');
const ridesRoutes = require('./modules/rides/rides.routes'); 
const locationRoutes = require('./modules/location/location.routes');

const app = express();
const servidorHttp = http.createServer(app);

configurarSocket(servidorHttp);

app.use(express.json());
app.use('/auth', authRoutes);
app.use('/drivers', driversRoutes);
app.use('/location', locationRoutes);
app.use('/rides', ridesRoutes);

const PORT = process.env.PORT || 3333;
const INTERVALO_LIMPEZA_MS = 15000;

async function iniciarServidor() {
    await conectarRedis();

    servidorHttp.listen(PORT, () => {
        console.log(`Servidor rodando na porta ${PORT}`);
    });

    setInterval(limparMotoristasInativos, INTERVALO_LIMPEZA_MS);
}

iniciarServidor();