import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { API_SERVICE_URL, appURL } from "../config";
import { LoadingState } from "../model/loadingState";
import api from "./api";

export const getUserCashBalance = createAsyncThunk(
  "getUserCashBalance",
  async () => {
    let url = API_SERVICE_URL + appURL.getUserCashBalanceURL;
    return await api.get(url);
  }
);

const initialState = {
  data: null,
  loading: LoadingState.Idle,
  error: null,
};

// Then, handle actions in your reducers:
const getUserCashBalanceSlice = createSlice({
  name: "getUserCashBalance",
  initialState,
  reducers: {},
  extraReducers: {
    [getUserCashBalance.pending.type]: (state, _) => {
      if (state.loading === LoadingState.Idle) {
        state.loading = LoadingState.Pending;
      }
    },
    [getUserCashBalance.fulfilled.type]: (state, action) => {
      if (state.loading === LoadingState.Pending) {
        state.loading = LoadingState.Idle;
        state.data = action.payload.data;
      }
    },
    [getUserCashBalance.rejected.type]: (state, action) => {
      if (state.loading === LoadingState.Pending) {
        state.loading = LoadingState.Idle;
        state.error = action.error;
      }
    },
  },
});

export const getUserCashBalanceReducer = getUserCashBalanceSlice.reducer;
