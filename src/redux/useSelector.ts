import { useSelector } from "react-redux";
import { RootState } from "./store";

export const useLoading = () =>
  useSelector((state: RootState) => state.rootReducer.commonReducer.isloading);
export const useUser = () =>
  useSelector((state: RootState) => state.rootReducer.userReducer);
export const useAccessToken = () =>
  useSelector((state: RootState) => state.rootReducer.userReducer.access_token);
