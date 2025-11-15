import React, { useEffect, useState } from 'react';
import styled from 'styled-components/native';
import { Dimensions, Alert, TouchableOpacity, ScrollView } from 'react-native';
import { useNavigation } from '@react-navigation/native';

import colors from '../../../constants/colors';
import Background from '../../../components/Background';

import RightArrow from '../../../assets/imgs/icons/right_arrow.svg';
import HeartYellow from '../../../assets/imgs/icons/heart_yellow.svg';
import Send from '../../../assets/imgs/icons/send.svg';
import { HmmText, HmmBText } from '../../../components/CustomText';

import { post, get } from '../../../services/api';
import config from '../../../constants/config';

const { width } = Dimensions.get('window');

const MissionScreen = () => {
    const navigation = useNavigation();
    const [missionTitle, setMissionTitle] = useState('');
    const [currentMissionId, setCurrentMissionId] = useState(null);
    const [doneMissions, setDoneMissions] = useState([]);
    const [alreadyDone, setAlreadyDone] = useState(false);
    const [messageText, setMessageText] = useState('');

    const fetchMission = async () => {
        try {
            const res = await post(config.MISSION.GET_MISSION_KEYWORD, {});
            console.log('API 응답:', res);
            setMissionTitle(res.title || '오늘의 마음 전하기');
            setCurrentMissionId(res.missionId || null);
        } catch (error) {
            console.error('미션 조회 실패:', error);
            setMissionTitle('오늘의 마음 전하기');
        }
    };

    const fetchDoneMissions = async () => {
        try {
            const res = await get(config.MISSION.GET_MISSION);
            console.log('과거 미션 목록:', res);
            const missions = res.missionLogList || [];
            setDoneMissions(missions);

            if (currentMissionId) {
               const doneBefore = missions.some(
                   (mission) => mission.missionId === currentMissionId
               );
               setAlreadyDone(doneBefore);
            }
        } catch (error) {
            console.error('미션 과거 목록 조회 실패:', error);
            setDoneMissions([]);
            setAlreadyDone(false);
        }
    };

    useEffect(() => {
    fetchMission();
     if (currentMissionId) {
       fetchDoneMissions();
     }
    }, [currentMissionId]);

    const handleMissionPress = () => {
        if (alreadyDone) {
            Alert.alert(
                '오늘 미션 완료',
                '오늘은 이미 미션을 수행했습니다. 아래 목록에서 확인할 수 있습니다.'
            );
            return;
        }
        navigation.navigate('MissionPerformScreen');
    };

    const sendMessage = async () => {
        if (!messageText.trim()) {
            Alert.alert('알림', '메시지를 입력해주세요.');
            return;
        }

        try {
            const url = `${config.MESSAGE.SEND_MESSAGE}?text=${encodeURIComponent(messageText)}`;
            await post(url, {});
            Alert.alert('완료', '메시지가 전송되었습니다.');
            setMessageText('');
        } catch (error) {
            // console.error('메시지 전송 실패:', error.response?.data || error.message);
            Alert.alert(
                '아내 전화번호 등록 필요',
                '메시지를 보내려면 아내의 전화번호가 필요합니다.\n마이페이지 > 내 정보에서 등록해주세요.',
                [
                    { text: '취소', style: 'cancel' },
                    {
                        text: '설정하러 가기',
                        onPress: () => {
                            navigation.navigate('MypageStackNavigator', {
                                screen: 'MyInfoScreen'
                            });
                        }
                    }
                ]
            );
        }
    };

    return(
        <Wrapper>
            <Background />
            <ScrollView
                showsVerticalScrollIndicator={false}
                contentContainerStyle={{ flexGrow: 1 }}
            >
                <Content>
                    <Title>
                        오늘까지 {'\n'}
                        총 {doneMissions.length}개의 마음을 전했어요!
                    </Title>

                    <MessageSection>
                        <MessageSectionTitle>
                            <HeartYellow width={24} height={24}/>
                            <SectionTitle>아내에게 한 줄 메시지 보내기</SectionTitle>
                        </MessageSectionTitle>
                        <MessageInputContainer>
                            <MessageInput
                                value={messageText}
                                onChangeText={setMessageText}
                                placeholder="말로는 부끄러운 마음, 글로 전해보세요"
                                placeholderTextColor={colors.gray200}
                                multiline
                                textAlignVertical="top"
                            />
                            <TouchableOpacity onPress={sendMessage}>
                                <Send width={30} height={30} />
                            </TouchableOpacity>
                        </MessageInputContainer>
                    </MessageSection>

                    <MissionMain>
                        <MissionMainTitle>
                            <HeartYellow width={24} height={24}/>
                            <SectionTitle>AI 추천 미션 수행하기</SectionTitle>
                        </MissionMainTitle>
                        <MissionMainList>
                            <TouchableRow
                                onPress={handleMissionPress}
                            >
                                <MissionText>{missionTitle}</MissionText>
                                <RightArrow width={20} height={20}/>
                            </TouchableRow>
                        </MissionMainList>
                    </MissionMain>

                    <MissionDone>
                        <MissionDoneTitle>
                            <HeartYellow width={24} height={24}/>
                            <SectionTitle>완료한 미션 목록</SectionTitle>
                        </MissionDoneTitle>
                        <MissionDoneList>
                            {doneMissions.length === 0 ? (
                                <DoneListText>수행한 미션이 없습니다.</DoneListText>
                            ) : (
                                doneMissions.map((mission) => (
                                    <TouchableRow
                                        key={mission.id}
                                        onPress={() =>
                                            navigation.navigate('MissionDetailScreen', {
                                                missionId: mission.missionId
                                            })
                                        }
                                    >
                                        <DoneListRow>
                                            <DoneListText>{mission.missionTitle}</DoneListText>
                                            <RightArrow width={20} height={20}/>
                                        </DoneListRow>
                                    </TouchableRow>
                                ))
                            )}
                        </MissionDoneList>
                    </MissionDone>
                </Content>
            </ScrollView>
        </Wrapper>
    );
};

