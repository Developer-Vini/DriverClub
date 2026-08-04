const express = require('express');
const router = express.Router();
const { solicitar } = require('./rides.controller');
const autenticar = require('../../shared/middlewares/auth.middleware');
const verificarRole = require('../../shared/middlewares/role.middleware');

router.post('/', autenticar, verificarRole('passenger'), solicitar);

module.exports = router;