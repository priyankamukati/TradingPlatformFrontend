import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { API_SERVICE_URL, appURL } from "../config";
import { LoadingState } from "../model/loadingState";
import api from "./api";

export const getUserAllOrders = createAsyncThunk(
  "getUserAllOrders",
  async () => {
    let url = API_SERVICE_URL + appURL.getUserAllOrdersURL;
    return await api.get(url);
  }
);

const initialState = {
  data: null,
  loading: LoadingState.Idle,
  error: null,
};

// Then, handle actions in your reducers:
const getUserAllOrdersSlice = createSlice({
  name: "getUserAllOrders",
  initialState,
  reducers: {},
  extraReducers: {
    [getUserAllOrders.pending.type]: (state, _) => {
      if (state.loading === LoadingState.Idle) {
        state.loading = LoadingState.Pending;
      }
    },
    [getUserAllOrders.fulfilled.type]: (state, action) => {
      if (state.loading === LoadingState.Pending) {
        state.loading = LoadingState.Idle;
        state.data = action.payload.data;
      }
    },
    [getUserAllOrders.rejected.type]: (state, action) => {
      if (state.loading === LoadingState.Pending) {
        state.loading = LoadingState.Idle;
        state.error = action.error;
      }
    },
  },
});

export const getUserAllOrdersReducer = getUserAllOrdersSlice.reducer;
