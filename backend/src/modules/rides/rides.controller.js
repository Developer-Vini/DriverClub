const {
    solicitarCorrida,
    aceitarCorrida,
    marcarChegada,
    iniciarCorrida,
    finalizarCorrida,
    cancelarCorrida,
    buscarCorridaPorId,
} = require('./rides.service');

async function solicitar(req, res) {
    try {
        const { originLat, originLng, destinationLat, destinationLng } = req.body;

        if (!originLat || !originLng || !destinationLat || !destinationLng) {
            return res.status(400).json({ erro: 'Origem e destino são obrigatórios' });
        }

        const corrida = await solicitarCorrida({
            passengerId: req.usuario.id,
            originLat,
            originLng,
            destinationLat,
            destinationLng,
        });

        return res.status(201).json(corrida);
    } catch (erro) {
        return res.status(400).json({ erro: erro.message });
    }
}

async function aceitar(req, res) {
    try {
        const corrida = await aceitarCorrida({ rideId: req.params.id, userId: req.usuario.id });
        return res.status(200).json(corrida);
    } catch (erro) {
        return res.status(400).json({ erro: erro.message });
    }
}

async function chegada(req, res) {
    try {
        const corrida = await marcarChegada({ rideId: req.params.id, userId: req.usuario.id });
        return res.status(200).json(corrida);
    } catch (erro) {
        return res.status(400).json({ erro: erro.message });
    }
}

async function iniciar(req, res) {
    try {
        const corrida = await iniciarCorrida({ rideId: req.params.id, userId: req.usuario.id });
        return res.status(200).json(corrida);
    } catch (erro) {
        return res.status(400).json({ erro: erro.message });
    }
}

async function finalizar(req, res) {
    try {
        const corrida = await finalizarCorrida({ rideId: req.params.id, userId: req.usuario.id });
        return res.status(200).json(corrida);
    } catch (erro) {
        return res.status(400).json({ erro: erro.message });
    }
}

async function cancelar(req, res) {
    try {
        const corrida = await cancelarCorrida({
            rideId: req.params.id,
            userId: req.usuario.id,
            papel: req.usuario.role,
        });
        return res.status(200).json(corrida);
    } catch (erro) {
        return res.status(400).json({ erro: erro.message });
    }
}

async function buscarPorId(req, res) {
    try {
        const corrida = await buscarCorridaPorId(req.params.id);
        return res.status(200).json(corrida);
    } catch (erro) {
        return res.status(404).json({ erro: erro.message });
    }
}

module.exports = { solicitar, aceitar, chegada, iniciar, finalizar, cancelar, buscarPorId };