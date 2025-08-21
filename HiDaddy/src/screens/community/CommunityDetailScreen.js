import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { Dimensions, KeyboardAvoidingView, Alert, TouchableOpacity, ScrollView } from 'react-native';
import { useRoute, useNavigation } from '@react-navigation/native';

import colors from '../../constants/colors';
import Dot from '../../assets/imgs/icons/dots.svg';
import EmptyHeartlike from '../../assets/imgs/icons/heart_red_empty.svg';
import CommentIcon from '../../assets/imgs/icons/comment.svg';
import Heartlike from '../../assets/imgs/icons/heart_red.svg';
import Send from '../../assets/imgs/icons/send.svg';
import { HmmBText, HmmText } from '../../components/CustomText';

import { get, post as apiPost, del, put } from '../../services/api';
import config from '../../constants/config';

const { width } = Dimensions.get('window');

const CommunityDetailScreen = () => {
  const route = useRoute();
  const navigation = useNavigation();
  const initialPost = route.params?.post;
  const postId = initialPost?.id || route.params?.postId;

  const [post, setPost] = useState(initialPost || null);
  const [comments, setComments] = useState([]);
  const [commentInput, setCommentInput] = useState('');
  const [editingCommentId, setEditingCommentId] = useState(null);
  const [loading, setLoading] = useState(true);
  const [currentUser, setCurrentUser] = useState(null);

  const fetchCurrentUser = async () => {
    try {
      const response = await get(config.USER.ME);
      setCurrentUser(response);
    } catch (err) {
      console.log('유저 정보 불러오기 실패:', err);
    }
  };

  const fetchPostDetail = async () => {
    try {
      const response = await get(config.COMMUNITY.DETAIL_POST(postId));
      setPost(response);
    } catch (err) {
      console.log('게시글 상세 불러오기 실패:', err);
    }
  };

  const fetchComments = async () => {
    try {
      const response = await get(config.COMMUNITY.GET_COMMENT(postId));
      if (Array.isArray(response.content)) {
        setComments([...response.content]);
      } else {
        setComments([]);
      }
    } catch (err) {
      console.log('댓글 불러오기 실패:', err);
      setComments([]);
    }
  };

  const handleSend = async () => {
    if (!commentInput.trim() || !postId) return;
    try {
      if (editingCommentId) {
        await put(config.COMMUNITY.FIX_COMMENT(postId, editingCommentId), { content: commentInput });
        setEditingCommentId(null);
      } else {
        await apiPost(config.COMMUNITY.CREATE_COMMENT(postId), { content: commentInput });
      }
      setCommentInput('');
      fetchComments();
    } catch (err) {
      console.log('댓글 전송 실패:', err);
    }
  };

  const handleToggleLike = async () => {
    try {
      await apiPost(config.COMMUNITY.POST_LIKE(postId));
      setPost((prev) => ({
        ...prev,
        liked: !prev?.liked,
        likeCount: prev?.liked ? prev.likeCount - 1 : prev.likeCount + 1,
      }));
    } catch (err) {
      console.log('좋아요 토글 실패:', err);
    }
  };

  const handleEditPost = () => {
    navigation.navigate('CommunityWriteScreen', { post });
  };

  const handleDeletePost = async () => {
    try {
      await del(config.COMMUNITY.DEL_POST(postId));
      navigation.goBack();
    } catch (err) {
      console.log('게시글 삭제 실패:', err);
    }
  };
  const openMenu = () => {
    Alert.alert('메뉴', '', [
      { text: '수정', onPress: handleEditPost },
      { 
        text: '삭제', 
        onPress: () =>
          Alert.alert('삭제 확인', '정말 삭제하시겠습니까?', [
            { text: '취소', style: 'cancel' },
            { text: '삭제', style: 'destructive', onPress: handleDeletePost },
          ])
      },
      { text: '취소', style: 'cancel' },
    ]);
  };

  const handleCommentMenu = (comment) => {
    Alert.alert('댓글 메뉴', '', [
      { text: '수정', onPress: () => handleEditComment(comment) },
      { text: '삭제', onPress: () => handleDeleteComment(comment) },
      { text: '취소', style: 'cancel' },
    ]);
  };
  const handleEditComment = (comment) => {
    setCommentInput(comment.content);
    setEditingCommentId(comment.id);
  };
  const handleDeleteComment = async (comment) => {
    try {
      await del(config.COMMUNITY.DEL_COMMENT(postId, comment.id));
      fetchComments();
    } catch (err) {
      console.log('댓글 삭제 실패:', err);
    }
  };

  const formatDateTime = (timestamp) => {
    const date = new Date(timestamp);
    const year = date.getFullYear();
    const month = (date.getMonth() + 1).toString().padStart(2, '0');
    const day = date.getDate().toString().padStart(2, '0');
    const hours = date.getHours().toString().padStart(2, '0');
    const minutes = date.getMinutes().toString().padStart(2, '0');
    return `${year}.${month}.${day} ${hours}:${minutes}`;
  };

  useEffect(() => {
    Promise.all([fetchCurrentUser(), fetchPostDetail(), fetchComments()])
      .finally(() => setLoading(false));
  }, [postId]);

  if (loading) return (<Wrapper><HmmText>로딩 중입니다...</HmmText></Wrapper>);
  if (!post) return (<Wrapper><HmmText>게시글 정보를 찾을 수 없습니다.</HmmText></Wrapper>);

  return (
    <Wrapper>
      <ScrollView contentContainerStyle={{ padding: width * 0.08, paddingBottom: 120 }}>
        <CommunityMainProfile>
          <MainProfileLeft>
            <MainProfileIMG
              source={
                post.authorProfileImageUrl
                  ? { uri: post.authorProfileImageUrl }
                  : require('../../assets/imgs/icons/myprofile.svg')
              }
            />
            <MainProfileText>
              <ProfileId>
                <Id><IdText>{post.authorName}</IdText></Id>
                <Time><TimeText>{formatDateTime(post.createdAt)}</TimeText></Time>
              </ProfileId>
            </MainProfileText>
          </MainProfileLeft>

          {currentUser && post.authorId === currentUser.userId && (
            <MainProfileFix>
              <TouchableOpacity onPress={openMenu}>
                <Dot width={24} height={24} />
              </TouchableOpacity>
            </MainProfileFix>
          )}
        </CommunityMainProfile>

        <CommunityMainContent>
          <ContentText>{post.content}</ContentText>
          {post.imageUrl && <PostImage source={{ uri: post.imageUrl }} resizeMode="cover" />}
        </CommunityMainContent>

        <CommunityMainResponse>
          <CommunityMainLike>
            <TouchableOpacity onPress={handleToggleLike}>
              {post?.liked ? <Heartlike width={24} height={24} /> : <EmptyHeartlike width={24} height={24} />}
            </TouchableOpacity>
            <Heartlikecount><CountText>{post.likeCount || 0}</CountText></Heartlikecount>
          </CommunityMainLike>
          <CommunityMainComment>
            <CommentIcon width={24} height={24} />
            <Commentcount><CommentText>{comments.length}</CommentText></Commentcount>
          </CommunityMainComment>
        </CommunityMainResponse>

        {comments.length === 0 ? (
          <CommentsText>댓글이 없습니다.</CommentsText>
        ) : (
          comments.map((c) => (
            <CommentItem key={c.id}>
              <UserProfile>
                <CommentProfileIMG
                  source={
                    c.authorProfileImageUrl
                      ? { uri: c.authorProfileImageUrl }
                      : require('../../assets/imgs/icons/myprofile.svg')
                  }
                />
                <Id><IdText>{c.authorName}</IdText></Id>
                <Time><TimeText>{formatDateTime(c.createdAt)}</TimeText></Time>
              </UserProfile>

              <CommentsRow>
                <CommentsText>{c.content}</CommentsText>
                <CommentActions>
                  <TouchableOpacity style={{ marginRight: 8 }}>
                    <EmptyHeartlike width={20} height={20} />
                  </TouchableOpacity>
                  {currentUser && c.authorId === currentUser.userId && (
                    <TouchableOpacity onPress={() => handleCommentMenu(c)}>
                      <Dot width={20} height={20} />
                    </TouchableOpacity>
                  )}
                </CommentActions>
              </CommentsRow>
            </CommentItem>
          ))
        )}
      </ScrollView>

      <KeyboardAvoidingView behavior={undefined} keyboardVerticalOffset={0}>
        <CommentInputWrapper>
          <StyledTextInput
            placeholder="댓글을 입력하세요."
            placeholderTextColor={colors.gray100}
            value={commentInput}
            onChangeText={setCommentInput}
          />
          <SendButton onPress={handleSend}>
            <Send width={28} height={28} />
          </SendButton>
        </CommentInputWrapper>
      </KeyboardAvoidingView>
    </Wrapper>
  );
};

