import React, { useState, useEffect } from 'react';
import { Dimensions, TouchableOpacity, Image } from 'react-native';
import styled from 'styled-components/native';
import { launchImageLibrary } from 'react-native-image-picker';

import Background from '../../components/Background';
import colors from '../../constants/colors';
import { HmmText, HmmBText } from '../../components/CustomText';
import CustomModal from '../../components/CustomModal';
import NicknameModal from './NicknameModal';

import UserIcon from '../../assets/imgs/icons/myprofile.svg';
import EditIcon from '../../assets/imgs/icons/edit.svg';
import CoinIcon from '../../assets/imgs/icons/coin.svg';

const { width, height } = Dimensions.get('window');

const MypageScreen = ({ navigation: { navigate } }) => {
  const [withdrawalVisible, setWithdrawalVisible] = useState(false);
  const [logoutVisible, setLogoutVisible] = useState(false);
  const [profileImage, setProfileImage] = useState(null);
  const [nicknameVisible, setNicknameVisible] = useState(false);
  const [nickname, setNickname] = useState('');

  const handleChangeProfileImage = () => {
    launchImageLibrary({ mediaType: 'photo' }, response => {
      if (!response.didCancel && !response.errorCode) {
        const uri = response.assets[0].uri;
        setProfileImage(uri);
        //프로필 이미지 업로드 api 연결
      }
    });
  };

  return (
    <Wrapper>
      <Background />
      <Content>
        <ProfileContainer>
          <ProfileImageContainer>
            <TouchableOpacity onPress={handleChangeProfileImage}>
              {profileImage ? (
                <Image
                  source={{ uri: profileImage }}
                  style={{
                    width: width * 0.25,
                    height: width * 0.25,
                    borderRadius: 50,
                  }}
                />
              ) : (
                <UserIcon width={width * 0.12} height={width * 0.12} />
              )}
            </TouchableOpacity>
          </ProfileImageContainer>
          <ProfileInfoContainer>
            <NameRow>
              <UserName>닉네임</UserName>
              <EditIcon
                width={20}
                height={20}
                style={{ marginLeft: 4 }}
                onPress={() => setNicknameVisible(true)}
              />
            </NameRow>
            <UserEmail>mcy325@naver.com</UserEmail>
            <HeartRow>
              <CoinIcon width={20} height={20} style={{ marginRight: 4 }} />
              <UserHeart>1000 하트</UserHeart>
            </HeartRow>
          </ProfileInfoContainer>
        </ProfileContainer>
        <MenuContainer>
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

      <NicknameModal
        visible={nicknameVisible}
        currentNickname={nickname}
        onSave={newName => {
          setNickname(newName);
          setNicknameVisible(false);
          // 닉네임 변경 API 호출
        }}
        onCancel={() => setNicknameVisible(false)}
      />
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
        onConfirm={() => {
          // 탈퇴 로직 추가
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
        onConfirm={() => {
          // 로그아웃 로직 추가
          console.log('로그아웃 진행');
          setLogoutVisible(false);
          // 로그인 화면으로 이동하도록
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

const Content = styled.View`
  flex: 1;
  padding: ${height * 0.06}px ${width * 0.08}px;
`;

const ProfileContainer = styled.View`
  flex-direction: row;
  align-items: center;
  padding: ${height * 0.02}px 0;
`;

const ProfileImageContainer = styled.View`
  width: ${width * 0.25}px;
  height: ${width * 0.25}px;
  border-radius: 50px;
  justify-content: center;
  align-items: center;
  background-color: ${colors.gray100};
  margin-right: ${width * 0.05}px;
`;

const ProfileInfoContainer = styled.View`
  flex-direction: column;
`;

const NameRow = styled.View`
  flex-direction: row;
  align-items: center;
  margin-bottom: ${height * 0.01}px;
`;

const UserName = styled(HmmBText)`
  font-size: ${width * 0.05}px;
  color: ${colors.black};
`;

const UserEmail = styled(HmmBText)`
  font-size: ${width * 0.04}px;
  color: ${colors.black};
  margin-bottom: ${height * 0.01}px;
`;

const HeartRow = styled.View`
  flex-direction: row;
  align-items: center;
  margin-top: 6px;
`;

const UserHeart = styled(HmmBText)`
  font-size: ${width * 0.04}px;
  color: ${colors.black};
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
