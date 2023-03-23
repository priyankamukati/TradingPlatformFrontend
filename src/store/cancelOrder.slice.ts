import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { API_SERVICE_URL, appURL } from "../config";
import { LoadingState } from "../model/loadingState";
import { CancelOrder, Order } from "../model/userOrder";
import api from "./api";

export const cancelOrder = createAsyncThunk(
  "cancelOrder",
  async (cancelOrderRequest: CancelOrder) => {
    let url = API_SERVICE_URL + appURL.cancelOrderURL;
    return await api.post(url, cancelOrderRequest);
  }
);

const initialState = {
  data: null,
  loading: LoadingState.Idle,
  error: null,
};

// Then, handle actions in your reducers:
const cancelOrderSlice = createSlice({
  name: "cancelOrder",
  initialState,
  reducers: {},
  extraReducers: {
    [cancelOrder.pending.type]: (state, _) => {
      if (state.loading === LoadingState.Idle) {
        state.loading = LoadingState.Pending;
      }
    },
    [cancelOrder.fulfilled.type]: (state, action) => {
      if (state.loading === LoadingState.Pending) {
        state.loading = LoadingState.Idle;
        state.data = action.payload.data;
      }
    },
    [cancelOrder.rejected.type]: (state, action) => {
      if (state.loading === LoadingState.Pending) {
        state.loading = LoadingState.Idle;
        state.error = action.error;
      }
    },
  },
});

export const cancelOrderReducer = cancelOrderSlice.reducer;
