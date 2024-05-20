import { Fragment, useEffect, useState } from "react";
import Loader from "../components/common/loader/loader";
import Sidebar from "../components/common/sidebar/sidebar";
import Switcher from "../components/common/switcher/switcher";
import { Helmet, HelmetProvider } from "react-helmet-async";
import { Navigate, Outlet } from "react-router-dom";
import { RootState } from "../redux/store";
import { useSelector } from "react-redux";
import Header from "../components/common/header";

function App() {
  const [MyclassName, setMyClass] = useState("");
  const accessToken: string = useSelector(
    (state: RootState) => state.rootReducer.userReducer.access_token,
  );

  const Bodyclickk = () => {
    if (localStorage.getItem("zenverticalstyles") == "icontext") {
      setMyClass("");
    }
    if (window.innerWidth > 992) {
      const html = document.documentElement;
      if (html.getAttribute("icon-overlay") === "open") {
        html.setAttribute("icon-overlay", "");
      }
    }
  };

  useEffect(() => {
    import("preline");
  }, []);
  return accessToken ? (
    <Fragment>
      <Loader />
      <HelmetProvider>
        <Helmet
          htmlAttributes={{
            lang: "en",
            dir: "ltr",
            "data-menu-styles": "dark",
            class: "light",
            "data-nav-layout": "vertical",
            "data-header-styles": "light",
            "data-vertical-style": "overlay",
            loader: "disable",
            "data-icon-text": MyclassName,
          }}
        />
        <Switcher />
        <div className="page bg-light_finance-background1">
          <div className="hidden sm:block">
            <Header />
          </div>
          <div className="hidden sm:block">
            <Sidebar />
          </div>
          <div className="!mt-0 sm:!mt-[60px] content main-index">
            <div className="main-content" onClick={Bodyclickk}>
              <Outlet />
            </div>
          </div>
        </div>
      </HelmetProvider>
    </Fragment>
  ) : (
    <Navigate to="signin" />
  );
}

export default App;
