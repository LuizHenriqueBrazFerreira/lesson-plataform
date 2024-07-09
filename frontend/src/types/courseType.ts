export type Lesson = {
  id: number;
  title: string;
  content: string;
  link: string;
};

export type Module = {
  courseId: number;
  id: number;
  title: string;
};

export type Courses = {
  id: number;
  title: string;
  forum: string;
};

export type UserCourses = {
  id?: number;
  title?: string;
  courseId: number;
  courseTitle: string;
  userId: number;
  progress: number;
  bookmarked: boolean;
};

export const initialCourseState: Courses = {
  id: 0,
  title: '',
  forum: '',
};

export const initialModuleState: Module = {
  courseId: 0,
  id: 0,
  title: '',
};

export type EditModule = {
  id: number;
  title: string;
};

export type ModulesProgress = {
  courseId: number;
  moduleId: number;
  userId: number;
  progress: number;
};
