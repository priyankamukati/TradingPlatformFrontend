import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import ReactDOM from 'react-dom/client';
import './index.css';
import reportWebVitals from './reportWebVitals';
import store from './store/store';
import { Provider } from 'react-redux';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import AdminHomePageContainer from './containers/adminContainer/adminHomePageContainer';
import UserHomePageContainer from './containers/userContainer/userHomePageContainer';
import OrderPageContainer from './containers/orderContainer/orderPageContainer';
import UserOrdersViewPageContainer from './containers/userOrdersViewContainer/userOrdersViewPageContainer';
import UserCashBalancePageContainer from './containers/userCashBalanceContainer/userCashBalancePageContainer';

import { Amplify } from 'aws-amplify';
import awsExports from './aws-exports-new';
import LoginContainer from './containers/loginContainer/loginContainer';
import UserInfoPageContainer from './containers/userInfoContainer/userInfoPageContainer';
Amplify.configure(awsExports);

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);
root.render(
  <React.StrictMode>
    <Provider store={store}>
      <BrowserRouter>
      <Routes>
      <Route path ="/login" element={<LoginContainer/>} />
        <Route path ="/admin" element={<AdminHomePageContainer/>} />
        <Route path ="/" element={<UserHomePageContainer/>} />
        <Route path ="/userorder" element={<OrderPageContainer/>} />
        <Route path ="/userallorder" element={<UserOrdersViewPageContainer/>} />
        <Route path ="/usercashbalance" element={<UserCashBalancePageContainer/>} />
        <Route path ="/userinfo" element={<UserInfoPageContainer/>} />
       </Routes>
      </BrowserRouter>
    </Provider>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
