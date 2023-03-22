import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { API_SERVICE_URL, appURL } from "../config";
import { LoadingState } from "../model/loadingState";
import api from "./api";

export const getAllStocks = createAsyncThunk("getAllStocks", async () => {
  let url = API_SERVICE_URL + appURL.getAllStocksURL;
  return await api.get(url);
});

const initialState = {
  data: null,
  loading: LoadingState.Idle,
  error: null,
};

// Then, handle actions in your reducers:
const getAllStocksSlice = createSlice({
  name: "getAllStocks",
  initialState,
  reducers: {},
  extraReducers: {
    [getAllStocks.pending.type]: (state, _) => {
      if (state.loading === LoadingState.Idle) {
        state.loading = LoadingState.Pending;
      }
    },
    [getAllStocks.fulfilled.type]: (state, action) => {
      if (state.loading === LoadingState.Pending) {
        state.loading = LoadingState.Idle;
        state.data = action.payload.data;
      }
    },
    [getAllStocks.rejected.type]: (state, action) => {
      if (state.loading === LoadingState.Pending) {
        state.loading = LoadingState.Idle;
        state.error = action.error;
      }
    },
  },
});

export const getAllStocksReducer = getAllStocksSlice.reducer;
