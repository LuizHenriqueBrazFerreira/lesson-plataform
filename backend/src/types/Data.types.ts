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
  role: 'ADMIN' | 'STUDENT';
  confirmEmailToken?: string;
}

export type LoginResponse = {
  token: string;
  role: 'ADMIN' | 'STUDENT';
}