const { redisClient } = require('../../config/redis');

const TEMPO_EXPIRACAO_SEGUNDOS = 30;
const CHAVE_GEO_MOTORISTA = 'motoristas:online';

async function atualizarLocalizacaoMotorista({ driverId, lat, lng }) {
    const chave = `driver:location:${driverId}`;

    await redisClient.geoAdd(CHAVE_GEO_MOTORISTA, {
        longitude: lng,
        latitude: lat,
        member: driverId,
    })


    await redisClient.hSet(chave, {
        lat: String(lat),
        lng: String(lng),
        updatedAt: new Date().toISOString(),
    });

    await redisClient.expire(chave, TEMPO_EXPIRACAO_SEGUNDOS);
}

async function buscarMotoristasProximos({ lat, lng, raioKm }) {
    const resultados = await redisClient.geoSearch(
        CHAVE_GEO_MOTORISTA,
        { longitude: lng, latitude: lat },
        { radius: raioKm, unit: 'km' },
        { SORT: "ASC" }
    );
    return resultados;
}
async function removerMotoristaDoMapa(driverId) {
    await redisClient.zRem(CHAVE_GEO_MOTORISTA, driverId);
}
async function limparMotoristasInativos() {
    const motoristasNoMapa = await redisClient.zRange(CHAVE_GEO_MOTORISTA, 0, -1);

    for (const driverId of motoristasNoMapa) {
        const chaveDetalhes = `driver:location:${driverId}`;
        const existe = await redisClient.exists(chaveDetalhes);

        if (existe === 0) {
            await redisClient.zRem(CHAVE_GEO_MOTORISTA, driverId);
            console.log('Motorista inativo removido pela limpeza periódica:', driverId);
        }
    }
}
module.exports = { atualizarLocalizacaoMotorista, removerMotoristaDoMapa, buscarMotoristasProximos, limparMotoristasInativos };