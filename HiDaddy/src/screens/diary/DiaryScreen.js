import React, { useState } from 'react';
import styled from 'styled-components/native';
import colors from '../../constants/colors';

import Write from '../../assets/imgs/icons/write.svg';
import LeftArrow from '../../assets/imgs/icons/left_arrow.svg';
import RightArrow from '../../assets/imgs/icons/right_arrow.svg';

import Background from '../../components/Background';
import { HmmBText, HmmText } from '../../components/CustomText';
import { Dimensions } from 'react-native';
import { Calendar, CalendarList, LocaleConfig } from 'react-native-calendars';
import { useNavigation } from '@react-navigation/native';
import CalendarHeader from 'react-native-calendars/src/calendar/header';
import { Header } from '@react-navigation/stack';

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

const DiaryScreen = () => {
  const navigation = useNavigation();
  const [currentDate, setCurrentDate] = useState(new Date());

  const changeMonth = (direction) => {
    const newDate = new Date(currentDate);
    newDate.setMonth(currentDate.getMonth() + (direction === 'left' ? -1 : 1));
    setCurrentDate(newDate);
  };
  return(
  <Wrapper>
    <Background/>
    <Content>
      <DiaryMain>
        <DiaryMainTitle>
          <MainTitle>사랑이 가득차는 순간들</MainTitle>
          <TouchableWrite
            onPress={() =>
              navigation.navigate('DiaryStackNavigator',{
                screen: 'DiaryWriteScreen'
              })
            }
          >
            <Write width={35} height={35}/>
          </TouchableWrite>
        </DiaryMainTitle>
        <DiarySubTitle>
          <SubTitle>지금, 그 감정을 남겨보세요.</SubTitle>
        </DiarySubTitle>
      </DiaryMain>
      <CalendarWrapper>
        <Calendar
          key={currentDate.toString()}
          current={currentDate.toDateString().split('T')[0]}
          onMonthChange={(month) => setCurrentDate(new Date(month.dateString))}
          firstDay={0}
          monthFormat={'yyyy년 MM월'}
          hideArrows={true}
          renderHeader={()=>
            <CCHeader>
              <HeaderText>
                {`${currentDate.getFullYear()}년 ${currentDate.getMonth()+ 1}월`}
              </HeaderText>
              <HeaderIcons>
                <ArrowButton onPress={() => changeMonth('left')}>
                  <LeftArrow width={22} height={22}/>
                </ArrowButton>
                <ArrowButton onPress={() => changeMonth('right')}>
                  <RightArrow width={22} height={22}/>
                </ArrowButton>
              </HeaderIcons>
            </CCHeader>
          }
          style={{
            height: 520, // 👈 달력 전체 높이
            paddingTop: 10,
          }}
          theme={{
            backgroundColor: 'transparent', // 배경 제거
            calendarBackground: 'transparent',
            textDayFontFamily: 'HancomMalangMalang-Regular',
            textMonthFontFamily: 'HancomMalangMalang-Regular',
            textDayHeaderFontFamily: 'HancomMalangMalang-Bold',
            textDisabledColor: '#d9e1e8',
          }}
          dayComponent={({date, state}) => {
            const dayOfWeek = new Date(date.dateString).getDay();
            const isSunday = dayOfWeek === 0;
            const isSaturday = dayOfWeek === 6;
            const textColor =
              state === 'disabled'
                ? '#d9e1e8' : isSunday ? 'red'
                : isSaturday ? 'blue'
                : colors.black;
                return (
                <HmmText style={{ color: textColor, textAlign: 'center' }}>
                  {date.day}
                </HmmText>
              );
          }}
        />
      </CalendarWrapper>
    </Content>
  </Wrapper>
  );
};

export default DiaryScreen;

const Wrapper = styled.View`
  flex: 1;
`

const Content = styled.View`
  margin-top: 30px;
  padding: ${width * 0.1}px;
`;

const DiaryMain = styled.View`
`;

const DiaryMainTitle = styled.View`
  flex-direction: row;
  gap: ${width*0.15}px;
`;

const MainTitle = styled(HmmBText)`
  font-size: ${width*0.06}px;
  color: ${colors.black};
`;

const TouchableWrite = styled.TouchableOpacity`
`;

const DiarySubTitle = styled.View`
  margin-top: ${width*0.035}px;
`;

const SubTitle = styled(HmmText)`
  font-size: ${width*0.05}px;
`;

const CalendarWrapper = styled.View`
  margin-top: ${width*0.01}px;
  overflow: hidden;
`;

const CCHeader = styled.View`
  flex-direction: row;
  justify-content: space-between;
  margin: 0 10px 10px 10px;
`;

const HeaderText = styled(HmmBText)`
  font-size: ${width * 0.045}px;
`;

const HeaderIcons = styled.View`
  flex-direction: row;
  gap: 10px;
`;

const ArrowButton = styled.TouchableOpacity``;