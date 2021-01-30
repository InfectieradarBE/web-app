import { useSelector } from "react-redux";
import { RootState } from "../store/rootReducer";
import { useAuthTokenCheck } from "./useAuthTokenCheck";

export const useIsAuthenticated = (): boolean => {
  const hasToken = useAuthTokenCheck();
  const accountConfirmedAt = useSelector((state: RootState) => state.user.currentUser.account.accountConfirmedAt);
  if (hasToken && accountConfirmedAt && Number(accountConfirmedAt) > 0) {
    return true;
  };
  return false;
}
