import { useCallback, useEffect, useState } from 'react';
import { StyleSheet, ImageBackground, SafeAreaView } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { useFonts } from 'expo-font';

import { StatusBar } from 'expo-status-bar';

import * as SplashScreen from 'expo-splash-screen';

import StartGameScreen from './screens/StartGameScreen';
import GameScreen from './screens/GameScreen';
import GameOver from './screens/GameOver';

import Colors from './constants/colors';
// Keep the splash screen visible while we fetch resources
SplashScreen.preventAutoHideAsync();

export default function App() {
  const [userNumber, setUserNumber] = useState(undefined);
  const [roundsNumber, setRoundsNumber] = useState(0);
  const [gameIsOver, setGameIsOver] = useState(true);

  const [fontsLoaded] = useFonts({
    'open-sans': require('./assets/fonts/OpenSans-Regular.ttf'),
    'open-sans-bold': require('./assets/fonts/OpenSans-Bold.ttf')
  })

  if (!fontsLoaded) {
    SplashScreen.hideAsync();
    return null;
  }

  function pickedHandler(pickedNumber) {
    setUserNumber(pickedNumber);
    setGameIsOver(false);
  }

  function gameIsOverHandler(numbersOfRounds) {
    setGameIsOver(true);
    setRoundsNumber(numbersOfRounds);
  }

  function startNewGameHandler() {
    setUserNumber(null);
    setRoundsNumber(0);
  }

  let screen = <StartGameScreen onPickNumber={pickedHandler} />

  if (userNumber) screen = <GameScreen userNumber={userNumber} gameIsOverHandler={gameIsOverHandler} />

  if (gameIsOver && userNumber) screen = <GameOver userNumber={userNumber} roundsNumber={roundsNumber} onStartNewGame={startNewGameHandler} />

  return (
    <>
      <StatusBar style='light'/>
      <LinearGradient colors={[Colors.primary700, Colors.accent500]} style={styles.rootScreen}>
        <ImageBackground style={styles.rootScreen} source={require('./assets/images/background.png')} resizeMode='cover' imageStyle={styles.backgroundImage}>
          <SafeAreaView style={styles.rootScreen}>
            {screen}
          </SafeAreaView>
        </ImageBackground>
      </LinearGradient>
    </>
  );
}

const styles = StyleSheet.create({
  rootScreen: {
    flex: 1
  },
  backgroundImage: {
    opacity: 0.15
  }
})
