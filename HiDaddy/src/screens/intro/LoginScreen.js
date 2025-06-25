import React from 'react';
import styled from 'styled-components/native';
import { useNavigation } from '@react-navigation/native';

import colors from '../../constants/colors';
import Background from '../../components/Background';

const LoginScreen = () => {
  const navigation = useNavigation();

  const handleLogin = () => {
    navigation.navigate('TutorialScreen');
  };

  return (
    <Wrapper>
      <Background />
      <Content>
        <Title>하이대디</Title>

        <ButtonContainer>
          <NaverButton onPress={handleLogin}>
            <NaverText>네이버로 시작하기</NaverText>
          </NaverButton>

          <KakaoButton onPress={handleLogin}>
            <KakaoText>카카오로 시작하기</KakaoText>
          </KakaoButton>

          <GoogleButton onPress={handleLogin}>
            <GoogleText>구글로 시작하기</GoogleText>
          </GoogleButton>
        </ButtonContainer>
      </Content>
    </Wrapper>
  );
};

export default LoginScreen;

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
  font-size: 28px;
  font-weight: bold;
  color: ${colors.black};
  margin-bottom: 40px;
`;

const ButtonContainer = styled.View`
  width: 80%;
  gap: 12px;
`;

const ButtonBase = styled.TouchableOpacity`
  height: 48px;
  border-radius: 8px;
  justify-content: center;
  align-items: center;
`;

const NaverButton = styled(ButtonBase)`
  background-color: #03c75a;
`;

const NaverText = styled.Text`
  color: white;
  font-weight: bold;
`;

const KakaoButton = styled(ButtonBase)`
  background-color: #fee500;
`;

const KakaoText = styled.Text`
  color: #000000;
  font-weight: bold;
`;

const GoogleButton = styled(ButtonBase)`
  border: 1px solid #ffffff;
  background-color: white;
`;

const GoogleText = styled.Text`
  color: #1f1f1f;
  font-weight: bold;
`;
