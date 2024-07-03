import { Fragment, useEffect, useState } from "react";
import { Helmet, HelmetProvider } from "react-helmet-async";
import Switcher from "@components/common/switcher";
import Header from "@components/common/header";
import Sidebar from "@components/common/sidebar";

const DashboardLayout: React.FC<{
  children?: React.ReactNode;
  isBank: boolean;
}> = ({ children, isBank }) => {
  const [myClassName, setMyclassName] = useState("");
  const Bodyclickk = () => {
    if (localStorage.getItem("zenverticalstyles") === "icontext") {
      setMyclassName("");
    }
    if (window.innerWidth > 1024) {
      const html = document.documentElement;
      if (html.getAttribute("icon-overlay") === "open") {
        html.setAttribute("icon-overlay", "");
      }
    }
  };

  useEffect(() => {
    import("preline");
  }, []);

  return (
    <Fragment>
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
            "data-icon-text": myClassName,
          }}
        />
        <Switcher />
        <div className="page bg-light_finance-background1">
          <div className="hidden sm:block">
            <Header />
          </div>
          <div className="hidden sm:block">
            <Sidebar isBank={isBank} />
          </div>
          <div className="!mt-0 sm:!mt-[60px] content main-index">
            <div className="main-content" onClick={Bodyclickk}>
              {children}
            </div>
          </div>
        </div>
      </HelmetProvider>
    </Fragment>
  );
};

export default DashboardLayout;
