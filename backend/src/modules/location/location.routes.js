const express = require('express');
const { buscarProximos } = require('./location.controller');
const autenticar = require('../../shared/middlewares/auth.middleware');
const router = express.Router();


router.get('nearby', autenticar, buscarProximos)

module.exports = router