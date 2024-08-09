export type UserType = {
  id?: number;
  name: string;
  email: string;
  password: string;
  confirmPassword: string;
  country: string;
  organization: string;
  isDisabled?: boolean;
  createdAt?: Date;
  updatedAt?: Date;
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

export type SubscribredUsers = {
  name: string;
  email: string;
  country: string;
  organization: string;
  since: Date | string;
  subscribedAt: Date | string;
};

export type ReportType = {
  course: string;
  users: SubscribredUsers[];
};
