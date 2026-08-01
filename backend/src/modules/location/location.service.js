const { redisClient } = require('../../config/redis');

const TEMPO_EXPIRACAO_SEGUNDOS = 30;

async function atualizarLocalizacaoMotorista({ driverId, lat, lng }) {
  const chave = `driver:location:${driverId}`;

  await redisClient.hSet(chave, {
    lat: String(lat),
    lng: String(lng),
    updatedAt: new Date().toISOString(),
  });

  await redisClient.expire(chave, TEMPO_EXPIRACAO_SEGUNDOS);
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
    updatedAt: dados.updatedAt,
  };
}

module.exports = { atualizarLocalizacaoMotorista, buscarLocalizacaoMotorista };