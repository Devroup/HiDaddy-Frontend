import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Dimensions } from 'react-native';

import HomeScreen from '../screens/home/HomeScreen';
import DiaryScreen from '../screens/diary/DiaryScreen';
import BoardScreen from '../screens/board/BoardScreen';
import HeartScreen from '../screens/heart/HeartScreen';
import MypageScreen from '../screens/mypage/MypageScreen';

import HomeGray from '../assets/imgs/icons/home_gray.svg';
import DiaryGray from '../assets/imgs/icons/diary_gray.svg';
import BoardGray from '../assets/imgs/icons/board_gray.svg';
import HeartGray from '../assets/imgs/icons/heart_gray.svg';
import MypageGray from '../assets/imgs/icons/mypage_gray.svg';
import HomeBlack from '../assets/imgs/icons/home_black.svg';
import DiaryBlack from '../assets/imgs/icons/diary_black.svg';
import BoardBlack from '../assets/imgs/icons/board_black.svg';
import HeartBlack from '../assets/imgs/icons/heart_black.svg';
import MypageBlack from '../assets/imgs/icons/mypage_black.svg';

const { height } = Dimensions.get('window');
const Tab = createBottomTabNavigator();

const TabNavigator = () => {
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        headerShown: false,
        tabBarShowLabel: false,
        tabBarStyle: {
          height: height * 0.08,
          paddingTop: height * 0.01,
        },
        tabBarIcon: ({ focused, size }) => {
          let Icon = HomeGray;
          switch (route.name) {
            case 'Home':
              Icon = focused ? HomeBlack : HomeGray;
              break;
            case 'Diary':
              Icon = focused ? DiaryBlack : DiaryGray;
              break;
            case 'Board':
              Icon = focused ? BoardBlack : BoardGray;
              break;
            case 'Heart':
              Icon = focused ? HeartBlack : HeartGray;
              break;
            case 'Mypage':
              Icon = focused ? MypageBlack : MypageGray;
              break;
          }
          return <Icon width={size} height={size} />;
        },
      })}
    >
      <Tab.Screen name="Home" component={HomeScreen} />
      <Tab.Screen name="Diary" component={DiaryScreen} />
      <Tab.Screen name="Board" component={BoardScreen} />
      <Tab.Screen name="Heart" component={HeartScreen} />
      <Tab.Screen name="Mypage" component={MypageScreen} />
    </Tab.Navigator>
  );
};

export default TabNavigator;
