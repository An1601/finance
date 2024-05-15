import React, { useState } from "react";
import { Link } from "react-router-dom";
import { Dealsstatistics } from "./indexData";

function StatePackageLoans() {
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
                  <th scope="col" className="!text-start !text-[0.85rem]">
                    Category
                  </th>
                  <th scope="col" className="!text-start !text-[0.85rem]">
                    Mail
                  </th>
                  <th scope="col" className="!text-start !text-[0.85rem]">
                    Location
                  </th>
                  <th scope="col" className="!text-start !text-[0.85rem]">
                    Date
                  </th>
                  <th scope="col" className="!text-start !text-[0.85rem]">
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
                        defaultChecked={idx.checked === "defaultChecked"}
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
              <nav aria-label="Page navigation" className="pagination-style-4">
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
  );
}

export default StatePackageLoans;
