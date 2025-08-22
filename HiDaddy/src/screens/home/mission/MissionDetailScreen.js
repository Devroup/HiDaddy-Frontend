import React, { useState, useEffect } from 'react';
import styled from 'styled-components/native';
import { Dimensions, Image, View } from 'react-native';
import { useRoute } from '@react-navigation/native';

import colors from '../../../constants/colors';
import Background from '../../../components/Background';
import HeartYellow from '../../../assets/imgs/icons/heart_yellow.svg';
import { HmmText, HmmBText } from '../../../components/CustomText';
import { get } from '../../../services/api';
import config from '../../../constants/config';

const { width } = Dimensions.get('window');

const MissionDetailScreen = () => {
  const route = useRoute();
  const { missionId } = route.params;

  const [missionTitle, setMissionTitle] = useState('');
  const [missionDescription, setMissionDescription] = useState('');
  const [keywords, setKeywords] = useState([]);
  const [missionContent, setMissionContent] = useState('');
  const [imageUrl, setImageUrl] = useState(null);

  const fetchPastMission = async () => {
    if (!missionId) return;

    try {
      const res = await get(config.MISSION.PAST_MISSION(missionId));
      console.log('Mission API 응답:', res);

      setMissionTitle(res?.title || '미션 제목');
      setMissionDescription(res?.description || '미션 설명');

      const kws = [];
      if (res.keyword1) kws.push({ text: res.keyword1, success: res.keyword1Success });
      if (res.keyword2) kws.push({ text: res.keyword2, success: res.keyword2Success });
      if (res.keyword3) kws.push({ text: res.keyword3, success: res.keyword3Success });
      setKeywords(kws);

      setMissionContent(res?.content || '작성된 내용이 없습니다.');
      setImageUrl(res?.imageUrl || null);

    } catch (error) {
      console.error('과거 미션 가져오기 실패:', error);
      setMissionTitle('미션 제목');
      setMissionDescription('미션 설명');
      setKeywords([]);
      setMissionContent('작성된 내용이 없습니다.');
      setImageUrl(null);
    }
  };

  useEffect(() => {
    fetchPastMission();
  }, [missionId]);

  return (
    <Wrapper>
      <Background />
      <Content>
        <MissionHeader>
          <MissionDetailTitle>
            <HeartYellow width={24} height={24} />
            <SectionTitle>{missionTitle}</SectionTitle>
          </MissionDetailTitle>
          <MissionDetailContents>
            <SectionContents>{missionDescription}</SectionContents>
          </MissionDetailContents>
        </MissionHeader>

        {imageUrl && (
          <MissionImg>
            <MissionImage source={{ uri: imageUrl }} resizeMode="contain" />
          </MissionImg>
        )}

        <MissionConfirmKeyWord>
          <KeywordTitle>사진 촬영 키워드</KeywordTitle>
          <KeywordListRow>
            {keywords.length > 0 ? (
              keywords.map((kw, idx) => (
                <KeywordList key={idx}>
                  <KeywordCircle success={kw.success} />
                  <ListText>{kw.text}</ListText>
                </KeywordList>
              ))
            ) : (
              <ListText>키워드 없음</ListText>
            )}
          </KeywordListRow>
        </MissionConfirmKeyWord>

        <MissionRecord>
          <MissionRecordTitle>
            <RecordTitle>어떤 마음으로 전했나요?</RecordTitle>
          </MissionRecordTitle>
          <MissionRecordContents>
            <RecordContentsText>{missionContent}</RecordContentsText>
          </MissionRecordContents>
        </MissionRecord>
      </Content>
    </Wrapper>
  );
};

export default MissionDetailScreen;

const Wrapper = styled.View`
  flex: 1;
`;

const Content = styled.View`
  padding: ${width * 0.07}px;
`;

const MissionHeader = styled.View``;

const MissionDetailTitle = styled.View`
  flex-direction: row; 
  align-items: center;
`;

const SectionTitle = styled(HmmBText)`
  font-size: ${width*0.045}px;
  margin-left: 8px;
`;

const MissionDetailContents = styled.View`
`;

const SectionContents = styled(HmmText)`
  font-size: ${width*0.038}px; 
  color: ${colors.gray200}; 
  margin-top: 20px;
`;

const MissionImg = styled.View`
  margin-top: 20px; 
  align-items: center;
`;

const MissionImage = styled(Image)`
  width: ${width*0.8}px; 
  height: ${width*0.5}px; 
  border-radius: 10px;
`;

const MissionConfirmKeyWord = styled.View`
  margin-top: 20px;
`;

const KeywordTitle = styled(HmmBText)`
  font-size: ${width*0.04}px; 
  margin-bottom: 10px;
`;

const KeywordListRow = styled.View`
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  gap: 20px; 
  flex-wrap: wrap;
`;

const KeywordList = styled.View`
  flex-direction: row; 
  align-items: center;
`;

const ListText = styled(HmmText)`
  font-size: ${width*0.038}px; 
  margin-left: 5px;
`;

const KeywordCircle = styled.View`
  width: 12px;
  height: 12px;
  border-radius: 6px;
  background-color: ${({ success }) => (success ? colors.yellow : colors.gray200)};
`;

const MissionRecord = styled.View`
  margin-top: 30px;
`;
const MissionRecordTitle = styled.View``;

const RecordTitle = styled(HmmBText)`
  font-size: ${width*0.04}px;
`;
const MissionRecordContents = styled.View`
  margin-top: 10px;
`;
const RecordContentsText = styled(HmmText)`
  font-size: ${width*0.038}px;
  color: ${colors.gray200};
`;
