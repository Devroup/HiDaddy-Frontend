import React, { useState, useEffect } from 'react';
import styled from 'styled-components/native';
import { useNavigation } from '@react-navigation/native';
import { Dimensions, Linking } from 'react-native';
import * as Keychain from 'react-native-keychain';
import {
  KAKAO_CLIENT_ID,
  KAKAO_REDIRECT_URI,
  NAVER_CLIENT_ID,
  NAVER_REDIRECT_URI,
  GOOGLE_CLIENT_ID,
  GOOGLE_REDIRECT_URI,
} from '@env';

import colors from '../../constants/colors';
import Background from '../../components/Background';
import { post } from '../../services/api';
import config from '../../constants/config';

import { HmmText, HmmBText } from '../../components/CustomText';

import NaverLogo from '../../assets/imgs/icons/logo_naver';
import KakaoLogo from '../../assets/imgs/icons/logo_kakao';
import GoogleLogo from '../../assets/imgs/icons/logo_google';

const { width } = Dimensions.get('window');
const iconSize = Math.round(width * 0.045);

const LoginScreen = () => {
  const navigation = useNavigation();
  const [selectedProvider, setSelectedProvider] = useState(null);

  const handleLogin = () => {
    navigation.navigate('TutorialScreen');
  };

  const getCodeFromUrl = url => {
    const match = url.match(/[?&]code=([^&]+)/);
    return match ? decodeURIComponent(match[1]) : null;
  };

  // 딥링크 수신 처리
  useEffect(() => {
    const handleDeepLink = async ({ url }) => {
      console.log('딥링크 수신됨:', url);

      try {
        const code = getCodeFromUrl(url);
        if (!code || !selectedProvider) {
          console.log('code 또는 provider 없음');
          return;
        }

        console.log('받은 code:', code, 'provider:', selectedProvider);

        const payload = {
          code,
          provider: selectedProvider,
        };

        const response = await post(config.AUTH.TOKENS, payload);
        const { accessToken, refreshToken, signed } = response;
        console.log('Access Token:', accessToken);

        await Keychain.setGenericPassword(
          'token',
          JSON.stringify({ accessToken, refreshToken }),
        );

        if (signed === true) {
          navigation.reset({ index: 0, routes: [{ name: 'TabNavigator' }] });
        } else if (signed === false) {
          navigation.reset({ index: 0, routes: [{ name: 'TutorialScreen' }] });
        } else {
          console.warn('signed 값 이상함:', signed);
        }
      } catch (err) {
        console.error('딥링크 처리 중 에러:', err);
      }
    };

    Linking.getInitialURL().then(url => {
      if (url) handleDeepLink({ url });
    });

    const subscription = Linking.addEventListener('url', handleDeepLink);
    return () => subscription.remove();
  }, [selectedProvider]);

  const openOAuthLogin = async provider => {
    setSelectedProvider(provider);
    let loginUrl = '';

    if (provider === 'kakao') {
      loginUrl =
        `https://kauth.kakao.com/oauth/authorize?client_id=${KAKAO_CLIENT_ID}` +
        `&redirect_uri=${KAKAO_REDIRECT_URI}` +
        '&response_type=code&scope=account_email%20openid';
    } else if (provider === 'naver') {
      loginUrl =
        `https://nid.naver.com/oauth2/authorize?response_type=code` +
        `&client_id=${NAVER_CLIENT_ID}` +
        `&redirect_uri=${NAVER_REDIRECT_URI}` +
        '&state=random&scope=openid%20profile';
    } else if (provider === 'google') {
      loginUrl =
        `https://accounts.google.com/o/oauth2/v2/auth?client_id=${GOOGLE_CLIENT_ID}` +
        `&response_type=code&redirect_uri=${GOOGLE_REDIRECT_URI}` +
        '&scope=email%20profile';
    }

    await Linking.openURL(loginUrl);
  };
  return (
    <Wrapper>
      <Background />
      <Content>
        <Title>하이대디</Title>

        <ButtonContainer>
          <NaverButton onPress={() => openOAuthLogin('naver')}>
            <IconWrapper>
              <NaverLogo width={iconSize} height={iconSize} />
            </IconWrapper>
            <NaverText>네이버로 시작하기</NaverText>
          </NaverButton>

          <KakaoButton onPress={() => openOAuthLogin('kakao')}>
            <IconWrapper>
              <KakaoLogo width={iconSize} height={iconSize} />
            </IconWrapper>
            <KakaoText>카카오로 시작하기</KakaoText>
          </KakaoButton>

          <GoogleButton onPress={handleLogin}>
            <IconWrapper>
              <GoogleLogo width={iconSize} height={iconSize} />
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
  font-size: ${width * 0.1}px;
  color: ${colors.black};
  margin-bottom: ${width * 0.14}px;
`;

const ButtonContainer = styled.View`
  width: 60%;
  gap: 20px;
`;

const ButtonBase = styled.TouchableOpacity`
  flex-direction: row;
  align-items: center;
  justify-content: center;
  height: ${width * 0.14}px;
  border-radius: 10px;
  gap: 14px;
`;

const IconWrapper = styled.View`
  width: ${iconSize}px;
  height: ${iconSize}px;
  justify-content: center;
  align-items: center;
`;

const NaverButton = styled(ButtonBase)`
  background-color: #03c75a;
`;

const NaverText = styled(HmmText)`
  color: white;
  font-size: ${width * 0.045}px;
`;

const KakaoButton = styled(ButtonBase)`
  background-color: #fee500;
`;

const KakaoText = styled(HmmText)`
  color: #000000;
  font-size: ${width * 0.045}px;
`;

const GoogleButton = styled(ButtonBase)`
  border: 1px solid #747775;
  background-color: white;
`;

const GoogleText = styled(HmmText)`
  color: #1f1f1f;
  font-size: ${width * 0.045}px;
`;
