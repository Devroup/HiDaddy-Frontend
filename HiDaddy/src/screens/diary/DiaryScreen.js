import React, { useState, useEffect } from 'react';
import styled from 'styled-components/native';
import colors from '../../constants/colors';
import dayjs from 'dayjs';
import { get } from '../../services/api';
import config from '../../constants/config';

import Write from '../../assets/imgs/icons/write.svg';
import CustomCalendar from './CustomCalendar.js';

import Background from '../../components/Background';
import { HmmBText, HmmText } from '../../components/CustomText';
import { Dimensions, Image, ScrollView, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';

const { width } = Dimensions.get('window');

const DiaryScreen = () => {
  const navigation = useNavigation();
  const [currentDate, setCurrentDate] = useState(new Date());
  const [diaryList, setDiaryList] = useState([]);
  const [selectedDiary, setSelectedDiary] = useState(null);

  const startDate = dayjs().startOf('month').format('YYYY-MM-DD');
  const endDate = dayjs().endOf('month').format('YYYY-MM-DD');

  const fetchDiaryList = async () => {
    try {
      console.log('요청 URL:', config.DIARY.GET_DIARY, startDate, endDate);
      const response = await get(config.DIARY.GET_DIARY, {
        startDate,
        endDate,
      });

      console.log('응답 구조:', response);

      const rawData = response.data ?? response;

      const dataArr = Object.values(rawData).filter(
        item => typeof item === 'object' && item.date,
      );

      setDiaryList(dataArr);
      console.log('변환된 배열:', dataArr);
    } catch (error) {
      console.error('일기 목록 가져오기 실패:', error);
    }
  };

  const fetchDiaryByDate = async date => {
    try {
      const response = await get(config.DIARY.DIARY(date));
      console.log('Res', response);
      setSelectedDiary(response);
    } catch (error) {
      console.error('개별 일기 가져오기 실패:', error);
    }
  };

  useEffect(() => {
    fetchDiaryList();
  }, []);

  return (
    <Wrapper>
      <Background />
      <Content>
        <DiaryMain>
          <DiaryMainTitle>
            <MainTitle>사랑이 가득차는 순간들</MainTitle>
            <TouchableWrite
              onPress={() =>
                navigation.navigate('DiaryStackNavigator', {
                  screen: 'DiaryWriteScreen',
                })
              }
            >
              <Write width={35} height={35} />
            </TouchableWrite>
          </DiaryMainTitle>
          <DiarySubTitle>
            <SubTitle>지금, 그 감정을 남겨보세요.</SubTitle>
          </DiarySubTitle>
        </DiaryMain>

        <CalendarWrapper>
          <CustomCalendar
            currentDate={currentDate}
            setCurrentDate={setCurrentDate}
            diaryDates={diaryList.map(item => item.date)}
            onSelectDate={date => fetchDiaryByDate(date)}
          />
        </CalendarWrapper>

        <DiaryPost>
          <ScrollView
            showsVerticalScrollIndicator={false}
            contentContainerStyle={{ paddingBottom: 30 }}
          >
            {selectedDiary && selectedDiary.content ? (
              <TouchableDiaryItem
                onPress={() =>
                  navigation.navigate('DiaryStackNavigator', {
                    screen: 'DiaryWriteScreen',
                    params: { diary: selectedDiary }, // 선택된 일기 전달
                  })
                }
              >
                {selectedDiary.imageUrl ? (
                  <DiaryImage source={{ uri: selectedDiary.imageUrl }} />
                ) : null}
                <DiaryText>{selectedDiary.content}</DiaryText>
              </TouchableDiaryItem>
            ) : (
              <EmptyText>일기를 확인할 날짜를 선택하세요.</EmptyText>
            )}
          </ScrollView>
        </DiaryPost>
      </Content>
    </Wrapper>
  );
};

export default DiaryScreen;

const Wrapper = styled.View`
  flex: 1;
`;
const Content = styled.View`
  flex: 1;
  margin-top: 30px;
  padding: ${width * 0.1}px;
`;
const DiaryMain = styled.View``;
const DiaryMainTitle = styled.View`
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
`;
const MainTitle = styled(HmmBText)`
  font-size: ${width * 0.06}px;
  color: ${colors.black};
`;
const TouchableWrite = styled.TouchableOpacity``;
const DiarySubTitle = styled.View`
  margin-top: ${width * 0.035}px;
`;
const SubTitle = styled(HmmText)`
  font-size: ${width * 0.05}px;
`;
const CalendarWrapper = styled.View`
  margin-top: ${width * 0.01}px;
  overflow: hidden;
`;
const DiaryPost = styled.View`
  flex: 1;
  margin-top: ${width * 0.04}px;
`;
const TouchableDiaryItem = styled(TouchableOpacity)`
  margin-bottom: 15px;
  padding: 10px;
  border-radius: 10px;
`;
const DiaryText = styled(HmmText)`
  font-size: ${width * 0.04}px;
  color: ${colors.black};
  margin-top: 5px;
`;
const DiaryImage = styled(Image)`
  width: 100%;
  height: 150px;
  border-radius: 10px;
`;
const EmptyText = styled(HmmText)`
  font-size: ${width * 0.04}px;
`;