import { FC, Fragment, useState } from "react";
import { Link } from "react-router-dom";
import {
  Conversionratio,
  Dealsstatistics,
  Profit,
  Profitearned,
  Revenueanalytics,
  Sourcedata,
  Totalcustomers,
  Totaldeals,
  Totalrevenue,
} from "./crmdata";
import face10 from "../../../assets/images/faces/10.jpg";
import face12 from "../../../assets/images/faces/12.jpg";

interface CrmProps {}

const Crm: FC<CrmProps> = () => {
  // for User search function
  const [Data, setData] = useState(Dealsstatistics);

  const userdata: any = [];

  const myfunction = (idx: any) => {
    let Data;
    for (Data of Dealsstatistics) {
      if (Data.name[0] == " ") {
        Data.name = Data.name.trim();
      }
      if (Data.name.toLowerCase().includes(idx.toLowerCase())) {
        if (Data.name.toLowerCase().startsWith(idx.toLowerCase())) {
          userdata.push(Data);
        }
      }
    }
    setData(userdata);
  };
  return (
    <Fragment>
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
      <div className="grid grid-cols-12 gap-x-6">
        <div className="xl:col-span-8 col-span-12">
          <div className="grid grid-cols-12 gap-x-6">
            <div className="xxl:col-span-12 xl:col-span-12 col-span-12">
              <div className="box">
                <div className="box-header !gap-0 !m-0 justify-between">
                  <div className="box-title">Revenue Analytics</div>
                  <div className="hs-dropdown ti-dropdown">
                    <Link
                      to="#"
                      className="text-[0.75rem] px-2 font-normal text-[#8c9097] dark:text-white/50"
                      aria-expanded="false"
                    >
                      View All
                      <i className="ri-arrow-down-s-line align-middle ms-1 inline-block"></i>
                    </Link>
                    <ul
                      className="hs-dropdown-menu ti-dropdown-menu hidden"
                      role="menu"
                    >
                      <li>
                        <Link
                          className="ti-dropdown-item !py-2 !px-[0.9375rem] !text-[0.8125rem] !font-medium block"
                          to="#"
                        >
                          Today
                        </Link>
                      </li>
                      <li>
                        <Link
                          className="ti-dropdown-item !py-2 !px-[0.9375rem] !text-[0.8125rem] !font-medium block"
                          to="#"
                        >
                          This Week
                        </Link>
                      </li>
                      <li>
                        <Link
                          className="ti-dropdown-item !py-2 !px-[0.9375rem] !text-[0.8125rem] !font-medium block"
                          to="#"
                        >
                          Last Week
                        </Link>
                      </li>
                    </ul>
                  </div>
                </div>
                <div className="box-body !py-5">
                  <div id="crm-revenue-analytics">
                    <Revenueanalytics />
                  </div>
                </div>
              </div>
            </div>
            <div className="xxl:col-span-12 xl:col-span-12 col-span-12">
              <div className="box custom-card">
                <div className="box-header justify-between">
                  <div className="box-title">Deals Statistics</div>
                  <div className="flex flex-wrap gap-2">
                    <div>
                      <input
                        className="ti-form-control form-control-sm"
                        type="text"
                        placeholder="Search Here"
                        onChange={(ele) => {
                          myfunction(ele.target.value);
                        }}
                        aria-label=".form-control-sm example"
                      />
                    </div>
                    <div className="hs-dropdown ti-dropdown">
                      <Link
                        to="#"
                        className="ti-btn ti-btn-primary !bg-primary !text-white !py-1 !px-2 !text-[0.75rem] !m-0 !gap-0 !font-medium"
                        aria-expanded="false"
                      >
                        Sort By
                        <i className="ri-arrow-down-s-line align-middle ms-1 inline-block"></i>
                      </Link>
                      <ul
                        className="hs-dropdown-menu ti-dropdown-menu hidden"
                        role="menu"
                      >
                        <li>
                          <Link
                            className="ti-dropdown-item !py-2 !px-[0.9375rem] !text-[0.8125rem] !font-medium block"
                            to="#"
                          >
                            New
                          </Link>
                        </li>
                        <li>
                          <Link
                            className="ti-dropdown-item !py-2 !px-[0.9375rem] !text-[0.8125rem] !font-medium block"
                            to="#"
                          >
                            Popular
                          </Link>
                        </li>
                        <li>
                          <Link
                            className="ti-dropdown-item !py-2 !px-[0.9375rem] !text-[0.8125rem] !font-medium block"
                            to="#"
                          >
                            Relevant
                          </Link>
                        </li>
                      </ul>
                    </div>
                  </div>
                </div>
                <div className="box-body">
                  <div className="overflow-x-auto">
                    <table className="table min-w-full whitespace-nowrap table-hover border table-bordered">
                      <thead>
                        <tr className="border border-inherit border-solid dark:border-defaultborder/10">
                          <th scope="row" className="!ps-4 !pe-5">
                            <input
                              className="form-check-input"
                              type="checkbox"
                              id="checkboxNoLabel1"
                              defaultValue=""
                              aria-label="..."
                            />
                          </th>
                          <th
                            scope="col"
                            className="!text-start !text-[0.85rem] min-w-[200px]"
                          >
                            Sales Rep
                          </th>
                          <th
                            scope="col"
                            className="!text-start !text-[0.85rem]"
                          >
                            Category
                          </th>
                          <th
                            scope="col"
                            className="!text-start !text-[0.85rem]"
                          >
                            Mail
                          </th>
                          <th
                            scope="col"
                            className="!text-start !text-[0.85rem]"
                          >
                            Location
                          </th>
                          <th
                            scope="col"
                            className="!text-start !text-[0.85rem]"
                          >
                            Date
                          </th>
                          <th
                            scope="col"
                            className="!text-start !text-[0.85rem]"
                          >
                            Action
                          </th>
                        </tr>
                      </thead>
                      <tbody>
                        {Data.map((idx) => (
                          <tr
                            className="border border-inherit border-solid hover:bg-gray-100 dark:border-defaultborder/10 dark:hover:bg-light"
                            key={Math.random()}
                          >
                            <th scope="row" className="!ps-4 !pe-5">
                              <input
                                className="form-check-input"
                                type="checkbox"
                                defaultChecked={
                                  idx.checked === "defaultChecked"
                                }
                                id="checkboxNoLabel2"
                                defaultValue=""
                                aria-label="..."
                              />
                            </th>
                            <td>
                              <div className="flex items-center font-semibold">
                                <span className="!me-2 inline-flex justify-center items-center">
                                  <img
                                    src={idx.src}
                                    alt="img"
                                    className="w-[1.75rem] h-[1.75rem] leading-[1.75rem] text-[0.65rem]  rounded-full"
                                  />
                                </span>
                                {idx.name}
                              </div>
                            </td>
                            <td>{idx.role}</td>
                            <td>{idx.mail}</td>
                            <td>
                              <span
                                className={`inline-flex text-${idx.color} !py-[0.15rem] !px-[0.45rem] rounded-sm !font-semibold !text-[0.75em] bg-${idx.color}/10`}
                              >
                                {idx.location}
                              </span>
                            </td>
                            <td>{idx.date}</td>
                            <td>
                              <div className="flex flex-row items-center !gap-2 text-[0.9375rem]">
                                <Link
                                  aria-label="anchor"
                                  to="#"
                                  className="ti-btn ti-btn-icon ti-btn-wave !gap-0 !m-0 !h-[1.75rem] !w-[1.75rem] text-[0.8rem] bg-success/10 text-success hover:bg-success hover:text-white hover:border-success"
                                >
                                  <i className="ri-download-2-line"></i>
                                </Link>
                                <Link
                                  aria-label="anchor"
                                  to="#"
                                  className="ti-btn ti-btn-icon ti-btn-wave !gap-0 !m-0 !h-[1.75rem] !w-[1.75rem] text-[0.8rem] bg-primary/10 text-primary hover:bg-primary hover:text-white hover:border-primary"
                                >
                                  <i className="ri-edit-line"></i>
                                </Link>
                              </div>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>
                <div className="box-footer">
                  <div className="sm:flex items-center">
                    <div className="text-defaulttextcolor dark:text-defaulttextcolor/70">
                      Showing 5 Entries{" "}
                      <i className="bi bi-arrow-right ms-2 font-semibold"></i>
                    </div>
                    <div className="ms-auto">
                      <nav
                        aria-label="Page navigation"
                        className="pagination-style-4"
                      >
                        <ul className="ti-pagination mb-0">
                          <li className="page-item disabled">
                            <Link className="page-link" to="#">
                              Prev
                            </Link>
                          </li>
                          <li className="page-item">
                            <Link className="page-link active" to="#">
                              1
                            </Link>
                          </li>
                          <li className="page-item">
                            <Link className="page-link" to="#">
                              2
                            </Link>
                          </li>
                          <li className="page-item">
                            <Link className="page-link !text-primary" to="#">
                              next
                            </Link>
                          </li>
                        </ul>
                      </nav>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="xl:col-span-4 col-span-12">
          <div className="grid grid-cols-12 gap-x-6">
            <div className="xxl:col-span-12 xl:col-span-12 col-span-12">
              <div className="box">
                <div className="box-header flex justify-between">
                  <div className="box-title">Top Deals</div>
                  <div className="hs-dropdown ti-dropdown">
                    <Link
                      aria-label="anchor"
                      to="#"
                      className="flex items-center justify-center w-[1.75rem] h-[1.75rem]  !text-[0.8rem] !py-1 !px-2 rounded-sm bg-light border-light shadow-none !font-medium"
                      aria-expanded="false"
                    >
                      <i className="fe fe-more-vertical text-[0.8rem]"></i>
                    </Link>
                    <ul className="hs-dropdown-menu ti-dropdown-menu hidden">
                      <li>
                        <Link
                          className="ti-dropdown-item !py-2 !px-[0.9375rem] !text-[0.8125rem] !font-medium block"
                          to="#"
                        >
                          Week
                        </Link>
                      </li>
                      <li>
                        <Link
                          className="ti-dropdown-item !py-2 !px-[0.9375rem] !text-[0.8125rem] !font-medium block"
                          to="#"
                        >
                          Month
                        </Link>
                      </li>
                      <li>
                        <Link
                          className="ti-dropdown-item !py-2 !px-[0.9375rem] !text-[0.8125rem] !font-medium block"
                          to="#"
                        >
                          Year
                        </Link>
                      </li>
                    </ul>
                  </div>
                </div>
                <div className="box-body">
                  <ul className="list-none crm-top-deals mb-0">
                    <li className="mb-[0.9rem]">
                      <div className="flex items-start flex-wrap">
                        <div className="me-2">
                          <span className=" inline-flex items-center justify-center">
                            <img
                              src={face10}
                              alt=""
                              className="w-[1.75rem] h-[1.75rem] leading-[1.75rem] text-[0.65rem]  rounded-full"
                            />
                          </span>
                        </div>
                        <div className="flex-grow">
                          <p className="font-semibold mb-[1.4px]  text-[0.813rem]">
                            Michael Jordan
                          </p>
                          <p className="text-[#8c9097] dark:text-white/50 text-[0.75rem]">
                            michael.jordan@example.com
                          </p>
                        </div>
                        <div className="font-semibold text-[0.9375rem] ">
                          $2,893
                        </div>
                      </div>
                    </li>
                    <li className="mb-[0.9rem]">
                      <div className="flex items-start flex-wrap">
                        <div className="me-2">
                          <span className="inline-flex items-center justify-center !w-[1.75rem] !h-[1.75rem] leading-[1.75rem] text-[0.65rem]  rounded-full text-warning  bg-warning/10 font-semibold">
                            EK
                          </span>
                        </div>
                        <div className="flex-grow">
                          <p className="font-semibold mb-[1.4px]  text-[0.813rem]">
                            Emigo Kiaren
                          </p>
                          <p className="text-[#8c9097] dark:text-white/50 text-[0.75rem]">
                            emigo.kiaren@gmail.com
                          </p>
                        </div>
                        <div className="font-semibold text-[0.9375rem] ">
                          $4,289
                        </div>
                      </div>
                    </li>
                    <li className="mb-[0.9rem]">
                      <div className="flex items-top flex-wrap">
                        <div className="me-2">
                          <span className="inline-flex items-center justify-center">
                            <img
                              src={face12}
                              alt=""
                              className="!w-[1.75rem] !h-[1.75rem] leading-[1.75rem] text-[0.65rem]  rounded-full"
                            />
                          </span>
                        </div>
                        <div className="flex-grow">
                          <p className="font-semibold mb-[1.4px]  text-[0.813rem]">
                            Randy Origoan
                          </p>
                          <p className="text-[#8c9097] dark:text-white/50 text-[0.75rem]">
                            randy.origoan@gmail.com
                          </p>
                        </div>
                        <div className="font-semibold text-[0.9375rem] ">
                          $6,347
                        </div>
                      </div>
                    </li>
                    <li className="mb-[0.9rem]">
                      <div className="flex items-top flex-wrap">
                        <div className="me-2">
                          <span className="inline-flex items-center justify-center !w-[1.75rem] !h-[1.75rem] leading-[1.75rem] text-[0.65rem]  rounded-full text-success bg-success/10 font-semibold">
                            GP
                          </span>
                        </div>
                        <div className="flex-grow">
                          <p className="font-semibold mb-[1.4px]  text-[0.813rem]">
                            George Pieterson
                          </p>
                          <p className="text-[#8c9097] dark:text-white/50 text-[0.75rem]">
                            george.pieterson@gmail.com
                          </p>
                        </div>
                        <div className="font-semibold text-[0.9375rem] ">
                          $3,894
                        </div>
                      </div>
                    </li>
                    <li>
                      <div className="flex items-top flex-wrap">
                        <div className="me-2">
                          <span className="inline-flex items-center justify-center !w-[1.75rem] !h-[1.75rem] leading-[1.75rem] text-[0.65rem]  rounded-full text-primary bg-primary/10 font-semibold">
                            KA
                          </span>
                        </div>
                        <div className="flex-grow">
                          <p className="font-semibold mb-[1.4px]  text-[0.813rem]">
                            Kiara Advain
                          </p>
                          <p className="text-[#8c9097] dark:text-white/50 text-[0.75rem]">
                            kiaraadvain214@gmail.com
                          </p>
                        </div>
                        <div className="font-semibold text-[0.9375rem] ">
                          $2,679
                        </div>
                      </div>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
            <div className="xxl:col-span-12 xl:col-span-12  col-span-12">
              <div className="box">
                <div className="box-header justify-between">
                  <div className="box-title">Leads By Source</div>
                  <div className="hs-dropdown ti-dropdown">
                    <Link
                      aria-label="anchor"
                      to="#"
                      className="flex items-center justify-center w-[1.75rem] h-[1.75rem] ! !text-[0.8rem] !py-1 !px-2 rounded-sm bg-light border-light shadow-none !font-medium"
                      aria-expanded="false"
                    >
                      <i className="fe fe-more-vertical text-[0.8rem]"></i>
                    </Link>
                    <ul className="hs-dropdown-menu ti-dropdown-menu hidden">
                      <li>
                        <Link
                          className="ti-dropdown-item !py-2 !px-[0.9375rem] !text-[0.8125rem] !font-medium block"
                          to="#"
                        >
                          Week
                        </Link>
                      </li>
                      <li>
                        <Link
                          className="ti-dropdown-item !py-2 !px-[0.9375rem] !text-[0.8125rem] !font-medium block"
                          to="#"
                        >
                          Month
                        </Link>
                      </li>
                      <li>
                        <Link
                          className="ti-dropdown-item !py-2 !px-[0.9375rem] !text-[0.8125rem] !font-medium block"
                          to="#"
                        >
                          Year
                        </Link>
                      </li>
                    </ul>
                  </div>
                </div>
                <div className="box-body overflow-hidden">
                  <div className="leads-source-chart flex items-center justify-center">
                    <Sourcedata />
                    <div className="lead-source-value ">
                      <span className="block text-[0.875rem] ">Total</span>
                      <span className="block text-[1.5625rem] font-bold">
                        4,145
                      </span>
                    </div>
                  </div>
                </div>
                <div className="grid grid-cols-4 border-t border-dashed dark:border-defaultborder/10">
                  <div className="col !p-0">
                    <div className="!ps-4 p-[0.95rem] text-center border-e border-dashed dark:border-defaultborder/10">
                      <span className="text-[#8c9097] dark:text-white/50 text-[0.75rem] mb-1 crm-lead-legend mobile inline-block">
                        Mobile
                      </span>
                      <div>
                        <span className="text-[1rem]  font-semibold">
                          1,624
                        </span>
                      </div>
                    </div>
                  </div>
                  <div className="col !p-0">
                    <div className="p-[0.95rem] text-center border-e border-dashed dark:border-defaultborder/10">
                      <span className="text-[#8c9097] dark:text-white/50 text-[0.75rem] mb-1 crm-lead-legend desktop inline-block">
                        Desktop
                      </span>
                      <div>
                        <span className="text-[1rem]  font-semibold">
                          1,267
                        </span>
                      </div>
                    </div>
                  </div>
                  <div className="col !p-0">
                    <div className="p-[0.95rem] text-center border-e border-dashed dark:border-defaultborder/10">
                      <span className="text-[#8c9097] dark:text-white/50 text-[0.75rem] mb-1 crm-lead-legend laptop inline-block">
                        Laptop
                      </span>
                      <div>
                        <span className="text-[1rem]  font-semibold">
                          1,153
                        </span>
                      </div>
                    </div>
                  </div>
                  <div className="col !p-0">
                    <div className="!pe-4 p-[0.95rem] text-center">
                      <span className="text-[#8c9097] dark:text-white/50 text-[0.75rem] mb-1 crm-lead-legend tablet inline-block">
                        Tablet
                      </span>
                      <div>
                        <span className="text-[1rem]  font-semibold">679</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Fragment>
  );
};

export default Crm;
