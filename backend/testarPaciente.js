const { io } = require('socket.io-client');

const tokenPassageiro = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6ImY2MDFmY2ZmLWJjZmYtNDY0ZC04NTUwLTc1ZWVjMGYwZGIxNCIsInJvbGUiOiJwYXNzZW5nZXIiLCJpYXQiOjE3ODU4ODAzMjcsImV4cCI6MTc4NjQ4NTEyN30.UfjbGUSaJUtDGn0581sPAt3-Oqw07rNBLi7T9OiYqTI';

const socket = io('http://localhost:3333', {
  auth: { token: tokenPassageiro },
});

socket.on('connect', () => {
  console.log('Passageiro conectado! Aguardando atualizações de corrida...');
});

socket.on('ride_status_changed', (dados) => {
  console.log('🔔 Status da corrida mudou:', dados);
});

socket.on('connect_error', (erro) => {
  console.log('Erro ao conectar:', erro.message);
});