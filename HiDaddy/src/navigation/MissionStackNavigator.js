import React from 'react';
import { Dimensions } from 'react-native';
import { createStackNavigator } from '@react-navigation/stack';

import MissionScreen from '../screens/home/mission/MissionScreen';
import MissionDetailScreen from '../screens/home/mission/MissionDetailScreen';
import MissionPerformScreen from '../screens/home/mission/MissionPerformScreen';
import MissionInfoScreen from '../screens/home/mission/MissionInfoScreen';

import colors from '../constants/colors';
import BackButton from '../components/BackButton';
import ConfirmButton from '../components/ConfirmButton';

const { width, height } = Dimensions.get('window');

const Stack = createStackNavigator();

const MissionStackNavigator = () => (
  <Stack.Navigator
    screenOptions={{
      headerShown: true,
      headerStyle: {
        elevation: 0,
      },
      headerTitleStyle: {
        marginTop: height * 0.03,
        fontSize: width * 0.05,
        fontFamily: 'HancomMalangMalang-Bold',
        color: colors.black,
      },
      headerTitleAlign: 'center',
      headerLeft: () => <BackButton />,
    }}
  >
    <Stack.Screen
      name="MissionScreen"
      component={MissionScreen}
      options={{ title: '' }}
    />
    <Stack.Screen
      name="MissionDetailScreen"
      component={MissionDetailScreen}
      options={{ title: '' }}
    />
    <Stack.Screen
      name="MissionPerformScreen"
      component={MissionPerformScreen}
      options={{ title: '오늘의 마음 전하기', headerRight: () => <ConfirmButton/> }}
    />
    <Stack.Screen
      name="MissionInfoScreen"
      component={MissionInfoScreen}
      options={{ title: '' }}
    />
  </Stack.Navigator>
);

export default MissionStackNavigator;