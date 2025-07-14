import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import HomeScreen from '../screens/home/HomeScreen';

import TabNavigator from './TabNavigator';
import IntroStackNavigator from './IntroStackNavigator';
import EtcStackNavigator from './EtcStackNavigator';
import MissionStackNavigator from './MissionStackNavigator';
import MypageStackNavigator from './MypageStackNavigator';
import BoardStackNavigator from './BoardStackNavigator';
import DiaryStackNavigator from './DiaryStackNavigator'

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
    <Nav.Screen name="EtcStackNavigator" component={EtcStackNavigator} />
    <Nav.Screen
      name="MissionStackNavigator"
      component={MissionStackNavigator}
    />
    <Nav.Screen name="DiaryStackNavigator" component={DiaryStackNavigator}/>
    <Nav.Screen name="BoardStackNavigator" component={BoardStackNavigator} />
    <Nav.Screen name="MypageStackNavigator" component={MypageStackNavigator} />
  </Nav.Navigator>
);

export default RootNavigator;
