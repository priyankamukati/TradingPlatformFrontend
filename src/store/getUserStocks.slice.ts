import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { API_SERVICE_URL, appURL } from "../config";
import { LoadingState } from "../model/loadingState";
import api from "./api";

export const getUserStocks = createAsyncThunk("getUserStocks", async () => {
  let url = API_SERVICE_URL + appURL.getUserStocksURL;
  return await api.get(url);
});

const initialState = {
  data: null,
  loading: LoadingState.Idle,
  error: null,
};

// Then, handle actions in your reducers:
const getUserStocksSlice = createSlice({
  name: "getUserStocks",
  initialState,
  reducers: {},
  extraReducers: {
    [getUserStocks.pending.type]: (state, _) => {
      if (state.loading === LoadingState.Idle) {
        state.loading = LoadingState.Pending;
      }
    },
    [getUserStocks.fulfilled.type]: (state, action) => {
      if (state.loading === LoadingState.Pending) {
        state.loading = LoadingState.Idle;
        state.data = action.payload.data;
      }
    },
    [getUserStocks.rejected.type]: (state, action) => {
      if (state.loading === LoadingState.Pending) {
        state.loading = LoadingState.Idle;
        state.error = action.error;
      }
    },
  },
});

export const getUserStocksReducer = getUserStocksSlice.reducer;
