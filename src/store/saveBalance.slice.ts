import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { API_SERVICE_URL, appURL } from "../config";
import { LoadingState } from "../model/loadingState";
import { UpdateUserCashBalance } from "../model/UpdateUserCashBalance";
import { UserInfo } from "../model/userInfo";
import api from "./api";

export const saveUserCashBalance = createAsyncThunk(
  "saveUserCashBalance",
  async (saveUserCashBalanceRequest: UpdateUserCashBalance) => {
    let url = API_SERVICE_URL + appURL.saveUserCashBalanceURL;
    return await api.post(url, saveUserCashBalanceRequest);
  }
);

const initialState = {
  data: null,
  loading: LoadingState.Idle,
  error: null,
};

// Then, handle actions in your reducers:
const saveUserCashBalanceSlice = createSlice({
  name: "saveUserCashBalance",
  initialState,
  reducers: {},
  extraReducers: {
    [saveUserCashBalance.pending.type]: (state, _) => {
      if (state.loading === LoadingState.Idle) {
        state.loading = LoadingState.Pending;
      }
    },
    [saveUserCashBalance.fulfilled.type]: (state, action) => {
      if (state.loading === LoadingState.Pending) {
        state.loading = LoadingState.Idle;
        state.data = action.payload.data;
      }
    },
    [saveUserCashBalance.rejected.type]: (state, action) => {
      if (state.loading === LoadingState.Pending) {
        state.loading = LoadingState.Idle;
        state.error = action.error;
      }
    },
  },
});

export const saveUserCashBalanceReducer = saveUserCashBalanceSlice.reducer;
