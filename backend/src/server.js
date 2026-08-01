require('dotenv').config();
const express = require('express');
const http = require('http')
const authRoutes = require('./modules/auth/auth.routes');
const driverRoutes = require('./modules/drivers/drivers.routes');
const configurarSocket = require('./websocket/socket');


const app = express();
const servidorHttp = http.createServer(app);

configurarSocket(servidorHttp);

app.use(express.json());
app.use('/auth', authRoutes);
app.use('/drivers', driverRoutes)

const PORT = process.env.PORT || 3333;

servidorHttp.listen(PORT, () => {
    console.log(`Servidor rodando na porta ${PORT}`)
})
