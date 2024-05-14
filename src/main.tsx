import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import App from "./pages/App.tsx";
import Crm from "./container/dashboards/crm/crm.tsx";
import "./index.scss";
import Auth from "./pages/auth.tsx";
import Login from "./container/auth/Login.tsx";
import SignUp from "./container/auth/SignUp.tsx";
import ForgotPassword from "./container/auth/ForgotPassword.tsx";
import VerifyOTP from "./container/auth/VerifyOTP.tsx";
import ResetPassword from "./container/auth/ResetPassword.tsx";
import { persistor, store } from "./redux/store.ts";
import { Provider } from "react-redux";
import { PersistGate } from "redux-persist/integration/react";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.Fragment>
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <BrowserRouter>
          <ToastContainer
            position={"bottom-right"}
            autoClose={5000}
            closeOnClick={true}
            pauseOnHover={true}
            draggable={true}
          />
          <Routes>
            <Route path="/" element={<Auth />}>
              <Route path="" element={<Login />} />
              <Route path={"signin"} element={<Login />} />
              <Route path={"signup"} element={<SignUp />} />
              <Route path={"forgot-password"} element={<ForgotPassword />} />
              <Route path={"verify-code"} element={<VerifyOTP />} />
              <Route path={"reset-password"} element={<ResetPassword />} />
            </Route>
          </Routes>
          <Routes>
            <Route path="" element={<App />}>
              <Route path={"/dashboard"} element={<Crm />} />
            </Route>
          </Routes>
        </BrowserRouter>
      </PersistGate>
    </Provider>
  </React.Fragment>,
);
