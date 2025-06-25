import React from 'react';
import styled from 'styled-components/native';
import colors from '../../constants/colors';
import Background from '../../components/Background';

const BoardScreen = () => (
  <Wrapper>
    <Background />
    <Content>
      <Title>아빠들의 이야기</Title>
    </Content>
  </Wrapper>
);

export default BoardScreen;

const Wrapper = styled.View`
  flex: 1;
`

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
