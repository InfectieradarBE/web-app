import { useDispatch } from "react-redux";
import { setAppAuth } from "../store/appSlice";
import { TokenResponse } from "../api/types/authAPI";
import { User } from "../api/types/user";
import { minuteToMillisecondFactor } from "../constants";
import { setDefaultAccessTokenHeader } from "../api/instances/authenticatedApi";
import { userActions } from "../store/userSlice";

export const useSetAuthState = (): (token: TokenResponse, user: User) => void => {
  const dispatch = useDispatch();

  const setAuthState = (
    token: TokenResponse,
    user: User,
  ) => {
    const tokenRefreshedAt = new Date().getTime();
    dispatch(setAppAuth({
      accessToken: token.accessToken,
      refreshToken: token.refreshToken,
      expiresAt: tokenRefreshedAt + token.expiresIn * minuteToMillisecondFactor,
    }));

    setDefaultAccessTokenHeader(token.accessToken);
    dispatch(userActions.setUser(user));
  }
  return setAuthState;
}
