// App.js
import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import HomeScreen from './screens/HomeScreen';
import GameScreen from './screens/GameScreen';

const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator
        initialRouteName="Inicio"
        screenOptions={{ headerShown: false }} // 👈 Esto oculta todos los headers
      >
        <Stack.Screen name="Inicio" component={HomeScreen} />
        <Stack.Screen name="Juego" component={GameScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
