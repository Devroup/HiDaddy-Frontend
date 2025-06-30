import axios from 'axios';
import * as Keychain from 'react-native-keychain';

import config from '../constants/config';

const api = axios.create({
  baseURL: config.API_URL,
});

api.interceptors.request.use(
  async config => {
    try {
      const credentials = await Keychain.getGenericPassword();
      if (credentials) {
        const tokenObj = JSON.parse(credentials.password);
        config.headers.Authorization = `Bearer ${tokenObj.accessToken}`;
      }
    } catch (e) {
      console.error('토큰 읽기 실패:', e);
    }
    return config;
  },
  error => Promise.reject(error),
);

let isRefreshing = false;
let failedQueue = [];

const processQueue = (error, token = null) => {
  failedQueue.forEach(prom => {
    if (error) prom.reject(error);
    else prom.resolve(token);
  });
  failedQueue = [];
};

api.interceptors.response.use(
  response => response,
  async error => {
    const originalRequest = error.config;

    if (
      error.response?.status === 401 &&
      error.response?.data?.code === 'JWT_4011' &&
      !originalRequest._retry
    ) {
      originalRequest._retry = true;

      try {
        const credentials = await Keychain.getGenericPassword();
        if (!credentials) throw new Error('Keychain에 토큰이 없습니다.');
        const { accessToken, refreshToken } = JSON.parse(credentials.password);

        if (isRefreshing) {
          return new Promise((resolve, reject) => {
            failedQueue.push({ resolve, reject });
          }).then(token => {
            originalRequest.headers.Authorization = `Bearer ${token}`;
            return api(originalRequest);
          });
        }

        isRefreshing = true;

        const refreshRes = await axios.post(
          `${config.API_URL}/users/reissue`,
          {},
          {
            headers: {
              Authorization: `Bearer ${refreshToken}`,
            },
          },
        );

        const { accessToken: newAccessToken, refreshToken: newRefreshToken } =
          refreshRes.data.result;

        await Keychain.setGenericPassword(
          'token',
          JSON.stringify({
            accessToken: newAccessToken,
            refreshToken: newRefreshToken || refreshToken,
          }),
        );

        processQueue(null, newAccessToken);
        originalRequest.headers.Authorization = `Bearer ${newAccessToken}`;
        return api(originalRequest);
      } catch (refreshError) {
        processQueue(refreshError, null);
        console.error('토큰 재발급 실패:', refreshError);
        return Promise.reject(refreshError);
      } finally {
        isRefreshing = false;
      }
    }

    return Promise.reject(error);
  },
);

// GET 함수
export const get = async (endpoint, params = {}, options = {}) => {
  try {
    const response = await api.get(endpoint, {
      params,
      ...options,
    });

    if (
      typeof response.data !== 'object' ||
      response.headers['content-type']?.includes('text/html')
    ) {
      throw new Error('서버에서 예상하지 못한 응답이 도착했습니다.');
    }

    return response.data;
  } catch (error) {
    //console.error('GET 요청 에러:', error?.response?.data || error.message);
    throw error;
  }
};

// POST 함수
export const post = async (endpoint, data, options = {}) => {
  try {
    const response = await api.post(endpoint, data, options);

    if (
      typeof response.data !== 'object' ||
      response.headers['content-type']?.includes('text/html')
    ) {
      throw new Error('서버 응답이 올바르지 않습니다.');
    }

    return response.data;
  } catch (error) {
    //console.error('POST 요청 에러:', error?.response?.data || error.message);
    throw error;
  }
};

// PUT 함수
export const put = async (endpoint, data = {}, options = {}) => {
  try {
    const response = await api.put(endpoint, data, options);
    return response.data;
  } catch (error) {
    //console.error('PUT 요청 에러:', error.response?.data || error.message);
    throw error;
  }
};

// DELETE 함수
export const del = async (endpoint, options = {}) => {
  try {
    const response = await api.delete(endpoint, {
      ...options,
      data: {},
    });
    return response.data;
  } catch (error) {
    //console.error('DELETE 요청 에러:', error.response?.data || error.message);
    throw error;
  }
};

export default api;
