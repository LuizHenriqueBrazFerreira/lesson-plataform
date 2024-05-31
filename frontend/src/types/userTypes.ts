export type UserType = {
  name: string;
  email: string;
  password: string;
  confirmPassword: string;
  country: string;
  organization: string;
};

export const initialUserState: UserType = {
  name: '',
  email: '',
  password: '',
  confirmPassword: '',
  country: '',
  organization: '',
};
