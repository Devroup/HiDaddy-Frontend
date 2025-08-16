import React, { useState, useLayoutEffect, useEffect } from 'react';
import styled from 'styled-components/native';
import { Dimensions, Alert, TouchableOpacity, Image } from 'react-native';
import * as ImagePicker from 'react-native-image-picker';
import { useNavigation, useRoute } from '@react-navigation/native';

import colors from '../../constants/colors';
import Gallery from '../../assets/imgs/icons/addimg.svg';
import { post, put } from '../../services/api';
import config from '../../constants/config';
import CustomButton from '../../components/CustomButton';

const { width } = Dimensions.get('window');

const CommunityWriteScreen = () => {
  const navigation = useNavigation();
  const route = useRoute();
  const editPost = route.params?.post;

  const [content, setContent] = useState(editPost?.content || '');
  const [imageUri, setImageUri] = useState(editPost?.imageUrl || null);
  const [loading, setLoading] = useState(false);

  const selectImage = () => {
    ImagePicker.launchImageLibrary(
      {
        mediaType: 'photo',
        maxWidth: 800,
        maxHeight: 800,
        quality: 0.8,
      },
      (response) => {
        if (response.didCancel) return;
        if (response.errorCode) {
          Alert.alert('오류', '이미지 선택 중 오류가 발생했습니다.');
          return;
        }
        if (response.assets && response.assets.length > 0) {
          setImageUri(response.assets[0].uri || null);
        }
      }
    );
  };

  const handleSubmit = async () => {
    if (!content.trim()) {
      Alert.alert('알림', '내용을 입력해주세요.');
      return;
    }

    setLoading(true);

    try {
      const formData = new FormData();
      formData.append('content', content);

      if (imageUri) {
        formData.append('image', {
          uri: imageUri,
          type: 'image/jpeg',
          name: 'photo.jpg',
        });
      }

      if (editPost?.id) {
        await put(config.COMMUNITY.FIX_POST(editPost.id), formData, {
          headers: { 'Content-Type': 'multipart/form-data' },
        });
        Alert.alert('성공', '게시글이 수정되었습니다.', [
          { text: '확인', onPress: () => navigation.goBack() },
        ]);
      } else {
        await post(config.COMMUNITY.CREATE_POST, formData, {
          headers: { 'Content-Type': 'multipart/form-data' },
        });
        Alert.alert('성공', '게시글이 작성되었습니다.', [
          { text: '확인', onPress: () => navigation.goBack() },
        ]);
      }
    } catch (err) {
      console.log('게시글 작성/수정 에러:', err);
      Alert.alert('오류', '게시글 작성/수정에 실패했습니다. 다시 시도해주세요.');
    } finally {
      setLoading(false);
    }
  };

  useLayoutEffect(() => {
    navigation.setOptions({
      headerRight: () => (
        <CustomButton
          title={loading ? '작성중...' : '완료'}
          onPress={handleSubmit}
          backgroundColor="#000"
          textColor="#fff"
        />
      ),
    });
  }, [navigation, handleSubmit, loading]);

  return (
    <Wrapper>
      <Content>
        <CommunityTopSection>
          <CommunityWriteMain>
            <CommunityContent>
              <ContentInput
                placeholder="타인을 비방하고 저격하는 게시글, 광고성 게시글 등 부적절한 글 작성 시 커뮤니티 활동에 제한을 받을 수 있습니다."
                placeholderTextColor="#999"
                multiline
                textAlignVertical="top"
                value={content}
                onChangeText={setContent}
                editable={!loading}
              />
            </CommunityContent>
          </CommunityWriteMain>
        </CommunityTopSection>

        <CommunitySubContent>
          <TouchableOpacity onPress={selectImage} disabled={loading}>
            <CommunityAddImg>
              {imageUri ? (
                <>
                  <ImagePreview source={{ uri: imageUri }} />
                  <AttachText>이미지 첨부됨</AttachText>
                </>
              ) : (
                <GalleryRow>
                  <AttachText>이미지 첨부하기</AttachText>
                  <Gallery width={30} height={30} />
                </GalleryRow>
              )}
            </CommunityAddImg>
          </TouchableOpacity>
        </CommunitySubContent>
      </Content>
    </Wrapper>
  );
};

export default CommunityWriteScreen;

const Wrapper = styled.View`
  flex: 1;
  background-color: ${colors.white};
`;

const Content = styled.View`
  flex: 1;
  padding: ${width * 0.07}px;
  padding-bottom: ${width * 0.1}px;
  justify-content: space-between;
`;

const CommunityTopSection = styled.View``;

const CommunityWriteMain = styled.View`
  border-top-width: 1px;
  border-top-color: ${colors.gray200};
`;

const CommunityContent = styled.View``;

const ContentInput = styled.TextInput`
  font-family: 'HancomMalangMalang-Regular';
  font-size: ${width * 0.036}px;
  line-height: 23px;
  min-height: 150px;
`;

const CommunitySubContent = styled.View`
  border-top-width: 1px;
  border-top-color: ${colors.gray200};
`;

const CommunityAddImg = styled.View`
  margin-top: ${width * 0.05}px;
  align-items: flex-end;
`;

const GalleryRow = styled.View`
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  width: 100%;
`;

const ImagePreview = styled.Image`
  width: 80px;
  height: 80px;
  border-radius: 10px;
  margin-bottom: 5px;
`;

const AttachText = styled.Text`
  font-size: ${width * 0.034}px;
  color: ${colors.gray700};
  margin-left: 8px;
`;
