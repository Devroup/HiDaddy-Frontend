import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';

import LoginScreen from '../screens/intro/LoginScreen';
import TutorialScreen from '../screens/intro/TutorialScreen';

const Stack = createStackNavigator();

const IntroStackNavigator = () => (
  <Stack.Navigator
    screenOptions={{
      headerShown: false,
    }}
  >
    <Stack.Screen
      name="LoginScreen"
      component={LoginScreen}
      options={{ title: '로그인' }}
    />
    <Stack.Screen
      name="TutorialScreen"
      component={TutorialScreen}
      options={{ title: '튜토리얼' }}
    />
  </Stack.Navigator>
);

export default IntroStackNavigator;
