import React from 'react';
import colors from '../../constants/colors';
import styled from 'styled-components/native';

import LeftArrow from '../../assets/imgs/icons/left_arrow.svg';
import RightArrow from '../../assets/imgs/icons/right_arrow.svg';

import { Dimensions } from 'react-native';
import { Calendar, LocaleConfig } from 'react-native-calendars';
import { HmmText, HmmBText } from '../../components/CustomText';

const { width } = Dimensions.get('window');

LocaleConfig.locales['kr'] = {
  monthNames: [
    '1월','2월','3월','4월','5월','6월',
    '7월','8월','9월','10월','11월','12월'
  ],
  dayNames: ['일요일','월요일','화요일','수요일','목요일','금요일','토요일'],
  dayNamesShort: ['일','월','화','수','목','금','토'],
  today: '오늘'
};

LocaleConfig.defaultLocale = 'kr';

const CustomCalendar = ({ currentDate, setCurrentDate, diaryDates = [] }) => {
  const markedDates = diaryDates.reduce((acc, dateStr) => {
    acc[dateStr] = { marked: true, dotColor: colors.primary };
    return acc;
  }, {});

  const currentDateStr = currentDate.toISOString().split('T')[0];
  markedDates[currentDateStr] = {
    ...(markedDates[currentDateStr] || {}),
    selected: true,
    selectedColor: colors.primary,
  };

  const changeMonth = (direction) => {
    const newDate = new Date(currentDate);
    newDate.setMonth(currentDate.getMonth() + (direction === 'left' ? -1 : 1));
    setCurrentDate(newDate);
  };

  return (
    <CalendarWrapper>
      <Calendar
        key={currentDate.toISOString()}
        current={currentDate.toISOString().split('T')[0]}
        onMonthChange={(month) => setCurrentDate(new Date(month.dateString))}
        onDayPress={(day) => setCurrentDate(new Date(day.dateString))}
        markedDates={markedDates}
        firstDay={0}
        monthFormat={'yyyy년 MM월'}
        hideArrows={true}
        renderHeader={() => (
          <CCHeader>
            <HeaderText>
              {`${currentDate.getFullYear()}년 ${currentDate.getMonth() + 1}월`}
            </HeaderText>
            <HeaderIcons>
              <ArrowButton onPress={() => changeMonth('left')}>
                <LeftArrow width={22} height={22} />
              </ArrowButton>
              <ArrowButton onPress={() => changeMonth('right')}>
                <RightArrow width={22} height={22} />
              </ArrowButton>
            </HeaderIcons>
          </CCHeader>
        )}
        style={{
          height: 650,
          paddingTop: 10,
        }}
        theme={{
          backgroundColor: 'transparent',
          calendarBackground: 'transparent',
          textDayFontFamily: 'HancomMalangMalang-Regular',
          textMonthFontFamily: 'HancomMalangMalang-Regular',
          textDayHeaderFontFamily: 'HancomMalangMalang-Bold',
          textDisabledColor: '#d9e1e8',
        }}
        dayComponent={({ date, state }) => {
          const dayOfWeek = new Date(date.dateString).getDay();
          const isSunday = dayOfWeek === 0;
          const isSaturday = dayOfWeek === 6;
          const textColor =
            state === 'disabled'
              ? '#d9e1e8'
              : isSunday
              ? 'red'
              : isSaturday
              ? 'blue'
              : colors.black;

          return (
            <HmmText style={{ color: textColor, textAlign: 'center' }}>
              {date.day}
            </HmmText>
          );
        }}
      />
    </CalendarWrapper>
  );
};

export default CustomCalendar;

const CalendarWrapper = styled.View`
  margin-top: ${width * 0.01}px;
  overflow: hidden;
`;

const CCHeader = styled.View`
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  margin: 0 10px 10px 10px;
`;

const HeaderText = styled(HmmBText)`
  font-size: ${width * 0.045}px;
  flex: 1;
  text-align: left;
`;

const HeaderIcons = styled.View`
  flex-direction: row;
  gap: 10px;
`;

const ArrowButton = styled.TouchableOpacity``;