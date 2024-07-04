import { SurveyAnsType, UserRole } from "./enum";

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
  id: number;
  business_id: string;
  name: string;
  email: string;
  phone: string;
  DOB: string;
  business_address: string;
  thumbnail: string;
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
  access_token: string;
  refresh_token: string;
  type: number;
};

export type UserInfo = {
  access_token: string;
  refresh_token: string;
  role: UserRole | -1;
  business_profile: BusinessProfile | null;
  check_submit?: boolean;
};

export type RecordItemType = {
  id: number;
  loan_offer_id: number;
  time_submit: string;
  state: number;
  loan_offer: {
    id: number;
    loan_id: number;
    survey_answers: {
      id: number;
      property_address: Array<string>;
    };
    loans: {
      id: number;
      bank_id: number;
      name: string;
      credit_limit: number;
      interest_rate: number;
      origination_fee: number;
      thumbnail: string;
      time_began: string;
      user: {
        id: number;
        bank: {
          bank_id: number;
          name: string;
          thumbnail: string;
        };
      };
    };
  };
};
export type LoanItemType = {
  id: number;
  loan_id: number;
  survey_answer_id: number;
  state?: number;
  state_submit: number;
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
      thumbnail: string;
    };
  };
  loan_business_list: {
    id: number;
  };
  survey_answers: {
    id: number;
    property_address: string[];
  };
};

export type LoanDetailProcessType = {
  id: number;
  name: string;
  interest_rate_type: number;
  type: number;
  origination_fee: number;
  interest_rate: number;
  duration: number;
  credit_limit: number;
  description: string;
  time_began?: string;
  category?: {};
  bank?: {
    name: string;
  };
  document?: {
    id: number;
    file_name: string;
    path: string;
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
  note: string;
};

export type Loans = {
  interest_rate_type: number;
  name: string;
  credit_limit: number;
  interest_rate: string;
  bank: {
    name: string;
  };
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

export type FieldApplicationForm = {
  id: number;
  application_form_section_id: number;
  field_name: string;
  field_type: number;
  field_options: any;
  order_num: number;
};

export type ApplicationFormSection = {
  id: number;
  application_form_id: number;
  name: string;
  order_num: number;
  field_application_forms: FieldApplicationForm[];
};

export type ApplicationForm = {
  id: number;
  bank_id: number;
  name: string;
  description: string | null;
  application_form_sections: ApplicationFormSection[];
};

export type UserProcess = {
  current_step: string;
  state: number;
  idRecord: number;
};

export type StatusCheck = {
  status: number;
  current_step: string;
};
