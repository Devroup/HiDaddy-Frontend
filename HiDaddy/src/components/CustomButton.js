import React from 'react';
import { TouchableOpacity, Dimensions } from 'react-native';
import { useNavigation } from '@react-navigation/native';

import styled from 'styled-components';

import { HmmBText } from './CustomText';

const { width, height } = Dimensions.get('window');

const CustomButton = ({ onPress,
  title = '완료',
  backgroundColor = '#302525',
  textColor = '#fff',
}) => {    
    const navigation = useNavigation();

    const handlePress = () => {
        onPress ? onPress() : navigation.goBack();
    };
    return(
        <Wrapper>
            <Button onPress={handlePress} backgroundColor={backgroundColor}>
                <Text textColor={textColor}>{title}</Text>
            </Button>
        </Wrapper>
    );
};

export default CustomButton;

const Wrapper = styled.View`
`;

const Button = styled.TouchableOpacity`
  background-color: ${props => props.backgroundColor};
  padding-vertical: 10px;
  padding-horizontal: 20px;
  border-radius: 10px;
  margin-right: ${width * 0.05}px;
  padding-left: ${width * 0.06}px;
  margin-top: ${height * 0.03}px;
`;

const Text = styled.Text`
  color: ${props => props.textColor};
  font-size: 10px;
  font-weight: 500;
  text-align: center;
`;