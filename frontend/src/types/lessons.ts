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
  moduleTitle: 'Digite o titulo do módulo',
  title: 'Digite o título da aula',
  content: 'Digite o conteúdo da aula',
  image: 'Digite o link da imagem da aula',
  link: 'Digite o link da aula',
};
