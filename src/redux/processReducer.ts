import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { fetchProcess } from "./userThunks";
import { UserProcess } from "@type/types";

export const initialUser = {
  current_step: "",
  state: 0,
  idRecord: 0,
};
const userReducer = createSlice({
  name: "auth",
  initialState: initialUser,
  reducers: {
    handleSetIdRecord: (state, action: PayloadAction<number>) => {
      return {
        ...state,
        idRecord: action.payload,
      };
    },
  },
  extraReducers: (builder) => {
    builder.addCase(
      fetchProcess.fulfilled,
      (state, action: PayloadAction<UserProcess>) => ({
        ...state,
        current_step: action.payload.current_step,
        state: action.payload.state,
        idRecord: action.payload.idRecord,
      }),
    );
  },
});
export const { handleSetIdRecord } = userReducer.actions;
export default userReducer.reducer;
