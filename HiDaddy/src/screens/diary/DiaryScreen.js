import React, { useState } from 'react';
import styled from 'styled-components/native';
import colors from '../../constants/colors';

import Write from '../../assets/imgs/icons/write.svg';
import CustomCalendar from './CustomCalendar.js';

import Background from '../../components/Background';
import { HmmBText, HmmText } from '../../components/CustomText';
import { Dimensions } from 'react-native';
import { useNavigation } from '@react-navigation/native';

const { width } = Dimensions.get('window');

const DiaryScreen = () => {
  const navigation = useNavigation();
  const [currentDate, setCurrentDate] = useState(new Date());

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
         <CustomCalendar
          currentDate={currentDate}
          setCurrentDate={setCurrentDate}
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
