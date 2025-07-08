import React from "react";
import styled from "styled-components/native";

import colors from '../../constants/colors';
import Background from "../../components/Background";
import { Dimensions } from "react-native";

import { HmmBText, HmmText } from "../../components/CustomText";

const {width} = Dimensions.get('window');

const BoardWriteScreen = () => {
    return(
        <Wrapper>
            <Content>
                <Title>글쓰기</Title>
            </Content>
        </Wrapper>
    );
};

export default BoardWriteScreen;

const Wrapper = styled.View`
  flex: 1;
  background-color: ${colors.white};
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