import React, { useEffect, useState, useLayoutEffect } from 'react';
import styled from 'styled-components/native';
import { Dimensions, Image } from 'react-native';
import { launchCamera } from 'react-native-image-picker';

import colors from '../../../constants/colors';
import Background from '../../../components/Background';

import HeartYellow from '../../../assets/imgs/icons/heart_yellow.svg';
import Info from '../../../assets/imgs/icons/info.svg';
import Camera from '../../../assets/imgs/icons/camera.svg';
import HeartCheck from '../../../assets/imgs/icons/heart_check.svg';
import { HmmText, HmmBText } from '../../../components/CustomText';
import { useNavigation } from '@react-navigation/native';

import { post } from '../../../services/api';
import config from '../../../constants/config';

const { width, height } = Dimensions.get('window');

const MissionPerformScreen = () => {
  const navigation = useNavigation();

  const [missionTitle, setMissionTitle] = useState('');
  const [missionDescription, setMissionDescription] = useState('');
  const [keywords, setKeywords] = useState([]);
  const [loading, setLoading] = useState(true);
  const [photoUri, setPhotoUri] = useState(null);
  const [judging, setJudging] = useState(false);

  const openCamera = async () => {
    const options = {
      mediaType: 'photo',
      saveToPhotos: true,
    };

    try {
      const result = await launchCamera(options);
      if (result.didCancel) {
        console.log('사용자가 촬영을 취소했습니다.');
      } else if (result.errorCode) {
        console.error('카메라 오류:', result.errorMessage);
      } else if (result.assets && result.assets.length > 0) {
        setPhotoUri(result.assets[0].uri);
      }
    } catch (error) {
      console.error('카메라 실행 실패:', error);
    }
  };

  const fetchMission = async () => {
    try {
      const res = await post(config.MISSION.GET_MISSION_KEYWORD, {});
      setMissionTitle(res.title || '');
      setMissionDescription(res.description || '');
      setKeywords(res.keywords || []);
    } catch (error) {
      setKeywords([]);
      setMissionTitle('');
      setMissionDescription('');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchMission();
  }, []);

  const handleAiButtonPress = () => {
    setJudging(true);
    setTimeout(() => setJudging(false), 3000);
  };

  return (
    <Wrapper>
      <Background />
      <Content>
        <MissionPerformMain>
          <MisssionPerformTitle>
            <Left>
              <HeartYellow width={24} height={24} />
              <SectionTitle>{missionTitle || '불러오는 중...'}</SectionTitle>
            </Left>
            <Touchablecolumn
              onPress={() =>
                navigation.navigate('MissionInfoScreen')
              }
            >
              <Info width={24} height={24} />
            </Touchablecolumn>
          </MisssionPerformTitle>
          <MissionPerform>
            <PerformText>{missionDescription || '불러오는 중...'}</PerformText>
          </MissionPerform>
        </MissionPerformMain>

        <MissionPerformPhoto onPress={openCamera} style={{ marginTop: photoUri ? 10 : 50 }}>
          {photoUri ? (
            <PreviewImage source={{ uri: photoUri }} />
          ) : (
            <>
              <Camera width={100} height={100} />
              <CameraText>촬영하기</CameraText>
            </>
          )}
        </MissionPerformPhoto>

        <MissionPerformKeyword>
          <KeywordTitle>
            <TitleText>사진 촬영 키워드</TitleText>
          </KeywordTitle>
          <KeywordInfo>
            <InfoText>*다음 키워드들을 모두 포함하는 사진을 촬영해 주세요.</InfoText>
          </KeywordInfo>
          {loading ? (
            <InfoText>불러오는 중...</InfoText>
          ) : (
            <KeywordList>
              {keywords.map((word, idx) => (
                <KeywordListColumn key={idx}>
                  <KeywordText>{word}</KeywordText>
                </KeywordListColumn>
              ))}
            </KeywordList>
          )}
        </MissionPerformKeyword>

        <MissionPerformMemo>
          <MissionPerformMemoTitle>
            <TitleText>어떤 마음으로 전했나요?</TitleText>
          </MissionPerformMemoTitle>
          <MissionPerformMemoInfo>
            <InfoInput
              placeholder="사진으로 다 못 전한 마음이 있다면, 여기에 적어주세요"
              placeholderTextColor="#999"
              multiline={true}
              textAlignVertical="top"
            />
          </MissionPerformMemoInfo>
        </MissionPerformMemo>


      </Content>

        <AiButton onPress={handleAiButtonPress}>
          <AiCircle>
            <HeartCheck width={32} height={32} />
          </AiCircle>
        </AiButton>

      {judging && (
        <Overlay>
          <OverlayText>전한 마음이 잘 담겼는지 확인 중이에요...</OverlayText>
        </Overlay>
      )}
    </Wrapper>
  );
};

export default MissionPerformScreen;

const Wrapper = styled.View`
  flex: 1;
`;

const Content = styled.View`
  padding: ${width * 0.07}px;
`;

const MissionPerformMain = styled.View`
  flex-direction: column;
`;

const Left = styled.View`
  flex-direction: row;
  align-items: center;
  gap: ${width * 0.02}px;
`;

const MisssionPerformTitle = styled.View`
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
`;

const SectionTitle = styled(HmmBText)`
  font-size: ${width * 0.05}px;
  color: ${colors.black};
  margin-bottom: 10px;
`;

const Touchablecolumn = styled.TouchableOpacity``;

const MissionPerform = styled.View``;

const PerformText = styled(HmmText)`
  font-size: ${width * 0.038}px;
  color: ${colors.black};
  margin-bottom: 10px;
`;

const MissionPerformPhoto = styled.TouchableOpacity`
  align-items: center;
`;

const PreviewImage = styled(Image)`
  width: ${width * 0.7}px;
  height: ${width * 0.7}px;
  border-radius: 10px;
`;

const CameraText = styled(HmmText)`
  font-size: ${width * 0.038}px;
  color: ${colors.gray100};
`;

const MissionPerformKeyword = styled.View``;

const KeywordTitle = styled.View`
  margin-top: 30px;
`;

const TitleText = styled(HmmBText)`
  font-size: ${width * 0.04}px;
`;

const KeywordInfo = styled.View`
  margin-top: 10px;
`;

const InfoText = styled(HmmText)`
  font-size: ${width * 0.034}px;
`;

const KeywordList = styled.View`
  justify-content: space-between;
  flex-direction: row;
  align-items: center;
  margin-top: 10px;
`;

const KeywordListColumn = styled.View``;

const KeywordText = styled(HmmText)``;

const MissionPerformMemo = styled.View`
  margin-top: 20px;
`;

const MissionPerformMemoTitle = styled.View``;

const MissionPerformMemoInfo = styled.View``;

const InfoInput = styled.TextInput``;

const AiButton = styled.TouchableOpacity`
  position: absolute;
  bottom: ${width * 0.12}px;
  right: ${width * 0.06}px;
  z-index: 10;
`;

const AiCircle = styled.View`
  background-color: ${colors.white};
  width: ${width * 0.14}px;
  height: ${width * 0.14}px;
  border-radius: 100px;
  border: 2px solid ${colors.black};
  justify-content: center;
  align-items: center;
  elevation: 4;
`;

const Overlay = styled.View`
  position: absolute; 
  top: 0; 
  left: 0; 
  width: ${width}px; 
  height: ${height}px; 
  background-color: rgba(0,0,0,0.5); 
  justify-content: center; 
  align-items: center;
`;

const OverlayText = styled(HmmBText)`
  color: ${colors.white}; 
  font-size: ${width * 0.05}px; 
  text-align: center;
`;