export type Lessons = {
  id?:number,
  title: string,
  content: string,
  image: string,
  moduleTitle:string,
  link: string
};

export type Status = {
  course: boolean,
  module: boolean,
  lesson: boolean
  active: boolean
};
