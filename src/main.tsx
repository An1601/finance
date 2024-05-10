import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import App from "./pages/App.tsx";
import Crm from "./container/dashboards/crm/crm.tsx";
import "./index.scss";
import Auth from "./pages/auth.tsx";
import Login from "./container/auth/Login.tsx";
import SignUp from "./container/auth/SignUp.tsx";
import ForgotPassword from "./container/auth/ForgotPassword.tsx";
import VerifyOTP from "./container/auth/VerifyOTP.tsx";
import ResetPassword from "./container/auth/ResetPassword.tsx";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.Fragment>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Auth />}>
          <Route path="" element={<Login />} />
          <Route path={`signin`} element={<Login />} />
          <Route path={`signup`} element={<SignUp />} />
          <Route path={`forgot-password`} element={<ForgotPassword />} />
          <Route path={`verify-code`} element={<VerifyOTP />} />
          <Route path={`reset-password`} element={<ResetPassword />} />
          <Route path={`dashboard`} element={<Crm />} />
        </Route>
      </Routes>
    </BrowserRouter>
  </React.Fragment>,
);
