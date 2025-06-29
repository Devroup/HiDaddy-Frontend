import React from 'react';
import styled from 'styled-components/native';
import { Dimensions } from 'react-native';
import { useNavigation } from '@react-navigation/native';

import colors from '../../../constants/colors';
import Background from '../../../components/Background';

import RightArrow from '../../../assets/imgs/icons/right_arrow.svg';
import HeartYellow from '../../../assets/imgs/icons/heart_yellow.svg';
import { HmmText, HmmBText } from '../../../components/CustomText';

const { width } = Dimensions.get('window');

const MissionScreen = () => {
    const navigation = useNavigation();

    return(
    <Wrapper>
        <Background />
        <Content>
            <Title>
                오늘까지 {'\n'}
                총 5개의 마음을 전했어요!
            </Title>
            <MissionMain>
                <MissionMainTitle>
                    <HeartYellow width={24} height={24}/>
                    <SectionTitle>오늘의 마음 전하기</SectionTitle>
                </MissionMainTitle>
                <MissionMainList>
                    <TouchableRow
                        onPress={()=>
                            navigation.navigate('MissionPerformScreen')
                        }
                    >
                        <MissionText>아내에게 꽃을 선물하세요</MissionText>
                        <RightArrow width={20} height={20}/>
                    </TouchableRow>
                </MissionMainList>
            </MissionMain>

            <MissionDone>
                <MissionDoneTitle>
                    <HeartYellow width={24} height={24}/>
                    <SectionTitle>전달한 마음 목록</SectionTitle>
                </MissionDoneTitle>
                <MissionDoneList>
                    <DoneListRow>
                        <DoneListText>어쩌구 저쩌구 하기</DoneListText>
                        <RightArrow width={20} height={20}/>
                    </DoneListRow>
                    <DoneListRow>
                        <DoneListText>어쩌구 저쩌구 하기</DoneListText>
                        <RightArrow width={20} height={20}/>
                    </DoneListRow>
                    <DoneListRow>
                        <DoneListText>어쩌구 저쩌구 하기</DoneListText>
                        <RightArrow width={20} height={20}/>
                    </DoneListRow>
                </MissionDoneList>
            </MissionDone>
        </Content>
    </Wrapper>
  );
};

export default MissionScreen;

const Wrapper = styled.View`
  flex: 1;
`;

const Content = styled.View`
  padding: ${width * 0.07}px;
`;

const Title = styled(HmmBText)`
  font-size: 24px;
  color: ${colors.black};
`;

const MissionMain = styled.View`
    margin-top: 30px;
    font-size: ${width * 0.05}px;
    color: ${colors.black};
    flex-direction: column;
`;

const MissionMainTitle = styled.View`
    flex-direction: row;
`;

const MissionMainList = styled.View`
    flex-direction: row;
    align-items: center;
`;

const TouchableRow = styled.TouchableOpacity`
    flex-direction: row;
    align-items: center;
    gap: ${width * 0.38}px;
`;

const MissionDoneTitle = styled.View`
    flex-direction: row;
    margin-top: 30px;
`;

const SectionTitle = styled(HmmBText)`
    font-size: ${width * 0.05}px;
    color: ${colors.black};
    margin-bottom: 10px;
`;

const MissionText = styled(HmmText)`
    font-size: ${width * 0.04}px;
    color: ${colors.black};
    margin-left: 8px;
`;

const MissionDone = styled.View`
    font-size: ${width * 0.05}px;
    color: ${colors.black};
    margin-top: 20px;
    flex-direction: column;
`;

const MissionDoneList = styled.View`
    font-size: ${width * 0.05}px;
    flex-direction: column;
    gap: 10px;
`;

const DoneListText = styled(HmmText)`
    font-size: ${width * 0.04}px;
    flex-direction: row;
`;

const DoneListRow = styled.View`
    flex-direction: row;
    align-items: center;
    margin-top: 20px;
    border-bottom-width: 1px;
    border-bottom-color: ${colors.gray100};
    padding-bottom: 10px;
    gap: ${width * 0.5}px;
`;