import { FC, Fragment } from "react";
import Modalsearch from "../modalsearch/modalsearch";
import SearchBar from "./SearchBar";
import ProfileHeader from "./ProfileHeader";
import Notification from "./Notification";
import { useNavigate } from "react-router-dom";

interface HeaderProps {}

const HeaderMobile: FC<HeaderProps> = () => {
  return (
    <Fragment>
      <div className="h-fit flex flex-col gap-5">
        <div className="flex justify-between">
          <ProfileHeader />
          <Notification />
        </div>
        <SearchBar />
      </div>
      <Modalsearch />
    </Fragment>
  );
};
export default HeaderMobile;
