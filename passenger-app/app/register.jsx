import { useState } from "react";
import { View, Text, TextInput, TouchableOpacity, Alert } from "react-native";
import { router } from 'expo-router';
import { register } from '../services/authService';

export default function RegisterScreen() {
    const [username, setUsername]
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [phone, setPhone] = useState('');
    const [role, setRole] = useState('');
    const [carregando, setCarregando] = useState(false);

    async function handleRegister() {
        if (!email || !password || !phone || !role || !username) {
            Alert.alert('Erro', "Preencha todos os campos");
            return;
        }
    }
    setCarregando(true);

    try {
        const resultado = await register(username, email, password, phone);

        console.log('Usuario cadastrado com sucesso', resultado);
    } catch (erro) {
        console.log('Erro no cadastro:', erro.message);
        Alert.alert('Erro', 'Erro ao cadastrar usuario');
    } finally {
        setCarregando(false)
    }

    return (
        <View style={styles.container}>
            <Text style={styles.titulo}>Entrar</Text>


            <TextInput
                style={styles.input}
                placeholder='none'
                value={username}
                onChangeText={setUsername}
            />


            <TextInput
                style={styles.input}
                placeholder='Email'
                value={email}
                onChangeText={setEmail}
                keyboardType='email-address'
            />

            <TextInput
                style={styles.input}
                placeholder='Email'
                value={email}
                onChangeText={setEmail}
                keyboardType='email-address'
            />

            <TextInput
                style={styles.input}
                placeholder='Senha'
                value={password}
                onChangeText={setPassword}
                secureTextEntry
            />
            <TouchableOpacity style={styles.botao} onPress={handleLogin} disabled={carregando}>
                <Text style={styles.textoBotao}>{carregando ? 'Entrando' : 'Entrar'}</Text>
            </TouchableOpacity>
        </View>
    )
}