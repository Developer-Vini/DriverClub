const pool = require('../../config/database');
const { emitirParaUsuario } = require('../../websocket/socketState');
const { podeTransicionar } = require('./ride.stateMachine');

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

async function buscarDriverIdPorUserId(userId) {
    const resultado = await pool.query('SELECT id FROM drivers WHERE user_id = $1', [userId]);
    const motorista = resultado.rows[0];

    if (!motorista) {
        throw new Error('Perfil de motorista não encontrado. Complete seu cadastro primeiro.');
    }

    return motorista.id;
}

async function buscarCorridaPorId(rideId) {
    const resultado = await pool.query('SELECT * FROM rides WHERE id = $1', [rideId]);
    const corrida = resultado.rows[0];

    if (!corrida) {
        throw new Error('Corrida não encontrada');
    }

    return corrida;
}

async function aceitarCorrida({ rideId, userId }) {
    const driverId = await buscarDriverIdPorUserId(userId);
    const corrida = await buscarCorridaPorId(rideId);

    if (!podeTransicionar(corrida.status, 'accepted', 'driver')) {
        throw new Error(`Não é possível aceitar uma corrida no estado "${corrida.status}"`);
    }

    const resultado = await pool.query(
        `UPDATE rides SET status = 'accepted', driver_id = $1, accepted_at = now()
     WHERE id = $2
     RETURNING id, status, driver_id, passenger_id, accepted_at`,
        [driverId, rideId]
    );

    const corridaAtualizada = resultado.rows[0];

    emitirParaUsuario(corridaAtualizada.passenger_id, 'ride_status_changed', {
        rideId: corridaAtualizada.id,
        status: corridaAtualizada.status,
    });

    return corridaAtualizada;
}

async function marcarChegada({ rideId, userId }) {
    const driverId = await buscarDriverIdPorUserId(userId);
    const corrida = await buscarCorridaPorId(rideId);

    if (corrida.driver_id !== driverId) {
        throw new Error('Você não é o motorista responsável por esta corrida');
    }

    if (!podeTransicionar(corrida.status, 'arrived', 'driver')) {
        throw new Error(`Não é possível marcar chegada no estado "${corrida.status}"`);
    }

    const resultado = await pool.query(
        `UPDATE rides SET status = 'arrived' WHERE id = $1 RETURNING id, status, passenger_id`,
        [rideId]
    );

    const corridaAtualizada = resultado.rows[0];

    emitirParaUsuario(corridaAtualizada.passenger_id, 'ride_status_changed', {
        rideId: corridaAtualizada.id,
        status: corridaAtualizada.status,
    });

    return corridaAtualizada;
}
async function iniciarCorrida({ rideId, userId }) {
    const driverId = await buscarDriverIdPorUserId(userId);
    const corrida = await buscarCorridaPorId(rideId);

    if (corrida.driver_id !== driverId) {
        throw new Error('Você não é o motorista responsável por esta corrida');
    }

    if (!podeTransicionar(corrida.status, 'in_progress', 'driver')) {
        throw new Error(`Não é possível iniciar a corrida no estado "${corrida.status}"`);
    }

    const resultado = await pool.query(
        `UPDATE rides SET status = 'in_progress' WHERE id = $1 RETURNING id, status, passenger_id`,
        [rideId]
    );

    const corridaAtualizada = resultado.rows[0];

    emitirParaUsuario(corridaAtualizada.passenger_id, 'ride_status_changed', {
        rideId: corridaAtualizada.id,
        status: corridaAtualizada.status,
    });

    return corridaAtualizada;
}

async function finalizarCorrida({ rideId, userId }) {
    const driverId = await buscarDriverIdPorUserId(userId);
    const corrida = await buscarCorridaPorId(rideId);

    if (corrida.driver_id !== driverId) {
        throw new Error('Você não é o motorista responsável por esta corrida');
    }

    if (!podeTransicionar(corrida.status, 'completed', 'driver')) {
        throw new Error(`Não é possível finalizar a corrida no estado "${corrida.status}"`);
    }

    const resultado = await pool.query(
        `UPDATE rides SET status = 'completed', completed_at = now() WHERE id = $1 
     RETURNING id, status, completed_at, passenger_id`,
        [rideId]
    );

    const corridaAtualizada = resultado.rows[0];

    emitirParaUsuario(corridaAtualizada.passenger_id, 'ride_status_changed', {
        rideId: corridaAtualizada.id,
        status: corridaAtualizada.status,
    });

    return corridaAtualizada;
}

async function cancelarCorrida({ rideId, userId, papel }) {
    const corrida = await buscarCorridaPorId(rideId);

    if (papel === 'passenger' && corrida.passenger_id !== userId) {
        throw new Error('Não autorizado.');
    }

    if (papel === 'driver') {
        const driverId = await buscarDriverIdPorUserId(userId);
        if (corrida.driver_id !== driverId) throw new Error('Não autorizado.');
    }

    if (!podeTransicionar(corrida.status, 'cancelled', papel)) {
        throw new Error(`Não é possível cancelar a corrida no estado "${corrida.status}"`);
    }

    const resultado = await pool.query(
        `UPDATE rides SET status = 'cancelled' WHERE id = $1 RETURNING id, status, passenger_id, driver_id`,
        [rideId]
    );

    const corridaAtualizada = resultado.rows[0];

    if (papel === 'driver') {
        emitirParaUsuario(corridaAtualizada.passenger_id, 'ride_status_changed', {
            rideId: corridaAtualizada.id,
            status: corridaAtualizada.status,
        });
    }

    if (papel === 'passenger' && corridaAtualizada.driver_id) {
        const resultadoUser = await pool.query('SELECT user_id FROM drivers WHERE id = $1', [corridaAtualizada.driver_id]);
        const driverUserId = resultadoUser.rows[0]?.user_id;

        if (driverUserId) {
            emitirParaUsuario(driverUserId, 'ride_status_changed', {
                rideId: corridaAtualizada.id,
                status: corridaAtualizada.status,
            });
        }
    }

    return corridaAtualizada;
}

module.exports = {
    solicitarCorrida,
    aceitarCorrida,
    marcarChegada,
    iniciarCorrida,
    finalizarCorrida,
    cancelarCorrida,
    buscarCorridaPorId,
};