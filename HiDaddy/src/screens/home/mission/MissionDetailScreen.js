import React from 'react';
import styled from 'styled-components/native';

import colors from '../../../constants/colors';
import Background from '../../../components/Background';

import HeartYellow from '../../../assets/imgs/icons/heart_yellow.svg';
import { HmmText, HmmBText } from '../../../components/CustomText';
import { Dimensions } from 'react-native';

const { width } = Dimensions.get('window');

const MissionDetailScreen = () => (
  <Wrapper>
    <Background />
    <Content>
      <MissionHeader>
        <MissionDetailTitle>
          <HeartYellow width={24} height={24}/>
          <SectionTitle>어쩌구 저쩌구하기</SectionTitle>
        </MissionDetailTitle>
        <MissionDetailContents>
          <SectionContents>아내에게 꽃을 전달해보세요.</SectionContents>
        </MissionDetailContents>
      </MissionHeader>
      <MissionImg>
        <MissionConfirmImg>

        </MissionConfirmImg>
        <MissionConfirmKeyWord>
          <KeywordTitle>사진 촬영 키워드</KeywordTitle>
          <KeywordListRow>
            <KeywordList>
              <ListText>꽃</ListText>
            </KeywordList>
            <KeywordList>
              <ListText>아내</ListText>
            </KeywordList>
            <KeywordList>
              <ListText>미소</ListText>
            </KeywordList>
          </KeywordListRow>
        </MissionConfirmKeyWord>
      </MissionImg>
      <MissionRecord>
        <MissionRecordTitle>
          <RecordTitle>어떤 마음으로 전했나요?</RecordTitle>
        </MissionRecordTitle>
        <MissionRecordContents>
          <RecordContentsText></RecordContentsText>
        </MissionRecordContents>
      </MissionRecord>

    </Content>
  </Wrapper>
);

export default MissionDetailScreen;

const Wrapper = styled.View`
  flex: 1;
`;

const Content = styled.View`
  padding: ${width * 0.07}px;
`;

const MissionHeader = styled.View`
`;

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
  font-size: ${width*0.038};
  flex-direction: row;
  color: ${colors.gray200};
  margin-top: 20px;
`;

const MissionImg = styled.View`
`;

const MissionConfirmImg = styled.View`
`;

const MissionConfirmKeyWord = styled.View`
`;

const KeywordTitle = styled(HmmBText)`
  font-size: ${width*0.04}px;
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

const MissionRecord = styled.View`
`;

const MissionRecordTitle = styled.View`
`;

const RecordTitle = styled(HmmBText)`
  font-size: ${width*0.04};
  margin-top: 27px;
`;

const MissionRecordContents = styled.View`
`;

const RecordContentsText = styled(HmmText)`
`;