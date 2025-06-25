import React from 'react';
import styled from 'styled-components/native';
import { useNavigation } from '@react-navigation/native';
import { Dimensions } from 'react-native';

import colors from '../../constants/colors';
import Background from '../../components/Background';

import { HmmText, HmmBText } from '../../components/CustomText';
4;

import NaverLogo from '../../assets/imgs/icons/logo_naver';
import KakaoLogo from '../../assets/imgs/icons/logo_kakao';
import GoogleLogo from '../../assets/imgs/icons/logo_google';

const { width } = Dimensions.get('window');

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
            <IconWrapper>
              <NaverLogo width={16} height={16} />
            </IconWrapper>
            <NaverText>네이버로 시작하기</NaverText>
          </NaverButton>

          <KakaoButton onPress={handleLogin}>
            <IconWrapper>
              <KakaoLogo width={16} height={16} />
            </IconWrapper>
            <KakaoText>카카오로 시작하기</KakaoText>
          </KakaoButton>

          <GoogleButton onPress={handleLogin}>
            <IconWrapper>
              <GoogleLogo width={16} height={16} />
            </IconWrapper>
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
`;

const Title = styled(HmmBText)`
  font-size: ${width * 0.1};
  color: ${colors.black};
  margin-bottom: ${width * 0.14};
`;

const ButtonContainer = styled.View`
  width: 60%;
  gap: 20px;
`;

const ButtonBase = styled.TouchableOpacity`
  flex-direction: row;
  align-items: center;
  justify-content: center;
  height: 50px;
  border-radius: 10px;
  padding: 0 12px;
  gap: 14px;
`;

const IconWrapper = styled.View`
  width: 16px;
  height: 16px;
  justify-content: center;
  align-items: center;
`;

const NaverButton = styled(ButtonBase)`
  background-color: #03c75a;
`;

const NaverText = styled(HmmText)`
  color: white;
  font-size: ${width * 0.045};
`;

const KakaoButton = styled(ButtonBase)`
  background-color: #fee500;
`;

const KakaoText = styled(HmmText)`
  color: #000000;
  font-size: ${width * 0.045};
`;

const GoogleButton = styled(ButtonBase)`
  border: 1px solid #747775;
  background-color: white;
`;

const GoogleText = styled(HmmText)`
  color: #1f1f1f;
  font-size: ${width * 0.045};
`;
