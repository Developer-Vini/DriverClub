require('dotenv').config();
const express = require('express');
const authRoutes = require('./modules/auth/auth.routes');
const driverRoutes = require('./modules/drivers/drivers.routes')

const app = express();

app.use(express.json());
app.use('/auth', authRoutes);
app.use('/drivers', driverRoutes)

const PORT = process.env.PORT || 3333;

app.listen(PORT, () => {
    console.log(`Servidor rodando na porta ${PORT}`)
})
