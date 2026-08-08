require('dotenv').config();
const { conectarRedis } = require('./src/config/redis');
const { buscarMotoristasProximos } = require('./src/modules/location/location.service');

async function testar() {
  await conectarRedis();

  const resultados = await buscarMotoristasProximos({
    lat: -7.2140,
    lng: -35.8820,
    raioKm: 5,
  });

  console.log('Motoristas encontrados:', resultados);

  process.exit(0);
}

testar();