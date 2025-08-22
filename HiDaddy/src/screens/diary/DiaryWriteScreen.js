import React, { useLayoutEffect, useState, useEffect } from 'react';
import styled from 'styled-components/native';
import colors from '../../constants/colors';
import { post, del, put, get } from '../../services/api';
import config from '../../constants/config';

import Send from '../../assets/imgs/icons/send.svg';
import Gallery from '../../assets/imgs/icons/addimg.svg';
import { HmmBText, HmmText } from '../../components/CustomText';
import { useNavigation, useRoute } from '@react-navigation/native';
import { Dimensions, View, Alert, TouchableOpacity } from 'react-native';
import CustomButton from '../../components/CustomButton';
import { launchImageLibrary } from 'react-native-image-picker';

const { width } = Dimensions.get('window');

const DiaryWriteScreen = () => {
  const navigation = useNavigation();
  const route = useRoute();

  const { diary, date } = route.params || {};
  const diaryDate = diary?.date || date || new Date().toISOString().split('T')[0];

  const [isEditing, setIsEditing] = useState(!diary);
  const [diaryText, setDiaryText] = useState(diary?.content || '');
  const [messageText, setMessageText] = useState(diary?.message || '');
  const [imageUri, setImageUri] = useState(diary?.imageUrl || null);
  const [hasDiary, setHasDiary] = useState(!!diary);

  const getFormattedDate = () => {
    const today = new Date(diaryDate);
    const year = today.getFullYear();
    const month = today.getMonth() + 1;
    const day = today.getDate();
    return `${year}년 ${month}월 ${day}일`;
  };

  useEffect(() => {
    const fetchDiary = async () => {
      try {
        const response = await get(config.DIARY.DIARY(diaryDate));
        if (response) {
          setDiaryText(response.content || '');
          setMessageText(response.message || '');
          if (response.imageUrl) setImageUri(response.imageUrl);
          setIsEditing(false); // 이미 작성된 경우 읽기 모드
        }
      } catch (error) {
        console.log('일기 불러오기 실패:', error);
      }
    };
    fetchDiary();
  }, [diaryDate]);

  const handleSelectImage = () => {
    launchImageLibrary({ mediaType: 'photo', quality: 0.8 }, response => {
      if (response.didCancel) return;
      if (response.errorCode) {
        Alert.alert('이미지 선택 오류', response.errorMessage);
        return;
      }
      if (response.assets && response.assets.length > 0) {
        setImageUri(response.assets[0].uri);
      }
    });
  };

  const handleCreateDiary = async () => {
    if (!diaryText) {
      Alert.alert('작성 내용이 없습니다', '일기를 작성해주세요.');
      return;
    }

    try {
      const formData = new FormData();
      formData.append('content', diaryText);
      formData.append('message', messageText);
      formData.append('date', diaryDate);

      if (imageUri) {
        formData.append('image', {
          uri: imageUri,
          type: 'image/jpeg',
          name: 'photo.jpg',
        });
      }

      await post(config.DIARY.CREATE_DIARY, formData, {
        headers: { 'Content-Type': 'multipart/form-data' },
      });

      setIsEditing(false);
      setHasDiary(true);
      Alert.alert('완료', '일기가 저장되었습니다.');
    } catch (error) {
      console.error('일기 생성 실패:', error);
      Alert.alert('실패', '일기 저장 중 오류가 발생했습니다.');
    }
  };

  const handleDeleteDiary = async () => {
    try {
      await del(config.DIARY.DEL_DIARY(diaryDate));
      Alert.alert('삭제 완료', '일기가 삭제되었습니다.');
      navigation.goBack();
    } catch (error) {
      console.error('일기 삭제 실패:', error);
      Alert.alert('삭제 실패', '일기 삭제 중 오류가 발생했습니다.');
    }
  };

  const handleEditDiary = async () => {
    try {
      const formData = new FormData();
      formData.append('content', diaryText);
      formData.append('message', messageText);

      if (imageUri) {
        formData.append('image', {
          uri: imageUri,
          type: 'image/jpeg',
          name: 'photo.jpg',
        });
      }

      await put(config.DIARY.FIX_DIARY(diaryDate), formData, {
        headers: { 'Content-Type': 'multipart/form-data' },
      });

      Alert.alert('완료', '일기가 수정되었습니다.');
      setIsEditing(false);
    } catch (error) {
      console.error('일기 수정 실패:', error);
      Alert.alert('수정 실패', '일기 수정 중 오류가 발생했습니다.');
    }
  };

    const sendMessage = async () => {
    try {
        const url = `${config.MESSAGE.SEND_MESSAGE}?text=${encodeURIComponent(messageText)}`;

        await post(url, {});
        Alert.alert('완료', '메시지가 전송되었습니다.');
    } catch (error) {
        console.error('메시지 전송 실패:', error.response?.data || error.message);
        Alert.alert('전송 실패', '메시지 전송 중 오류가 발생했습니다.');
        }
    };
    

    useEffect(() => {
    if (!diary) return;

    setDiaryText(diary.content || '');
    setMessageText(diary.message || '');
    setImageUri(diary.imageUrl || null);
    setHasDiary(true);
    setIsEditing(false);
    }, [diary]);
    
  useLayoutEffect(() => {
    navigation.setOptions({
      headerRight: () => {
        if (isEditing) {
          return (
            <CustomButton
              title="완료"
              onPress={hasDiary ? handleEditDiary : handleCreateDiary}
            />
          );
        } else {
          return (
            <View style={{ flexDirection: 'row' }}>
              <CustomButton
                title="삭제"
                variant="delete"
                backgroundColor={colors.red}
                colors="red"
                onPress={handleDeleteDiary}
                style={{ marginRight: 12 }}
              />
              <CustomButton
                title="수정"
                variant="edit"
                onPress={() => setIsEditing(true)}
              />
            </View>
          );
        }
      },
    });
  }, [navigation, isEditing, hasDiary, diaryText, imageUri, messageText]);

  return (
    <Wrapper>
      <Content>
        <DiaryTopSection>
          <DiaryMain>
            <DiaryTitle>
              <MainTitle>{getFormattedDate()}</MainTitle>
            </DiaryTitle>
          </DiaryMain>

          <DiaryMainContent>
            <DiaryInput
              value={diaryText}
              onChangeText={setDiaryText}
              editable={isEditing}
              placeholder={`아내를 향한 진심을 전달해보는 건 어떨까요?`}
              placeholderTextColor="#999"
              multiline
              textAlignVertical="top"
            />
          </DiaryMainContent>
        </DiaryTopSection>

        <DiarySubContent>
          <DiaryMessage>
            <MessageTitle>아내에게 하고싶은 말 한마디</MessageTitle>
            <MessageContent>
              <MessageInput
                value={messageText}
                onChangeText={setMessageText}
                editable={isEditing}
                placeholder={'직접 말하지 못한걸 글로 표현해보는건 어떨까요?'}
                placeholderTextColor="#999"
                multiline
                textAlignVertical="top"
              />
              <TouchableOpacity onPress={sendMessage}>
                <Send width={30} height={30} />
              </TouchableOpacity>
            </MessageContent>
          </DiaryMessage>

          <DiaryRecordImg>
            <TouchableOpacity onPress={handleSelectImage} disabled={!isEditing}>
              <CommunityAddImg>
                {imageUri ? (
                  <>
                    <ImagePreview source={{ uri: imageUri }} />
                    <AttachText>이미지 첨부됨</AttachText>
                  </>
                ) : (
                  <GalleryRow>
                    <AttachText>초음파 사진 한 장을 첨부하세요</AttachText>
                    <Gallery width={30} height={30} />
                  </GalleryRow>
                )}
              </CommunityAddImg>
            </TouchableOpacity>
          </DiaryRecordImg>
        </DiarySubContent>
      </Content>
    </Wrapper>
  );
};

