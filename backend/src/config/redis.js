require('dotenv').config();
const { createClient } = require('redis');

const redisClient = createClient({
    url: process.env.REDIS_URL,
});

redisClient.on('error', (erro) => {
    console.error('Erro no Redis:', erro);
});

async function conectarRedis() {
    await redisClient.connect();
    console.log('Conectado ao Redis com sucesso!');
}

module.exports = { redisClient, conectarRedis };