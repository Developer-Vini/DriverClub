let ioInstance = null;
let usuariosConectadosRef = null;

function definirInstancia(io, usuariosConectados){
    ioInstance = io;
    usuariosConectadosRef = usuariosConectados
}

function emitirParaUsuario(userId, evento, dados){
    if(!ioInstance || !usuariosConectadosRef){
        console.warn('Socket ainda não foi inicializado');
        return;
    }
    
    const socketId = usuariosConectadosRef.get(userId)

    if(socketId){
        ioInstance.to(socketId).emit(evento, dados);
    }
}

module.exports = { definirInstancia, emitirParaUsuario}