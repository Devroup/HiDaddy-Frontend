import React, { useState, useEffect } from 'react';
import { Dimensions, Alert } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import styled from 'styled-components/native';
import * as Keychain from 'react-native-keychain';

import Background from '../../components/Background';
import colors from '../../constants/colors';
import { HmmText, HmmBText } from '../../components/CustomText';
import CustomModal from '../../components/CustomModal';
import config from '../../constants/config';
import { post, del } from '../../services/api';

const { width, height } = Dimensions.get('window');

const MypageScreen = ({ navigation: { navigate } }) => {
  const navigation = useNavigation();

  const [withdrawalVisible, setWithdrawalVisible] = useState(false);
  const [logoutVisible, setLogoutVisible] = useState(false);

  const handleWithdraw = async () => {
    try {
      const res = await del(config.AUTH.DELETE);

      console.log('탈퇴 응답:', res);

      if (res.status === 200) {
        await Keychain.resetGenericPassword();
        Alert.alert('탈퇴 완료', '계정이 삭제되었습니다.');
        navigation.reset({
          index: 0,
          routes: [
            {
              name: 'IntroStackNavigator',
              params: { screen: 'LoginScreen' },
            },
          ],
        });
      } else {
        console.log('탈퇴 응답:', res);
        Alert.alert('탈퇴 실패', res?.message || '오류가 발생했습니다.');
      }
    } catch (error) {
      console.error('탈퇴 에러:', error);
      Alert.alert('에러', '네트워크 오류 또는 서버 문제입니다.');
    }
  };

  const handleLogout = async () => {
    try {
      const credentials = await Keychain.getGenericPassword();

      if (!credentials) {
        Alert.alert('오류', '로그인 정보가 없습니다.');
        return;
      }

      const { refreshToken } = JSON.parse(credentials.password);

      const payload = { refreshToken };
      const res = await post(config.AUTH.LOGOUT, payload);

      console.log('로그아웃 응답:', res);

      if (res.status === 200) {
        await Keychain.resetGenericPassword();
        Alert.alert('로그아웃 완료', '성공적으로 로그아웃되었습니다.');
        navigation.reset({
          index: 0,
          routes: [
            {
              name: 'IntroStackNavigator',
              params: { screen: 'LoginScreen' },
            },
          ],
        });
      } else {
        console.log('로그아웃 응답:', res);
        Alert.alert('로그아웃 실패', res?.message || '오류가 발생했습니다.');
      }
    } catch (error) {
      console.error('로그아웃 에러:', error);
      Alert.alert('에러', '네트워크 오류 또는 서버 문제입니다.');
    }
  };

  return (
    <Wrapper>
      <Background />
      <Content>
        <HeaderContainer>
          <HeaderTitle>하트 교환소</HeaderTitle>
        </HeaderContainer>
        <MenuContainer>
          <MenuItem
            onPress={() =>
              navigate('MypageStackNavigator', { screen: 'MyInfoScreen' })
            }
          >
            <MenuText>내 정보</MenuText>
          </MenuItem>
          <MenuItem
            onPress={() =>
              navigate('MypageStackNavigator', { screen: 'ProfileScreen' })
            }
          >
            <MenuText>아이 프로필</MenuText>
          </MenuItem>
          <MenuItem onPress={() => setWithdrawalVisible(true)}>
            <MenuText>회원탈퇴</MenuText>
          </MenuItem>

          <MenuItem onPress={() => setLogoutVisible(true)}>
            <MenuText>로그아웃</MenuText>
          </MenuItem>
        </MenuContainer>

        <Divider />

        <MenuContainer>
          <AppInfoRow>
            <AppInfoText>앱 버전</AppInfoText>
            <AppInfoValue>2.4.1</AppInfoValue>
          </AppInfoRow>
          <MenuItem>
            <MenuText>서비스 이용약관</MenuText>
          </MenuItem>
          <MenuItem>
            <MenuText>개인정보 처리방침</MenuText>
          </MenuItem>
        </MenuContainer>
      </Content>

      <CustomModal
        visible={withdrawalVisible}
        title="정말 탈퇴하시겠습니까?"
        content={
          <>
            탈퇴 버튼 선택 시 계정은 삭제되며{'\n'}
            복구되지 않습니다.
          </>
        }
        confirmText="탈퇴"
        cancelText="취소"
        confirmButtonColor={colors.red}
        cancelButtonColor={colors.white}
        cancelTextColor={colors.black}
        onConfirm={async () => {
          await handleWithdraw();
          console.log('탈퇴 진행');
          setWithdrawalVisible(false);
        }}
        onCancel={() => setWithdrawalVisible(false)}
      />
      <CustomModal
        visible={logoutVisible}
        title="정말 로그아웃 하시겠습니까?"
        content="로그아웃 시 메인 화면으로 이동됩니다."
        confirmText="로그아웃"
        cancelText="취소"
        confirmButtonColor={colors.black}
        cancelButtonColor={colors.white}
        cancelTextColor={colors.black}
        onConfirm={async () => {
          await handleLogout();
          console.log('로그아웃 진행');
          setLogoutVisible(false);
        }}
        onCancel={() => setLogoutVisible(false)}
      />
    </Wrapper>
  );
};
export default MypageScreen;

const Wrapper = styled.View`
  flex: 1;
`;

const HeaderContainer = styled.View`
  padding-top: ${width * 0.02}px;
  padding-bottom: ${width * 0.06}px;
  justify-content: flex-end;
  align-items: center;
`;

const HeaderTitle = styled(HmmBText)`
  font-size: ${width * 0.05}px;
  color: ${colors.black};
`;

const Content = styled.View`
  flex: 1;
  padding: ${height * 0.06}px ${width * 0.08}px;
`;

const MenuContainer = styled.View``;

const MenuItem = styled.TouchableOpacity`
  padding: ${height * 0.02}px 0;
`;

const MenuText = styled(HmmText)`
  font-size: ${width * 0.04}px;
`;

const Divider = styled.View`
  height: 1px;
  background-color: ${colors.gray100};
  margin: ${height * 0.015}px 0;
`;

const AppInfoRow = styled.View`
  flex-direction: row;
  justify-content: space-between;
  padding: ${height * 0.02}px 0;
`;

const AppInfoText = styled(HmmText)`
  font-size: ${width * 0.04}px;
`;

const AppInfoValue = styled(HmmText)`
  font-size: ${width * 0.04}px;
`;
