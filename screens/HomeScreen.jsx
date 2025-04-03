import React, { useEffect, useRef } from 'react';
import {
    View,
    Text,
    TouchableOpacity,
    StyleSheet,
    ImageBackground,
    StatusBar,
    Animated,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';

export default function HomeScreen() {
    const navigation = useNavigation();
    const scaleAnim = useRef(new Animated.Value(1)).current;

    useEffect(() => {
        const animacionRespiracion = Animated.loop(
            Animated.sequence([
                Animated.timing(scaleAnim, {
                    toValue: 1.05,
                    duration: 1000,
                    useNativeDriver: true,
                }),
                Animated.timing(scaleAnim, {
                    toValue: 1,
                    duration: 1000,
                    useNativeDriver: true,
                }),
            ])
        );

        animacionRespiracion.start();

        return () => animacionRespiracion.stop();
    }, [scaleAnim]);

    return (
        <View style={styles.container}>
            <StatusBar barStyle="light-content" backgroundColor="#000" />

            <ImageBackground
                source={require('../assets/loteria_ban.png')} 
                style={styles.background}
                resizeMode="cover"
            >
                <View style={styles.overlay}>
                    <Text style={styles.title}> Lotería Mexicana </Text>

                    <Animated.View style={{ transform: [{ scale: scaleAnim }] }}>
                        <TouchableOpacity
                            style={styles.button}
                            onPress={() => navigation.navigate('Juego')}
                        >
                            <Text style={styles.buttonText}>Iniciar Juego</Text>
                        </TouchableOpacity>
                    </Animated.View>
                </View>
            </ImageBackground>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    background: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    overlay: {
        flex: 1,
        backgroundColor: 'rgba(0, 0, 0, 0.45)',
        width: '100%',
        justifyContent: 'center',
        alignItems: 'center',
        padding: 20,
    },
    title: {
        fontSize: 40,
        fontWeight: 'bold',
        color: '#fff',
        textAlign: 'center',
        marginBottom: 40,
        textShadowColor: '#000',
        textShadowOffset: { width: 1, height: 2 },
        textShadowRadius: 4,
    },
    button: {
        backgroundColor: '#B80000',
        paddingVertical: 14,
        paddingHorizontal: 50,
        borderRadius: 30,
        elevation: 5,
        marginBottom: 30,
    },
    buttonText: {
        color: '#fff',
        fontSize: 20,
        fontWeight: '600',
    },
    footer: {
        fontSize: 16,
        color: '#f1f1f1',
        fontStyle: 'italic',
    },
});
