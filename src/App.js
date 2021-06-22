import React, { useState } from 'react';
import AppLoading from 'expo-app-loading';
import { StatusBar } from 'expo-status-bar';
import * as Font from 'expo-font';
import { Asset } from 'expo-asset';
import { theme } from './theme';
import { Image } from 'react-native';
import Navigation from './navigations';
import { ProgressProvider, UserProvider } from './contexts';
import { styled, ThemeProvider } from 'styled-components';

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

  const [isReady, setIsReady] = useState(false);
  const _loadAssets = async () => {
    const imageAssets = cacheImages([require('../assets/splash.png')])
    const fontAssets = cacheFonts([require('../assets/fonts/NanumMyeongjo-Regular.ttf')])
    await Promise.all([...imageAssets, ...fontAssets]);
  }

  return isReady ? (
    <ThemeProvider theme={theme}>
      <UserProvider>
        <ProgressProvider>
          <StatusBar style="dark-content" />
          <Navigation />
        </ProgressProvider>
      </UserProvider>
    </ThemeProvider>
  ) : (
    <AppLoading
      startAsync={_loadAssets}
      onFinish={() => setIsReady(true)}
      onError={console.warn}
    />
  )
}