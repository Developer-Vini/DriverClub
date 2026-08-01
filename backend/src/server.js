require('dotenv').config();
const express = require('express');
const http = require('http');
const authRoutes = require('./modules/auth/auth.routes');
const driversRoutes = require('./modules/drivers/drivers.routes');
const configurarSocket = require('./websocket/socket');
const { conectarRedis } = require('./config/redis');

const app = express();
const servidorHttp = http.createServer(app);

configurarSocket(servidorHttp);

app.use(express.json());
app.use('/auth', authRoutes);
app.use('/drivers', driversRoutes);

const PORT = process.env.PORT || 3333;

async function iniciarServidor() {
    await conectarRedis();

    servidorHttp.listen(PORT, () => {
        console.log(`Servidor rodando na porta ${PORT}`);
    });
}

iniciarServidor();