import React, { useState } from 'react';
import styled from 'styled-components/native';
import { Dimensions, ScrollView } from 'react-native';

import colors from '../../../constants/colors';
import Background from '../../../components/Background';

import { HmmText, HmmBText } from '../../../components/CustomText';

const { width } = Dimensions.get('window');

const Info_DATA = {
  1: [
    {
      title: '하루 한 번, AI가 제안하는 마음 전하기 미션을 확인해요',
      text: `오늘은 어떤 마음을, 어떻게 전하면 좋을지 알려드릴게요.`,
    },
  ],
  2: [
    {
      title: '"촬영하기" 버튼을 누르면 바로 카메라가 켜져요.',
      text: `갤러리에서 사진을 고르는게 아니라, 지금 이 순간을 직접 찍는 방식이에요.`,
    },
  ],
  3: [
    {
      title:
        '사진에는 제시된 "촬영 키워드"가 모두 담길 수 있도록 노력해 주세요.',
      text: `키워드를 많이 반영할수록 더 많은 리워드가 지급돼요!`,
    },
  ],
  4: [
    {
      title: '사진을 찍은 후, 오늘 어떤 마음으로 전달했는지,',
      text: `또는 미처 다 전하지 못한 마음이 있다면 짧게 글로 남겨보세요.`,
    },
  ],
  5: [
    {
      title:
        '모든 과정을 마쳤다면, 우측 하단의 버튼을 눌러 AI에게 제출해 보세요.',
      text: `AI가 수행 내용을 확인하고, 그 결과를 알려줍니다.`,
    },
  ],
  6: [
    {
      title: '마지막으로 "완료" 버튼을 누르면 오늘의 마음 전하기가 저장돼요.',
      text: ``,
    },
  ],
};

const MissionInfoScreen = () => {
  const sections = Object.values(Info_DATA).flat();

  return (
    <Wrapper>
      <Background />
      <Content>
        <Title>오늘의 마음 전하기, {'\n'}이렇게 진행돼요!</Title>
        <ScrollView
          showsVerticalScrollIndicator={false}
          contentContainerStyle={{
            paddingHorizontal: { width } * 0.07,
            paddingBottom: 40,
          }}
        >
          {sections.map((section, index) => (
            <Section key={index}>
              <SectionHeader>
                <SectionNumber>{index + 1}.</SectionNumber>
                <SectionTitle>{section.title}</SectionTitle>
              </SectionHeader>
              <SectionText>{section.text}</SectionText>
            </Section>
          ))}
        </ScrollView>
      </Content>
    </Wrapper>
  );
};

export default MissionInfoScreen;

const Wrapper = styled.View`
  flex: 1;
`;

const Content = styled.View`
  padding: ${width * 0.07}px;
`;

const Title = styled(HmmBText)`
  font-size: ${width * 0.06}px;
  color: ${colors.black};
  margin-bottom: 20px;
`;

const Section = styled.View`
  margin-bottom: 30px;
`;

const SectionHeader = styled.View`
  flex-direction: row;
  flex-wrap: wrap;
  align-items: flex-start;
  margin-bottom: 5px;
`;

const SectionNumber = styled(HmmBText)`
  font-size: ${width * 0.045}px;
  color: ${colors.black};
  margin-right: 5px;
`;

const SectionTitle = styled(HmmBText)`
  flex: 1;
  flex-shrink: 1;
  font-size: ${width * 0.045}px;
  color: ${colors.black};
`;

const SectionText = styled(HmmText)`
  font-size: ${width * 0.038}px;
  color: ${colors.black};
  margin-left: 22px;
`;
