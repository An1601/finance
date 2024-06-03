import { LoanStatus } from "./enum";

export type SignUpInfo = {
  name: string;
  phone?: string;
  email: string;
  date_of_birth: string;
  address: string;
  password: string;
  password_confirmation: string;
  policy_agreement: boolean;
};

export type BusinessProfile = {
  name: string;
  email: string;
  phone: string;
  DOB: string;
  business_address: string;
};

export type LoginInfo = {
  email: string;
  password: string;
};

export type ResetPasswordInfo = {
  password: string;
  confirmPassword: string;
};

export type LoginResponse = {
  id: number;
  name: string;
  email: string;
  phone: string;
  date_of_birth: string;
  address: string;
  email_verified_at: string;
  verified_code: string;
  expired_code: string;
  created_at: string;
  updated_at: string;
  access_token: string;
  refresh_token: string;
};

export type UserInfo = {
  id: string;
  name: string;
  email: string;
  phone: string;
  date_of_birth: string;
  address: string;
  email_verified_at: string;
  access_token: string;
  refresh_token: string;
  business_profile: BusinessProfile | null;
};

export type LoanCategory = {
  id: number;
  name: string;
  thumbnail: string;
};

export type Loans = {
  id: number;
  name: string;
  category_id: number;
  type: number;
  bank_id: number;
  APR: number;
  rate_month: number;
  duration: number;
  credit_limit: number;
  description: string;
  time_began: Date;
  state: LoanStatus;
};

export type LoanDetails = {
  loan_name: string;
  APR: number;
  rate_month: number;
  credit_limit: number;
  state: LoanStatus;
  bank_name: string;
  bank_thumbnail: string;
  time_began: Date;
};

export type UpdateProfile = {
  name: string;
  phone: string;
  DOB: string;
  business_address: string;
  email: string;
};

export type ChangePasswordInfo = {
  current_password: string;
  new_password: string;
  new_password_confirmation: string;
};
