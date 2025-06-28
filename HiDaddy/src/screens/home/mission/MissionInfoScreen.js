import React from 'react';
import styled from 'styled-components/native';
import colors from '../../../constants/colors';
import Background from '../../../components/Background';

const MissionInfoScreen = () => (
  <Wrapper>
    <Background />
    <Content>
      <Title>오늘의 마음 전하기, {'n'} 이렇게 진행되요!</Title>
    </Content>
  </Wrapper>
);

export default MissionInfoScreen;

const Wrapper = styled.View`
  flex: 1;
`;

const Content = styled.View`
  flex: 1;
  justify-content: center;
  align-items: center;
`;

const Title = styled.Text`
  font-size: 24px;
  font-weight: bold;
  color: ${colors.black};
`;
