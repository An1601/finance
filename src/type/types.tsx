export type SignUpInfo = {
  name: string;
  phoneNumber?: string;
  email: string;
  DoB: string;
  address: string;
  password: string;
  confirmPassword: string;
  policy_agreement: boolean;
};

export type LoginInfo = {
  email: string;
  password: string;
};
