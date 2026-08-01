const { io } = require('socket.io-client');

const token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjA4MWM1NTcxLTMwMjMtNGMxZi04MmY4LWQ4MTQ0NTBkM2VlMyIsInJvbGUiOiJkcml2ZXIiLCJpYXQiOjE3ODU2MTE5MTMsImV4cCI6MTc4NjIxNjcxM30.17ueUCKLEQrUR8pg58SCrLtVTAH56Bx8DUQTZgYkCQE';

const socket = io('http://localhost:3333', {
  auth: {
    token: token,
  },
});

socket.on('connect', () => {
  console.log('Conectado com sucesso! ID da conexão:', socket.id);

  socket.emit('atualizar_localizacao', {
    lat: -7.2135,
    lng: -35.8817,
  });
});

socket.on('erro', (dados) => {
  console.log('Erro recebido do servidor:', dados);
});

socket.on('connect_error', (erro) => {
  console.log('Erro ao conectar:', erro.message);
});