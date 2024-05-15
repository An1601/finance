import React from "react";

function Overview() {
  return (
    <div className="md:flex block items-center justify-between my-[1.5rem] page-header-breadcrumb">
      <div>
        <p className="font-semibold text-[1.125rem] text-defaulttextcolor dark:text-defaulttextcolor/70 !mb-0 ">
          Welcome back, Json Taylor !
        </p>
        <p className="font-normal text-[#8c9097] dark:text-white/50 text-[0.813rem]">
          Track your sales activity, leads and deals here.
        </p>
      </div>
      <div className="btn-list md:mt-0 mt-2">
        <button
          type="button"
          className="ti-btn bg-primary text-white btn-wave !font-medium !me-[0.375rem] !ms-0 !text-[0.85rem] !rounded-[0.35rem] !py-[0.51rem] !px-[0.86rem] shadow-none mb-0"
        >
          <i className="ri-filter-3-fill  inline-block"></i>Filters
        </button>
        <button
          type="button"
          className="ti-btn ti-btn-outline-secondary btn-wave !font-medium  !me-[0.375rem]  !ms-0 !text-[0.85rem] !rounded-[0.35rem] !py-[0.51rem] !px-[0.86rem] shadow-none mb-0"
        >
          <i className="ri-upload-cloud-line  inline-block"></i>Export
        </button>
      </div>
    </div>
  );
}

export default Overview;
