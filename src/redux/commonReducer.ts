import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export const initialUser = {
  isloading: false,
};

//helper func

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
  extraReducers(builder) {},
});
export const { setLoadingFalse, setLoadingTrue } = commonReducer.actions;
export default commonReducer.reducer;
