import { useSelector } from "react-redux";
import { RootState } from "../store/rootReducer";

export const useAuthTokenCheck = (): boolean => {
  const authState = useSelector((state: RootState) => state.app.auth);
  if (authState && authState.accessToken && authState.accessToken.length > 0) {
    return true;
  }
  return false;
}
