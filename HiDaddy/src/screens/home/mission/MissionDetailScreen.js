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
      <HeartYellow width={24} height={24}/>
      <Title>어쩌구 저쩌구하기</Title>
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

const Title = styled(HmmBText)`
  font-size: 24px;
  color: ${colors.black};
`;
