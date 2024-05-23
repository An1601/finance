import { createSlice, PayloadAction, createAsyncThunk } from "@reduxjs/toolkit";
import { LoginInfo, LoginResponse, UserInfo } from "@type/types";

export const initialUser: UserInfo = {
  id: "1",
  name: "",
  email: "",
  phone: "",
  date_of_birth: "",
  address: "",
  email_verified_at: "",
  access_token: "",
  refresh_token: "",
};

//helper func

const userReducer = createSlice({
  name: "auth",
  initialState: initialUser,
  reducers: {
    handle_login: (state, action: PayloadAction<LoginResponse>) => {
      return {
        ...state,
        id: action.payload.id.toString(),
        name: action.payload.name,
        email: action.payload.email,
        phone: action.payload.phone,
        date_of_birth: action.payload.date_of_birth,
        address: action.payload.address,
        email_verified_at: action.payload.email,
        access_token: action.payload.access_token,
        refresh_token: action.payload.refresh_token,
      };
    },
    handle_logout: () => {
      return initialUser;
    },
    updateToken: (state, action: PayloadAction<string>) => {
      return {
        ...state,
        access_token: action.payload,
      };
    },
  },
  extraReducers(builder) {},
});
export const { handle_login, handle_logout, updateToken } = userReducer.actions;
export default userReducer.reducer;
