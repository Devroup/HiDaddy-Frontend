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
    ME: `${BASE_URL}/api/user`, // 현재 로그인된 유저 정보 조회
    ALL_BABIES: `${BASE_URL}/api/user/all-babies`, // 전체 아기 목록 조회
    BABY_INFO: `${BASE_URL}/api/user/baby`, // 특정 아기 정보 조회(메인화면 + 마이페이지 공용)
    BABY: `${BASE_URL}/api/user/baby`, // 아기 정보 등록 (튜토리얼)
    DEL_BABY: groupId => `${BASE_URL}/api/user/baby/${groupId}`, // 아기 정보 삭제
    PATCH_BABY: groupId => `${BASE_URL}/api/user/baby/${groupId}`, // 아기 정보 수정
    BABY_BASIC: `${BASE_URL}/api/user/baby/basic`, // 아기 정보 등록
    NAME: `${BASE_URL}/api/user/name`, // 유저 이름 변경
    PHONE: `${BASE_URL}/api/user/phone`, // 유저 및 아내 전화번호 변경
    PROFILE_IMG: `${BASE_URL}/api/user/profile-image`, // 프로필 이미지 변경
    SELECT_BABY: groupId => `${BASE_URL}/api/user/select-baby-group/${groupId}`, // 선택된 아기 변경
  },

  // 채영: 나머지 필요한 API 추가하세요
};

export default config;
