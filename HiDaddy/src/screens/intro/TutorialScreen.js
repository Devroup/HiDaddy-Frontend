import React from 'react';
import styled from 'styled-components/native';
import { useNavigation } from '@react-navigation/native';

import colors from '../../constants/colors';
import Background from '../../components/Background';

const TutorialScreen = () => {
  const navigation = useNavigation();

  const goToHome = () => {
    navigation.replace('TabNavigator');
  };

  return (
    <Wrapper>
      <Background />

      <Content>
        <Title>Tutorial Screen</Title>

        <StartButton onPress={goToHome}>
          <StartText>시작하기</StartText>
        </StartButton>
      </Content>
    </Wrapper>
  );
};

export default TutorialScreen;

const Wrapper = styled.View`
  flex: 1;
`;

const Content = styled.View`
  flex: 1;
  justify-content: center;
  align-items: center;
  padding: 0 24px;
`;

const Title = styled.Text`
  font-size: 24px;
  font-weight: bold;
  color: ${colors.black};
  margin-bottom: 40px;
`;

const StartButton = styled.TouchableOpacity`
  width: 80%;
  height: 48px;
  border-radius: 8px;
  background-color: ${colors.white};
  justify-content: center;
  align-items: center;
`;

const StartText = styled.Text`
  color: ${colors.black};
  font-size: 16px;
  font-weight: bold;
`;