export default CommunityDetailScreen;

const Wrapper = styled.View`
  flex: 1;
  background-color: ${colors.white};
`;

const CommunityMainProfile = styled.View`
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  border-bottom-width: 1px;
  border-bottom-color: ${colors.gray100};
  padding-bottom: 10px;
`;

const MainProfileLeft = styled.View`
  flex-direction: row;
  align-items: center;
`;

const MainProfileIMG = styled.Image`
  width: 40px;
  height: 40px;
`;

const CommentProfileIMG = styled.Image`
  width: 30px;
  height: 30px;
`;

const MainProfileText = styled.View`
  margin-left: 10px;
`;

const ProfileId = styled.View`
  flex-direction: column;
`;

const Id = styled.View``;

const IdText = styled(HmmText)`
  font-size: ${width * 0.038}px;
  color: ${colors.black};
`;

const Time = styled.View`
  margin-top: 4px;
`;

const TimeText = styled(HmmText)`
  font-size: ${width * 0.034}px;
  color: ${colors.gray100};
`;

const MainProfileFix = styled.View`
  flex-direction: row;
`;

const CommunityMainContent = styled.View`
  margin-top: 17px;
`;

const ContentText = styled(HmmText)``;

const PostImage = styled.Image`
  width: 100%;
  height: 300px;
  border-radius: 12px;
  margin-top: 12px;
`;

