const bcrypt = require('bcrypt');
const pool = require('../../config/database');

async function registrarUsuario({ name, email, password, phone, role }) {

    try {
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
    } catch (err) {
        console.error(err.message)
    }

    return resultado.rows[0];
}

module.exports = { registrarUsuario }