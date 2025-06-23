import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import TabNavigator from './TabNavigator';

const Nav = createNativeStackNavigator();

const RootNavigator = () => (
  <Nav.Navigator
    initialRouteName="MainTabs"
    screenOptions={{ headerShown: false }}
  >
    <Nav.Screen name="MainTabs" component={TabNavigator} />
  </Nav.Navigator>
);

export default RootNavigator;
