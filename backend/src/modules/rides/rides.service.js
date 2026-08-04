const pool = require('../../config/database');
const { podeTransicionar } = require('./ride.stateMachine')

async function solicitarCorrida({ passengerId, originLat, originLng, destinationLat, destinationLng }) {
    const resultado = await pool.query(
        `INSERT INTO rides (passenger_id, origin, destination)
        VALUES (
        $1,
        ST_SetSRID(ST_MakePoint($2, $3), 4326)::geography,
        ST_SetSRID(ST_MakePoint($4, $5), 4326)::geography
        )
        RETURNING id, passenger_id, status, requested_at`,
        [passengerId, originLng, originLat, destinationLng, destinationLat]
    );

    return resultado.rows[0];
}

async function aceitarCorrida({ rideId, driverId }) {
    const resultadoCorrida = await pool.query(
        'SELECT id, status FROM rides WHERE id = $1',
        [rideId]
    );

    const corrida = resultadoCorrida.rows[0];

    if (!corrida) {
        throw new Error('Corrida não encontrada');
    }

    const podeAceitar = podeTransicionar(corrida.status, 'accepted', 'driver');

    if (!podeAceitar) {
        throw new Error(`Não é possivel aceitar uma corrida no estado "${corrida.status}`);
    }

    const resultado = await pool.query(
        `UPDATE rides 
        SET status = 'accepted', driver_id = $1, accepted_at = now()
        WHERE id = $2
        RETURNING id, status, driver_id, accepted_at`,
        [driverId, rideId]
    );

    return resultado.rows[0];
}
module.exports = { solicitarCorrida, aceitarCorrida }