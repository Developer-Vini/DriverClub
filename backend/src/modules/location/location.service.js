const { redisClient } = require('../../config/redis');

const TEMPO_EXPIRACAO_SEGUNDO = 30;

async function atualizarLocalizacaoMotorista({ driverId, lat, lng }) {
    const chave = `driver:location:${driverId}`

    try {
        const multi = redisClient.multi()
        multi.hSet(chave, {
            lat: String(lat),
            lng: String(lng),
            updatedAt: new Date().toISOString(),
        });

        multi.expire(chave, TEMPO_EXPIRACAO_SEGUNDO)

        await multi.exec();

    } catch (error) {
        console.error(`Erro ao atualizar localização do motorista ${driverId}`, error);
        throw error;
    }
}

async function buscarLocalizacaoMotorista(driverId) {
    const chave = `driver:location:${driverId}`;
    const dados = await redisClient.hGetAll(chave);

    if (Object.keys(dados).length === 0) {
        return null;
    }

    return {
        lat: Number(dados.lat),
        lng: Number(dados.lng),
        updatedAt: dados.updateAt,
    };
}

module.exports = { atualizarLocalizacaoMotorista, buscarLocalizacaoMotorista }