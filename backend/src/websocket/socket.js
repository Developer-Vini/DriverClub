const { Server } = require('socket.io');
const jwt = require('jsonwebtoken');
const { atualizarLocalizacaoMotorista, removerMotoristaDoMapa } = require('../modules/location/location.service');

function configurarSocket(servidorHttp) {
    const io = new Server(servidorHttp, {
        cors: {
            origin: '*',
        },
    });

    io.use((socket, next) => {
        const token = socket.handshake.auth.token;

        if (!token) {
            return next(new Error('Token não fornecido'));
        }

        try {
            const payload = jwt.verify(token, process.env.JWT_SECRET);
            socket.usuario = payload;
            return next();
        } catch (erro) {
            return next(new Error('Token inválido ou expirado'));
        }
    });

    io.on('connection', (socket) => {
        console.log('Novo cliente conectado:', socket.id, '- usuário:', socket.usuario.id);

        socket.on('atualizar_localizacao', async (dados) => {
            try {
                const { lat, lng } = dados;
                const driverId = socket.usuario.id;

                if (lat === undefined || lng === undefined) {
                    return socket.emit('erro', { mensagem: 'Dados de localização incompletos' });
                }

                await atualizarLocalizacaoMotorista({ driverId, lat, lng });

                console.log(`Localização atualizada: motorista ${driverId} em (${lat}, ${lng})`);
            } catch (erro) {
                console.error('Erro ao atualizar localização:', erro.message);
                socket.emit('erro', { mensagem: 'Erro ao atualizar localização' });
            }
        });

        socket.on('disconnect', async () => {
            console.log('Cliente desconectado:', socket.id, '- usuário:', socket.usuario.id);

            if (socket.usuario.role === 'driver') {
                await removerMotoristaDoMapa(socket.usuario.id);
                console.log('Motorista removido do mapa geográfico:', socket.usuario.id);
            }
        });
    });

    return io;
}

module.exports = configurarSocket;