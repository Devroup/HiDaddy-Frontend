import React from 'react';
import styled from 'styled-components/native';
import colors from '../../../constants/colors';
import Background from '../../../components/Background';

const MissionDetailScreen = () => (
  <Wrapper>
    <Background />
    <Content>
      <Title>Mission Detail Screen</Title>
    </Content>
  </Wrapper>
);

export default MissionDetailScreen;

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
