import React from 'react';
import styled from 'styled-components/native';
import { Dimensions } from 'react-native';
import { useNavigation } from '@react-navigation/native';

import colors from '../../constants/colors';
import Background from '../../components/Background';

import Write from '../../assets/imgs/icons/write.svg';
import Profile from '../../assets/imgs/icons/myprofile.svg';
import EmptyHeartlike from '../../assets/imgs/icons/heart_red_empty.svg';
import Comment from '../../assets/imgs/icons/comment.svg';
import Heartlike from '../../assets/imgs/icons/heart_red.svg';
import { HmmText, HmmBText } from '../../components/CustomText';

const { width } = Dimensions.get('window');

const BoardScreen = () => {
  const navigation = useNavigation();

  return(
  <Wrapper>
    <Background />
    <Content>
      <CommunityMain>
        <CommunityMainTitle>
          <MainTitle>아빠들의 이야기</MainTitle>
          <Touchable
            onPress={() =>
              navigation.navigate('CommunityStackNavigator', {
                screen: 'BoardWriteScreen'
              })
            }
            >
            <Write width={35} height={35}/>
          </Touchable>
        </CommunityMainTitle>
      </CommunityMain>
      <CommunityMainProfile>
          <MainProfileIMG>
            <Profile width={30} height={30}/>
          </MainProfileIMG>
          <MainProfileText>
            <ProfileId>
              <Id>
                <IdText>닉네임</IdText>
              </Id>
              <Time>
                <TimeText>2025.05.24 19:35</TimeText>
              </Time>
            </ProfileId>
          </MainProfileText>
        </CommunityMainProfile>

        <CommunityMainContent>
          <Touchable
            onPress={() => 
              navigation.navigate('CommunityStackNavigator', {
                screen: 'BoardDetailScreen'
              })
            }
          >
          <ContentText>
            나는 할 말이 없다. 왜냐하면 할 말이 없기 때문이다. 그러나 어쩔 수 없이 할 말을 적어야한다. 임시로 일단 적어 놓아야 디자인을 하던가 말던가 하기 때문이다. 근데 진짜 할 말이 없다. 아 할 말 있다. 집이 최고다.
          </ContentText>
          </Touchable>
        </CommunityMainContent>
        <CommunityMainImage>

        </CommunityMainImage>

        <CommunityMainResponse>
          <CommunityMainLike>
            <EmptyHeartlike width={24} height={24}/>
            <Heartlikecount>
              <CountText>100</CountText>
            </Heartlikecount>
          </CommunityMainLike>
          <CommunityMainComment>
            <Comment width={24} height={24}/>
            <Commentcount>
              <CommentText>12</CommentText>
            </Commentcount>
          </CommunityMainComment>
        </CommunityMainResponse>
    </Content>
  </Wrapper>
);
};
export default BoardScreen;

const Wrapper = styled.View`
  flex: 1;
`

const Content = styled.View`
  margin-top: 20px;
  padding: ${width * 0.1}px;
`;

const CommunityMain = styled.View`
  border-bottom-width: 1px;
  border-bottom-color: ${colors.gray100};
  padding-bottom: 10px;
`;

const CommunityMainTitle = styled.View`
  flex-direction: row;
  gap: ${width*0.34}px;  
`;

const MainTitle = styled(HmmBText)`
  font-size: 24px;
  color: ${colors.black};
`;

const Touchable = styled.TouchableOpacity`
  flex-direction:row;
  align-items: center;
  gap: ${width*0.38}px;
`;

const CommunityMainProfile = styled.View`
  flex-direction: row;
  margin-top: 16px;
  align-items: center;
`;

const MainProfileIMG = styled.View`
  border-radius: 100px;  
  background-color: ${colors.gray100};
  border: 2px solid ${colors.black};
`;

const MainProfileText = styled.View`
  margin-left: 10px;
`;

const ProfileId = styled.View`
  flex-direction: column;
`;

const Id = styled.View`
`;

const IdText = styled(HmmText)`
  font-size: ${width*0.038};
  color: ${colors.black};
`;

const Time = styled.View`
  margin-top: 4px;
`;

const TimeText = styled(HmmText)`
  font-size: ${width*0.034};
  color: ${colors.gray100};
`;

const CommunityMainContent = styled.View`
  margin-top: 17px;
`;

const ContentText = styled(HmmText)`
`;

const CommunityMainImage = styled.View`
`;

const CommunityMainResponse = styled.View`
  margin-top: 17px;
  flex-direction: row;
  border-bottom-width: 1px;
  border-bottom-color: ${colors.gray100};
  padding-bottom: 10px;
`;

const CommunityMainLike = styled.View`
  flex-direction: row;
  align-item: center;
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

const CommentText = styled(HmmBText)`
`;