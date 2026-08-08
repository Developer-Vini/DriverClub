function verificarRole(...papeisPermitidos){
    return (req, res, next) => {
        if(!papeisPermitidos.includes(req.usuario.role)){
            return res.status(403).json({ erro: 'Você não tem permissão para acessar recurso' })
        }
        return next();
    };
}

module.exports = verificarRole