const express = require('express');
const router = express.Router();
const { completarCadastro } = require('./drivers.controller');
const autenticar = require('../../shared/middlewares/auth.middleware');
const verificarRole = require('../../shared/middlewares/role.middleware');

router.post('/complete-profile', autenticar, verificarRole('driver'), completarCadastro);

module.exports = router;