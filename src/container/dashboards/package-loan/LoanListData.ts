import { LoanListItemType } from "@type/types";

export const bankListData = [
  {
    bank_id: 1,
    name: "State Bank of India",
    thumbnail:
      "https://i.pinimg.com/736x/2a/2c/1d/2a2c1d90075390b22e7e6060254dab0d.jpg",
    loan_portfolio: 123937273,
  },
  {
    bank_id: 2,
    name: "Adda 247",
    thumbnail:
      "https://i.pinimg.com/736x/2a/2c/1d/2a2c1d90075390b22e7e6060254dab0d.jpg",
    loan_portfolio: 88937931,
  },
  {
    bank_id: 3,
    name: "UMB Banks",
    thumbnail:
      "https://i.pinimg.com/736x/2a/2c/1d/2a2c1d90075390b22e7e6060254dab0d.jpg",
    loan_portfolio: 70494784,
  },
  {
    bank_id: 4,
    name: "Bank SA",
    thumbnail:
      "https://i.pinimg.com/736x/2a/2c/1d/2a2c1d90075390b22e7e6060254dab0d.jpg",
    loan_portfolio: 51938947,
  },
  {
    bank_id: 5,
    name: "Security bank",
    thumbnail:
      "https://i.pinimg.com/736x/2a/2c/1d/2a2c1d90075390b22e7e6060254dab0d.jpg",
    loan_portfolio: 50928384,
  },
];

const loanListData = [
  {
    id: 17,
    name: "Merchant cash",
    category_id: 1,
    type: 1,
    bank_id: 1,
    APR: 6.45,
    rate_month: 7.38,
    duration: 5,
    credit_limit: 25.0,
    description: "",
    time_began: new Date(2001, 0, 1),
    state: 1,
    project: {
      name: "163 ItsConnorWade",
    },
  },
  {
    id: 2,
    name: "Franchise loans",
    category_id: 1,
    type: 1,
    bank_id: 2,
    APR: 6.45,
    rate_month: 7.38,
    duration: 5,
    credit_limit: 25.0,
    description: "",
    time_began: new Date(2001, 0, 1),
    state: 0,
    project: {
      name: "163 ItsConnorWade",
    },
  },
  {
    id: 3,
    name: "Small Business",
    category_id: 1,
    type: 1,
    bank_id: 3,
    APR: 6.45,
    rate_month: 7.38,
    duration: 5,
    credit_limit: 25.0,
    description: "",
    time_began: new Date(2001, 0, 1),
    state: 1,
    project: {
      name: "163 ItsConnorWade",
    },
  },
  {
    id: 4,
    name: "Real Estate",
    category_id: 1,
    type: 1,
    bank_id: 4,
    APR: 6.45,
    rate_month: 7.38,
    duration: 5,
    credit_limit: 25.0,
    description: "",
    time_began: new Date(2001, 0, 1),
    state: 1,
    project: {
      name: "163 ItsConnorWade",
    },
  },
  {
    id: 5,
    name: "Credit cards",
    category_id: 1,
    type: 1,
    bank_id: 5,
    APR: 6.45,
    rate_month: 7.38,
    duration: 5,
    credit_limit: 25.0,
    description: "",
    time_began: new Date(2001, 0, 1),
    state: 2,
    project: {
      name: "163 ItsConnorWade",
    },
  },
];

function fetchLoanDetails(isRecord: boolean) {
  return loanListData.map((loan) => {
    const bank = bankListData.find((bank) => bank.bank_id === loan.bank_id);
    if (isRecord)
      return {
        id: loan.id,
        loan_name: loan.name,
        origination_fee: loan.APR,
        rate_month: loan.rate_month,
        credit_limit: loan.credit_limit,
        state: loan.state,
        bank: {
          name: bank?.name ?? "",
        },
        bank_thumbnail: bank?.thumbnail ?? "",
        time_began: loan.time_began,
        project: loan.project,
      };
    else
      return {
        id: loan.id,
        loan_name: loan.name,
        origination_fee: loan.APR,
        rate_month: loan.rate_month,
        credit_limit: loan.credit_limit,
        bank: {
          name: bank?.name ?? "",
        },
        bank_thumbnail: bank?.thumbnail ?? "",
        time_began: loan.time_began,
        project: loan.project,
      };
  });
}

export const loanDetails: LoanListItemType[] = fetchLoanDetails(false);
export const loanRecords = fetchLoanDetails(true);
