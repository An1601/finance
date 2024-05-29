import { createSlice } from "@reduxjs/toolkit";

export const initialUser = {
  isloading: false,
};

const commonReducer = createSlice({
  name: "auth",
  initialState: initialUser,
  reducers: {
    setLoadingTrue: (state) => {
      return {
        ...state,
        isloading: true,
      };
    },
    setLoadingFalse: (state) => {
      return {
        ...state,
        isloading: false,
      };
    },
  },
  extraReducers() {},
});
export const { setLoadingFalse, setLoadingTrue } = commonReducer.actions;
export default commonReducer.reducer;
