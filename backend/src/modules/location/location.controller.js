const { buscarMotoristasProximos } = require('./location.service');

async function buscarProximos(req, res) {
    try {
        const { lat, lng, raioKm } = req.query;

        if (!lat || !lng) {
            return res.status(400).json({ erro: 'Latitude e longitude são obrigatorias' });
        }

        const resultados = await buscarMotoristasProximos({
            lat: Number(lat),
            lng: Number(lng),
            raioKm: raioKm ? Number(raioKm) : 5,
        });

        return res.status(200).json({ motoristas: resultados });
    } catch (erro) {
        return res.status(400).json({ erro: erro.message });
    }
}

module.exports = { buscarProximos };