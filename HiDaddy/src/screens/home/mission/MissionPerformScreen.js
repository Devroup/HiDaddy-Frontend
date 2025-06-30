import React from 'react';
import styled from 'styled-components/native';
import { Dimensions, Touchable } from 'react-native';

import colors from '../../../constants/colors';
import Background from '../../../components/Background';

import HeartYellow from '../../../assets/imgs/icons/heart_yellow.svg';
import Info from '../../../assets/imgs/icons/info.svg';
import Camera from '../../../assets/imgs/icons/camera.svg';
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
          <HeartYellow width={24} height={24}/>
          <SectionTitle>아내에게 꽃을 선물하세요</SectionTitle>
          <Touchablecolumn
            onPress={()=> 
              navigation.navigate("MissionInfoScreen")
            }
          >
            <Info width={24} height={24}/>
          </Touchablecolumn>
        </MisssionPerformTitle>
        <MissionPerformInfo>
          <PerformText>오늘하루 수고한 아내에게 꽃다발을 선물해보세요.</PerformText>
        </MissionPerformInfo>
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

const MisssionPerformTitle = styled.View`
  flex-direction: row;
  align-items: center;
`;

const SectionTitle = styled(HmmBText)`
    font-size: ${width * 0.05}px;
    color: ${colors.black};
    margin-bottom: 10px;
`;

const Touchablecolumn = styled.TouchableOpacity`
`;

const MissionPerformInfo = styled.View`
  
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