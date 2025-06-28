import React from 'react';
import { TouchableOpacity, Dimensions } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import BackIcon from '../assets/imgs/icons/back.svg';

const { width, height } = Dimensions.get('window');

const BackButton = ({ onPress }) => {
  const navigation = useNavigation();
  const iconSize = width * 0.05;

  const handlePress = () => {
    onPress ? onPress() : navigation.goBack();
  };

  return (
    <TouchableOpacity
      onPress={handlePress}
      style={{
        paddingLeft: width * 0.06,
        marginTop: height * 0.03,
      }}
    >
      <BackIcon width={iconSize} height={iconSize} />
    </TouchableOpacity>
  );
};

export default BackButton;
