import React from "react";
import { Dimensions } from "react-native";
import { createStackNavigator } from "@react-navigation/stack";

import BackButton from '../components/BackButton';
import BoardWriteScreen from "../screens/board/BoardWriteScreen";
import BoardDetailScreen from "../screens/board/BoardDetailScreen";

import colors from "../constants/colors";

const { width, height } = Dimensions.get('window');

const Stack = createStackNavigator();

const CommunityStackNavigator = () => (
    <Stack.Navigator
        screenOptions={{
            headerShown: true,
            headerStyle: {
                elevation: 0,
            },
            headerTitleStyle:{
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
      name="BoardWriteScreen"
      component={BoardWriteScreen}
      options={{title: false }}
    />
    <Stack.Screen
      name="BoardDetailScreen"
      component={BoardDetailScreen}
      options={{ title: false }}
    />
  </Stack.Navigator>
);

export default CommunityStackNavigator;