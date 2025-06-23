import React from 'react';
import styled from 'styled-components/native';
import colors from '../../constants/colors';

const HomeScreen = () => (
  <Container>
    <Title>Home Screen</Title>
  </Container>
);

export default HomeScreen;

const Container = styled.View`
  flex: 1;
  justify-content: center;
  align-items: center;
`;

const Title = styled.Text`
  font-size: 24px;
  font-weight: bold;
  color: ${colors.black};
`;
