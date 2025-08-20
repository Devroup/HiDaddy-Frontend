import React, { useState, useEffect } from 'react';
import styled from 'styled-components/native';
import colors from '../../constants/colors';
import { get } from '../../services/api';
import config from '../../constants/config';

import Write from '../../assets/imgs/icons/write.svg';
import CustomCalendar from './CustomCalendar.js';

import Background from '../../components/Background';
import { HmmBText, HmmText } from '../../components/CustomText';
import { Dimensions, FlatList, Image } from 'react-native';
import { useNavigation } from '@react-navigation/native';

const { width } = Dimensions.get('window');

const DiaryScreen = () => {
  const navigation = useNavigation();
  const [currentDate, setCurrentDate] = useState(new Date());
  const [diaryList, setDiaryList] = useState([]);

  const fetchDiaryList = async () => {
    try {
      const response = await get(config.DIARY.DIARY);
      // response.data가 배열인지 확인 후 set
      if (Array.isArray(response.data)) {
        setDiaryList(response.data);
      } else {
        console.warn('API 응답 형식이 예상과 다릅니다:', response.data);
      }
    } catch (error) {
      console.error('일기 목록 가져오기 실패:', error);
    }
  };

  useEffect(() => {
    fetchDiaryList();
  }, []);

  const renderDiaryItem = ({ item }) => (
    <DiaryItem>
      {item.imageUrl ? <DiaryImage source={{ uri: item.imageUrl }} /> : null}
      <DiaryText>{item.text}</DiaryText>
    </DiaryItem>
  );

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
          <CustomCalendar currentDate={currentDate} setCurrentDate={setCurrentDate} />
        </CalendarWrapper>

        <DiaryPost>
          <DiaryPostTitle>최근 작성한 일기</DiaryPostTitle>
          {diaryList.length > 0 ? (
            <FlatList
              data={diaryList}
              keyExtractor={(item) => item.id.toString()}
              renderItem={renderDiaryItem}
              contentContainerStyle={{ paddingVertical: 10 }}
            />
          ) : (
            <EmptyText>일기 내용이 없습니다.</EmptyText>
          )}
        </DiaryPost>
      </Content>
    </Wrapper>
  );
};

export default DiaryScreen;

// Styled Components
const Wrapper = styled.View`flex: 1;`;
const Content = styled.View`
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
  margin-top: ${width * 0.05}px;
`;
const DiaryPostTitle = styled(HmmBText)`
  font-size: ${width * 0.04}px;
  color: ${colors.black};
  margin-bottom: 10px;
`;
const DiaryItem = styled.View`
  margin-bottom: 15px;
  background-color: #f9f9f9;
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
  color: ${colors.gray};
`;
