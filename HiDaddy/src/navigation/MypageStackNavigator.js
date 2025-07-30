import React from 'react';
import { Dimensions } from 'react-native';
import { createStackNavigator } from '@react-navigation/stack';

import MypageScreen from '../screens/mypage/MypageScreen';
import MyInfoScreen from '../screens/mypage/MyInfoScreen';
import ProfileScreen from '../screens/mypage/ProfileScreen';
import ProfileAddScreen from '../screens/mypage/ProfileAddScreen';

import colors from '../constants/colors';
import BackButton from '../components/BackButton';

const { width, height } = Dimensions.get('window');

const Stack = createStackNavigator();

const MypageStackNavigator = () => (
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
    <Stack.Screen name="MypageScreen" component={MypageScreen} />
    <Stack.Screen
      name="MyInfoScreen"
      component={MyInfoScreen}
      options={{ title: '내 정보' }}
    />
    <Stack.Screen
      name="ProfileScreen"
      component={ProfileScreen}
      options={{ title: '아이 프로필' }}
    />
    <Stack.Screen
      name="ProfileAddScreen"
      component={ProfileAddScreen}
      options={{ title: '아이 프로필' }}
    />
  </Stack.Navigator>
);

export default MypageStackNavigator;
