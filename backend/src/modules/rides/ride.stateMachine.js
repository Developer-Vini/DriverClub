const TRANSICOES_PERMITIDAS = {
    requested: {
        accepted: 'driver',
        cancelled: 'passenger,driver',
    },
    accepted: {
        arrived: 'driver',
        cancelled: 'passenger,driver',
    },
    arrived: {
        in_progress: 'driver',
        cancelled: 'passenger,driver',
    },
    in_progress: {
        completed: 'driver',
    },
    completed: {},
    cancelled: {},
};

function podeTransicionar(estadoAtual, novoEstado, papelDoUsuario){
    const transicoesDoEstado = TRANSICOES_PERMITIDAS[estadoAtual];

    if(!transicoesDoEstado){
        return false
    }

    const papeisPermitidos = transicoesDoEstado[novoEstado];

    if(!papeisPermitidos){
        return false;
    }
    
    return papeisPermitidos.includes(papelDoUsuario);
}

module.exports = { podeTransicionar, TRANSICOES_PERMITIDAS };