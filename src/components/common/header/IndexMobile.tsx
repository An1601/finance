import { FC, Fragment } from "react";
import Modalsearch from "../modalsearch/modalsearch";
import SearchBar from "./SearchBar";
import ProfileHeader from "./ProfileHeader";
import Notification from "./Notification";

interface HeaderProps {}

const HeaderMobile: FC<HeaderProps> = () => {
  return (
    <Fragment>
      <div className="h-fit mt-[75px] flex flex-col gap-5">
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
