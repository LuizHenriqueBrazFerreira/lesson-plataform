export type ContentType = {
  type: string,
  data: {
    text: string,
    level?: number,
  },
}

export type PdfsType = {
  id: number,
  lessonId: number,
  path: string,
  title: string,
};

export type LessonsType = {
  id?: number,
  moduleId?: number,
  moduleTitle?: string,
  title: string,
  content: string,
  watched?: boolean,
  pdfs: PdfsType[]
};

export const INITIAL_PDF = {
  id: 0,
  lessonId: 0,
  path: '',
  title: '',
};

export const INITIAL_LESSON = {
  id: 0,
  moduleTitle: '',
  title: '',
  content: '',
  watched: false,
  pdfs: [INITIAL_PDF],
};
