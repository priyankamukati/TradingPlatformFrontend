import { combineReducers } from '@reduxjs/toolkit'
import { getAllStocksReducer } from './getAllStocks.slice';
import { saveStockReducer } from './saveStock.slice';
import { getUserStocksReducer } from './getUserStocks.slice';
import { getUserAllOrdersReducer } from './getUserAllOrders.slice';
import { saveOrderReducer } from './saveOrder.slice';

const rootReducer = combineReducers({
  getAllStocksReducer: getAllStocksReducer,
  saveStockReducer: saveStockReducer,
  getUserStocksReducer: getUserStocksReducer,
  getUserAllOrdersReducer: getUserAllOrdersReducer,
  saveOrderReducer: saveOrderReducer
});

export type RootState = ReturnType<typeof rootReducer>

export default rootReducer