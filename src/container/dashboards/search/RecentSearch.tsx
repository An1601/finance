import { Fragment, useState } from "react";
const searchData = [
  {
    content: "Development Credit Bank",
  },
  {
    content: "South Indian Bank",
  },
  {
    content: "Tamilnad Mercantile Bank Ltd.",
  },
  {
    content: "Indian Bank",
  },
  {
    content: "Punjab & Sind Bank",
  },
  {
    content: "ICICI Bank",
  },
  {
    content: "Axis Bank",
  },
  {
    content: "Punjab National Bank - Retail Banking",
  },
];
function RecentSearch() {
  const [items, setItems] = useState(searchData);

  return (
    <Fragment>
      <div className="flex gap-2 items-center">
        <div className="w-1 h-5 bg-danger rounded-sm" />
        <div className="text-center text-light_finance-textbody text-lg font-bold font-HelveticaNeue leading-7">
          Recents Search
        </div>
      </div>
      <div className="mt-5 flex flex-col gap-2">
        {items.map((searchItem, index) => {
          return (
            <div
              key={index}
              className="flex gap-4 items-center justify-between p-3 border-[1px] border-stroke rounded-lg"
            >
              <div className="font-HelveticaNeue text-sm leading-5 text-light_finance-textbody font-normal">
                {searchItem.content}
              </div>
              <i
                className="fa-solid fa-x fa-sm text-light_finance-textbody font-normal cursor-pointer"
                onClick={() => setItems(items.filter((_, i) => i !== index))}
              ></i>
            </div>
          );
        })}
      </div>
    </Fragment>
  );
}

export default RecentSearch;
