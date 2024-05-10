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

export type LoginInfo = {
  email: string;
  password: string;
};
