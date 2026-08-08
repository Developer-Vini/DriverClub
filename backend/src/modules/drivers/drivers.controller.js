const { completarCadastroMotorista } = require('./drivers.service');

async function completarCadastro(req, res) {
  try {
    const { licensePlate, vehicleModel, driverLicenseNumber } = req.body;

    if (!licensePlate || !vehicleModel || !driverLicenseNumber) {
      return res.status(400).json({ erro: 'Todos os campos são obrigatórios' });
    }

    const motorista = await completarCadastroMotorista({
      userId: req.usuario.id,
      licensePlate,
      vehicleModel,
      driverLicenseNumber,
    });

    return res.status(201).json(motorista);
  } catch (erro) {
    return res.status(400).json({ erro: erro.message });
  }
}

module.exports = { completarCadastro };