import useWindowWidth from "@components/hook/useWindowWidth";
import RecentSearch from "@container/dashboards/search/RecentSearch";
import { FC, useEffect, useState } from "react";
import SearchBar from "../header/SearchBar";

interface ModalsearchProps {}

const Modalsearch: FC<ModalsearchProps> = () => {
  const [_show, setShow] = useState(false);
  const windowWidth = useWindowWidth();
  const handleClose = () => setShow(false);

  useEffect(() => {
    const clickHandler = (_event: any) => {
      const searchResult = document.querySelector(".search-result");
      if (searchResult) {
        searchResult.classList.add("hidden");
      }
    };
    document.addEventListener("click", clickHandler);
    return () => {
      document.removeEventListener("click", clickHandler);
    };
  }, []);

  document.addEventListener("click", function () {
    document.querySelector(".search-result")?.classList.add("d-none");
  });

  return windowWidth > 480 ? (
    <div
      id="search-modal"
      className="hs-overlay ti-modal hidden"
      onClick={handleClose}
    >
      <div className="mt-28 ti-modal-box">
        <div className="ti-modal-content min-h-80 p-6 !border !border-defaultborder dark:!border-defaultborder/10 !rounded-[0.5rem]">
          <SearchBar isEnable={true} />
          <div className="mt-5 bg-light_finance-background ">
            <RecentSearch />
          </div>
        </div>
      </div>
    </div>
  ) : (
    <></>
  );
};

export default Modalsearch;
