import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import DetailPage from '../screens/DetailPage';
import MainPage from '../screens/MainPage';
import AboutPage from '../screens/AboutPage';
import LikePage from '../screens/LikePage';

const Stack = createStackNavigator();

const StackNavigator = () =>{
    return (
        <Stack.Navigator
            screenOptions={{
                headerStyle: {
                    backgroundColor: "white",
                    borderBottomColor: "white",
                    shadowColor: "white",
                    height:100
                },
                headerTitleAlign:'left',
                headerTintColor: "#000",
                headerBackTitleVisible: false
            }}
        >
            <Stack.Screen name="MainPage" component={MainPage}/>
            <Stack.Screen name="DetailPage" component={DetailPage}/>
            <Stack.Screen name="AboutPage" component={AboutPage}/>
            <Stack.Screen name="LikePage" component={LikePage}/>
        </Stack.Navigator>
    )
}

export default StackNavigator;