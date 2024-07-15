import { FC, Fragment, useEffect, useState } from "react";
import { connect } from "react-redux";
import { useNavigate } from "react-router-dom";
import { BANK_MENUITEMS, MenuItem, MENUITEMS } from "./sidemenu/sidemenu";
import { ThemeChanger } from "@redux/action";
import { store } from "@redux/store";
import logo1 from "@assets/images/brand-logos/desktop-dark.svg";
import SimpleBar from "simplebar-react";
import { useUser } from "@redux/useSelector";
import { UserRole } from "@type/enum";
interface SidebarProps {
  ThemeChanger: any;
  isBank: boolean;
}

const Sidebar: FC<SidebarProps> = ({ ThemeChanger, isBank }) => {
  const [menuitems, setMenuitems] = useState<any>(
    isBank ? BANK_MENUITEMS : MENUITEMS,
  );
  const user = useUser();
  const navigate = useNavigate();
  const WindowPreSize = [window.innerWidth];

  const closeMenuFn = () => {
    const closeMenuRecursively = (items: any) => {
      items?.forEach((item: any) => {
        item.active = false;
        closeMenuRecursively(item.children);
      });
    };
    closeMenuRecursively(MENUITEMS);
    setMenuitems((arr: any) => [...arr]);
  };
  const menuClose = () => {
    const theme = store.getState().rootReducer.reducer;
    if (window.innerWidth <= 992) {
      ThemeChanger({ ...theme, toggled: "close" });
    }
    const overlayElement = document.querySelector(
      "#responsive-overlay",
    ) as HTMLElement | null;
    if (overlayElement) {
      overlayElement.classList.remove("active");
    }
    if (
      theme.dataNavLayout == "horizontal" ||
      theme.dataNavStyle == "menu-click" ||
      theme.dataNavStyle == "icon-click"
    ) {
      closeMenuFn();
    }
  };
  const menuResizeFn = () => {
    WindowPreSize.push(window.innerWidth);
    if (WindowPreSize.length > 2) {
      WindowPreSize.shift();
    }
    const theme = store.getState().rootReducer.reducer;
    if (WindowPreSize.length > 1) {
      if (
        WindowPreSize[WindowPreSize.length - 1] < 992 &&
        WindowPreSize[WindowPreSize.length - 2] >= 992
      ) {
        // less than 992;
        ThemeChanger({ ...theme, toggled: "close" });
      }

      if (
        WindowPreSize[WindowPreSize.length - 1] >= 992 &&
        WindowPreSize[WindowPreSize.length - 2] < 992
      ) {
        // greater than 992
        ThemeChanger({
          ...theme,
          toggled:
            theme.dataVerticalStyle == "doublemenu" ? "double-menu-open" : "",
        });
      }
    }
  };
  const clickLevelone = (levelone: MenuItem) => {
    if (levelone.type === "sub") {
      setMenuitems((prevItems: any) =>
        prevItems.map((item: any) => ({
          ...item,
          active: levelone.id === item.id ? !item.active : false,
          selected: levelone.id === item.id ? true : false,
        })),
      );
    } else if (
      (user.check_submit || user.role !== UserRole.BUSINESS) &&
      levelone.type === "link"
    ) {
      navigate(levelone.path);
    }
  };
  const updateMenuItems = (items: MenuItem[]): MenuItem[] => {
    let foundSelected = false;

    const updatedItems = items.map((item) => {
      if (item.path === location.pathname) {
        foundSelected = true;
        return { ...item, selected: true };
      }

      if (item.children.length > 0) {
        const updatedChildren = updateMenuItems(item.children);
        const isChildSelected = updatedChildren.some((child) => child.selected);

        if (isChildSelected) {
          foundSelected = true;
          return { ...item, children: updatedChildren, selected: true };
        } else {
          return { ...item, children: updatedChildren, selected: false };
        }
      }

      return { ...item, selected: false };
    });

    if (!foundSelected) {
      return updatedItems.map((item) => ({ ...item, selected: false }));
    }

    return updatedItems;
  };

  useEffect(() => {
    setMenuitems(updateMenuItems(menuitems));
  }, [location.pathname]);

  useEffect(() => {
    const mainContent: any = document.querySelector(".main-content");
    mainContent.addEventListener("click", menuClose);
    window.addEventListener("resize", menuResizeFn);
  }, []);

  return (
    <Fragment>
      <div
        id="responsive-overlay"
        onClick={() => {
          menuClose();
        }}
      ></div>
      <aside className="app-sidebar !bg-dark_finance-background " id="sidebar">
        <div
          className="h-[89px] flex items-center ml-7 gap-2 cursor-pointer"
          onClick={() => {
            navigate("/");
          }}
        >
          <img src={logo1} alt="logo" className="desktop-logo" />
          <div>
            <span className="text-light_finance-primary text-2xl font-bold font-['Nunito Sans']">
              C
            </span>
            <span className="text-light_finance-secondary text-2xl font-bold font-['Nunito Sans']">
              C
            </span>
            <span className="text-light_finance-primary text-2xl font-bold font-['Nunito Sans']">
              B
            </span>
          </div>
        </div>
        <hr className="border-light_finance-textsub"></hr>
        <SimpleBar className=" !p-4" id="sidebar-scroll">
          <nav className="main-menu-container nav nav-pills flex-column sub-open">
            <div className="slide-left" id="slide-left">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="#7b8191"
                width="24"
                height="24"
                viewBox="0 0 24 24"
              >
                <path d="M13.293 6.293 7.586 12l5.707 5.707 1.414-1.414L10.414 12l4.293-4.293z"></path>
              </svg>
            </div>
            <ul className="main-menu">
              {menuitems.map((levelone: any) => (
                <Fragment key={Math.random()}>
                  <div
                    onClick={() => clickLevelone(levelone)}
                    className={` group flex justify-between items-center p-3 ${
                      (user.check_submit || user.role !== UserRole.BUSINESS) &&
                      "hover:!bg-white/30 hover:rounded-lg cursor-pointer"
                    } ${levelone.selected ? "active" : ""}`}
                  >
                    <div className="flex gap-2">
                      {user.check_submit || user.role !== UserRole.BUSINESS
                        ? levelone.selected
                          ? levelone?.iconDark
                          : levelone.icon
                        : levelone.iconStroke}
                      <span
                        className={`font-HelveticaNeue text-sm font-normal ${(user.check_submit || user.role !== UserRole.BUSINESS) && levelone.selected ? "text-light_finance-primary" : " text-light_finance-texttitle"} ${(user.check_submit || user.role !== UserRole.BUSINESS) && "group-hover:text-light_finance-primary group-hover:font-bold"}`}
                      >
                        {levelone.title}
                      </span>
                    </div>
                    {levelone.children.length > 0 && (
                      <i
                        className={`fa-solid fa-chevron-down fa-lg ${(user.check_submit || user.role !== UserRole.BUSINESS) && levelone.selected ? "text-light_finance-primary" : " text-light_finance-texttitle"} ${levelone.active && "rotate-180"}`}
                      ></i>
                    )}
                  </div>
                  {levelone.active && (
                    <div className="flex flex-col">
                      {levelone?.children?.map((child: any) => (
                        <div
                          key={child.id}
                          onClick={() => {
                            if (
                              (user.check_submit ||
                                user.role !== UserRole.BUSINESS) &&
                              child.type === "link"
                            ) {
                              navigate(child.path);
                            }
                          }}
                          className={`group py-3 pr-3 pl-10 ${(user.check_submit || user.role !== UserRole.BUSINESS) && "hover:!bg-white/30 hover:rounded-lg cursor-pointer"} ${
                            child.selected ? "active" : ""
                          }`}
                        >
                          <span
                            className={`font-HelveticaNeue text-sm font-normal ${(user.check_submit || user.role !== UserRole.BUSINESS) && child.selected ? "text-light_finance-primary" : " text-light_finance-texttitle"} ${(user.check_submit || user.role !== UserRole.BUSINESS) && "group-hover:text-light_finance-primary"}`}
                          >
                            {child.title}
                          </span>
                        </div>
                      ))}
                    </div>
                  )}
                </Fragment>
              ))}
            </ul>
            <div className="slide-right" id="slide-right">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="#7b8191"
                width="24"
                height="24"
                viewBox="0 0 24 24"
              >
                <path d="M10.707 17.707 16.414 12l-5.707-5.707-1.414 1.414L13.586 12l-4.293 4.293z"></path>
              </svg>
            </div>
          </nav>
        </SimpleBar>
      </aside>
    </Fragment>
  );
};

const mapStateToProps = (state: any) => ({
  local_varaiable: state,
});

export default connect(mapStateToProps, { ThemeChanger })(Sidebar);
