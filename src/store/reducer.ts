import { combineReducers } from '@reduxjs/toolkit'
import { getAllStocksReducer } from './getAllStocks.slice';
import { saveStockReducer } from './saveStock.slice';
import { getUserStocksReducer } from './getUserStocks.slice';
import { getUserAllOrdersReducer } from './getUserAllOrders.slice';
import { saveOrderReducer } from './saveOrder.slice';
import { getUserCashBalanceReducer } from './getUserCashBalance.slice';
import { saveUserCashBalanceReducer } from './saveBalance.slice';
import { saveUserInfoReducer } from './saveUserInfo.slice';

const rootReducer = combineReducers({
  getAllStocksReducer: getAllStocksReducer,
  saveStockReducer: saveStockReducer,
  getUserStocksReducer: getUserStocksReducer,
  getUserAllOrdersReducer: getUserAllOrdersReducer,
  saveOrderReducer: saveOrderReducer,
  getUserCashBalanceReducer: getUserCashBalanceReducer,
  saveUserCashBalanceReducer: saveUserCashBalanceReducer,
  saveUserInfoReducer:saveUserInfoReducer

});

export type RootState = ReturnType<typeof rootReducer>

export default rootReducer