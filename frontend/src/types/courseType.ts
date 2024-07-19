export type Lesson = {
  id: number;
  moduleId:number,
  title: string;
  content: string;
  link: string;
  courseId:number;
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
  duration: string;
};

export type UserCourses = {
  id?: number;
  title?: string;
  courseId: number;
  courseTitle: string;
  userId: number;
  progress: number;
  bookmarked: boolean;
  subscribed: boolean;
};

export const initialCourseState: Courses = {
  id: 0,
  title: '',
  forum: '',
  duration: '',
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
