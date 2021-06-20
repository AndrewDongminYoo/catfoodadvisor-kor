import React, { useState } from 'react';
import { StatusBar, Image } from 'expo-status-bar';
import {NavigationContainer} from '@react-navigation/native';
import StackNavigator from './navigation/StackNavigator'
import { YellowBox } from "react-native";
import { AppLoading } from 'expo';
import { Asset } from 'expo-asset';
import * as Font from 'expo-font';
import { styled, ThemeProvider } from 'styled-components';
import { theme } from './utils/theme';

const cacheImages = images => {
  return images.map(image => {
    if (typeof image === 'string') {
      return Image.prefetch(image);
    } else {
      return Asset.fromModule(image).downloadAsync();
    }
  });
};

const cacheFonts = fonts => {
  return fonts.map(font => Font.loadAsync(font));
}

export default function App() {

  YellowBox.ignoreWarnings([""]);

  const [isReady, setIsReady] = useState(false);
  const _loadAssets = async () => {
    const imageAssets = cacheImages([require('../assets/splash.png')])
    const fontAssets = cacheFonts([require('../assets/fonts/NanumMyeongjo-Regular.ttf')])
    await Promise.all([...imageAssets, ...fontAssets]);
  }

  return isReady ? (
    <ThemeProvider theme={theme}>
      <NavigationContainer>
        <StatusBar style="dark-content" />
        <StackNavigator/>
      </NavigationContainer>
    </ThemeProvider>
  ) : (
    <AppLoading
      startAsync={_loadAssets}
      onFinish={setIsReady(true)}
      onError={console.warn}
    />
  )
}