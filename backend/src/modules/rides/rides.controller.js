const { solicitarCorrida } = require("./rides.service");

async function solicitar(req, res){
    try{
        const { originLat, originLng, destinationLat, destinationLng } = req.body;

        if(!originLat || !originLng || !destinationLat || !destinationLng){
            return res.status(400).json({ erro: 'Origem e destino são obrigatórios' });
        }

        const corrida = await solicitarCorrida({
            passangerId: req.usuario.id,
            originLat,
            originLng,
            destinationLat,
            destinationLng,
        });

        return res.status(201).json(corrida);
    }catch(erro){
        return res.status(400).json({ erro: erro.message})
    }
}

module.exports = { solicitar }