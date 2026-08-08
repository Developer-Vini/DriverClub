const express = require('express');

const router = express.Router();
const { register, login } = require('./auth.controller');
const autenticar = require('../../shared/middlewares/auth.middleware');

router.post('/register', register);
router.post('/login', login);

router.get('/perfil', autenticar, (req, res) => {
    return res.status(200).json({
        messagem: "Você está autenticado!",
        usuario: req.usuario
    });
});

module.exports = router;