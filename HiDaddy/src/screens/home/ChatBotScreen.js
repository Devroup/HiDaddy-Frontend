import React from 'react';
import styled from 'styled-components/native';
import colors from '../../constants/colors';
import Background from '../../components/Background';

const ChatBotScreen = () => (
  <Wrapper>
    <Background />
    <Content>
      <Title>ChatBot Screen</Title>
    </Content>
  </Wrapper>
);

export default ChatBotScreen;

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
