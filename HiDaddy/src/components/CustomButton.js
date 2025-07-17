import React from 'react';
import { Dimensions } from 'react-native';
import { useNavigation } from '@react-navigation/native';

import styled from 'styled-components';
import colors from '../constants/colors';
import { HmmBText } from './CustomText';

const { width, height } = Dimensions.get('window');

const CustomButton = ({
  onPress,
  title = '완료',
  backgroundColor = colors.black,
  textColor = colors.white,
  style,
}) => {

  const handlePress = () => {
    onPress && onPress();
  };
  return (
    <Wrapper>
      <Button onPress={handlePress} backgroundColor={backgroundColor} style={style}>
        <Text textColor={textColor}>{title}</Text>
      </Button>
    </Wrapper>
  );
};

export default CustomButton;

const Wrapper = styled.View`
  flex-direction: row;
  justify-content: center;
  align-items: center;
`;

const Button = styled.TouchableOpacity`
  background-color: ${props => props.backgroundColor};
  padding-vertical: 10px;
  padding-horizontal: 20px;
  border-radius: 10px;
  margin-top: ${height * 0.03}px;
  margin-right: ${width * 0.07}px;
`;

const Text = styled(HmmBText)`
  color: ${props => props.textColor};
  font-size: ${width * 0.034}px;
`;