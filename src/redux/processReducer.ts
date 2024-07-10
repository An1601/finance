import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { fetchProcess } from "./userThunks";
import { UserProcessType } from "@type/types";

export const initialUser: UserProcessType = {
  current_step: "",
  status: 0,
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
    handleSetProcess: (state, action: PayloadAction<UserProcessType>) => {
      return {
        ...state,
        current_step: action.payload.current_step,
        status: action.payload.status,
        idRecord: action.payload.idRecord,
      };
    },
  },
  extraReducers: (builder) => {
    builder.addCase(
      fetchProcess.fulfilled,
      (state, action: PayloadAction<UserProcessType>) => {
        return {
          ...state,
          current_step: action.payload.current_step,
          status: action.payload.status,
        };
      },
    );
  },
});
export const { handleSetIdRecord, handleSetProcess } = userReducer.actions;
export default userReducer.reducer;
