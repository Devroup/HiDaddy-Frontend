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

  MISSION: {
    GET_MISSION: `${BASE_URL}/api/mission`, //미션 과거목록 조회
    MISSION: `${BASE_URL}/api/mission/{missionId}`, // 과거 미션 상세 단건 조회
    PHOTO_MISSION: `${BASE_URL}/api/mission/{missionId}/analyze`,
    GET_MISSION_KEYWORD: `${BASE_URL}/api/mission/today`, //미션 사진촬영 키워드 조회(당일)
  },

  COMMUNITY: {
    CREATE_POST: `${BASE_URL}/api/community`, // 게시글 작성
    GET_POST: `${BASE_URL}/api/community`,
    DETAIL_POST: postId => `${BASE_URL}/api/community/${postId}`,
    FIX_POST: postId => `${BASE_URL}/api/community/${postId}`,
    DEL_POST: postId => `${BASE_URL}/api/community/${postId}`,
    POST_LIKE: postId => `${BASE_URL}/api/community/${postId}/like`,
    GET_COMMENT: postId => `${BASE_URL}/api/community/${postId}/comments`,
    CREATE_COMMENT: postId => `${BASE_URL}/api/community/${postId}/comments`,
    FIX_COMMENT: (postId, commentId) =>
      `${BASE_URL}/api/community/${postId}/comments/${commentId}`,
    DEL_COMMENT: (postId, commentId) =>
      `${BASE_URL}/api/community/${postId}/comments/${commentId}`,
    COMMENT_LIKE: (postId, commentId) =>
      `${BASE_URL}/api/community/${postId}/comments/${commentId}`,
  },

  WEEKLY: {
    WEEK: week => `${BASE_URL}/api/weekly/${week}`,
    CURRENT: groupId => `${BASE_URL}/api/weekly/current?groupId=${groupId}`,
  },
};

export default config;
