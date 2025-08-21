import React, { useState, useEffect } from 'react';
import styled from 'styled-components/native';

import colors from '../../../constants/colors';
import Background from '../../../components/Background';

import { get } from '../../../services/api';
import config from '../../../constants/config';

import HeartYellow from '../../../assets/imgs/icons/heart_yellow.svg';
import { HmmText, HmmBText } from '../../../components/CustomText';
import { Dimensions } from 'react-native';
import { useNavigation, useRoute } from '@react-navigation/native';

const { width } = Dimensions.get('window');

const MissionDetailScreen = () => {
  const navigation = useNavigation();
  const [missionId, setMissionId] = useState(null);
  const [missionTitle, setMissionTitle] = useState('');
  const [missionDescription, setMissionDescription] = useState('');
  const [keywords, setKeywords] = useState([]);
  
  // 과거 미션 불러오기
  const fetchPastMission = async () => {
    try {
      const res = await get(config.MISSION.PAST_MISSION(missionId));
      console.log('API 응답:', res.data);
      setMissionTitle(res.data.title);
      setMissionDescription(res.data.description);
      setKeywords(res.data.keywords);
    } catch (error) {
      console.error('과거 미션 가져오기 실패:', error);
    }
  }

  useEffect(() => {
    if (missionId) {
      fetchPastMission();
    }
  }, [missionId]);

  return (
    <Wrapper>
      <Background />
      <Content>
        <MissionHeader>
          <MissionDetailTitle>
            <HeartYellow width={24} height={24}/>
            <SectionTitle>{missionTitle || '미션 제목'}</SectionTitle>
          </MissionDetailTitle>
          <MissionDetailContents>
            <SectionContents>{missionDescription || '미션 설명'}</SectionContents>
          </MissionDetailContents>
        </MissionHeader>

        <MissionImg>
          <MissionConfirmImg>
            {/* 필요 시 이미지 보여주기 */}
          </MissionConfirmImg>
          <MissionConfirmKeyWord>
            <KeywordTitle>사진 촬영 키워드</KeywordTitle>
            <KeywordListRow>
              {keywords?.keywords?.map((kw, index) => (
                <KeywordList key={index}>
                  <ListText>{kw}</ListText>
                </KeywordList>
              ))}
            </KeywordListRow>
          </MissionConfirmKeyWord>
        </MissionImg>

        <MissionRecord>
          <MissionRecordTitle>
            <RecordTitle>어떤 마음으로 전했나요?</RecordTitle>
          </MissionRecordTitle>
          <MissionRecordContents>
            <RecordContentsText>'마음 기록 없음'</RecordContentsText>
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
`;

const SectionTitle = styled(HmmBText)`
  font-size: ${width*0.045}px;
`;

const MissionDetailContents = styled.View`
  flex-direction: column;
`;

const SectionContents = styled(HmmText)`
  font-size: ${width*0.038}px;
  color: ${colors.gray200};
  margin-top: 20px;
`;

const MissionImg = styled.View``;

const MissionConfirmImg = styled.View``;

const MissionConfirmKeyWord = styled.View``;

const KeywordTitle = styled(HmmBText)`
  font-size: ${width*0.04}px;
  margin-top: 20px;
`;

const KeywordListRow = styled.View`
  flex-direction: row;
  margin-top: 27px;
  justify-content: center;
  gap: ${width*0.25}px;
`;

const KeywordList = styled.View``;

const ListText = styled(HmmText)`
  font-size: ${width*0.038}px;
`;

const MissionRecord = styled.View``;

const MissionRecordTitle = styled.View``;

const RecordTitle = styled(HmmBText)`
  font-size: ${width*0.04}px;
  margin-top: 27px;
`;

const MissionRecordContents = styled.View``;

const RecordContentsText = styled(HmmText)``;