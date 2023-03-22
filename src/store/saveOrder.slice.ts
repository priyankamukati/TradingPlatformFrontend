import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { API_SERVICE_URL, appURL } from "../config";
import { LoadingState } from "../model/loadingState";
import { Order } from "../model/userOrder";
import api from "./api";

export const saveOrder = createAsyncThunk(
  "saveOrder",
  async (saveOrderRequest: Order) => {
    let url = API_SERVICE_URL + appURL.saveOrderURL;
    return await api.post(url, saveOrderRequest);
  }
);

const initialState = {
  data: null,
  loading: LoadingState.Idle,
  error: null,
};

// Then, handle actions in your reducers:
const saveOrderSlice = createSlice({
  name: "saveOrder",
  initialState,
  reducers: {},
  extraReducers: {
    [saveOrder.pending.type]: (state, _) => {
      if (state.loading === LoadingState.Idle) {
        state.loading = LoadingState.Pending;
      }
    },
    [saveOrder.fulfilled.type]: (state, action) => {
      if (state.loading === LoadingState.Pending) {
        state.loading = LoadingState.Idle;
        state.data = action.payload.data;
      }
    },
    [saveOrder.rejected.type]: (state, action) => {
      if (state.loading === LoadingState.Pending) {
        state.loading = LoadingState.Idle;
        state.error = action.error;
      }
    },
  },
});

export const saveOrderReducer = saveOrderSlice.reducer;
