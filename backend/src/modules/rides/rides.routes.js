const express = require('express');
const router = express.Router();
const {
  solicitar,
  aceitar,
  chegada,
  iniciar,
  finalizar,
  cancelar,
  buscarPorId,
} = require('./rides.controller');
const autenticar = require('../../shared/middlewares/auth.middleware');
const verificarRole = require('../../shared/middlewares/role.middleware');

router.post('/', autenticar, verificarRole('passenger'), solicitar);
router.get('/:id', autenticar, buscarPorId);
router.patch('/:id/accept', autenticar, verificarRole('driver'), aceitar);
router.patch('/:id/arrive', autenticar, verificarRole('driver'), chegada);
router.patch('/:id/start', autenticar, verificarRole('driver'), iniciar);
router.patch('/:id/complete', autenticar, verificarRole('driver'), finalizar);
router.patch('/:id/cancel', autenticar, cancelar);

module.exports = router;