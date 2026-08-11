import { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, Alert } from 'react-native';
import { router } from 'expo-router';
import { login } from '../services/authService';
import { styles } from '../css/loginStyle';

export default function LoginScreen() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [carregando, setCarregando] = useState(false);

    async function handleLogin() {
        if (!email || !password) {
            Alert.alert('Erro', "Preencha email e senha");
            return;
        }

        setCarregando(true)

        try {
            const resultado = await login(email, password);

            console.log('Login bem-sucedido:', resultado);
            Alert.alert('Sucesso', `Bem-vindo, ${resultado.usuario.name}`);
        } catch (erro) {
            console.log('Erro no login:', erro.message);
            Alert.alert('Erro', 'Email ou senhas invalídos');
        } finally {
            setCarregando(false)
        }
    }

    return (
        <View style={styles.container}>
            <Text style={styles.titulo}>Entrar</Text>

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
            <TouchableOpacity onPress={() => router.push('/register')} style={{ marginTop: 16 }}>
                <Text style={{ textAlign: 'center' }}>Não tem conta? Cadastre-se</Text>
            </TouchableOpacity>
        </View>
    )
}