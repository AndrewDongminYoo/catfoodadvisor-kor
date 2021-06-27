import React, { useContext } from 'react';
import { ThemeContext } from 'styled-components/native';
import { createStackNavigator } from '@react-navigation/stack';
import { Channel, DetailPage } from '../screens';
import MainTab from './MainTab';

const Stack = createStackNavigator();

const MainStack = () => {

  const theme = useContext(ThemeContext);

  return (
    <Stack.Navigator
      initialRouteName="Main"
      screenOptions={{
        headerTitleAlign: 'center',
        headerBackTitleVisible: false,
        cardStyle: { backgroundColor: theme.background },
        headerTintColor: theme.headerTintColor,
      }}
    >
      <Stack.Screen
        name="Main"
        component={MainTab}
      />
      <Stack.Screen
        name="Detail"
        component={DetailPage}
      />
    </Stack.Navigator>
  );
};

export default MainStack;