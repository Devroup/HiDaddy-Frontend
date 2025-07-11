import React from 'react';
import { TouchableOpacity, Dimensions, Text ,StyleSheet } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { HmmBText } from './CustomText';

const { width, height } = Dimensions.get('window');

const ConfirmButton = ({ onPress }) => {
    const navigation = useNavigation();

    const handlePress = () => {
        onPress ? onPress() : navigation.goBack();
    };
    return(
        <TouchableOpacity
              onPress={handlePress}
              style={[styles.button,{
                marginRight: width * 0.05,
                paddingLeft: width * 0.06,
                marginTop: height * 0.03,
              }]}
            >
            <Text style={styles.buttonText}>완료</Text>
        </TouchableOpacity>
    );
};

export default ConfirmButton;

const styles = StyleSheet.create({
    button: {
        backgroundColor:"#302525",
        paddingVertical: 10,
        paddingHorizontal: 20,
        borderRadius: 10,
    },
    buttonText: {
        color: "#fff",
        fontSize: 10,
        fontWeight: '500',
        textAlign: 'center',
    },
})