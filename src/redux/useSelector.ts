import { useSelector } from "react-redux";
import { RootState } from "./store";

export const useUser = () =>
  useSelector((state: RootState) => state.rootReducer.userReducer);
export const useAccessToken = () =>
  useSelector((state: RootState) => state.rootReducer.userReducer.access_token);
export const useBusinessProfile = () =>
  useSelector(
    (state: RootState) => state.rootReducer.userReducer.business_profile,
  );
export const useCreateLoan = () =>
  useSelector((state: RootState) => state.rootReducer.createLoanReducer);
