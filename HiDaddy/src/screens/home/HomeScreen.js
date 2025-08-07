import React, { useEffect, useState } from 'react';
import styled from 'styled-components/native';
import { Image, Dimensions } from 'react-native';
import { useNavigation } from '@react-navigation/native';

import colors from '../../constants/colors';
import { HmmText, HmmBText } from '../../components/CustomText';
import config from '../../constants/config';
import { get } from '../../services/api';

import Cloud from '../../assets/imgs/icons/cloud.svg';
import RightArrow from '../../assets/imgs/icons/right_arrow';
import Bot from '../../assets/imgs/icons/bot.svg';

const { width } = Dimensions.get('window');

const HomeScreen = () => {
  const navigation = useNavigation();

  const [babyname, setBabyname] = useState('');
  const [dueDate, setDueDate] = useState(null);
  const [groupId, setGroupId] = useState(null);

  const [comment, setComment] = useState('');
  const [dday, setDday] = useState('');

  useEffect(() => {
    const fetchBabyInfo = async () => {
      try {
        const res = await get(config.USER.BABY);

        const twinBabies = res?.babies?.filter(b => b.twin === true) || [];

        if (twinBabies.length === 1) {
          setBabyname(twinBabies[0].name);
        } else if (twinBabies.length >= 2) {
          const names = twinBabies.map(b => b.name).join(', ');
          setBabyname(names);
        }

        if (twinBabies.length > 0) {
          setDueDate(new Date(twinBabies[0].dueDate));
          setGroupId(twinBabies[0].babyGroupId);
        }

        setComment(res?.comment || '');
        setDday(res?.dday || '');

        console.log('아기 정보 응답:', res);
      } catch (err) {
        console.error('아기 정보 조회 실패:', err);
        Alert.alert('오류', '아기 정보를 불러오는데 실패했어요.');
      }
    };

    fetchBabyInfo();
  }, []);

  const babyImageSource = babyname.includes(',')
    ? require('../../assets/imgs/baby/baby_two.png')
    : require('../../assets/imgs/baby/baby_one.png');

  return (
    <Container>
      <SkyBackground>
        <Cloud
          style={{ position: 'absolute', top: 40, right: 20 }}
          width={90}
          height={55}
        />
        <Cloud
          style={{ position: 'absolute', top: 90, left: width / 2 - 50 }}
          width={100}
          height={60}
        />
        <Cloud
          style={{ position: 'absolute', top: 150, right: 50 }}
          width={80}
          height={50}
        />
      </SkyBackground>

      <BabyImage source={babyImageSource} resizeMode="contain" />

      <TextBox>
        <BabyInfo>
          <BabyName twin={babyname.includes(',')}>{babyname}</BabyName>
          <Day>{dday}</Day>
        </BabyInfo>

        <Explain>
          {comment ||
            '아직은 아주 작지만, 엄마 뱃속에서\n새로운 생명이 싹트고 있어요.'}
        </Explain>

        <TouchableRow
          onPress={() =>
            navigation.navigate('EtcStackNavigator', {
              screen: 'WeeklyInfoScreen',
            })
          }
        >
          <RowText>주차별 정보 알아보기</RowText>
          <RightArrow width={24} height={24} />
        </TouchableRow>
      </TextBox>

      <Content>
        <QuestionText>오늘, 어떤 마음을 전해볼까요?</QuestionText>
        <DescriptionText>
          아빠가 기록한 감정 일기와,{'\n'}
          아내의 현재 임신 주차 정보를 기반으로{'\n'}
          오늘 전하면 좋을 다정한 실천을 AI가 추천해드립니다.
        </DescriptionText>

        <Image
          source={require('../../assets/imgs/main/couple.png')}
          style={{
            width: 240,
            height: 240,
            alignSelf: 'center',
            marginBottom: 20,
          }}
          resizeMode="contain"
        />

        <TouchableRow
          onPress={() =>
            navigation.navigate('MissionStackNavigator', {
              screen: 'MissionScreen',
            })
          }
        >
          <RowText>오늘의 마음 전하기</RowText>
          <RightArrow width={24} height={24} />
        </TouchableRow>
      </Content>

      <ChatbotButton
        onPress={() =>
          navigation.navigate('EtcStackNavigator', { screen: 'ChatBotScreen' })
        }
      >
        <ChatbotCircle>
          <Bot width={32} height={32} />
        </ChatbotCircle>
      </ChatbotButton>
    </Container>
  );
};

export default HomeScreen;

const Container = styled.View`
  flex: 1;
  background-color: ${colors.white};
`;

const SkyBackground = styled.View`
  height: ${width * 0.5}px;
  background-color: ${colors.lightBlue};
  position: relative;
`;

const BabyImage = styled.Image`
  position: absolute;
  top: ${width * 0.12}px;
  right: ${width * 0.08}px;
  width: ${width * 0.3}px;
  height: ${width * 0.3}px;
  border-radius: 100px;
  border-width: 2px;
  border-color: ${colors.black};
`;

const TextBox = styled.View`
  position: absolute;
  top: ${width * 0.12}px;
  left: ${width * 0.06}px;
`;

const BabyInfo = styled.View`
  flex-direction: row;
  align-items: center;
  margin-bottom: 10px;
`;

const BabyName = styled(HmmBText)`
  font-size: ${props => (props.twin ? width * 0.045 : width * 0.06)}px;
  margin-right: 10px;
  color: ${colors.black};
`;

const Day = styled(HmmBText)`
  font-size: ${width * 0.038}px;
  color: ${colors.black};
`;

const Explain = styled(HmmText)`
  font-size: ${width * 0.038}px;
  color: ${colors.black};
  line-height: 20px;
  margin-bottom: 10px;
  width: ${width * 0.5}px;
`;

const TouchableRow = styled.TouchableOpacity`
  flex-direction: row;
  gap: 6px;
`;

const RowText = styled(HmmBText)`
  font-size: ${width * 0.04}px;
  color: ${colors.black};
`;

const Content = styled.View`
  padding: ${width * 0.06}px;
`;

const QuestionText = styled(HmmBText)`
  font-size: ${width * 0.04}px;
  color: ${colors.black};
  margin-bottom: 10px;
`;

const DescriptionText = styled(HmmText)`
  font-size: ${width * 0.036}px;
  color: ${colors.black};
  line-height: 24px;
  margin-bottom: 10px;
`;

const ChatbotButton = styled.TouchableOpacity`
  position: absolute;
  bottom: ${width * 0.08}px;
  right: ${width * 0.06}px;
`;

const ChatbotCircle = styled.View`
  background-color: ${colors.white};
  width: ${width * 0.14}px;
  height: ${width * 0.14}px;
  border-radius: 100px;
  border: 2px solid ${colors.black};
  justify-content: center;
  align-items: center;
  elevation: 4;
`;