export default DiaryWriteScreen;

const Wrapper = styled.View`
  flex: 1;
  background-color: ${colors.white};
`;

const Content = styled.View`
  flex: 1;
  padding: ${width * 0.07}px;
  padding-bottom: ${width * 0.15}px;
  justify-content: space-between;
`;

const DiaryMain = styled.View``;
const DiaryTopSection = styled.View``;

const DiaryTitle = styled.View`
  border-bottom-width: 1px;
  border-bottom-color: ${colors.gray100};
  padding-bottom: 10px;
`;

const MainTitle = styled(HmmBText)`
  font-size: ${width * 0.04}px;
  color: ${colors.black};
`;

const DiaryMainContent = styled.View``;

const DiaryInput = styled.TextInput`
  font-family: 'HancomMalangMalang-Regular';
  font-size: ${width * 0.038}px;
  line-height: 23px;
`;

const DiarySubContent = styled.View`
  border-top-width: 1px;
  border-top-color: ${colors.gray100};
  padding-top: ${width * 0.01}px;
`;

const DiaryMessage = styled.View`
  margin-top: ${width * 0.05}px;
`;

const MessageTitle = styled(HmmBText)`
  font-size: ${width * 0.04}px;
`;

const MessageContent = styled.View`
  flex-direction: row;
  align-items: center;
  gap: ${width * 0.02}px;
`;

const MessageInput = styled.TextInput`
  flex: 1;
  font-family: 'HancomMalangMalang-Regular';
  font-size: ${width * 0.038}px;
  line-height: 23px;
`;

const DiaryRecordImg = styled.View`
  border-top-width: 1px;
  border-top-color: ${colors.gray100};
  margin-top: ${width * 0.04}px;
`;

const CommunityAddImg = styled.View`
  padding: ${width * 0.02}px 0;
`;

const GalleryRow = styled.View`
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  gap: ${width * 0.03}px;
`;

const AttachText = styled(HmmText)`
  color: ${colors.gray200};
  font-size: ${width * 0.038}px;
`;

const ImagePreview = styled.Image`
  width: ${width * 0.6}px;
  height: ${width * 0.4}px;
  border-radius: 12px;
  margin-bottom: 5px;
`;