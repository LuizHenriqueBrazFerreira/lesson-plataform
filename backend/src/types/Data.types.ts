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
  id?: number;
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

export type Course = {
  id: number;
  title: string;
}

export type Module = {
  id: number;
  title: string;
  courseId: number;

}

export type UserCourses = {
  courseId: number;
  userId: number;
  bookmarked: boolean;
  courseTitle: string;
  progress: number;
}