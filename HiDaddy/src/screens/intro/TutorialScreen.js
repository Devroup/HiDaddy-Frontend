import React, { useRef, useState } from 'react';
import styled from 'styled-components/native';
import { useNavigation } from '@react-navigation/native';
import { Dimensions, FlatList, Alert } from 'react-native';
import { DateTimePickerAndroid } from '@react-native-community/datetimepicker';

import colors from '../../constants/colors';
import Background from '../../components/Background';
import config from '../../constants/config';
import { post } from '../../services/api';

import { HmmText, HmmBText } from '../../components/CustomText';

import MinusIcon from '../../assets/imgs/icons/minus.svg';

import TutorialImg1 from '../../assets/imgs/tutorial/tutorial_one.png';
import TutorialImg2 from '../../assets/imgs/tutorial/tutorial_two.png';

const { width } = Dimensions.get('window');

const PAGES = [
  {
    title: '아빠라는 이름으로, 이 여정을 시작해요.',
    description: `이 앱은, 아빠가 엄마 곁에서 마음을 전하고\n함께하는 하루하루를 더 특별하게 만들어줍니다.`,
    image: null,
  },
  {
    title: '감정일기와 다정한 실천으로 함께해요.',
    description: `당신이 기록한 마음을 읽고,\n지금 아내에게 가장 필요한 다정한 실천을\nAI가 제안합니다.`,
    image: TutorialImg1,
  },
  {
    title: '당신의 다정함이, 따뜻한 보상이 됩니다.',
    description: `사랑을 실천한 만큼,\n그 마음이 소중한 리워드가 되어\n가족에게 특별한 선물이 될 수 있어요.`,
    image: TutorialImg2,
  },
];

