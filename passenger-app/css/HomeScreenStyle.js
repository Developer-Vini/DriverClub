import { StyleSheet } from 'react-native';

export const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        gap: 16,
    },
    titulo: {
        fontSize: 20,
        fontWeight: 'bold',
    },
    botao: {
        backgroundColor: '#000',
        paddingVertical: 12,
        paddingHorizontal: 24,
        borderRadius: 8,
    },
    textoBotao: {
        color: '#fff',
        fontWeight: 'bold',
    },
});