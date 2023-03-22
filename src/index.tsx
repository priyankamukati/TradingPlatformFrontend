import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import ReactDOM from "react-dom/client";
import "./index.css";
import reportWebVitals from "./reportWebVitals";
import store from "./store/store";
import { Provider } from "react-redux";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import AdminHomePageContainer from "./containers/adminContainer/adminContainer";
import UserPortfolioContainer from "./containers/userPortfolioContainer/userPortfolioContainer";
import UserHomePageContainer from "./containers/userHomePageContainer/userHomePageContainer";
import UserOrderContainer from "./containers/userOrderContainer/userOrderContainer";
import UserAccountContainer from "./containers/userAccountContainer/userAccountContainer";

import { Amplify } from "aws-amplify";
import awsExports from "./aws-exports-new";
import LoginContainer from "./containers/loginContainer/loginContainer";
import LandingPageContainer from "./containers/landingPageContainer/landingPageContainer";
Amplify.configure(awsExports);

const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement
);
root.render(
  <React.StrictMode>
    <Provider store={store}>
      <BrowserRouter>
        <Routes>
        <Route path="/" element={<LandingPageContainer />} />
          <Route path="/login" element={<LoginContainer />} />
          <Route path="/admin" element={<AdminHomePageContainer />} />
          <Route path="/home" element={<UserHomePageContainer />} />
          <Route path="/portfolio" element={<UserPortfolioContainer />} />
          <Route path="/order" element={<UserOrderContainer />}/>
          <Route path="/myaccount" element={<UserAccountContainer />} />
{/*           <Route path="/userinfo" element={<UserInfoPageContainer />} />
 */}        </Routes>
      </BrowserRouter>
    </Provider>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
