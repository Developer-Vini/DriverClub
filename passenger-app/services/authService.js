import axios from 'axios';
import { API_URL } from '../constants/api';

export async function login(email, password) {
  console.log('Tentando login com:', { email, password, url: `${API_URL}/auth/login` });

  try {
    const resposta = await axios.post(`${API_URL}/auth/login`, {
      email,
      password,
    });

    console.log('Resposta recebida:', resposta.data);
    return resposta.data;
  } catch (erro) {
    console.log('Erro detalhado:', erro.response?.data || erro.message);
    throw erro;
  }
}

export async function register(username, email, password, phone, role){
    console.log('Tentando cadastrar usuario com:', { username, email, password, phone, role, url: `${API_URL}/auth/register` });

    try{
        const respostaCadastro = await axios.post(`${API_URL}/auth/register`, {
            username, email, password, phone, role
        });
        console.log('Resposta recebida', respostaCadastro.data);
        return respostaCadastro.data;
    }catch(error){
        console.log('Erro detalhado:', erro.response?.data || erro.message);
        throw erro;
    }

}