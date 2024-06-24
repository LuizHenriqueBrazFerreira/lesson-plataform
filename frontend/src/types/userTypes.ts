export type UserType = {
  id?: number;
  name: string;
  email: string;
  password: string;
  confirmPassword: string;
  country: string;
  organization: string;
  isDisabled?: boolean;
};

export const initialUserState: UserType = {
  id: 0,
  name: '',
  email: '',
  password: '',
  confirmPassword: '',
  country: '',
  organization: '',
  isDisabled: true,
};
