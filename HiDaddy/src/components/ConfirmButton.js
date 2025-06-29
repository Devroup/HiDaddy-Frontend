import React from 'react';
import { TouchableOpacity, Dimensions } from 'react-native';
import { useNavigation } from '@react-navigation/native';

const { width, height } = Dimensions.get('window');

const ConfirmButton = ({ onPress }) => {
    const navigation = useNavigation();

    const handlePress = () => {
        onPress ? onPress() : navigation.go();
    };
    return(
        <TouchableOpacity
              onPress={handlePress}
              style={{
                paddingLeft: width * 0.06,
                marginTop: height * 0.03,
              }}
            >
        </TouchableOpacity>
    );
};

export default ConfirmButton;