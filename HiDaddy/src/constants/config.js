import { DEVROUP_URL } from '@env';

const BASE_URL = DEVROUP_URL; //기본 API URL

const config = {
  API_URL: BASE_URL,

  AUTH: {
    LOGOUT: `${BASE_URL}/api/auth/logout`, //로그아웃
    RENEW: `${BASE_URL}/api/auth/renew`, // 토큰 재발급
    TOKENS: `${BASE_URL}/api/auth/tokens`, // 소셜 로그인 처리(Access/Refresh Token 전달)
    DELETE: `${BASE_URL}/api/auth/withdraw`, // 회원탈퇴
  },

  USER: {
    BABY: `${BASE_URL}/api/user/baby`, // 아기 정보 등록
    CHANGE_NAME: `${BASE_URL}/api/user/change-name`, // 유저 이름 변경
    ME: `${BASE_URL}/api/user/me`, // 현재 유저 정보 조회
    SELECT_BABY: babyId => `${BASE_URL}/api/user/select-baby/${babyId}}`, // 선택된 아기 변경
  },

  // 채영: 나머지 필요한 API 추가하세요
};

export default config;
