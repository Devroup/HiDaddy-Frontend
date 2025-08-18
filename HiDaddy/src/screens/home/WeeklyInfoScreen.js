import React, { useState, useCallback } from 'react';
import styled from 'styled-components/native';
import { Dimensions, ScrollView, Alert } from 'react-native';
import { useFocusEffect, useRoute } from '@react-navigation/native';

import colors from '../../constants/colors';
import Background from '../../components/Background';
import config from '../../constants/config';
import { get } from '../../services/api';

import LeftArrow from '../../assets/imgs/icons/left_arrow.svg';
import RightArrow from '../../assets/imgs/icons/right_arrow.svg';
import HeartYellow from '../../assets/imgs/icons/heart_yellow.svg';
import { HmmText, HmmBText } from '../../components/CustomText';

const { width } = Dimensions.get('window');

const MAX_WEEK = 40;

const WeeklyInfoScreen = () => {
  const route = useRoute();

  const routeGroupId = route?.params?.groupId ?? null;

  const [groupId, setGroupId] = useState(routeGroupId);
  const [week, setWeek] = useState(null);
  const [loading, setLoading] = useState(false);

  const [babyContent, setBabyContent] = useState('');
  const [momContent, setMomContent] = useState('');
  const [healthContent, setHealthContent] = useState('');

  const sections = [
    { title: '아기는 이렇게 자라고 있어요', text: babyContent },
    { title: '엄마의 몸도 변하고 있어요', text: momContent },
    { title: '아기의 건강, 함께 지켜봐요', text: healthContent },
  ].filter(s => !!s.text);

  const loadCurrentWeek = useCallback(async () => {
    if (!groupId) return;

    try {
      setLoading(true);
      const res = await get(config.WEEKLY.CURRENT(groupId));

      setWeek(res?.currentWeek ?? 1);
      setBabyContent(res?.babyContent ?? '');
      setMomContent(res?.momContent ?? '');
      setHealthContent(res?.healthContent ?? '');
    } catch (e) {
      console.error(e);
      Alert.alert('오류', '주차 정보를 불러오는데 실패했어요.');
    } finally {
      setLoading(false);
    }
  }, [groupId]);

  const loadWeek = useCallback(async w => {
    try {
      setLoading(true);
      const res = await get(config.WEEKLY.WEEK(w));

      setWeek(res?.week ?? w);
      setBabyContent(res?.babyContent ?? '');
      setMomContent(res?.momContent ?? '');
      setHealthContent(res?.healthContent ?? '');
    } catch (e) {
      console.error(e);
      Alert.alert('오류', `${w}주차 정보를 불러오는데 실패했어요.`);
    } finally {
      setLoading(false);
    }
  }, []);

  useFocusEffect(
    React.useCallback(() => {
      loadCurrentWeek();
    }, [loadCurrentWeek]),
  );

  const handlePrev = async () => {
    if (week && week > 1) {
      const next = Math.max(1, week - 1);
      await loadWeek(next);
    }
  };

  const handleNext = async () => {
    if (week && week < MAX_WEEK) {
      const next = Math.min(MAX_WEEK, week + 1);
      await loadWeek(next);
    }
  };

  return (
    <Wrapper>
      <Background />

      <Content>
        <WeekSelector>
          <ArrowPressable onPress={handlePrev}>
            <LeftArrow width={24} height={24} />
          </ArrowPressable>
          <WeekText>{week}주차</WeekText>
          <ArrowPressable onPress={handleNext}>
            <RightArrow width={24} height={24} />
          </ArrowPressable>
        </WeekSelector>

        <ScrollView
          contentContainerStyle={{
            paddingHorizontal: 24,
            paddingBottom: 40,
          }}
        >
          {sections.map((section, index) => (
            <Section key={index}>
              <SectionHeader>
                <HeartYellow width={24} height={24} />
                <SectionTitle>{section.title}</SectionTitle>
              </SectionHeader>
              <SectionText>{section.text}</SectionText>
            </Section>
          ))}
        </ScrollView>
      </Content>
    </Wrapper>
  );
};

export default WeeklyInfoScreen;

const Wrapper = styled.View`
  flex: 1;
`;

const Content = styled.View`
  flex: 1;
`;

const WeekSelector = styled.View`
  flex-direction: row;
  align-items: center;
  padding: 16px 24px;
`;

const ArrowPressable = styled.Pressable`
  padding: 8px;
`;

const WeekText = styled(HmmBText)`
  margin: 0 8px;
  font-size: ${width * 0.045}px;
  color: ${colors.black};
`;

const Section = styled.View`
  margin-bottom: 20px;
`;

const SectionHeader = styled.View`
  flex-direction: row;
  align-items: center;
`;

const SectionTitle = styled(HmmBText)`
  font-size: ${width * 0.04}px;
  color: ${colors.black};
  margin-left: 8px;
`;

const SectionText = styled(HmmText)`
  font-size: ${width * 0.038}px;
  color: ${colors.black};
  line-height: 28px;
  margin-top: ${width * 0.03}px;
`;
