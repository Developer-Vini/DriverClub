const { registrarUsuario, autenticarUsuario } = require('./auth.service');

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

async function login(req, res){
    try{
        const { email, password } = req.body;

        if (!email || !password ) {
            return res.status(400).json({ erro: "Email e senha são obrigatórios" });
        }

        const resultado = await autenticarUsuario({ email, password });

        return res.status(200).json(resultado);
    }catch(err){
        return res.status(401).json({ erro: err.message });
    }
}

module.exports = { register, login };