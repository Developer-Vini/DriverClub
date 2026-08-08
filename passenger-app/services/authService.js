import axios from 'axios';
import { API_URL } from '../constants/api';

export async function login(email, password){
    const resposta = await exios.post(`${API_URL}/auth/login`, {
        email,
        password
    })

    return resposta.data;
}

export async function register({ name, email, password, phone, role }){
    const resposta = await axios.post(`${API_URL}/auth/register`, {
        name,
        email,
        password,
        phone,
        role,
    });

    return resposta.data;
}