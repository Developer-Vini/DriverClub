import { useState } from "react";
import { View, Text, TextInput, TouchableOpacity, Alert } from "react-native";
import { router } from 'expo-router';
import { register } from '../services/authService';
import { styles } from '../css/loginStyle'

export default function RegisterScreen() {
    const [name, setName] = useState('')
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [phone, setPhone] = useState('');
    const [role, setRole] = useState('');
    const [carregando, setCarregando] = useState(false);

    async function handleRegister() {
        if (!email || !password || !phone || !role || !name) {
            Alert.alert('Erro', "Preencha todos os campos");
            return;
        }
        setCarregando(true);

        try {
            const resultado = await register({name, email, password, phone, role: 'passenger'});

            console.log('Usuario cadastrado com sucesso', resultado);
            Alert.alert('Sucesso', 'Cadastro realizado!! Faça login para continuar.');
            router.push('/login')
        } catch (erro) {
            console.log('Erro no cadastro:', erro.message);
            Alert.alert('Erro', 'Não foi possivel cadastrar. Tente novamente');
        } finally {
            setCarregando(false)
        }
    }

    return (
        <View style={styles.container}>
            <Text style={styles.titulo}>Criar Conta</Text>


            <TextInput
                style={styles.input}
                placeholder='Nome'
                value={name}
                onChangeText={setName}
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
                placeholder='Telefone'
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
                <Text style={styles.textoBotao}>{carregando ? 'Cadastrando' : 'Cadastrar'}</Text>
            </TouchableOpacity>
        </View>
    )
}