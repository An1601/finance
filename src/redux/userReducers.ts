import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { BusinessProfile, LoginResponse, UserInfo } from "@type/types";
import { fetchProfileData } from "./userThunks";

export const initialUser: UserInfo = {
  access_token: "",
  refresh_token: "",
  business_profile: null,
  check_submit: true,
  role: -1,
};

const userReducer = createSlice({
  name: "auth",
  initialState: initialUser,
  reducers: {
    handleReduxLogin: (state, action: PayloadAction<LoginResponse>) => {
      return {
        ...state,
        access_token: action.payload.access_token,
        refresh_token: action.payload.refresh_token,
        role: action.payload.type,
      };
    },
    handleCheckSubmit: (state, action: PayloadAction<boolean>) => {
      return {
        ...state,
        check_submit: action.payload,
      };
    },
    handleReduxLogOut: () => {
      return initialUser;
    },
    updateToken: (state, action: PayloadAction<string>) => {
      return {
        ...state,
        access_token: action.payload,
      };
    },
  },
  extraReducers: (builder) => {
    builder.addCase(
      fetchProfileData.fulfilled,
      (state, action: PayloadAction<BusinessProfile>) => ({
        ...state,
        business_profile: action.payload,
      }),
    );
  },
});
export const {
  handleReduxLogin,
  handleReduxLogOut,
  updateToken,
  handleCheckSubmit,
} = userReducer.actions;
export default userReducer.reducer;
