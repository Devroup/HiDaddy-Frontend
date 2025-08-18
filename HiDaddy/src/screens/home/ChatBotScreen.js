import React, { useState, useEffect, useRef } from 'react';
import styled from 'styled-components/native';
import { Dimensions, ScrollView, KeyboardAvoidingView } from 'react-native';

import colors from '../../constants/colors';
import Background from '../../components/Background';
import { HmmText, HmmBText } from '../../components/CustomText';

import Bot from '../../assets/imgs/icons/bot.svg';
import SendButton from '../../assets/imgs/icons/send.svg';

const { width } = Dimensions.get('window');

const ChatBotScreen = () => {
  const [message, setMessage] = useState('');
  const [messages, setMessages] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const scrollViewRef = useRef(null);
  const ws = useRef(null);
  const [isWsReady, setIsWsReady] = useState(false);

  useEffect(() => {
    scrollViewRef.current?.scrollToEnd({ animated: true });
  }, [messages]);

  // 봇 응답 실시간 업데이트
  const updateLastBotMessage = newChunk => {
    setMessages(prev => {
      const newMessages = [...prev];
      const lastMessage = newMessages[newMessages.length - 1];

      if (lastMessage && lastMessage.role === 'bot') {
        if (lastMessage.isLoading) {
          lastMessage.content = newChunk;
          delete lastMessage.isLoading;
        } else {
          lastMessage.content += newChunk;
        }
      } else {
        newMessages.push({ role: 'bot', content: newChunk });
      }

      return newMessages;
    });
  };

  useEffect(() => {
    const socket = new WebSocket('wss://devroup.com/chatbot/ws/chat');

    socket.onopen = () => {
      console.log('WebSocket 연결됨');
      setIsWsReady(true);
    };

    socket.onmessage = event => {
      try {
        const data = JSON.parse(event.data);

        if (data.type === 'chunk') {
          updateLastBotMessage(data.content);
        } else if (data.type === 'end') {
          console.log('메시지 끝!');
        } else if (data.type === 'error') {
          console.error('챗봇 오류:', data.content);
          updateLastBotMessage('\n\n죄송합니다. 오류가 발생했어요.');
        }
      } catch (e) {
        console.error('JSON 파싱 오류:', e);
      }
    };

    socket.onerror = error => {
      console.error('WebSocket 에러:', error);
    };

    socket.onclose = () => {
      console.log('WebSocket 연결 종료');
      setIsWsReady(false);
    };

    ws.current = socket;

    return () => {
      socket.close();
    };
  }, []);

  const handleSend = userMessage => {
    if (!userMessage.trim()) return;

    setMessages(prev => [...prev, { role: 'user', content: userMessage }]);
    setMessage('');
    setIsLoading(true);

    setMessages(prev => [
      ...prev,
      { role: 'bot', content: '. . .', isLoading: true },
    ]);

    if (isWsReady && ws.current.readyState === WebSocket.OPEN) {
      ws.current.send(
        JSON.stringify({
          message: userMessage,
          user_id: null,
        }),
      );
    } else {
      console.error('WebSocket이 아직 연결되지 않았습니다.');
      setMessages(prev => [
        ...prev.slice(0, -1),
        {
          role: 'bot',
          content: '연결이 아직 준비되지 않았어요. 잠시 후 다시 시도해주세요.',
        },
      ]);
      setIsLoading(false);
    }
  };

  return (
    <Wrapper>
      <Background style={{ position: 'absolute' }} />
      <KeyboardAvoidingView style={{ flex: 1 }} behavior="padding">
        <ScrollView
          ref={scrollViewRef}
          style={{ flex: 1 }}
          contentContainerStyle={{ flexGrow: 1, padding: width * 0.06 }}
          keyboardShouldPersistTaps="handled"
        >
          <BotRow>
            <ProfileCircle>
              <Bot width={24} height={24} />
            </ProfileCircle>

            <BotTextGroup>
              <Label>
                <HmmBText
                  style={{ color: colors.black, fontSize: width * 0.038 }}
                >
                  아이키퍼
                </HmmBText>
              </Label>

              <BotMessageBox>
                <BotMessage>
                  안녕하세요, 아이키퍼입니다. 아빠의 마음, 고민, 궁금한 점이
                  있다면 언제든 편하게 말해주세요.
                </BotMessage>
              </BotMessageBox>
            </BotTextGroup>
          </BotRow>

          {messages.map((msg, idx) => {
            if (msg.role === 'user') {
              return (
                <UserMessageBox key={idx}>
                  <UserMessage>{msg.content}</UserMessage>
                </UserMessageBox>
              );
            } else if (msg.role === 'bot') {
              return (
                <BotRow key={idx}>
                  <ProfileCircle>
                    <Bot width={24} height={24} />
                  </ProfileCircle>
                  <BotTextGroup>
                    <BotMessageBox>
                      <BotMessage>{msg.content}</BotMessage>
                    </BotMessageBox>
                  </BotTextGroup>
                </BotRow>
              );
            } else {
              return null;
            }
          })}
        </ScrollView>

        <InputRow>
          <MessageInput
            placeholder="메시지를 입력하세요."
            placeholderTextColor={colors.gray300}
            value={message}
            onChangeText={setMessage}
            onSubmitEditing={e => handleSend(e.nativeEvent.text)}
          />
          <SendButtonWrapper onPress={() => handleSend(message)}>
            <SendButton width={24} height={24} />
          </SendButtonWrapper>
        </InputRow>
      </KeyboardAvoidingView>
    </Wrapper>
  );
};

