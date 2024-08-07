import { createAsyncThunk } from "@reduxjs/toolkit";
import { RootState } from "./store";
import api from "@api/axios";
import { BusinessProfile, UserProcessType } from "@type/types";
import { formItem } from "@container/bank/record/package-loan/create-loan-list";

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

export const getAllForm = createAsyncThunk<
  formItem[],
  void,
  { state: RootState }
>("createLoan/getForm", async (_, { rejectWithValue }) => {
  try {
    const response = await api.get("/application-form/list-reuse");
    const data = await response.data.data;
    return data;
  } catch (error: any) {
    return rejectWithValue(error.response.data);
  }
});

export const fetchProcess = createAsyncThunk<UserProcessType, number>(
  "data/getProcess",
  async (id) => {
    try {
      const response = await api.post(`/list-loans-submit/process/${id}`);
      return response.data.data;
    } catch (error: any) {
      return {
        current_step: "",
        status: 0,
        idRecord: 0,
      };
    }
  },
);
