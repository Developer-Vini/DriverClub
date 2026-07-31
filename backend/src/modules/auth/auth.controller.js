const { registrarUsuario } = require('./auth.service');

async function register(req, res) {
    try {
        const { name, email, password, phone, role } = req.body;

        if (!name || !email || !password || !phone || !role) {
            return res.status(400).json({ erro: "Todos os campos são obrigatorios" });
        }

        const usuario = await registrarUsuario({ name, email, password, phone, role });

        return res.status(201).json(usuario);
    } catch (erro) {
        return res.status(400).json({ erro: erro.message });
    }
}

module.exports = { register };