export default ChatBotScreen;

const Wrapper = styled.View`
  flex: 1;
`;

const BotRow = styled.View`
  flex-direction: row;
  align-items: flex-start;
  margin-bottom: ${width * 0.04}px;
`;

const ProfileCircle = styled.View`
  width: ${width * 0.12}px;
  height: ${width * 0.12}px;
  border-radius: 50px;
  overflow: hidden;
  justify-content: center;
  align-items: center;
  background-color: ${colors.white};
  border: 2px solid ${colors.black};
`;

const BotTextGroup = styled.View`
  flex-direction: column;
  margin-left: ${width * 0.02}px;
  flex-shrink: 1;
`;

const Label = styled.View`
  flex-direction: row;
  align-items: center;
  margin-bottom: ${width * 0.015}px;
`;

const BotMessageBox = styled.View`
  background-color: ${colors.white};
  border: 1px solid ${colors.black};
  border-radius: 5px;
  padding: ${width * 0.035}px ${width * 0.04}px;
  max-width: ${width * 0.6}px;
  align-self: flex-start;
`;

const BotMessage = styled(HmmText)`
  color: ${colors.black};
  font-size: ${width * 0.034}px;
  line-height: ${width * 0.055}px;
`;

const UserMessageBox = styled.View`
  align-self: flex-end;
  background-color: ${colors.black};
  border-radius: 5px;
  padding: ${width * 0.035}px ${width * 0.04}px;
  max-width: ${width * 0.6}px;
  margin-bottom: ${width * 0.03}px;
`;

const UserMessage = styled(HmmText)`
  color: ${colors.white};
  font-size: ${width * 0.034}px;
  line-height: ${width * 0.055}px;
`;

const InputRow = styled.View`
  flex-direction: row;
  align-items: center;
  border-top-width: 1px;
  border-color: ${colors.gray200};
  padding: ${width * 0.05}px;
  background-color: ${colors.white};
`;

const MessageInput = styled.TextInput`
  flex: 1;
  padding: ${width * 0.04}px;
  font-size: ${width * 0.034}px;
  font-family: 'HancomMalangMalang-Regular';
  color: ${colors.black};
`;

const SendButtonWrapper = styled.TouchableOpacity`
  margin-left: ${width * 0.02}px;
`;
