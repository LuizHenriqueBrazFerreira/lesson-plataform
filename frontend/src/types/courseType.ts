export type Lesson = {
  id: number;
  title: string;
  content: string;
  link: string;
};

export type Module = {
  id: number;
  content: string;
  lessons: Lesson[];
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
