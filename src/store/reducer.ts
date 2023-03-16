import { combineReducers } from '@reduxjs/toolkit'
import { getAllStocksReducer } from './getAllStocks.slice';
import { saveStockReducer } from './saveStock.slice';

const rootReducer = combineReducers({
  getAllStocksReducer: getAllStocksReducer,
  saveStockReducer: saveStockReducer
});

export type RootState = ReturnType<typeof rootReducer>

export default rootReducer