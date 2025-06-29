import React from 'react';
import styled from 'styled-components/native';
import { Dimensions } from 'react-native';

import Background from '../../components/Background';
import colors from '../../constants/colors';
import { HmmText, HmmBText } from '../../components/CustomText';

const { width, height } = Dimensions.get('window');

const HeartScreen = () => (
  <Wrapper>
    <Background />
    <HeaderContainer>
      <HeaderTitle>하트 교환소</HeaderTitle>
    </HeaderContainer>

    <Content>
      <Message>
        서비스 <Bold>준비중</Bold>입니다.
      </Message>
    </Content>
  </Wrapper>
);

export default HeartScreen;

const Wrapper = styled.View`
  flex: 1;
`;

const HeaderContainer = styled.View`
  padding: ${height * 0.06}px;
  justify-content: flex-end;
  align-items: center;
`;

const HeaderTitle = styled(HmmBText)`
  font-size: ${width * 0.05}px;
  color: ${colors.black};
`;

const Content = styled.View`
  flex: 1;
  justify-content: center;
  align-items: center;
`;

const Message = styled(HmmText)`
  font-size: ${width * 0.045}px;
  color: ${colors.black};
`;

const Bold = styled(HmmBText)`
  font-size: ${width * 0.045}px;
  color: ${colors.black};
`;
