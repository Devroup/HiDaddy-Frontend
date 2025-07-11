import React from 'react';
import styled from 'styled-components/native';
import { Dimensions, Touchable } from 'react-native';

import colors from '../../../constants/colors';
import Background from '../../../components/Background';

import HeartYellow from '../../../assets/imgs/icons/heart_yellow.svg';
import Info from '../../../assets/imgs/icons/info.svg';
import Camera from '../../../assets/imgs/icons/camera.svg';
import HeartCheck from '../../../assets/imgs/icons/heart_check.svg';
import { HmmText, HmmBText } from '../../../components/CustomText';
import { useNavigation } from '@react-navigation/native';

const { width } = Dimensions.get('window');

const MissionPerformScreen = () => {
  const navigation = useNavigation();

  return(
  <Wrapper>
    <Background />
    <Content>
      <MissionPerformMain>
        <MisssionPerformTitle>
          <Left>
            <HeartYellow width={24} height={24}/>
            <SectionTitle>아내에게 꽃을 선물하세요</SectionTitle>
          </Left>
          <Touchablecolumn
            onPress={()=> 
              navigation.navigate("MissionInfoScreen")
            }
          >
            <Info width={24} height={24}/>
          </Touchablecolumn>
        </MisssionPerformTitle>
        <MissionPerform>
          <PerformText>오늘하루 수고한 아내에게 꽃다발을 선물해보세요.</PerformText>
        </MissionPerform>
      </MissionPerformMain>

      <MissionPerformPhoto>
        <Camera width={100} height={100}/>
        <CameraText>촬영하기</CameraText>
      </MissionPerformPhoto>

      <MissionPerformKeyword>
        <KeywordTitle>
          <TitleText>사진 촬영 키워드</TitleText>
        </KeywordTitle>
        <KeywordInfo>
          <InfoText>*다음 키워드들을 모두 포함하는 사진을 촬영해 주세요.</InfoText>
        </KeywordInfo>
        <KeywordList>
          <KeywordListColumn>
            <KeywordText>꽃</KeywordText>
          </KeywordListColumn>
          <KeywordListColumn>
            <KeywordText>아내</KeywordText>
          </KeywordListColumn>
          <KeywordListColumn>
            <KeywordText>미소</KeywordText>
          </KeywordListColumn>
        </KeywordList>
      </MissionPerformKeyword>

      <MissionPerformMemo>
        <MissionPerformMemoTitle>
          <TitleText>어떤 마음으로 전했나요?</TitleText>
        </MissionPerformMemoTitle>
        <MissionPerformMemoInfo>
          <InfoInput
            placeholder="사진으로 다 못 전한 마음이 있다면, 여기에 적어주세요"
            placeholderTextColor="#999"
            multiline={true}
            textAlignVertical="top"
          />
        </MissionPerformMemoInfo>
      </MissionPerformMemo>
      
      <AiButton
        onPress={()=>
          navigation.navigate('', {
            screen: ''
          })
        }
      >
        <AiCircle>
          <HeartCheck width={32} height={32}/>
        </AiCircle>
      </AiButton>
    </Content>
  </Wrapper>
  );
};

export default MissionPerformScreen;

const Wrapper = styled.View`
  flex: 1;
`;

const Content = styled.View`
  padding: ${width * 0.07}px;
`;

const MissionPerformMain = styled.View`
  flex-direction: column;
`;

const Left = styled.View`
  flex-direction: row;
  align-items: center;
  gap: ${width*0.02}px;
`;

const MisssionPerformTitle = styled.View`
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
`;

const SectionTitle = styled(HmmBText)`
    font-size: ${width * 0.05}px;
    color: ${colors.black};
    margin-bottom: 10px;
`;

const Touchablecolumn = styled.TouchableOpacity`
`;

const MissionPerform = styled.View`
`;

const PerformText = styled(HmmText)`
    font-size: ${width * 0.038}px;
    color: ${colors.black};
    margin-bottom: 10px;
`;

const MissionPerformPhoto = styled.View`
  margin-top: 50px;
  align-items: center;
`;

const CameraText = styled(HmmText)`
  font-size: ${width*0.038};
  color: ${colors.gray100};
`;

const MissionPerformKeyword = styled.View`

`;

const KeywordTitle = styled.View`
  margin-top: 30px;
`;

const TitleText = styled(HmmBText)`
  font-size: ${width*0.04}
`;

const KeywordInfo = styled.View`
  margin-top: 10px;
`;

const InfoText = styled(HmmText)`
  font-size: ${width*0.034};
`;

const KeywordList = styled.View`
  justify-content: center;
  flex-direction: row;
  align-item: center;
  margin-top: 10px;
  gap: ${width * 0.25};
`;

const KeywordListColumn = styled.View`

`;

const KeywordText = styled(HmmText)`
  
`;

const MissionPerformMemo = styled.View`
  margin-top: 20px;
`;

const MissionPerformMemoTitle = styled.View`
`;

const MissionPerformMemoInfo = styled.View`
`;

const InfoInput = styled.TextInput`
`;

const AiButton = styled.TouchableOpacity`
  position: absolute;
  bottom: ${width * 0.01}px;
  right: ${width * 0.06}px;
`;

const AiCircle = styled.View`
  top: ${width*0.6}px;
  background-color: ${colors.white};
  width: ${width * 0.14}px;
  height: ${width * 0.14}px;
  border-radius: 100px;
  border: 2px solid ${colors.black};
  justify-content: center;
  align-items: center;
  elevation: 4;
`;