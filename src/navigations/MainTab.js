import React, { useContext, useEffect } from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Profile, ChannelList, MainPage } from '../screens';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { ThemeContext } from 'styled-components/native';
import { getFocusedRouteNameFromRoute } from '@react-navigation/native';

const Tab = createBottomTabNavigator();

const TabBarIcon = ({ focused, name }) => {

  const theme = useContext(ThemeContext);
  return (
    <MaterialCommunityIcons
      name={name}
      size={26}
      color={focused ? theme.tabActiveColor : theme.tabInactiveColor}
    />
  );
};

const MainTab = ({ navigation, route }) => {

  const theme = useContext(ThemeContext);

  useEffect(() => {
    const title = getFocusedRouteNameFromRoute(route) ?? 'Main'
    navigation.setOptions({
      headerTitle: title,
      headerRight: () =>
        title === "Channels" && (
          <MaterialCommunityIcons
            name="account-group"
            size={26}
            style={{ margin: 10 }}
            onPress={() => navigation.navigate('Channel Creation')}
          />
        ),
    });
  }, [route])

  return (
    <Tab.Navigator
      tabBarOptions={{
        activeTintColor: theme.tabActiveColor,
        inactiveTintColor: theme.tabInactiveColor,
      }}
    >
      <Tab.Screen
        name="Main"
        component={MainPage}
        options={{
          tabBarIcon: ({ focused }) =>
          TabBarIcon({
            focused,
            name: focused ? 'cat' : 'cat',
          }),
        }}
      />
      <Tab.Screen
        name="Profile"
        component={Profile}
        options={{
          tabBarIcon: ({ focused }) =>
          TabBarIcon({
            focused,
            name: focused ? 'account-circle' : 'account-circle-outline',
          }),
        }}
      />
    </Tab.Navigator>
  );
};

export default MainTab;