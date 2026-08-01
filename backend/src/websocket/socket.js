const { Server, Socket } = require('socket.io');

function configurarSocket(servidorHttp){
    const io = new Server(servidorHttp, {
        cors: {
            origin: '*',
        },
    });

    io.on('connection', (socket) => {
        console.log('Novo cliente conectado:', socket.id);

        socket.on('disonnect', () => {
            console.log('Cliente desconectado:', socket.id);
        });
    });

    return io;
}

module.exports = configurarSocket;