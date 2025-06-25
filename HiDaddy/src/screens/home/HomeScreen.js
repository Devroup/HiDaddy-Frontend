import React from 'react';
import styled from 'styled-components/native';
import colors from '../../constants/colors';
import Background from '../../components/Background';

const HomeScreen = () => (
  <Wrapper>
    <Background />
    <Content>
      <Title>Home Screen</Title>
    </Content>
  </Wrapper>
);

export default HomeScreen;

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
