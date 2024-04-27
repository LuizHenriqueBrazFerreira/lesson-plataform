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

export type Course = {
  id: number;
  title: string;
  modules: Module[];
};
