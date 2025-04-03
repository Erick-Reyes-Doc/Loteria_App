import React from 'react';
import { View, Text, Image, StyleSheet } from 'react-native';

const Carta = ({ nombre, imagen }) => {
    return (
        <View style={styles.container}>
            <Image source={imagen} style={styles.imagen} />
            <Text style={styles.nombre}>{nombre}</Text>
        </View>
    );
};

export default Carta;

const styles = StyleSheet.create({
    container: {
        alignItems: 'center',
        marginBottom: 20,
    },
    imagen: {
        width: 220,
        height: 320,
        resizeMode: 'contain',
        borderRadius: 10,
    },
    nombre: {
        marginTop: 10,
        fontSize: 24,
        fontWeight: '600',
        textAlign: 'center',
        color: '#222',
    },
});
