import React from "react";
import { Dimensions } from "react-native";
import { createStackNavigator } from "@react-navigation/stack";

import BackButton from "../components/BackButton";
import DiaryWriteScreen from "../screens/diary/DiaryWriteScreen";

import colors from "../constants/colors";
import CustomButton from "../components/CustomButton";

const { width, height } = Dimensions.get('window');

const Stack = createStackNavigator();

const DiaryStackNavigator = () => (
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
        name="DiaryWriteScreen"
        component={DiaryWriteScreen}
        options={{title: false, headerRight: () => <CustomButton/>}}
    />
    </Stack.Navigator>
);

export default DiaryStackNavigator;