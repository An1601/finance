import { getTranslated } from "@i18n/index";

export const LOAN_FILTER_OPT = [
  {
    name: getTranslated("consulting.loanName"),
    child: [
      {
        id: 1,
        name: getTranslated("consulting.consumerLending"),
      },
      {
        id: 2,
        name: getTranslated("consulting.studentLoans"),
      },
      {
        id: 3,
        name: getTranslated("consulting.businessLoans"),
      },
      {
        id: 4,
        name: getTranslated("consulting.mortgagesLoans"),
      },
    ],
  },
  {
    name: getTranslated("consulting.rate"),
    child: [
      {
        id: 1,
        name: "5 - 7%",
      },
      {
        id: 2,
        name: "> 7 - 9%",
      },
      {
        id: 3,
        name: "> 9 -11% ",
      },
      {
        id: 4,
        name: "> 11 -13% ",
      },
    ],
  },
  {
    name: getTranslated("consulting.originationFee"),
    child: [
      {
        id: 1,
        name: "5 - 7%",
      },
      {
        id: 2,
        name: "> 7 - 9%",
      },
      {
        id: 3,
        name: "> 9 -11% ",
      },
      {
        id: 4,
        name: "> 11 -13% ",
      },
    ],
  },
  {
    name: getTranslated("consulting.creditLimit"),
    child: [
      {
        id: 1,
        name: "$10.000 - $100.000",
      },
      {
        id: 2,
        name: "> $100.000 - $500.000",
      },
      {
        id: 3,
        name: "> $500.000 - $5.000.000",
      },
      {
        id: 4,
        name: "> $5.000.000",
      },
    ],
  },
];
export const MEETING_FILTER_OPT = [
  {
    id: 1,
    name: getTranslated("consulting.merchantCash"),
  },
  {
    id: 2,
    name: getTranslated("consulting.franchiseLoans"),
  },
  {
    id: 3,
    name: getTranslated("consulting.equipmentFinancing"),
  },
  {
    id: 4,
    name: getTranslated("consulting.realEstate"),
  },
  {
    id: 5,
    name: getTranslated("consulting.creditCards"),
  },
  {
    id: 6,
    name: getTranslated("consulting.securedBusiness"),
  },
  {
    id: 7,
    name: getTranslated("consulting.invoiceFactoring"),
  },
  {
    id: 8,
    name: getTranslated("consulting.microloans"),
  },
];
export const SURVEY_FILTER_OPT = [
  {
    name: getTranslated("surveyBank.netWorth"),
    child: [
      {
        id: 1,
        name: "< $1 million",
      },
      {
        id: 2,
        name: "$1-$5 million",
      },
      {
        id: 3,
        name: "$5-$10 million",
      },
      {
        id: 4,
        name: "$10+ million",
      },
    ],
  },
  {
    name: getTranslated("surveyBank.liquidity"),
    child: [
      {
        id: 1,
        name: "< $500K",
      },
      {
        id: 2,
        name: "$500K-$1 million",
      },
      {
        id: 3,
        name: "$1-$3 million",
      },
      {
        id: 4,
        name: "$3+ million",
      },
    ],
  },
  {
    name: getTranslated("surveyBank.income"),
    child: [
      {
        id: 1,
        name: "< $100,000",
      },
      {
        id: 2,
        name: "$100,001 - $250,000",
      },
      {
        id: 3,
        name: "$250,000 - $500,000",
      },
      {
        id: 4,
        name: "> $500,000",
      },
    ],
  },
  {
    name: getTranslated("consulting.loanName"),
    child: [
      {
        id: 1,
        name: getTranslated("consulting.consumerLending"),
      },
      {
        id: 2,
        name: getTranslated("consulting.studentLoans"),
      },
      {
        id: 3,
        name: getTranslated("consulting.businessLoans"),
      },
      {
        id: 4,
        name: getTranslated("consulting.mortgagesLoans"),
      },
    ],
  },
];
export const US_CURRENTCY = new Intl.NumberFormat("en-US", {
  style: "currency",
  currency: "USD",
});
export const formatCreditLimit = (price: number): string => {
  if (price < 1000) {
    return price.toFixed(2);
  } else {
    const prePrice = price > 1000000 ? price / 1000000 : price / 1000;
    const roundPrice = Math.round(prePrice * 100) / 100;
    return `${roundPrice}${price > 1000000 ? "M" : "K"}`;
  }
};
