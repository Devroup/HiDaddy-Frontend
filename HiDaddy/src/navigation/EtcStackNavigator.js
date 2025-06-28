import React from 'react';
import { Dimensions } from 'react-native';
import { createStackNavigator } from '@react-navigation/stack';

import ChatBotScreen from '../screens/home/ChatBotScreen';
import WeeklyInfoScreen from '../screens/home/WeeklyInfoScreen';

import colors from '../constants/colors';
import BackButton from '../components/BackButton';

const { width, height } = Dimensions.get('window');

const Stack = createStackNavigator();

const EtcStackNavigator = () => (
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
      name="ChatBotScreen"
      component={ChatBotScreen}
      options={{ title: '' }}
    />
    <Stack.Screen
      name="WeeklyInfoScreen"
      component={WeeklyInfoScreen}
      options={{ title: '주차별 정보 알아보기' }}
    />
  </Stack.Navigator>
);

export default EtcStackNavigator;
