import React, { useEffect, useState, useLayoutEffect } from 'react';
import { View, Dimensions, Image, Alert, ScrollView, KeyboardAvoidingView, Platform } from 'react-native';
import styled from 'styled-components/native';
import { launchCamera, launchImageLibrary } from 'react-native-image-picker';
import { useNavigation } from '@react-navigation/native';

import colors from '../../../constants/colors';
import Background from '../../../components/Background';
import HeartYellow from '../../../assets/imgs/icons/heart_yellow.svg';
import Info from '../../../assets/imgs/icons/info.svg';
import Camera from '../../../assets/imgs/icons/camera.svg';
import HeartCheck from '../../../assets/imgs/icons/heart_check.svg';
import { HmmText, HmmBText } from '../../../components/CustomText';
import { post } from '../../../services/api';
import config from '../../../constants/config';
import CustomButton from '../../../components/CustomButton';

const { width, height } = Dimensions.get('window');

const MissionPerformScreen = () => {
  const navigation = useNavigation();

  const [missionId, setMissionId] = useState(null);
  const [missionTitle, setMissionTitle] = useState('');
  const [missionDescription, setMissionDescription] = useState('');
  const [keywords, setKeywords] = useState([]);
  const [loading, setLoading] = useState(true);
  const [photoUri, setPhotoUri] = useState(null);
  const [judging, setJudging] = useState(false);
  const [keywordResults, setKeywordResults] = useState([]);

  const openPhotoPicker = () => {
    Alert.alert(
      '사진 선택',
      '사진을 어디서 가져올까요?',
      [
        {
          text: '카메라',
          onPress: async () => {
            try {
              const result = await launchCamera({ mediaType: 'photo', saveToPhotos: true });
              if (result.didCancel) return;
              if (result.assets && result.assets.length > 0) {
                setPhotoUri(result.assets[0].uri);
              }
            } catch (error) {
              console.error('카메라 실행 실패:', error);
            }
          },
        },
        {
          text: '갤러리',
          onPress: async () => {
            try {
              const result = await launchImageLibrary({ mediaType: 'photo' });
              if (result.didCancel) return;
              if (result.assets && result.assets.length > 0) {
                setPhotoUri(result.assets[0].uri);
              }
            } catch (error) {
              console.error('갤러리 선택 실패:', error);
            }
          },
        },
        { text: '취소', style: 'cancel' },
      ],
      { cancelable: true }
    );
  };

  const fetchMission = async () => {
    try {
      const res = await post(config.MISSION.GET_MISSION_KEYWORD, {});
      setMissionId(res.missionId);
      setMissionTitle(res.title || '');
      setMissionDescription(res.description || '');
      setKeywords(res.keywords || []);
    } catch (error) {
      setMissionId(null);
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

  const handleAiButtonPress = async () => {
    if (!photoUri || !missionId) {
      Alert.alert('알림', '사진을 먼저 촬영하거나 업로드해주세요.');
      return;
    }

    setJudging(true);

    try {
      const formData = new FormData();
      formData.append('image', {
        uri: photoUri,
        type: 'image/jpeg',
        name: 'mission.jpg',
      });

      const url = config.MISSION.MISSION_ANALYZE(missionId);
      const response = await post(url, formData, {
        headers: { 'Content-Type': 'multipart/form-data' },
      });

      setKeywordResults([response.keyword1, response.keyword2, response.keyword3]);
    } catch (err) {
      console.error('AI 분석 오류:', err);
      Alert.alert('실패', '사진 검증에 실패했습니다.');
    } finally {
      setJudging(false);
    }
  };

  useLayoutEffect(() => {
    navigation.setOptions({
      headerRight: () => (
        <CustomButton
          title="완료"
          onPress={() => {
            if (!missionId) {
              Alert.alert('알림', '미션 정보가 아직 로드되지 않았습니다.');
              return;
            }
            navigation.replace('MissionDetailScreen', { missionId });
          }}
        />
      ),
    });
  }, [navigation, missionId]);

  return (
    <Wrapper>
      <Background />
      <KeyboardAvoidingView
        style={{ flex: 1 }}
        behavior={Platform.OS === 'ios' ? 'padding' : undefined}
      >
        <ScrollView
          contentContainerStyle={{ paddingBottom: 100 }}
          showsVerticalScrollIndicator={false}
        >
          <Content>
            <MissionPerformMain>
              <MisssionPerformTitle>
                <Left>
                  <HeartYellow width={24} height={24} />
                  <SectionTitle>{missionTitle || '불러오는 중...'}</SectionTitle>
                </Left>
                <Touchablecolumn onPress={() => navigation.navigate('MissionInfoScreen')}>
                  <Info width={24} height={24} />
                </Touchablecolumn>
              </MisssionPerformTitle>
              <MissionPerform>
                <PerformText>{missionDescription || '불러오는 중...'}</PerformText>
              </MissionPerform>
            </MissionPerformMain>

            <MissionPerformPhoto onPress={openPhotoPicker} style={{ marginTop: photoUri ? 10 : 50 }}>
              {photoUri ? <PreviewImage source={{ uri: photoUri }} /> : <>
                <Camera width={100} height={100} />
                <CameraText>촬영/업로드</CameraText>
              </>}
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
                      <KeywordWrapper>
                        {keywordResults[idx] && <YellowCircleAbove />}
                        <KeywordText>{word}</KeywordText>
                      </KeywordWrapper>
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
                  multiline={true}
                />
              </MissionPerformMemoInfo>
            </MissionPerformMemo>
          </Content>
        </ScrollView>
      </KeyboardAvoidingView>

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

// Styled Components

const Wrapper = styled.View`flex: 1;`;
const Content = styled.View`padding: ${width * 0.07}px;`;
const MissionPerformMain = styled.View`flex-direction: column;`;
const Left = styled.View`flex-direction: row; align-items: center; gap: ${width * 0.02}px;`;
const MisssionPerformTitle = styled.View`flex-direction: row; align-items: center; justify-content: space-between;`;
const SectionTitle = styled(HmmBText)`font-size: ${width * 0.05}px; color: ${colors.black}; margin-bottom: 10px;`;
const Touchablecolumn = styled.TouchableOpacity``;
const MissionPerform = styled.View``;
const PerformText = styled(HmmText)`font-size: ${width * 0.038}px; color: ${colors.black}; margin-bottom: 10px;`;
const MissionPerformPhoto = styled.TouchableOpacity`align-items: center;`;
const PreviewImage = styled(Image)`width: ${width * 0.7}px; height: ${width * 0.7}px; border-radius: 10px;`;
const CameraText = styled(HmmText)`font-size: ${width * 0.038}px; color: ${colors.gray100};`;
const MissionPerformKeyword = styled.View``;
const KeywordTitle = styled.View`margin-top: 30px;`;
const TitleText = styled(HmmBText)`font-size: ${width * 0.04}px;`;
const KeywordInfo = styled.View`margin-top: 10px;`;
const InfoText = styled(HmmText)`font-size: ${width * 0.034}px;`;
const KeywordList = styled.View`flex-direction: row; justify-content: center; margin-top: 10px; flex-wrap: wrap;`;
const KeywordListColumn = styled.View`margin: ${width * 0.01}px ${width * 0.076}px; align-items: center;`;
const KeywordWrapper = styled.View`position: relative; justify-content: center; align-items: center;`;
const KeywordText = styled(HmmText)`font-size: ${width * 0.038}px; color: ${colors.black};`;
const YellowCircleAbove = styled.View`position: absolute; top: 0; left: 50%; transform: translateX(-7px); width: 18px; height: 18px; border-radius: 9px; background-color: ${colors.yellow}; opacity: 0.4; z-index: 1;`;
const MissionPerformMemo = styled.View`margin-top: 20px;`;
const MissionPerformMemoTitle = styled.View``;
const MissionPerformMemoInfo = styled.View``;
const InfoInput = styled.TextInput.attrs({ placeholderTextColor: colors.gray200 })`
  font-family: 'HancomMalangMalang-Regular';
  font-size: ${width * 0.036}px;
  color: ${colors.black};
  line-height: 22px;
  text-align-vertical: top;
`;
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
  background-color: rgba(0, 0, 0, 0.6);
  justify-content: center;
  align-items: center;
  padding: 20px;
`;
const OverlayText = styled(HmmBText)`color: ${colors.white}; font-size: ${width * 0.05}px; text-align: center; margin-top: 20px;`;
