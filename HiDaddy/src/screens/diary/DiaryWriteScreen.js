import React from 'react';
import styled from 'styled-components/native';
import colors from '../../constants/colors';

import Send from '../../assets/imgs/icons/send.svg';
import Gallery from '../../assets/imgs/icons/addimg.svg';
import { HmmBText, HmmText } from '../../components/CustomText';
import { Dimensions } from 'react-native';

const { width } = Dimensions.get('window');

const DiaryWriteScreen = () => {
  return(
  <Wrapper>
    <Content>
        <DiaryTopSection>
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
        </DiaryTopSection>
        <DiarySubContent>
            <DiaryMessage>
                <MessageTitle>
                    아내에게 하고싶은 말 한마디
                </MessageTitle>
                <MessageContent>
                    <MessageInput
                        placeholder={"직접 말하지 못한걸 글로 표현해보는건 어떨까요?"}
                        placeholderTextColor="#999"
                        multiline={true}
                        textAlignVertical="top"
                    />
                    <Send width={25} height={25}/>
                </MessageContent>
                
            </DiaryMessage>
            <DiaryRecordImg>
                <RecordContent>
                    <ImgText>초음파 사진 한 장을 첨부하세요</ImgText>
                    <Gallery width={25} height={25}/>
                </RecordContent>
            </DiaryRecordImg>
        </DiarySubContent>
    </Content>
  </Wrapper>
  );
};

export default DiaryWriteScreen;

const Wrapper = styled.View`
    flex: 1;
    background-color: ${colors.white};
`;

const Content = styled.View`
    flex: 1;
    padding: ${width * 0.07}px;
    padding-bottom: ${width * 0.15}px;
    justify-content: space-between;
`;

const DiaryMain = styled.View``;

const DiaryTopSection = styled.View``;

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

const DiarySubContent = styled.View`
    border-top-width: 1px;
    border-top-color: ${colors.gray100};
    padding-top: ${width*0.01}px;
`;

const DiaryMessage = styled.View`
    margin-top: ${width*0.05}px;
`;

const MessageTitle = styled(HmmBText)`
    font-size: ${width*0.04}px;
`;

const MessageContent = styled.View`
    flex-direction: row;
    align-items: center;
    gap: ${width*0.01}px;
`;

const MessageInput = styled.TextInput`
    font-family: "HancomMalangMalang-Regular";
    font-size: ${width*0.038}px;
    line-height: 23px;
`;

const DiaryRecordImg = styled.View`
    border-top-width: 1px;
    border-top-color: ${colors.gray100};
    margin-top: ${width*0.04}px;
`;

const ImgText = styled(HmmText)`
    margin-top: ${width*0.04}px;
    color: ${colors.gray200};
    font-size: ${width*0.038}px;
`;

const RecordContent = styled.View`
    flex-direction: row;
    align-items: center;
    gap: ${width*0.3}px;
`;