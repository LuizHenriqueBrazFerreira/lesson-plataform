export interface UserDB {
  id: number,
  name: string,
  email: string,
  password: string,
  role: 'ADMIN' | 'STUDENT',
  confirmEmailToken: string | null
};

export interface CoursesDB {
  id: number,
  title: string,
}

export interface ModulesDB {
  id: number,
  courseId: number,
  title: string,
}

export interface LessonsDB {
  id: number,
  moduleId: number,
  title: string,
  content: string,
  image: string,
  link?: string,
  watched?: boolean,
};

export interface UserCoursesDB {
  userId: number,
  courseTitle: string,
  courseId: number,
  progress?: number,
  bookmarked?: boolean,
};