import React, { useEffect, useState, useRef } from 'react';
import {
    View,
    Text,
    TouchableOpacity,
    StyleSheet,
    Animated,
    Modal,
} from 'react-native';
import { Picker } from '@react-native-picker/picker';
import * as Speech from 'expo-speech';
import { Ionicons } from '@expo/vector-icons';

import { cartas } from '../utils/data';
import { shuffleArray } from '../utils/shuffle';
import Carta from '../components/Carta';

export default function GameScreen({ navigation }) {
    const [baraja, setBaraja] = useState([]);
    const [indice, setIndice] = useState(0);
    const [jugando, setJugando] = useState(false);
    const [velocidad, setVelocidad] = useState(3000);
    const [mostrarModal, setMostrarModal] = useState(false);
    const intervaloRef = useRef(null);
    const fadeAnim = useRef(new Animated.Value(0)).current;

    const animarCarta = () => {
        fadeAnim.setValue(0);
        Animated.timing(fadeAnim, {
            toValue: 1,
            duration: 300,
            useNativeDriver: true,
        }).start();
    };

    useEffect(() => {
        const cartasMezcladas = shuffleArray(cartas);
        const cartaInicio = {
            nombre: 'Inicio',
            imagen: require('../assets/carta_inicio.png'),
            esNegra: true,
        };
        setBaraja([cartaInicio, ...cartasMezcladas]);
        setIndice(0);
        animarCarta();
    }, []);

    const obtenerRatePorVelocidad = (ms) => {
        if (ms === 3000) return 1.0;
        if (ms === 2000) return 1.3;
        if (ms === 1000) return 1.9;
        return 1.0;
    };

    const reproducirCarta = () => {
        if (baraja[indice] && !baraja[indice].esNegra) {
            Speech.speak(baraja[indice].nombre, {
                rate: obtenerRatePorVelocidad(velocidad),
            });
        }
    };

    const reiniciarIntervalo = (nuevaVelocidad) => {
        clearInterval(intervaloRef.current);
        intervaloRef.current = setInterval(() => {
            setIndice((prev) => {
                const siguiente = prev + 1;
                if (siguiente < baraja.length) {
                    animarCarta();
                    if (!baraja[siguiente].esNegra) {
                        Speech.speak(baraja[siguiente].nombre, {
                            rate: obtenerRatePorVelocidad(nuevaVelocidad),
                        });
                    }
                    return siguiente;
                } else {
                    detenerJuego();
                    setMostrarModal(true);  
                    return prev;
                }
            });
        }, nuevaVelocidad);
    };

    const iniciarJuego = () => {
        if (!jugando) {
            setJugando(true);
            reiniciarIntervalo(velocidad);
        }
    };

    const detenerJuego = () => {
        clearInterval(intervaloRef.current);
        setJugando(false);
    };

    const resetearJuego = () => {
        detenerJuego();
        const cartasMezcladas = shuffleArray(cartas);
        const cartaInicio = {
            nombre: 'Inicio',
            imagen: require('../assets/carta_inicio.png'),
            esNegra: true,
        };
        setBaraja([cartaInicio, ...cartasMezcladas]);
        setIndice(0);
        animarCarta();
        setMostrarModal(false);
    };

    const cambiarVelocidad = (valor) => {
        setVelocidad(valor);
        if (jugando) {
            reiniciarIntervalo(valor);
        }
    };

    return (
        <View style={styles.container}>
            {baraja.length > 0 && (
                <Animated.View style={{ opacity: fadeAnim }}>
                    <Carta nombre={baraja[indice].nombre} imagen={baraja[indice].imagen} />
                </Animated.View>
            )}

            <View style={styles.controlRow}>
                <TouchableOpacity style={styles.roundBtn} onPress={jugando ? detenerJuego : iniciarJuego}>
                    <Ionicons name={jugando ? 'pause' : 'play'} size={28} color="#fff" />
                </TouchableOpacity>

                <TouchableOpacity style={styles.iconBtn} onPress={resetearJuego}>
                    <Ionicons name="refresh" size={26} color="#fff" />
                </TouchableOpacity>

                <TouchableOpacity style={styles.iconBtn} onPress={reproducirCarta}>
                    <Ionicons name="volume-high" size={26} color="#fff" />
                </TouchableOpacity>
            </View>

            <View style={styles.dropdown}>
                <Ionicons name="time-outline" size={20} color="#fff" style={styles.dropdownIcon} />
                <Text style={styles.dropdownLabel}>Velocidad:</Text>
                <Picker
                    selectedValue={velocidad}
                    onValueChange={(value) => cambiarVelocidad(value)}
                    style={styles.picker}
                    dropdownIconColor="#fff"
                >
                    <Picker.Item label="1x (Normal)" value={3000} />
                    <Picker.Item label="1.5x (Rápido)" value={2000} />
                    <Picker.Item label="2x (Muy rápido)" value={1000} />
                </Picker>
            </View>

            <Text style={styles.progreso}>
                Carta {indice + 1} de {baraja.length}
            </Text>

            <Modal
                animationType="fade"
                transparent={true}
                visible={mostrarModal}
                onRequestClose={() => setMostrarModal(false)}
            >
                <View style={styles.modalContainer}>
                    <View style={styles.modalContent}>
                        <Text style={styles.modalTitulo}>🎉 ¡Juego terminado!</Text>
                        <Text style={styles.modalTexto}>Presiona "Reiniciar" para jugar otra vez.</Text>
                        <TouchableOpacity style={styles.modalBtn} onPress={resetearJuego}>
                            <Text style={styles.modalBtnText}>🔁 Reiniciar</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </Modal>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#faf8f0',
        alignItems: 'center',
        justifyContent: 'center',
        padding: 20,
    },
    controlRow: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 20,
        marginVertical: 20,
    },
    roundBtn: {
        backgroundColor: '#cc0000',
        width: 60,
        height: 60,
        borderRadius: 30,
        alignItems: 'center',
        justifyContent: 'center',
        elevation: 6,
    },
    iconBtn: {
        backgroundColor: '#0066cc',
        padding: 12,
        borderRadius: 10,
        marginHorizontal: 5,
    },
    dropdown: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: '#0066cc',
        borderRadius: 10,
        paddingHorizontal: 15,
        paddingVertical: 6,
        marginBottom: 10,
    },
    dropdownIcon: {
        marginRight: 8,
    },
    dropdownLabel: {
        color: '#fff',
        fontSize: 16,
        marginRight: 8,
    },
    picker: {
        height: 50,
        width: 150,
        color: '#fff',
        textAlign: 'center',
    },
    progreso: {
        marginTop: 15,
        fontSize: 16,
        color: '#333',
    },
    modalContainer: {
        flex: 1,
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
        justifyContent: 'center',
        alignItems: 'center',
    },
    modalContent: {
        backgroundColor: '#fff',
        borderRadius: 20,
        padding: 25,
        width: 280,
        alignItems: 'center',
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.3,
        shadowRadius: 4,
        elevation: 10,
    },
    modalTitulo: {
        fontSize: 24,
        fontWeight: 'bold',
        marginBottom: 10,
        textAlign: 'center',
    },
    modalTexto: {
        fontSize: 16,
        color: '#444',
        marginBottom: 20,
        textAlign: 'center',
    },
    modalBtn: {
        backgroundColor: '#cc0000',
        paddingVertical: 10,
        paddingHorizontal: 25,
        borderRadius: 10,
    },
    modalBtnText: {
        color: '#fff',
        fontSize: 16,
    },
});
