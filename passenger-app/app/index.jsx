import { router } from 'expo-router';
import { View, Text, TouchableOpacity } from 'react-native';
import { styles } from '../css/HomeScreenStyle';


export default function HomeScreen() {
  return (
    <View style={styles.container}>
      <Text style={styles.titulo}>Uber Clone - Passageiro</Text>

      <TouchableOpacity style={styles.botao} onPress={() => router.push('login')}>
        <Text style={styles.textoBotao}>Ir para Login</Text>
      </TouchableOpacity>
    </View>
  );
}