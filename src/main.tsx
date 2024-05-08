import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import App from "./pages/App.tsx";
import Crm from "./container/dashboards/crm/crm.tsx";
import "./index.scss";
import Auth from "./pages/auth.tsx";
import Login from "./container/auth/Login.tsx";
import SignUp from "./container/auth/SignUp.tsx";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.Fragment>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Auth />}>
          <Route path="" element={<Login />} />
          <Route path={`login`} element={<Login />} />
          <Route path={`signup`} element={<SignUp />} />
        </Route>
      </Routes>
    </BrowserRouter>
  </React.Fragment>,
);
