import React, { useState, useCallback } from 'react';
import styled from 'styled-components/native';
import { Dimensions, FlatList, ActivityIndicator } from 'react-native';
import { useFocusEffect, useNavigation } from '@react-navigation/native';

import colors from '../../constants/colors';
import Background from '../../components/Background';
import { get } from '../../services/api';
import config from '../../constants/config';

import { HmmText, HmmBText } from '../../components/CustomText';

import Write from '../../assets/imgs/icons/write.svg';
import EmptyHeartlike from '../../assets/imgs/icons/heart_red_empty.svg';
import Comment from '../../assets/imgs/icons/comment.svg';
import Heartlike from '../../assets/imgs/icons/heart_red.svg';

const { width } = Dimensions.get('window');

const CommunityScreen = () => {
  const navigation = useNavigation();

  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchPosts = async () => {
    try {
      const response = await get(config.COMMUNITY.GET_POST);
      console.log('서버응답:', response);
      setPosts(response?.content || []);
    } catch (err) {
      console.error('게시글 불러오기 실패:', err);
    } finally {
      setLoading(false);
    }
  };

  useFocusEffect(
    useCallback(() => {
      setLoading(true);
      fetchPosts();
    }, [])
  );

  const formatDateTime = (timestamp) => {
    const date = new Date(timestamp);
    const year = date.getFullYear();
    const month = (date.getMonth() + 1).toString().padStart(2, '0');
    const day = date.getDate().toString().padStart(2, '0');
    const hours = date.getHours().toString().padStart(2, '0');
    const minutes = date.getMinutes().toString().padStart(2, '0');
    return `${year}.${month}.${day} ${hours}:${minutes}`;
  };

  const renderItem = ({ item }) => (
    <PostWrapper
      onPress={() =>
        navigation.navigate('CommunityStackNavigator', {
          screen: 'CommunityDetailScreen',
          params: { postId: item.id },
        })
      }
    >
      <CommunityMainProfile>
        <MainProfileIMG
          source={
            item.authorProfileImageUrl
              ? { uri: item.authorProfileImageUrl }
              : require('../../assets/imgs/icons/myprofile.svg')
          }
        />
        <MainProfileText>
          <ProfileId>
            <Id>
              <IdText>{item.authorName}</IdText>
            </Id>
            <Time>
              <TimeText>{formatDateTime(item.createdAt)}</TimeText>
            </Time>
          </ProfileId>
        </MainProfileText>
      </CommunityMainProfile>

      <CommunityMainContent>
        <ContentText numberOfLines={3}>{item.content}</ContentText>

        {item.imageUrl ? (
          <PostImage source={{ uri: item.imageUrl }} resizeMode="cover" />
        ) : null}
      </CommunityMainContent>

      <CommunityMainResponse>
        <CommunityMainLike>
          {item.liked ? (
            <Heartlike width={24} height={24} />
          ) : (
            <EmptyHeartlike width={24} height={24} />
          )}
          <Heartlikecount>
            <CountText>{item.likeCount}</CountText>
          </Heartlikecount>
        </CommunityMainLike>
        <CommunityMainComment>
          <Comment width={24} height={24} />
          <Commentcount>
            <CommentText>{item.commentCount}</CommentText>
          </Commentcount>
        </CommunityMainComment>
      </CommunityMainResponse>
    </PostWrapper>
  );

  if (loading) {
    return (
      <Wrapper>
        <Background />
        <ActivityIndicator size="large" color={colors.red} style={{ marginTop: 50 }} />
      </Wrapper>
    );
  }

  return (
    <Wrapper>
      <Background />
      <Content>
        <CommunityMain>
          <CommunityMainTitle>
            <MainTitle>아빠들의 이야기</MainTitle>
            <Touchable
              onPress={() =>
                navigation.navigate('CommunityStackNavigator', {
                  screen: 'CommunityWriteScreen',
                })
              }
            >
              <Write width={35} height={35} />
            </Touchable>
          </CommunityMainTitle>
        </CommunityMain>

        <FlatList
          data={posts}
          keyExtractor={(item) => item.id.toString()}
          renderItem={renderItem}
          showsVerticalScrollIndicator={false}
          contentContainerStyle={{ paddingBottom: 50 }}
        />
      </Content>
    </Wrapper>
  );
};

export default CommunityScreen;

const Wrapper = styled.View`
  flex: 1;
`;

const Content = styled.View`
  margin-top: 30px;
  padding: ${width * 0.1}px;
`;

const CommunityMain = styled.View`
  border-bottom-width: 1px;
  border-bottom-color: ${colors.gray100};
  padding-bottom: 10px;
`;

const CommunityMainTitle = styled.View`
  flex-direction: row;
  gap: ${width * 0.34}px;
`;

const MainTitle = styled(HmmBText)`
  font-size: 24px;
  color: ${colors.black};
`;

const Touchable = styled.TouchableOpacity`
  flex-direction: row;
  align-items: center;
  gap: ${width * 0.38}px;
`;

const PostWrapper = styled.TouchableOpacity`
  border-bottom-width: 1px;
  border-bottom-color: ${colors.gray100};
  padding-bottom: 15px;
`;

const CommunityMainProfile = styled.View`
  flex-direction: row;
  margin-top: 16px;
  align-items: center;
`;

const MainProfileIMG = styled.Image`
  width: 40px;
  height: 40px;
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

const CommunityMainContent = styled.View`
  margin-top: 17px;
`;

const ContentText = styled(HmmText)``;

const PostImage = styled.Image`
  width: 100%;
  height: ${width * 0.5}px;
  border-radius: 10px;
  margin-top: 10px;
`;

const CommunityMainResponse = styled.View`
  margin-top: 17px;
  flex-direction: row;
  padding-bottom: 10px;
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
