import { SurveyAnsType } from "./enum";

export type SignUpInfo = {
  fullname: string;
  phone?: string;
  email: string;
  DOB: string;
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
  check_submit?: boolean;
};

export type RecordItemType = {
  id: number;
  loan_id: number;
  time_submit: string;
  state: number;
  loan: {
    id: number;
    bank_id: number;
    name: string;
    category_id: number;
    credit_limit: number;
    interest_rate: number;
    origination_fee: number;
    thumbnail?: string;
    category: {};
    user: {
      id: number;
      bank: {
        bank_id: number;
        name: string;
      };
    };
  };
};
export type LoanItemType = {
  id: number;
  loan_id: number;
  survey_answer_id: number;
  state?: number;
  loans: {
    id: number;
    bank_id: number;
    name: string;
    time_began: string;
    credit_limit: number;
    interest_rate: number;
    origination_fee: number;
    thumbnail: string;
    bank: {
      bank_id: number;
      name: string;
    };
  };
  survey_answers: {
    id: number;
    property_address: string[];
  };
};

export type LoanDetailProcessType = {
  id: number;
  name: string;
  category_id: string;
  interest_rate_type: string;
  type: number;
  origination_fee: string;
  interest_rate: string;
  duration: string;
  credit_limit: string;
  description: string;
  time_began: string;
  category: {};
  bank: {
    name: string;
  };
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

export type Message = {
  avatar: string;
  sender?: string;
  content: string;
  time: string;
  type: "sent" | "received";
};

export type ChatData = {
  id: number;
  name: string;
  avatar: string;
  status: string;
  lastMessage: string;
  lastMessageTime: string;
  lastMessageStatus: string;
  isOnline: boolean;
  messages: Message[];
};

export type SurveyQuestion = {
  id: string;
  content?: string;
  label?: string;
  type: SurveyAnsType;
  choice: Array<string>;
  subQuestions?: Array<SurveyQuestion>;
};

export type Meeting = {
  id: number;
  loan_business_list_id: number;
  date_meeting: string;
  start_time: string;
  end_time: string;
  zoom_meeting: string;
  state: number;
};

export type Loans = {
  interest_rate_type: number;
};

export type SurveyAnswers = {
  property_address: string;
};

export type LoanOffer = {
  loans: Loans;
  survey_answers: SurveyAnswers;
};

export type ConsultingMeeting = {
  id: number;
  business_id: number;
  loan_id: number;
  time_submit: string;
  state: number;
  meeting: Meeting;
  loan_offer: LoanOffer;
};
export interface ProjectItemType {
  id: string;
  project_name: string;
  status?: boolean;
}
