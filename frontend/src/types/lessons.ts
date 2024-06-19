export type LessonsType = {
  id: number,
  moduleId: number,
  title: string,
  content: string,
  image:string,
  link: string,
  watched: boolean
};

export type Status = {
  course: boolean,
  module: boolean,
  lesson: boolean
  active: boolean
};

export const InitialLessonsType = {
  id: 0,
  moduleId: 0,
  title: '',
  content: '',
  image: '',
  link: '',
  watched: false,
};

export type LessonPropType = {
  id?: number,
  moduleTitle: string,
  title: string,
  content: string,
  image: string,
  link: string,
};

export const INITIAL_LESSON = {
  id: 0,
  moduleTitle: '',
  title: '',
  content: '',
  image: '',
  link: '',
};

export type PdfsType = {
  id: number,
  lessonId: number,
  path: string,
  title: string,
};

export const INITIAL_PDF = {
  id: 0,
  lessonId: 0,
  path: '',
  title: '',
};