export default MissionScreen;

const Wrapper = styled.View`
  flex: 1;
`;

const Content = styled.View`
  padding: ${width * 0.07}px;
  padding-bottom: 30px;
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
    align-items: center;
    gap: ${width * 0.02}px;
`;

const MissionMainList = styled.View`
    flex-direction: row;
    align-items: center;
    margin-top: 10px;
`;

const TouchableRow = styled.TouchableOpacity`
    flex-direction: row;
    align-items: center;
    justify-content: space-between;
    width: 100%;
    padding-vertical: 5px;
`;

const MissionDoneTitle = styled.View`
    flex-direction: row;
    margin-top: 30px;
    align-items: center;
    gap: ${width * 0.02}px;
`;

const SectionTitle = styled(HmmBText)`
    font-size: ${width * 0.05}px;
    color: ${colors.black};
    line-height: ${width * 0.05}px;
`;

const MissionText = styled(HmmText)`
    font-size: ${width * 0.04}px;
    color: ${colors.black};
    margin-left: 8px;
`;

const MessageSection = styled.View`
    margin-top: 30px;
`;

const MessageSectionTitle = styled.View`
    flex-direction: row;
    align-items: center;
    gap: ${width * 0.02}px;
`;

const MessageInputContainer = styled.View`
    flex-direction: row;
    align-items: center;
    gap: ${width * 0.02}px;
    margin-top: 10px;
    padding: 10px;
    border-radius: 10px;
    background-color: ${colors.gray50};
`;

const MessageInput = styled.TextInput`
    flex: 1;
    font-family: 'HancomMalangMalang-Regular';
    font-size: ${width * 0.04}px;
    color: ${colors.black};
    min-height: 40px;
    max-height: 100px;
`;

const MissionDone = styled.View`
    font-size: ${width * 0.05}px;
    color: ${colors.black};
    margin-top: 30px;
    flex-direction: column;
`;

const MissionDoneList = styled.View`
    font-size: ${width * 0.05}px;
    flex-direction: column;
    gap: 10px;
    margin-top: 10px;
`;

const DoneListText = styled(HmmText)`
    font-size: ${width * 0.04}px;
    flex-direction: row;
`;

const DoneListRow = styled.View`
    width: 100%;
    flex-direction: row;
    align-items: center;
    justify-content: space-between;
    margin-top: 10px;
    border-bottom-width: 1px;
    border-bottom-color: ${colors.gray100};
    padding-bottom: 20px;
`;