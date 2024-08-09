import { requestPost } from '../services/requests';
import { LessonsType } from '../types/lessons';

export const handleCreateModule = async (
  courseTitle: string,
  modules: string[],
) => {
  const modulesData = await Promise.all(modules.map(async (module) => {
    return requestPost(
      '/modules',
      { courseTitle, title: module },
    );
  }));
  return modulesData;
};

export const handleCreateLessons = async (
  lessons: LessonsType[],
) => {
  const lessonsData = await Promise.all(lessons.map(async (lesson) => {
    return requestPost(
      '/lessons',
      {
        moduleTitle: lesson.moduleTitle,
        title: lesson.title,
        content: lesson.content,
      },
    );
  }));
  return lessonsData;
};

export const handleCreatePdf = async (
  lessons: LessonsType[],
) => {
  const pdfData = await Promise.all(lessons.map(async ({ title, pdfs }) => {
    pdfs.map(async (pdf) => {
      if (pdf.id === 0) {
        await requestPost(
          '/pdfs',
          {
            lessonTitle: title,
            path: pdf.path,
            title: pdf.title,
          },
        );
      }
    });
  }));
  return pdfData;
};