const CommunityMainResponse = styled.View`
  margin-top: 17px;
  flex-direction: row;
  border-bottom-width: 1px;
  border-bottom-color: ${colors.gray100};
  padding-bottom: ${width * 0.03}px;
  margin-bottom: ${width * 0.02}px;
`;

const CommunityMainLike = styled.View`
  flex-direction: row;
  align-items: center;
`;

const CommunityMainComment = styled.View`
  flex-direction: row;
  margin-left: 9px;
`;

const Heartlikecount = styled.View`
  margin-left: 4px;
`;

const CountText = styled(HmmText)`
  color: ${colors.red};
`;

const Commentcount = styled.View`
  margin-left: 4px;
`;

const CommentText = styled(HmmBText)``;

const CommentItem = styled.View`
  margin-bottom: ${width * 0.02}px;
  border-bottom-width: 1px;
  border-bottom-color: ${colors.gray100};
  padding-bottom: ${width * 0.03}px;
`;

const UserProfile = styled.View`
  flex-direction: row;
  gap: ${width * 0.02}px;
  align-items: center;
`;

const CommentsRow = styled.View`
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  margin-left: ${width * 0.07}px;
  margin-top: ${width * 0.015}px;
`;

const CommentActions = styled.View`
  flex-direction: row;
  align-items: center;
`;

const CommentsText = styled(HmmText)``;

const CommentInputWrapper = styled.View`
  flex-direction: row;
  align-items: center;
  border-top-width: 1px;
  border-top-color: ${colors.gray100};
  padding: 8px 12px 20px;
  background-color: ${colors.white};
`;

const StyledTextInput = styled.TextInput`
  flex: 1;
  padding: 8px 12px;
  font-size: 14px;
  color: ${colors.black};
`;

const SendButton = styled.TouchableOpacity`
  padding-left: 8px;
  justify-content: center;
  align-items: center;
  width: 40px;
  height: 40px;
`;