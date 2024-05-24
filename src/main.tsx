import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import App from "./pages/App.tsx";
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
import Home from "./container/dashboards/home/Index.tsx";
import Account from "./container/dashboards/profile/index.tsx";
import NotificationIndex from "./container/dashboards/Notification/Index.tsx";
import PackageLoanIndex from "./container/dashboards/PackageLoan/Index.tsx";
import FAQ from "./container/dashboards/FAQ/Index.tsx";
import SearchMobile from "@container/dashboards/search/Index.tsx";
import RecordIndex from "@container/dashboards/Record/Index.tsx";
import MeetingIndex from "@container/dashboards/ConsultingMeeting/Index.tsx";
import EditProfile from "@container/dashboards/EditProfile/index.tsx";
import ChangePassword from "@container/dashboards/ChangePassword/index.tsx";

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
            <Route
              path="*"
              element={<div> Not Found or You do not have permission.</div>}
            />
          </Routes>
          <Routes>
            <Route path="/" element={<App />}>
              <Route path={"dashboard"} element={<Home />} />
              <Route path={"notification"} element={<NotificationIndex />} />
              <Route path={"faq"} element={<FAQ />} />
              <Route path={"search"} element={<SearchMobile />} />
              <Route path={"loan-list"} element={<PackageLoanIndex />} />
              <Route path={"loan-list/:userid"} element={<RecordIndex />} />
              <Route path={"meeting"} element={<MeetingIndex />} />
              <Route path={"profile"} element={<Account />} />
              <Route path={"edit-profile"} element={<EditProfile />} />
              <Route path={"change-password"} element={<ChangePassword />} />
            </Route>
            <Route
              path="*"
              element={<div> Not Found or You do not have permission.</div>}
            />
          </Routes>
        </BrowserRouter>
      </PersistGate>
    </Provider>
  </React.Fragment>,
);
