import React, { useState } from 'react';
import styled from 'styled-components/native';
import { Dimensions, ScrollView } from 'react-native';

import colors from '../../constants/colors';
import Background from '../../components/Background';

import LeftArrow from '../../assets/imgs/icons/left_arrow.svg';
import RightArrow from '../../assets/imgs/icons/right_arrow.svg';
import HeartYellow from '../../assets/imgs/icons/heart_yellow.svg';
import { HmmText, HmmBText } from '../../components/CustomText';

const { width } = Dimensions.get('window');

const WEEKLY_DATA = {
  12: [
    {
      title: '아기는 이렇게 자라고 있어요',
      text: `지금 우리 아기는 부드러운 솜털(배내털)이 얼굴과 몸에 자라기 시작했어요. 뇌는 눈에 띄게 발달 중이라, 머리가 몸 전체의 ⅓ 정도로 크게 자라 있어요. 아직 뇌 표면은 매끄럽지만, 곧 복잡한 주름이 생기며 더 똑똑해질 준비를 해요.
턱 안에는 나중에 날 영구치의 뿌리 32개가 하나하나 자리 잡고 있고, 근육과 뼈도 점점 튼튼해지고 있어요. 눈에 보이지 않아도, 아기는 하루하루 열심히 자라고 있답니다.`,
    },
    {
      title: '엄마의 몸도 변하고 있어요',
      text: `입덧이 조금씩 줄고, 식욕이 돌아오면서 엄마의 얼굴빛도 더 밝아져요. 기초 체온은 서서히 내려가며, 몸과 마음 모두 안정되는 시기예요. 
사람마다 다르지만, 배가 살짝 불러오는 엄마들도 있어요. 자궁이 커지면서 배 위쪽(자궁기저부)이 손에 느껴질 정도로 단단해지는 걸 경험할 수 있어요. 이건 아기가 잘 자라고 있다는 소중한 신호예요.`,
    },
    {
      title: '아기의 건강, 함께 지켜봐요',
      text: `임신 11~13주는 아기의 주요 기관들이 거의 다 형성되는 시기로, 건강을 확인하기에 아주 중요한 시기예요.
이 시기에는 초음파로 아기 목덜미 뒤 두께(NT)를 측정해요. 이 두께가 3mm를 넘으면 염색체 이상 가능성이 높아지기 때문에, 정밀검사가 권해질 수 있어요. 심장, 횡격막, 신장 등 내부 장기의 구조적 이상과도 관련이 있어요.
요즘은 3D 초음파를 통해 더 정확하게 확인할 수 있으니, 걱정보다는 미리 알아보고 준비하는 시간이라 생각해주세요.`,
    },
  ],
};

const WeeklyInfoScreen = () => {
  const [week, setWeek] = useState(12);

  const handlePrev = () => {
    if (week > 1) setWeek(week - 1);
  };

  const handleNext = () => {
    if (week < 40) setWeek(week + 1);
  };

  const sections = WEEKLY_DATA[week] || [];

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
  color: ${colors.grayDark};
  line-height: 28px;
  margin-top: ${width * 0.03}px;
`;
