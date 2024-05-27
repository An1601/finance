import { createAsyncThunk } from "@reduxjs/toolkit";
import { RootState } from "./store";
import api from "@api/axios";
import { BusinessProfile } from "@type/types";

export const fetchProfileData = createAsyncThunk<
  BusinessProfile,
  void,
  { state: RootState }
>("user/fetchProfileData", async (_, { getState, rejectWithValue }) => {
  const { id } = getState().rootReducer.userReducer;

  try {
    const response = await api.get(`/profile/${id}`);
    return response.data.data.business_profile;
  } catch (error: any) {
    return rejectWithValue(error.response.data);
  }
});
