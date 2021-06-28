import React, { useState } from 'react';
import AppLoading from 'expo-app-loading';
import { StatusBar } from 'expo-status-bar';
import { useFonts, NanumMyeongjo_400Regular, NanumMyeongjo_700Bold } from '@expo-google-fonts/dev';
import { Asset } from 'expo-asset';
import { theme } from './theme';
import { Image, LogBox } from 'react-native';
import Navigation from './navigations';
import { images } from './utils/storage';
import { ProgressProvider, UserProvider } from './contexts';
import { ThemeProvider } from 'styled-components/native';
import { NativeBaseProvider } from 'native-base';


const cacheImages = images => {
  return images.map(image => {
    if (typeof image === 'string') {
      return Image.prefetch(image);
    } else {
      return Asset.fromModule(image).downloadAsync();
    }
  });
};

export default function App() {
  console.disableYellowBox = true;
  LogBox.ignoreAllLogs(true);


  const [isReady, setIsReady] = useState(false);
  const _loadAssets = async () => {
    const imageAssets = cacheImages([
      require('../assets/splash.png'),
     ...Object.values(images)
    ])
    const [fontLoaded] = useFonts({
      NanumMyeongjo_400Regular,
      NanumMyeongjo_700Bold,
    })
    await Promise.all([...imageAssets, ...fontLoaded]);
  }
  return isReady ? (
    <ThemeProvider theme={theme}>
      <UserProvider>
        <ProgressProvider>
          <NativeBaseProvider>
            <StatusBar style="dark-content" />
            <Navigation />
          </NativeBaseProvider>
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