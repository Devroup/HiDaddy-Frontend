import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import HomeScreen from '../screens/home/HomeScreen';
import ChatBotScreen from '../screens/home/ChatBotScreen';

import TabNavigator from './TabNavigator';
import IntroStackNavigator from './IntroStackNavigator';

import MypageStackNavigator from './MypageStackNavigator';

const Nav = createNativeStackNavigator();

const RootNavigator = () => (
  <Nav.Navigator
    initialRouteName="IntroStackNavigator"
    screenOptions={{ headerShown: false }}
  >
    <Nav.Screen name="HomeScreen" component={HomeScreen} />
    <Nav.Screen name="TabNavigator" component={TabNavigator} />
    <Nav.Screen
      name="IntroStackNavigator"
      component={IntroStackNavigator}
      initialParams={{ screen: 'LoginScreen' }}
    />

    <Nav.Screen name="ChatBotScreen" component={ChatBotScreen} />

    <Nav.Screen name="MypageStackNavigator" component={MypageStackNavigator} />
  </Nav.Navigator>
);

export default RootNavigator;
