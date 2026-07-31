const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken')
const pool = require('../../config/database');

async function registrarUsuario({ name, email, password, phone, role }) {

    const usuarioExistente = await pool.query(
        'SELECT id FROM users WHERE email = $1',
        [email]
    );

    if (usuarioExistente.rows.length > 0) {
        throw new Error("Email já cadastrado");
    }

    const passwordHash = await bcrypt.hash(password, 10);

    const resultado = await pool.query(
        `INSERT INTO users (name, email, password_hash, phone, role)
             VALUES ($1, $2, $3, $4, $5)
             RETURNING id, name, email, role`,
        [name, email, passwordHash, phone, role]
    );

    return resultado.rows[0];
}

async function autenticarUsuario({ email, password }){
    const resultado = await pool.query(
        'SELECT id, name, email, password_hash, role FROM users WHERE email = $1',
        [email]
    );

    const usuario = resultado.rows[0];

    if(!usuario){
        throw new Error("Email ou seenha inválidos");
    }

    const senhaCorreta = await bcrypt.compare(password, usuario.password_hash);

    if(!senhaCorreta){
        throw new Error('Email ou senha inválidos');
    }

    const token = jwt.sign(
        {
            id: usuario.id, 
            role: usuario.role
        },
        process.env.JWT_SECRET,
        {
            expiresIn: '7d'
        }
    );

    return { 
        token,
        usuario: { id: usuario.id, name: usuario.name, email: usuario.email, role: usuario.role, },
    };
}

module.exports = { registrarUsuario, autenticarUsuario };