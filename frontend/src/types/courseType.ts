export type Lesson = {
  id: number;
  title: string;
  content: string;
  link: string;
};

export type Module = {
  moduleId: number;
  title: string;
};

export type Courses = {
  id: number;
  title: string;
};

export type UserCourses = {
  courseId: number;
  courseTitle: string;
  userId: number;
  progress: number;
  bookmarked: boolean;
};

export const initialCourseState: Courses = {
  id: 0,
  title: '',
};

export const initialModuleState: Module = {
  moduleId: 0,
  title: '',
};
