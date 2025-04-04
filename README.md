# 🎴 Lotería Mexicana - App Móvil

¡Bienvenido a la app móvil de Lotería Mexicana! 🇲🇽  
Este proyecto fue desarrollado con **React Native (Expo)** para brindar una experiencia divertida, visual y auditiva de la tradicional lotería mexicana desde cualquier dispositivo móvil 📱

---

## 📱 Características

- 🔀 Baraja automática de las 54 cartas tradicionales.
- 🎨 Carta de inicio personalizada para empezar cada partida.
- 🔊 Lectura en voz alta del nombre de cada carta con `expo-speech`.
- ⏱️ Selector de velocidad (1x, 1.5x, 2x).
- 🧠 Animación `fade-in` al mostrar cada carta.
- ▶️ Botón para iniciar o pausar el juego.
- 🔁 Reinicio automático con nueva baraja.
- 🔊 Repetir nombre de la carta actual.
- 🎉 Modal final al terminar el mazo con botón de reinicio.
- 🎊 Efecto de confetti + voz "¡Lotería!" al finalizar el juego.

---

## 🧱 Tecnologías usadas

- **React Native** + **Expo**
- `expo-speech` – para leer cartas en voz alta.
- `@react-native-picker/picker` – selector de velocidad.
- `@expo/vector-icons` – íconos modernos para los botones.
- `react-native-confetti-cannon` – para animación final 🎊

---


## 🚀 Instalación y ejecución

### 1. Clona el repositorio:

```bash
git clone https://github.com/tu-usuario/loteria-mexicana-app.git
cd loteria-mexicana-app

2. Instala las dependencias:
npm install

3. Instala los módulos de Expo:
npx expo install expo-speech
npx expo install @react-native-picker/picker
npx expo install react-native-confetti-cannon

4. Inicia el proyecto:
npx expo start
