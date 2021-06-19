import React from 'react';
import { StatusBar } from 'expo-status-bar';
import {NavigationContainer} from '@react-navigation/native';
import StackNavigator from './navigation/StackNavigator'
import { LogBox } from 'react-native';

export default function App() {

  LogBox.ignoreAllLogs();

  return (
    <NavigationContainer>
      <StatusBar style="black" />
      <StackNavigator/>
    </NavigationContainer>
  );
}