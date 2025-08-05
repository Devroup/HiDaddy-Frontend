import React, { useState, useEffect } from 'react';
import { Dimensions, TouchableOpacity, Alert } from 'react-native';
import styled from 'styled-components/native';
import { launchImageLibrary } from 'react-native-image-picker';

import colors from '../../constants/colors';
import { HmmText, HmmBText } from '../../components/CustomText';
import config from '../../constants/config';
import { get, patch } from '../../services/api';

import UserIcon from '../../assets/imgs/icons/myprofile.svg';
import EditIcon from '../../assets/imgs/icons/edit.svg';
import CoinIcon from '../../assets/imgs/icons/coin.svg';

const { width, height } = Dimensions.get('window');

const MyInfoScreen = ({ navigation }) => {
  const [profileImage, setProfileImage] = useState(null);
  const [userInfo, setUserInfo] = useState({
    userName: '',
    phone: '',
    partnerPhone: '',
    profileImage: '',
    email: '',
    hearts: 1000,
  });

  const handleChange = (key, value) => {
    setUserInfo(prev => ({
      ...prev,
      [key]: value,
    }));
  };

  const handleChangeProfileImage = () => {
    launchImageLibrary({ mediaType: 'photo' }, async response => {
      if (!response.didCancel && !response.errorCode) {
        const image = response.assets[0];
        setProfileImage(image.uri);

        const formData = new FormData();
        formData.append('image', {
          uri: image.uri,
          type: image.type,
          name: image.fileName,
        });

        try {
          const res = await patch(config.USER.PROFILE_IMG, formData, {
            headers: {
              'Content-Type': 'multipart/form-data',
            },
          });

          setUserInfo(prev => ({
            ...prev,
            profileImage: image.uri,
          }));

          Alert.alert('성공', '프로필 이미지가 변경되었습니다.');
        } catch (err) {
          Alert.alert('실패', '이미지 업로드에 실패했습니다.');
        }
      }
    });
  };

  const handleEditUserName = async () => {
    try {
      const res = await patch(config.USER.NAME, {
        userName: userInfo.userName,
      });
      Alert.alert('성공', '닉네임이 변경되었습니다.');
    } catch (err) {
      Alert.alert('실패', '닉네임 변경에 실패했습니다.');
    }
  };

  const handleEditPhone = async () => {
    try {
      const res = await patch(config.USER.PHONE, {
        phone: userInfo.phone,
        partnerPhone: userInfo.partnerPhone,
      });
      Alert.alert('성공', '전화번호가 등록되었습니다.');
    } catch (err) {
      Alert.alert('실패', '전화번호 등록에 실패했습니다.');
    }
  };

  useEffect(() => {
    const fetchUserInfo = async () => {
      try {
        const res = await get(config.USER.ME);
        setUserInfo({
          userName: res.userName ?? '',
          phone: res.phone ?? '',
          partnerPhone: res.partnerPhone ?? '',
          profileImage: res.profileImageUrl ?? '',
          email: res.email ?? '',
        });
        console.log('ddd', res);
      } catch (err) {
        console.error('유저 정보 조회 실패:', err);
      }
    };

    fetchUserInfo();
  }, []);

  return (
    <Container>
      <ProfileArea>
        <TouchableOpacity onPress={handleChangeProfileImage}>
          {userInfo.profileImage ? (
            <ProfileImg source={{ uri: userInfo.profileImage }} />
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
            <Input
              value={userInfo.userName}
              onChangeText={text => handleChange('userName', text)}
              placeholder="닉네임 입력"
              placeholderTextColor={colors.gray}
            />
            <TouchableOpacity onPress={handleEditUserName}>
              <EditIcon width={18} height={18} />
            </TouchableOpacity>
          </Row>
        </InfoItem>

        <InfoItem>
          <Label>이메일</Label>
          <Value>{userInfo.email}</Value>
        </InfoItem>

        <InfoItem>
          <Label>내 전화번호</Label>
          <Row>
            <Input
              value={userInfo.phone}
              onChangeText={text => handleChange('phone', text)}
              placeholder="내 전화번호를 아직 등록하지 않았습니다."
              placeholderTextColor={colors.gray}
              keyboardType="phone-pad"
            />
            <TouchableOpacity onPress={handleEditPhone}>
              <EditIcon width={18} height={18} />
            </TouchableOpacity>
          </Row>
        </InfoItem>

        <InfoItem>
          <Label>아내의 전화번호</Label>
          <Row>
            <Input
              value={userInfo.partnerPhone}
              onChangeText={text => handleChange('partnerPhone', text)}
              placeholder="아내의 전화번호를 아직 등록하지 않았습니다."
              placeholderTextColor={colors.gray}
              keyboardType="phone-pad"
            />
            <TouchableOpacity onPress={handleEditPhone}>
              <EditIcon width={18} height={18} />
            </TouchableOpacity>
          </Row>
        </InfoItem>

        <InfoItem>
          <Label>보유한 하트</Label>
          <Row>
            <CoinIcon width={20} height={20} />
            <Value style={{ marginLeft: 6 }}>1000</Value>
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

const Input = styled.TextInput`
  flex: 1;
  font-size: 16px;
  color: ${colors.black};
  font-family: 'HancomMalangMalang-Regular';
  padding: 0;
  margin-right: 6px;
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
