export enum LoanStatus {
  APPROVED = 1,
  REJECT = 0,
  INPROGRESS = 2,
}
export enum MeetingStatus {
  PENDING = 0,
  CONNECT = 1,
  REJECT = 2,
}

export enum FilterOption {
  LATEST = "Latest",
  DATE_LAST_OPEN = "Date last opened",
}
export enum SurveyAnsType {
  TEXT = "TEXT",
  MULTI_CHOICE = "MULTI_CHOICE",
  ONE_CHOICE = "ONE_CHOICE",
  ARRAY = "ARRAY",
  SUB_QUESTION = "SUB_QUESTION",
}
export enum SurveyAnsEnum {
  finance_type = "1",
  collateral_type = "2",
  property_address_a = "3a",
  property_address_b = "3b",
  property_address_c = "3c",
  property_address_d = "3d",
  property_valuation = "4a",
  loan_amount = "4b",
  number_unit = "5a",
  total_square_footage = "5b",
  property_rent = "6",
  property_taxe = "7a",
  property_insurance = "7b",
  utilities = "7c",
  repair_maintenance = "7d",
  management_fee = "7e",
  finance_goal = "8",
  property_own = "9",
  credit_score = "10",
  net_worth = "11a",
  liquidity = "11b",
  income = "11c",
}
export enum InterestRateType {
  ADJUSTABLE_RATE = "Conforming adjustable-rate mortgage loans",
  FIXED_RATE = "Conventional fixed rate loans",
}
export enum LoanType {
  SECURE = 1,
  UNSECURE = 0,
}
