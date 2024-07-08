import { useNavigate } from "react-router-dom";

const BankTabHeader = () => {
  const navigate = useNavigate();
  const headerItem = [
    {
      id: 1,
      name: "Survey list",
      path: "/bank/survey-list",
    },
    {
      id: 2,
      name: "Record",
      path: "/bank/records",
    },
    {
      id: 3,
      name: "My package loans",
      path: "/bank/loan-list",
    },
    {
      id: 4,
      name: "Application forms",
      path: "/bank/form-list",
    },
  ];
  return (
    <div className="w-full h-9 relative overflow-scroll no-scrollbar sm:hidden">
      <div
        className={`left-0 top-0 absolute border-b "border-light_finance-texttitle justify-start items-start inline-flex`}
      >
        {headerItem.map((item) => (
          <div
            key={item.id}
            className={`w-[142px] py-2 border-b-2 ${location.pathname === item.path ? "border-light_finance-primary" : "border-light_finance-texttitle"} flex-col justify-start items-center gap-1 inline-flex`}
            onClick={() => {
              navigate(item.path);
            }}
          >
            <div
              className={`${location.pathname === item.path ? "text-light_finance-primary" : "text-light_finance-textsub"} text-sm font-medium font-['Helvetica Neue'] leading-tight text-center`}
            >
              {item.name}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default BankTabHeader;
