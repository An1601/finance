import { createAsyncThunk } from "@reduxjs/toolkit";
import { RootState } from "./store";
import api from "@api/axios";
import { BusinessProfile } from "@type/types";

export const fetchProfileData = createAsyncThunk<
  BusinessProfile,
  void,
  { state: RootState }
>("user/fetchProfileData", async (_, { rejectWithValue }) => {
  try {
    const response = await api.get("/me/profile");
    return response.data.data;
  } catch (error: any) {
    return rejectWithValue(error.response.data);
  }
});
