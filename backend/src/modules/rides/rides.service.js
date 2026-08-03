const pool = require('../../config/database');

async function solicitarCorrida({ passangerId, originLat, originLng, destinationLat, destinationLng }) {
    const resultado = await pool.query(
        `INSERT INTO rides (passenger_id, origin, destination)
        VALUES (
        $1,
        ST_SetSRID(ST_MakePoint($2, $3), 4326)::geography,
        ST_SetSRID(ST_MakePoint($4, $5), 4326)::geography
        )
        RETURNING id, passenger_id, status, requested_at`,
        [passangerId, originLng, originLat, destinationLng, destinationLat]
    );

    return resultado.rows[0];
}

module.exports = { solicitarCorrida }