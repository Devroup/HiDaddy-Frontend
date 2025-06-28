import React from 'react';
import styled from 'styled-components/native';
import { Dimensions } from 'react-native';

import colors from '../../../constants/colors';
import Background from '../../../components/Background';

import RightArrow from '../../../assets/imgs/icons/right_arrow.svg';
import HeartYellow from '../../../assets/imgs/icons/heart_yellow.svg';
import { HmmText, HmmBText } from '../../../components/CustomText';

const { width } = Dimensions.get('window');

const MissionScreen = () => (
  <Wrapper>
    <Background />
    <Content>
        <Title>
            오늘까지 {'\n'}
            총 5개의 마음을 전했어요!
        </Title>
        <MissionMain>
            <HeartYellow width={24} height={24}/>
            <SectionTitle>오늘의 마음 전하기</SectionTitle>
            <MissionText>아내에게 꽃을 선물하세요</MissionText>
            <RightArrow width={24} height={24}/>
        </MissionMain>
        <MissionDone>
            <HeartYellow width={24} height={24}/>
            <SectionTitle>전달한 마음 목록</SectionTitle>
        </MissionDone>
        <MissionDoneList>
            <DoneListText>어쩌구 저쩌구 하기</DoneListText>
            <RightArrow width={24} height={24}/>
        </MissionDoneList>
        <MissionDoneList>
            <DoneListText>어쩌구 저쩌구 하기</DoneListText>
            <RightArrow width={24} height={24}/>
        </MissionDoneList>
        <MissionDoneList>
            <DoneListText>어쩌구 저쩌구 하기</DoneListText>
            <RightArrow width={24} height={24}/>
        </MissionDoneList>
    </Content>
  </Wrapper>
);

export default MissionScreen;

const Wrapper = styled.View`
  flex: 1;
`;

const Content = styled.View`
  padding: ${width * 0.07}px;
`;

const Title = styled(HmmBText)`
  font-size: 24px;
  color: ${colors.black};
`;

const MissionMain = styled.View`
    margin-top: 30px;
    font-size: ${width * 0.05}px;
    color: ${colors.black};
`;

const SectionTitle = styled(HmmBText)`
    font-size: ${width * 0.05}px;
    color: ${colors.black};
    margin-bottom: 10px;
    flex-direction: row;
`;

const MissionText = styled(HmmText)`
    font-size: ${width * 0.04}px;
    color: ${colors.black};
    margin-left: 8px;
`;

const MissionDone = styled.View`
    font-size: ${width * 0.05}px;
    color: ${colors.black};
    margin-top: 20px;
`;

const MissionDoneList = styled(HmmText)`
    font-size: ${width * 0.05}px;
`;

const DoneListText = styled(HmmText)`
    font-size: ${width * 0.04}px;
`;