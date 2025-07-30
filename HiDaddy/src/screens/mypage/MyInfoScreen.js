import React, { useState, useEffect } from 'react';
import { View, Dimensions, TouchableOpacity, Image } from 'react-native';
import styled from 'styled-components/native';
import { launchImageLibrary } from 'react-native-image-picker';

import colors from '../../constants/colors';
import { HmmText, HmmBText } from '../../components/CustomText';

import UserIcon from '../../assets/imgs/icons/myprofile.svg';
import EditIcon from '../../assets/imgs/icons/edit.svg';
import CoinIcon from '../../assets/imgs/icons/coin.svg';

const { width, height } = Dimensions.get('window');

const MyInfoScreen = ({ navigation }) => {
  const [profileImage, setProfileImage] = useState(null);
  const [userInfo, setUserInfo] = useState({
    nickname: '',
    email: '',
    wifePhone: '',
    hearts: 0,
  });

  // 나중에 API 연동하면...
  useEffect(() => {
    // 예시 데이터
    setUserInfo({
      nickname: '채문영',
      email: 'mcy325@naver.com',
      wifePhone: '010-0000-0000',
      hearts: 1000,
    });
  }, []);

  const handleChangeProfileImage = () => {
    launchImageLibrary({ mediaType: 'photo' }, response => {
      if (!response.didCancel && !response.errorCode) {
        const uri = response.assets[0].uri;
        setProfileImage(uri);
        // API로 업로드
      }
    });
  };

  return (
    <Container>
      <ProfileArea>
        <TouchableOpacity onPress={handleChangeProfileImage}>
          {profileImage ? (
            <ProfileImg source={{ uri: profileImage }} />
          ) : (
            <DefaultProfile>
              <UserIcon width={50} height={50} />
            </DefaultProfile>
          )}
        </TouchableOpacity>
      </ProfileArea>

      <InfoWrapper>
        <InfoItem>
          <Label>닉네임</Label>
          <Row>
            <Value>{userInfo.nickname}</Value>
            <TouchableOpacity>
              <EditIcon width={18} height={18} />
            </TouchableOpacity>
          </Row>
        </InfoItem>

        <InfoItem>
          <Label>이메일</Label>
          <Value>{userInfo.email}</Value>
        </InfoItem>

        <InfoItem>
          <Label>아내의 전화번호</Label>
          <Row>
            <Value>{userInfo.wifePhone}</Value>
            <TouchableOpacity>
              <EditIcon width={18} height={18} />
            </TouchableOpacity>
          </Row>
        </InfoItem>

        <InfoItem>
          <Label>보유한 하트</Label>
          <Row>
            <CoinIcon width={20} height={20} />
            <Value style={{ marginLeft: 6 }}>{userInfo.hearts}</Value>
          </Row>
        </InfoItem>
      </InfoWrapper>
    </Container>
  );
};

export default MyInfoScreen;

const Container = styled.View`
  flex: 1;
  background-color: ${colors.white};
  padding: ${height * 0.06}px ${width * 0.08}px;
`;

const ProfileArea = styled.View`
  align-items: center;
  margin-bottom: ${height * 0.04}px;
`;

const ProfileImg = styled.Image`
  width: 100px;
  height: 100px;
  border-radius: 100px;
`;

const DefaultProfile = styled.View`
  width: 100px;
  height: 100px;
  border-radius: 100px;
  background-color: ${colors.gray100};
  align-items: center;
  justify-content: center;
`;

const InfoWrapper = styled.View``;

const InfoItem = styled.View`
  border-bottom-width: 1px;
  border-bottom-color: ${colors.gray100};
  padding: ${height * 0.02}px 0px;
`;

const Label = styled(HmmText)`
  font-size: 12px;
  color: ${colors.gray};
  margin-bottom: 8px;
`;

const Value = styled(HmmBText)`
  font-size: 16px;
  color: ${colors.black};
  margin-right: 6px;
`;

const Row = styled.View`
  flex-direction: row;
  align-items: center;
`;
