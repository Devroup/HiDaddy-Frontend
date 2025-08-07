import React, { useState } from 'react';
import styled from 'styled-components/native';
import { Dimensions, Alert } from 'react-native';
import { DateTimePickerAndroid } from '@react-native-community/datetimepicker';
import { useNavigation, CommonActions } from '@react-navigation/native';

import colors from '../../constants/colors';
import { HmmText, HmmBText } from '../../components/CustomText';
import config from '../../constants/config';
import { post } from '../../services/api';

import MinusIcon from '../../assets/imgs/icons/minus.svg';

const { width } = Dimensions.get('window');

const ProfileScreen = () => {
  const navigation = useNavigation();

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

  const handleBabyAdd = async () => {
    try {
      if (!babyname || !dueDate) {
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
        babies: babies,
      };

      const res = await post(config.USER.BABY, payload);

      console.log('아기 정보 등록 응답:', res);

      if (res.status === 200) {
        Alert.alert('성공', '아이 프로필이 등록 되었습니다.');

        navigation.dispatch(
          CommonActions.reset({
            index: 0,
            routes: [
              {
                name: 'ProfileScreen',
              },
            ],
          }),
        );
      } else {
        Alert.alert('등록 실패', res?.message || '서버 오류');
      }
    } catch (err) {
      console.error('아기 정보 등록 실패:', err);
      Alert.alert('오류', '아기 정보를 등록하는 중 문제가 발생했어요.');
    }
  };

  return (
    <Container>
      <FormContainer>
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
      <SaveButton onPress={handleBabyAdd}>
        <ButtonText>완료</ButtonText>
      </SaveButton>
    </Container>
  );
};

export default ProfileScreen;

const Container = styled.View`
  flex: 1;
  background-color: ${colors.white};
  justify-content: center;
  align-items: center;
`;

const FormContainer = styled.View`
  width: 100%;
  align-items: center;
  justify-content: center;
`;

const InputBox = styled.View`
  width: ${width * 0.6};
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

const SaveButton = styled.TouchableOpacity`
  width: ${width * 0.4}px;
  padding: ${width * 0.04}px;
  background-color: ${colors.black};
  border-radius: 8px;
  margin-bottom: ${width * 0.02}px;
`;

const ButtonText = styled(HmmText)`
  font-size: ${width * 0.04}px;
  color: ${colors.white};
  text-align: center;
`;
