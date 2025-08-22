import React, { useEffect, useState } from 'react';
import styled from 'styled-components/native';
import { Dimensions, Alert } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import dayjs from 'dayjs';

import colors from '../../../constants/colors';
import Background from '../../../components/Background';

import RightArrow from '../../../assets/imgs/icons/right_arrow.svg';
import HeartYellow from '../../../assets/imgs/icons/heart_yellow.svg';
import { HmmText, HmmBText } from '../../../components/CustomText';

import { post, get } from '../../../services/api';
import config from '../../../constants/config';

const { width } = Dimensions.get('window');

const MissionScreen = () => {
    const navigation = useNavigation();
    const [missionTitle, setMissionTitle] = useState('');
    const [doneMissions, setDoneMissions] = useState([]);
    const [todayDone, setTodayDone] = useState(false);

    const fetchMission = async () => {
        try {
            const res = await post(config.MISSION.GET_MISSION_KEYWORD, {});
            console.log('API 응답:', res);
            setMissionTitle(res.title || '오늘의 마음 전하기');
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

            const today = dayjs().format('YYYY-MM-DD');
            const doneToday = missions.some(
                (mission) => dayjs(mission.missionDate).format('YYYY-MM-DD') === today
            );
            setTodayDone(doneToday);
        } catch (error) {
            console.error('미션 과거 목록 조회 실패:', error);
            setDoneMissions([]);
            setTodayDone(false);
        }
    };

    useEffect(() => {
        fetchMission();
        fetchDoneMissions();
    }, []);

    const handleMissionPress = () => {
        if (todayDone) {
            Alert.alert(
                '오늘 미션 완료',
                '오늘은 이미 미션을 수행했습니다. 아래 목록에서 확인할 수 있습니다.'
            );
            return;
        }
        navigation.navigate('MissionPerformScreen');
    };

    return(
        <Wrapper>
            <Background />
            <Content>
                <Title>
                    오늘까지 {'\n'}
                    총 {doneMissions.length}개의 마음을 전했어요!
                </Title>

                <MissionMain>
                    <MissionMainTitle>
                        <HeartYellow width={24} height={24}/>
                        <SectionTitle>오늘의 마음 전하기</SectionTitle>
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
                        <SectionTitle>전달한 마음 목록</SectionTitle>
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
    justify-content: space-between;
    width: 100%;
    padding-vertical: 5px;
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
    width: 100%;
    flex-direction: row;
    align-items: center;
    justify-content: space-between;
    margin-top: 10px;
    border-bottom-width: 1px;
    border-bottom-color: ${colors.gray100};
    padding-bottom: 20px;
`;