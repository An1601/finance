import SearchBar from "@components/common/header/SearchBar";
import { useNavigate } from "react-router-dom";
import RecentSearch from "./RecentSearch";
import useWindowWidth from "@components/hook/useWindowWidth";
import { useTranslation } from "react-i18next";

const SearchMobile = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  if (useWindowWidth() > 480) navigate("/");
  return (
    <div className="min-h-screen relative pt-7 md:m-0 flex flex-col bg-light_finance-background1">
      <div className="flex items-center justify-between">
        <div className="flex gap-3 items-center mx-6">
          <i
            className=" fa-solid fa-arrow-left fa-xl text-light_finance-textbody"
            onClick={() => {
              navigate("/");
            }}
          ></i>
          <div className="text-center text-light_finance-textbody text-2xl font-bold font-HelveticaNeue leading-8">
            {t("search.search")}
          </div>
        </div>
      </div>
      <div className="m-6">
        <SearchBar isEnable={true} />
      </div>
      <div className="w-full flex-1 bg-light_finance-background p-6 rounded-t-[1.5rem]">
        <RecentSearch />
      </div>
    </div>
  );
};

export default SearchMobile;
