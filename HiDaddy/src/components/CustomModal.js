import React from 'react';
import { Modal } from 'react-native';
import { Dimensions } from 'react-native';
import styled from 'styled-components/native';

import colors from '../constants/colors';
import { HmmBText, HmmText } from './CustomText';

const { width } = Dimensions.get('window');

const CustomModal = ({
  visible,
  title,
  content,
  confirmText = '확인',
  cancelText = '취소',
  onConfirm,
  onCancel,
  confirmButtonColor = colors.red,
  cancelButtonColor = colors.white,
  cancelTextColor = colors.black,
}) => {
  return (
    <Modal visible={visible} transparent animationType="fade">
      <Overlay>
        <Container>
          <Title>{title}</Title>
          <Content>{content}</Content>
          <ButtonRow>
            <ConfirmButton
              style={{ backgroundColor: confirmButtonColor }}
              onPress={onConfirm}
            >
              <ConfirmButtonText>{confirmText}</ConfirmButtonText>
            </ConfirmButton>
            <CancelButton
              style={{
                backgroundColor: cancelButtonColor,
                borderColor: colors.black,
                borderWidth: 1,
              }}
              onPress={onCancel}
            >
              <CancelButtonText style={{ color: cancelTextColor }}>
                {cancelText}
              </CancelButtonText>
            </CancelButton>
          </ButtonRow>
        </Container>
      </Overlay>
    </Modal>
  );
};

export default CustomModal;

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
  justify-content: center;
  align-items: center;
`;

const Title = styled(HmmBText)`
  font-size: ${width * 0.045}px;
  color: ${colors.black};
  margin-bottom: 24px;
`;

const Content = styled(HmmText)`
  font-size: ${width * 0.04}px;
  color: ${colors.black};
  text-align: center;
  margin-bottom: 24px;
`;

const ButtonRow = styled.View`
  flex-direction: row;
  gap: 12px;
`;

const ConfirmButton = styled.TouchableOpacity`
  flex: 1;
  height: ${width * 0.12};
  border-radius: 6px;
  justify-content: center;
  align-items: center;
`;

const ConfirmButtonText = styled(HmmText)`
  color: ${colors.white};
  font-size: ${width * 0.038}px;
`;

const CancelButton = styled.TouchableOpacity`
  flex: 1;
  height: ${width * 0.12};
  border-radius: 6px;
  justify-content: center;
  align-items: center;
`;

const CancelButtonText = styled(HmmText)`
  font-size: ${width * 0.038}px;
`;
