import React from "react";
import styled from "styled-components/native";

import colors from '../../constants/colors';
import Gallery from '../../assets/imgs/icons/addimg.svg';
import { Dimensions } from "react-native";

import { HmmBText, HmmText } from "../../components/CustomText";

const {width} = Dimensions.get('window');

const BoardWriteScreen = () => {
    return(
        <Wrapper>
            <Content>
                <BoardTopSection>
                    <BoardWriteMain>
                        <BoardContent>
                            <ContentInput
                                placeholder={"타인을 비방하고 저격하는 게시글, 광고성 게시글 등 부적절한 글 작성 시 커뮤니티 활동에 제한을 받을 수 있습니다."}
                                placeholderTextColor="#999"
                                multiline={true}
                                textAlignVertical="top"
                            />
                        </BoardContent>
                    </BoardWriteMain>
                </BoardTopSection>
                <BoardSubContent>
                    <BoardAddImg>
                        <Gallery width={30} height={30}/>
                    </BoardAddImg>
                </BoardSubContent>
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
    flex: 1;
    padding: ${width*0.07}px;
    padding-bottom: ${width*0.1}px;
    justify-content: space-between;
`;

const BoardTopSection = styled.View`
`;

const BoardWriteMain = styled.View`
    border-top-width: 1px;
    border-top-color: ${colors.gray200};
`;

const BoardContent = styled.View`
`;

const ContentInput = styled.TextInput`
    font-family: "HancomMalangMalang-Regular";
    font-size: ${width*0.036}px;
    line-height: 23px;
`;

const BoardSubContent = styled.View`
    border-top-width: 1px;
    border-top-color: ${colors.gray200};
`;

const BoardAddImg = styled.View`
    margin-top: ${width*0.05}px;
    align-items: flex-end;
`;