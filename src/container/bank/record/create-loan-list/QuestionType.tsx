import { LoanSubmit } from "@type/enum";
import text from "@assets/icon/textTypeIcon.svg";
import number from "@assets/icon/numberTypeIcon.svg";
import checkbox from "@assets/icon/checkboxTypeIcon.svg";
import radio from "@assets/icon/radioTypeIcon.svg";
import date from "@assets/icon/dateTypeIcon.svg";

export const questionType = {
  text: {
    value: LoanSubmit.TEXT,
    display: (
      <div className="flex gap-3 items-center">
        <img src={text} />
        <div className=" text-sm font-normal text-light_finance-textbody font-HelveticaNeue">
          Text
        </div>
      </div>
    ),
  },
  number: {
    value: LoanSubmit.NUMBER,
    display: (
      <div className="flex gap-3 items-center">
        <img src={number} />
        <div className=" text-sm font-normal text-light_finance-textbody font-HelveticaNeue">
          Number
        </div>
      </div>
    ),
  },
  radio: {
    value: LoanSubmit.RADIO,
    display: (
      <div className="flex gap-3 items-center">
        <img src={radio} />
        <div className=" text-sm font-normal text-light_finance-textbody font-HelveticaNeue">
          Choice
        </div>
      </div>
    ),
  },
  chechbox: {
    value: LoanSubmit.CHECKBOX,
    display: (
      <div className="flex gap-3 items-center">
        <img src={checkbox} />
        <div className=" text-sm font-normal text-light_finance-textbody font-HelveticaNeue">
          Check box
        </div>
      </div>
    ),
  },
  date: {
    value: LoanSubmit.DATE,
    display: (
      <div className="flex gap-3 items-center">
        <img src={date} />
        <div className=" text-sm font-normal text-light_finance-textbody font-HelveticaNeue">
          Date
        </div>
      </div>
    ),
  },
};
