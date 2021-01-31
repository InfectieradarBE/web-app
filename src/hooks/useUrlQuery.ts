import { useLocation } from "react-router";

export const useUrlQuery = () => {
  return new URLSearchParams(useLocation().search);
};
