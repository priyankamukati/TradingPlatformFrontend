import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { API_SERVICE_URL, appURL } from "../config";
import { LoadingState } from "../model/loadingState";
import { Stock } from "../model/stock";
import api from "./api";

export const saveStock = createAsyncThunk(
  "saveStock",
  async (saveStockRequest: Stock) => {
    let url = API_SERVICE_URL + appURL.saveStockURL;
    return await api.post(url, saveStockRequest);
  }
);

const initialState = {
  data: null,
  loading: LoadingState.Idle,
  error: null,
};

// Then, handle actions in your reducers:
const saveStockSlice = createSlice({
  name: "saveStock",
  initialState,
  reducers: {},
  extraReducers: {
    [saveStock.pending.type]: (state, _) => {
      if (state.loading === LoadingState.Idle) {
        state.loading = LoadingState.Pending;
      }
    },
    [saveStock.fulfilled.type]: (state, action) => {
      if (state.loading === LoadingState.Pending) {
        state.loading = LoadingState.Idle;
        state.data = action.payload.data;
      }
    },
    [saveStock.rejected.type]: (state, action) => {
      if (state.loading === LoadingState.Pending) {
        state.loading = LoadingState.Idle;
        state.error = action.error;
      }
    },
  },
});

export const saveStockReducer = saveStockSlice.reducer;
