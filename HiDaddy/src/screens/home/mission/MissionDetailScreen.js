import React from 'react';
import styled from 'styled-components/native';
import colors from '../../../constants/colors';
import Background from '../../../components/Background';
import { HmmBText } from '../../../components/CustomText';

const MissionDetailScreen = () => (
  <Wrapper>
    <Background />
    <Content>
      <Title>오늘의 마음 전하기</Title>
    </Content>
  </Wrapper>
);

export default MissionDetailScreen;

const Wrapper = styled.View`
  flex: 1;
`;

const Content = styled.View`
  flex:1;
  justify-content: center;
  align-items: center;
`;

const Title = styled(HmmBText)`
  font-size: 24px;
  color: ${colors.black};
`;