const TutorialScreen = () => {
  const navigation = useNavigation();
  const flatListRef = useRef(null);
  const [page, setPage] = useState(0);

  const [nickname, setNickname] = useState('');
  const [dueDate, setDueDate] = useState(null);
  const [babyname, setBabyname] = useState('');

  const [showTwinInput, setShowTwinInput] = useState(false);
  const [twinBabyName, setTwinBabyName] = useState('');

  const showDatePicker = () => {
    DateTimePickerAndroid.open({
      value: dueDate || new Date(),
      mode: 'date',
      display: 'spinner',
      onChange: (event, selectedDate) => {
        if (selectedDate) {
          setDueDate(selectedDate);
        }
      },
    });
  };

  const addTwin = () => {
    setShowTwinInput(true);
  };

  const removeTwin = () => {
    setShowTwinInput(false);
    setTwinBabyName('');
  };

  const formatDate = date => {
    const yyyy = date.getFullYear();
    const mm = String(date.getMonth() + 1).padStart(2, '0');
    const dd = String(date.getDate()).padStart(2, '0');
    return `${yyyy}-${mm}-${dd}`;
  };

  const handleNext = async () => {
    if (page < PAGES.length - 1) {
      flatListRef.current.scrollToIndex({ index: page + 1 });
      return;
    }

    try {
      if (!nickname || !babyname || !dueDate) {
        Alert.alert('입력 오류', '모든 정보를 입력해 주세요.');
        return;
      }

      const babies = [
        {
          babyName: babyname,
          dueDate: formatDate(dueDate),
        },
      ];

      // 쌍둥이 정보가 입력되어 있으면 추가
      if (showTwinInput && twinBabyName.trim()) {
        babies.push({
          babyName: twinBabyName.trim(),
          dueDate: formatDate(dueDate), // 같은 예정일 공유
        });
      }

      const payload = {
        userName: nickname,
        babies: babies,
      };

      const res = await post(config.USER.BABY, payload);

      console.log('튜토리얼 등록 응답:', res);

      if (res.status === 200) {
        navigation.reset({ index: 0, routes: [{ name: 'TabNavigator' }] });
      } else {
        Alert.alert('등록 실패', res?.message || '서버 오류');
      }
    } catch (err) {
      console.error('튜토리얼 등록 실패:', err);
      Alert.alert('오류', '아기 정보를 등록하는 중 문제가 발생했어요.');
    }
  };

  return (
    <Wrapper>
      <Background />

      <FlatList
        ref={flatListRef}
        data={PAGES}
        keyExtractor={(_, idx) => `page-${idx}`}
        renderItem={({ item, index }) => {
          if (index === 0) {
            return (
              <Content>
                <Title>{item.title}</Title>
                <Description>{item.description}</Description>

                <FormContainer>
                  <InputBox>
                    <Label>아빠 닉네임</Label>
                    <Input
                      placeholder="닉네임을 입력하세요"
                      value={nickname}
                      onChangeText={setNickname}
                    />
                  </InputBox>

                  <InputBox>
                    <Label>출산 예정일</Label>
                    <DateInput onPress={showDatePicker}>
                      <DateInputText>
                        {dueDate
                          ? dueDate.toLocaleDateString()
                          : '출산 예정일을 선택하세요'}
                      </DateInputText>
                    </DateInput>
                  </InputBox>

                  <InputBox>
                    <Label>태명</Label>
                    <Input
                      placeholder="태명을 입력하세요"
                      value={babyname}
                      onChangeText={setBabyname}
                    />
                  </InputBox>

                  {showTwinInput && (
                    <TwinInputBox>
                      <TwinLabelRow>
                        <Label>태명</Label>
                        <RemoveBtn onPress={removeTwin}>
                          <MinusIcon width={16} height={16} />
                        </RemoveBtn>
                      </TwinLabelRow>
                      <Input
                        placeholder="태명을 입력하세요"
                        value={twinBabyName}
                        onChangeText={setTwinBabyName}
                      />
                    </TwinInputBox>
                  )}

                  {!showTwinInput && (
                    <TwinButton onPress={addTwin}>
                      <TwinButtonText>+ 쌍둥이 추가하기</TwinButtonText>
                    </TwinButton>
                  )}
                </FormContainer>
              </Content>
            );
          } else {
            return (
              <Content>
                <Title>{item.title}</Title>
                <Description>{item.description}</Description>

                {item.image && (
                  <TutorialImage source={item.image} resizeMode="cover" />
                )}
              </Content>
            );
          }
        }}
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
  margin-bottom: ${width * 0.08}px;
`;

const Description = styled(HmmText)`
  font-size: ${width * 0.04}px;
  color: ${colors.black};
  text-align: center;
  line-height: 28px;
`;

const NextButton = styled.TouchableOpacity`
  width: 100%;
  padding-bottom: ${width * 0.2}px;
  align-items: center;
  justify-content: center;
`;

const NextText = styled(HmmBText)`
  font-size: ${width * 0.045}px;
  color: ${colors.black};
`;

const FormContainer = styled.View`
  width: 100%;
  justify-content: center;
  align-items: center;
  margin-top: ${width * 0.12}px;
`;

const InputBox = styled.View`
  width: ${width * 0.6}px;
  border-width: 1px;
  border-color: ${colors.black};
  border-radius: 8px;
  padding: ${width * 0.024}px;
  margin-bottom: ${width * 0.03}px;
`;

const Label = styled(HmmText)`
  font-size: ${width * 0.03}px;
  color: ${colors.black};
  margin-bottom: ${width * 0.01}px;
`;

const Input = styled.TextInput`
  font-size: ${width * 0.034}px;
  font-family: 'HancomMalangMalang-Regular';
  color: ${colors.black};
`;

const DateInput = styled.TouchableOpacity`
  padding: ${width * 0.024}px 0px;
`;

const DateInputText = styled(HmmText)`
  font-size: ${width * 0.034}px;
  color: ${colors.black};
`;

const TwinInputBox = styled(InputBox)`
  padding: ${width * 0.024}px;
`;

const TwinLabelRow = styled.View`
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
`;

const RemoveBtn = styled.TouchableOpacity``;

const TwinButton = styled.TouchableOpacity`
  padding: ${width * 0.024}px;
  align-items: center;
`;

const TwinButtonText = styled(HmmBText)`
  font-size: ${width * 0.038}px;
  color: ${colors.black};
`;

const TutorialImage = styled.Image`
  width: ${width * 0.64}px;
  height: ${width * 0.64}px;
  border-radius: 500px;
  border-width: 2px;
  border-color: ${colors.black};
  margin-top: ${width * 0.18}px;
`;
