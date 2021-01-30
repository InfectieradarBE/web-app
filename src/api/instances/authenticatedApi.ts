import axios from 'axios';
import store, { resetStore } from "../../store/store";
import { renewTokenReq, renewTokenURL } from '../authAPI';
// import { apiActions } from '../../store/api/apiSlice';
import { minuteToMillisecondFactor } from '../../constants';
import { setAppAuth } from '../../store/appSlice';
// import { userActions } from '../../store/user/userSlice';

const renewThreshold = 1 * minuteToMillisecondFactor;

const authApiInstance = axios.create({
  baseURL: process.env.REACT_APP_API_BASE_URL
});

export const renewToken = async (): Promise<string> => {
  const refreshToken = store.getState().app.auth?.refreshToken;
  if (!refreshToken || refreshToken.length <= 0) {
    throw new Error('no valid tokens');
  }

  const response = await renewTokenReq(refreshToken);
  store.dispatch(setAppAuth({
    accessToken: response.data.accessToken,
    refreshToken: response.data.refreshToken,
    expiresAt: new Date().getTime() + response.data.expiresIn * minuteToMillisecondFactor,
  }));
  setDefaultAccessTokenHeader(response.data.accessToken);
  return response.data.accessToken;
}

const renewTokenIfNecessary = async (): Promise<string | undefined> => {
  const expiresAt = store.getState().app.auth?.expiresAt;
  if (!expiresAt) {
    return;
  }

  if (expiresAt < new Date().getTime() + renewThreshold) {
    const accessToken = await renewToken();
    return accessToken;
  }
  return;
}

authApiInstance.interceptors.request.use(
  async (config) => {
    if (renewTokenURL === config.url) {
      return config;
    }
    try {
      const newAccessToken = await renewTokenIfNecessary();
      if (newAccessToken && newAccessToken.length) {
        config.headers.Authorization = "Bearer " + newAccessToken;
      }
    } catch (e) {
      resetApiAuth();
      if (e.response) {
        console.error(e.response);
      } else {
        console.error(e);
      }
    }
    return config;
  },
  (error) => {
    resetApiAuth();
    console.error(error);
    return Promise.reject(error);
  }
);

export const setDefaultAccessTokenHeader = (token: string) => {
  authApiInstance.defaults.headers.Authorization = "Bearer " + token;
};

export const resetApiAuth = () => {
  resetStore();
  setDefaultAccessTokenHeader('');
}

export default authApiInstance;

