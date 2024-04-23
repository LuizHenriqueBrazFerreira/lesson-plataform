export type UserDB = {
  id: number,
  name: string,
  email: string,
  password: string,
  role: 'ADMIN' | 'STUDENT'
};

export type LessonsDB = {
  id: number,
  title: string,
  content: string,
  image: string,
  link?: string,
  topic:string,
  subTopic: string
};
