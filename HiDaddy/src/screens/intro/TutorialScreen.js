import React, { useRef, useState } from 'react';
import styled from 'styled-components/native';
import { useNavigation } from '@react-navigation/native';
import { Dimensions, FlatList } from 'react-native';

import colors from '../../constants/colors';
import Background from '../../components/Background';

import { HmmText, HmmBText } from '../../components/CustomText';

const { width, height } = Dimensions.get('window');

const PAGES = [
  {
    title: '아빠라는 이름으로, 이 여정을 시작해요.',
    description: `이 앱은, 아빠가 엄마 곁에서 마음을 전하고\n함께하는 하루하루를 더 특별하게 만들어줍니다.`,
  },
  {
    title: '감정일기와 다정한 실천으로 함께해요.',
    description: `당신이 기록한 마음을 읽고,\n지금 아내에게 가장 필요한 다정한 실천을\nAI가 제안합니다.`,
  },
  {
    title: '당신의 다정함이, 따뜻한 보상이 됩니다.',
    description: `사랑을 실천한 만큼,\n리워드로 가족에게 선물도 전달할 수 있어요.`,
  },
];

const TutorialScreen = () => {
  const navigation = useNavigation();
  const flatListRef = useRef(null);
  const [page, setPage] = useState(0);

  const handleNext = () => {
    if (page < PAGES.length - 1) {
      flatListRef.current.scrollToIndex({ index: page + 1 });
    } else {
      navigation.replace('TabNavigator');
    }
  };

  return (
    <Wrapper>
      <Background />

      <FlatList
        ref={flatListRef}
        data={PAGES}
        keyExtractor={(_, idx) => `page-${idx}`}
        renderItem={({ item }) => (
          <Content>
            <Title>{item.title}</Title>
            <ImagePlaceholder />
            <Description>{item.description}</Description>
          </Content>
        )}
        horizontal
        pagingEnabled
        showsHorizontalScrollIndicator={false}
        onMomentumScrollEnd={e => {
          const newPage = Math.round(e.nativeEvent.contentOffset.x / width);
          setPage(newPage);
        }}
      />

      <NextButton onPress={handleNext}>
        <NextText>
          {page === PAGES.length - 1 ? '시작하기' : '다음으로'}
        </NextText>
      </NextButton>
    </Wrapper>
  );
};

export default TutorialScreen;

const Wrapper = styled.View`
  flex: 1;
`;

const Content = styled.View`
  width: ${width}px;
  padding: 60px 24px 0;
  justify-content: flex-start;
  align-items: center;
`;

const Title = styled(HmmBText)`
  font-size: ${width * 0.05}px;
  color: ${colors.black};
  text-align: center;
  margin-bottom: 24px;
`;

const Description = styled(HmmText)`
  font-size: ${width * 0.04}px;
  color: ${colors.black};
  text-align: center;
  line-height: 22px;
`;

const ImagePlaceholder = styled.View`
  width: 100%;
  height: ${height * 0.3}px;
  background-color: transparent;
`;

const NextButton = styled.TouchableOpacity`
  width: 100%;
  padding: 20px;
  align-items: center;
  justify-content: center;
`;

const NextText = styled(HmmBText)`
  font-size: ${width * 0.045}px;
  color: ${colors.black};
`;
