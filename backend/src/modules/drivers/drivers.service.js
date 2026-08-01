const pool = require("../../config/database");

async function completarCadastroMotorista({ userId, licensePlate, vehicleModel, driverLicenseNumber }) {
    const mostoristaExistentes = await pool.query(
        'SELECT id FROM drivers WHERE user_id = $1',
        [userId]
    );

    if (mostoristaExistentes.rows.length > 0) {
        throw new Error('Cadastro de motorista já existe para este usuario')
    }
    const resultado = await pool.query(
        `INSERT INTO drivers (user_id, license_plate, vehicle_model, driver_license_number)
        VALUES ($1, $2, $3, $4)
        RETURNING id, user_id, license_plate, vehicle_model, driver_license_number, approval_status`,
        [userId, licensePlate, vehicleModel, driverLicenseNumber]
    );

    return resultado.rows[0];
}

module.exports = { completarCadastroMotorista };