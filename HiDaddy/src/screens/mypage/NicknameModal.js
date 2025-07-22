import React, { useState } from 'react';
import { Modal, TextInput } from 'react-native';
import styled from 'styled-components/native';
import { Dimensions } from 'react-native';
import colors from '../../constants/colors';
import { HmmBText, HmmText } from '../../components/CustomText';

const { width } = Dimensions.get('window');

const NicknameModal = ({ visible, currentNickname, onSave, onCancel }) => {
  const [newNickname, setNewNickname] = useState(currentNickname);

  const handleSave = () => {
    onSave(newNickname);
  };

  return (
    <Modal visible={visible} transparent animationType="fade">
      <Overlay>
        <Container>
          <Title>닉네임 수정</Title>
          <Input
            value={newNickname}
            onChangeText={setNewNickname}
            placeholder="새로운 닉네임을 입력하세요"
            underlineColorAndroid="transparent"
          />
          <ButtonRow>
            <ConfirmButton onPress={handleSave}>
              <ConfirmButtonText>저장</ConfirmButtonText>
            </ConfirmButton>
            <CancelButton onPress={onCancel}>
              <CancelButtonText>취소</CancelButtonText>
            </CancelButton>
          </ButtonRow>
        </Container>
      </Overlay>
    </Modal>
  );
};

export default NicknameModal;

const Overlay = styled.View`
  flex: 1;
  background-color: rgba(0, 0, 0, 0.5);
  justify-content: center;
  align-items: center;
`;

const Container = styled.View`
  width: ${width * 0.8}px;
  height: ${width * 0.6}px;
  background-color: ${colors.white};
  border-radius: 24px;
  padding: 24px 16px;
  align-items: center;
  justify-content: center;
`;

const Title = styled(HmmBText)`
  font-size: ${width * 0.045}px;
  margin-bottom: 24px;
  color: ${colors.black};
`;

const Input = styled.TextInput`
  width: ${width * 0.72}px;
  border-width: 1px;
  border-color: ${colors.black};
  border-radius: 8px;
  padding: ${width * 0.03}px;
  margin-bottom: ${width * 0.06}px;
  font-size: ${width * 0.04}px;
  color: ${colors.black};
  font-family: 'HancomMalangMalang-Regular';
`;

const ButtonRow = styled.View`
  flex-direction: row;
  gap: 12px;
`;

const ConfirmButton = styled.TouchableOpacity`
  flex: 1;
  background-color: ${colors.black};
  padding: 10px;
  border-radius: 6px;
  align-items: center;
  height: ${width * 0.12};
  justify-content: center;
`;

const CancelButton = styled.TouchableOpacity`
  flex: 1;
  background-color: ${colors.red};
  padding: 10px;
  border-radius: 6px;
  align-items: center;
  justify-content: center;
  height: ${width * 0.12};
`;

const ConfirmButtonText = styled(HmmText)`
  color: ${colors.white};
  font-size: ${width * 0.038}px;
`;

const CancelButtonText = styled(HmmText)`
  color: ${colors.white};
  font-size: ${width * 0.038}px;
`;
