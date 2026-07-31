require('dotenv').config();
const express = require('express');
const authRoutes = require('./modules/auth/auth.routes');

const app = express();

app.use(express.json());
app.use('/auth', authRoutes);

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
    console.log(`Servidor rodando na porta ${PORT}`)
})