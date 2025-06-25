import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import HomeScreen from '../screens/home/HomeScreen';

import TabNavigator from './TabNavigator';
import IntroStackNavigator from './IntroStackNavigator';

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
  </Nav.Navigator>
);

export default RootNavigator;
