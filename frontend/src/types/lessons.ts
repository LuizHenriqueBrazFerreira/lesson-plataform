export type LessonsType = {
  id?:number,
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
