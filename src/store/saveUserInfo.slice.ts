import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { API_SERVICE_URL, appURL } from "../config";
import { LoadingState } from "../model/loadingState";
import { SaveUserInfo, UserInfo } from "../model/userInfo";
import api from "./api";

export const saveUserInfo = createAsyncThunk(
  "saveUserInfo",
  async (saveUserInfoRequest: UserInfo) => {
    let url = API_SERVICE_URL + appURL.saveUserInfoURL;
    return await api.post(url, saveUserInfoRequest);
  }
);

const initialState = {
  data: null,
  loading: LoadingState.Idle,
  error: null,
};

// Then, handle actions in your reducers:
const saveUserInfoSlice = createSlice({
  name: "saveUserInfo",
  initialState,
  reducers: {},
  extraReducers: {
    [saveUserInfo.pending.type]: (state, _) => {
      if (state.loading === LoadingState.Idle) {
        state.loading = LoadingState.Pending;
      }
    },
    [saveUserInfo.fulfilled.type]: (state, action) => {
      if (state.loading === LoadingState.Pending) {
        state.loading = LoadingState.Idle;
        state.data = action.payload.data;
      }
    },
    [saveUserInfo.rejected.type]: (state, action) => {
      if (state.loading === LoadingState.Pending) {
        state.loading = LoadingState.Idle;
        state.error = action.error;
      }
    },
  },
});

export const saveUserInfoReducer = saveUserInfoSlice.reducer;
