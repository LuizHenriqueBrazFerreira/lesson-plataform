export type Lesson = {
  id: number,
  module_id: number,
  title: string,
  content: string,
  image: string,
  link?: string,
  watched?: boolean,
};

 export type UserData = {
  name: string;
  email: string;
  password: string;
  country: string;
  organization?: string;
  role: 'ADMIN' | 'STUDENT';
  confirmEmailToken?: string | null;
}

export type LoginResponse = {
  token: string;
  user: UserData;
}