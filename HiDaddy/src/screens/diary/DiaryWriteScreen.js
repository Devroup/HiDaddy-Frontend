import React from 'react';
import styled from 'styled-components/native';
import colors from '../../constants/colors';

import Write from '../../assets/imgs/icons/write.svg';

import Background from '../../components/Background';
import { HmmBText, HmmText } from '../../components/CustomText';
import { Dimensions } from 'react-native';

const { width } = Dimensions.get('window');

const DiaryWriteScreen = () => {
  return(
  <Wrapper>
    <Background/>
    <Content>
        <DiaryMain>
            <DiaryTitle>
                <MainTitle>2025년 5월 28일</MainTitle>
            </DiaryTitle>
        </DiaryMain>

        <DiaryMainContent>
            <DiaryInput
                placeholder={"어느덧 15주차네요.\n아내를 향한 진심을 전달해보는 건 어떨까요?"}
                placeholderTextColor="#999"
                multiline={true}
                textAlignVertical="top"
            />
        </DiaryMainContent>
    </Content>
  </Wrapper>
  );
};

export default DiaryWriteScreen;

const Wrapper = styled.View`
  flex: 1;
`;

const Content = styled.View`
  padding: ${width * 0.07}px;
`;

const DiaryMain = styled.View`
`;

const DiaryTitle = styled.View`
    border-bottom-width: 1px;
    border-bottom-color: ${colors.gray100};
    padding-bottom: 10px;
`;

const MainTitle = styled(HmmBText)`
  font-size: ${width*0.04}px;
  color: ${colors.black};
`;

const DiaryMainContent = styled.View`

`;

const DiaryInput = styled.TextInput`
    font-family: "HancomMalangMalang-Regular";
    font-size: ${width*0.038}px;
    line-height: 23px;
`;