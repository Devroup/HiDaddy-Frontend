import React, { useState, useEffect, useCallback } from 'react';
import styled from 'styled-components/native';
import { useNavigation } from '@react-navigation/native';
import {
  Dimensions,
  Modal,
  ScrollView,
  TouchableWithoutFeedback,
  Alert,
} from 'react-native';
import { DateTimePickerAndroid } from '@react-native-community/datetimepicker';
import colors from '../../constants/colors';
import config from '../../constants/config';
import { get, del, patch } from '../../services/api';

import { HmmText, HmmBText } from '../../components/CustomText';

import MinusIcon from '../../assets/imgs/icons/minus.svg';
import PlusIcon from '../../assets/imgs/icons/plus_circle.svg';

const { width, height } = Dimensions.get('window');

const ProfileScreen = () => {
  const navigation = useNavigation();
  const [showModal, setShowModal] = useState(false);
  const [children, setChildren] = useState([]);

  const [dueDate, setDueDate] = useState(null);
  const [babyname, setBabyname] = useState('');

  const [showTwinInput, setShowTwinInput] = useState(false);
  const [twinBabyName, setTwinBabyName] = useState('');
  const [isTwinFromData, setIsTwinFromData] = useState(false);

  const [groupId, setGroupId] = useState(null);

  const babyImageSource = showTwinInput
    ? require('../../assets/imgs/baby/baby_two.png')
    : require('../../assets/imgs/baby/baby_one.png');

  const fetchBabyInfo = useCallback(async () => {
    try {
      const res = await get(config.USER.BABY);
      const babies = Array.isArray(res?.babies) ? res.babies : [];

      if (babies.length >= 1) {
        const first = babies[0];
        setBabyname(first?.name ?? '');
        setDueDate(first?.dueDate ? new Date(first.dueDate) : null);
        setGroupId(first?.babyGroupId ?? null);
      } else {
        setBabyname('');
        setDueDate(null);
        setGroupId(null);
      }

      const twinFlag =
        typeof res?.twin === 'boolean' ? res.twin : babies.length >= 2;
      setIsTwinFromData(twinFlag);

      setShowTwinInput(twinFlag);
      setTwinBabyName(twinFlag ? babies[1]?.name ?? '' : '');
    } catch (err) {
      console.error('아기 정보 조회 실패:', err);
      Alert.alert('오류', '아기 정보를 불러오는데 실패했어요.');
    }
  }, []);

  const fetchAllBabies = useCallback(async () => {
    try {
      const res = await get(config.USER.ALL_BABIES);
      const babyGroups = Object.values(res || {}).filter(
        v => v && typeof v === 'object' && Array.isArray(v.babies),
      );

      const uniqueBabies = babyGroups.map(group => {
        const names = (group.babies ?? []).map(b => b.name).join(', ');
        const dueDate = group.dueDate;
        const babyGroupId = group.babyGroupId;
        const isTwin =
          typeof group.twin === 'boolean'
            ? group.twin
            : (group.babies ?? []).length >= 2;

        return {
          name: names,
          dueDate,
          babyGroupId,
          image: isTwin
            ? require('../../assets/imgs/baby/baby_two.png')
            : require('../../assets/imgs/baby/baby_one.png'),
        };
      });

      setChildren(uniqueBabies);
    } catch (err) {
      console.error('모든 아기 정보 조회 실패:', err);
      Alert.alert('오류', '전체 아기 정보를 불러오는데 실패했어요.');
    }
  }, []);

  const selectBaby = async gid => {
    try {
      await patch(config.USER.SELECT_BABY(gid));
      await fetchBabyInfo();
      setShowModal(false);
      Alert.alert('완료', '아기가 선택되었습니다.');
    } catch (err) {
      console.error('아기 선택 실패:', err);
      Alert.alert('실패', '아기 선택 중 오류가 발생했습니다.');
    }
  };

  const handleEdit = async (groupId, updatedName, updatedDueDate) => {
    try {
      const nameList = showTwinInput
        ? [updatedName, twinBabyName].filter(Boolean)
        : [updatedName];

      const body = nameList.map(name => ({
        name,
        dueDate: updatedDueDate.toISOString().split('T')[0],
      }));

      await patch(config.USER.PATCH_BABY(groupId), body);

      await fetchBabyInfo();
      await fetchAllBabies();

      Alert.alert('성공', '아기 정보가 수정되었습니다.');
      fetchAllBabies();
    } catch (err) {
      console.error('수정 오류:', err);
      Alert.alert('실패', '아기 정보 수정 중 오류가 발생했습니다.');
    }
  };

  const handleDelete = async groupId => {
    Alert.alert('삭제 확인', '정말 삭제하시겠어요?', [
      {
        text: '취소',
        style: 'cancel',
      },
      {
        text: '삭제',
        style: 'destructive',
        onPress: async () => {
          try {
            await del(config.USER.DEL_BABY(groupId));

            await fetchBabyInfo();
            await fetchAllBabies();
            Alert.alert('삭제 완료', '아기 정보가 삭제되었습니다.');
            fetchAllBabies();
          } catch (err) {
            console.error('삭제 오류:', err);
            Alert.alert('실패', '아기 정보 삭제 중 오류가 발생했습니다.');
          }
        },
      },
    ]);
  };

  useEffect(() => {
    fetchBabyInfo();
  }, []);

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

  return (
    <Container>
      <BabyImageTouchable
        onPress={() => {
          fetchAllBabies();
          setShowModal(true);
        }}
      >
        <BabyImage source={babyImageSource} resizeMode="contain" />
      </BabyImageTouchable>

      <Modal
        visible={showModal}
        transparent
        animationType="slide"
        onRequestClose={() => setShowModal(false)}
      >
        <TouchableWithoutFeedback onPress={() => setShowModal(false)}>
          <ModalOverlay>
            <TouchableWithoutFeedback onPress={() => {}}>
              <ModalContainer>
                <ScrollView
                  showsVerticalScrollIndicator={false}
                  contentContainerStyle={{
                    paddingBottom: width * 0.1,
                  }}
                >
                  {children.map((child, idx) => (
                    <React.Fragment key={idx}>
                      <ChildRow onPress={() => selectBaby(child.babyGroupId)}>
                        <BabyImageSmall
                          source={child.image}
                          resizeMode="cover"
                        />
                        <ChildName>{child.name}</ChildName>
                      </ChildRow>
                      {idx !== children.length - 1 && <Divider />}
                    </React.Fragment>
                  ))}
                </ScrollView>

                <ModalFooter>
                  <AddChildButton
                    onPress={() => {
                      setShowModal(false);
                      navigation.navigate('ProfileAddScreen');
                    }}
                  >
                    <PlusIcon
                      width={24}
                      height={24}
                      style={{ marginRight: width * 0.02 }}
                    />
                    <AddChildText>아이 추가하기</AddChildText>
                  </AddChildButton>
                </ModalFooter>
              </ModalContainer>
            </TouchableWithoutFeedback>
          </ModalOverlay>
        </TouchableWithoutFeedback>
      </Modal>

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
      <ButtonsWrapper>
        <EditButton onPress={() => handleEdit(groupId, babyname, dueDate)}>
          <ButtonText>수정</ButtonText>
        </EditButton>
        <DeleteButton onPress={() => handleDelete(groupId)}>
          <ButtonText>삭제</ButtonText>
        </DeleteButton>
      </ButtonsWrapper>
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

const BabyImageTouchable = styled.TouchableOpacity``;

const BabyImage = styled.Image`
  width: ${width * 0.3}px;
  height: ${width * 0.3}px;
  border-radius: 100px;
  border-width: 2px;
  border-color: ${colors.black};
`;

const FormContainer = styled.View`
  width: 100%;
  align-items: center;
  justify-content: center;
  margin-top: ${width * 0.1}px;
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

const ButtonsWrapper = styled.View`
  margin-top: ${width * 0.06}px;
  width: 100%;
  align-self: center;
  justify-content: center;
  align-items: center;
`;

const EditButton = styled.TouchableOpacity`
  width: ${width * 0.4}px;
  padding: ${width * 0.04}px;
  background-color: ${colors.black};
  border-radius: 8px;
  margin-bottom: ${width * 0.02}px;
`;

const DeleteButton = styled.TouchableOpacity`
  width: ${width * 0.4}px;
  padding: ${width * 0.04}px;
  background-color: ${colors.red};
  border-radius: 8px;
  margin-bottom: ${width * 0.02}px;
`;

const ButtonText = styled(HmmText)`
  font-size: ${width * 0.04}px;
  color: ${colors.white};
  text-align: center;
`;

const ModalOverlay = styled.View`
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: rgba(0, 0, 0, 0.5);
  justify-content: flex-end;
`;

const ModalContainer = styled.View`
  background-color: ${colors.white};
  border-top-left-radius: 20px;
  border-top-right-radius: 20px;
  max-height: ${height * 0.8}px;
  width: 100%;
`;

const ModalFooter = styled.View``;

const ChildRow = styled.TouchableOpacity`
  flex-direction: row;
  margin: ${width * 0.06}px;
  align-items: center;
`;

const BabyImageSmall = styled.Image`
  width: ${width * 0.1}px;
  height: ${width * 0.1}px;
  border-radius: ${width * 0.05}px;
  border-width: 1px;
  border-color: ${colors.black};
  margin-right: ${width * 0.03}px;
`;

const ChildName = styled(HmmBText)`
  font-size: ${width * 0.04}px;
  color: ${colors.black};
`;

const Divider = styled.View`
  height: 1px;
  background-color: ${colors.gray100};
  margin: 0 ${width * 0.04}px;
`;

const AddChildButton = styled.TouchableOpacity`
  flex-direction: row;
  align-items: center;
  margin: ${width * 0.06}px;
`;

const AddChildText = styled(HmmText)`
  font-size: ${width * 0.04}px;
  color: ${colors.black};
`;
