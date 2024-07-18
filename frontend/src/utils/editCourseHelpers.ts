import Swal from 'sweetalert2';
import { requestData, requestPost, requestUpdate } from '../services/requests';
import { EditModule, Module } from '../types/courseType';
import { LessonsType, PdfsType } from '../types/lessons';

export const handleModuleEdit = async (
  courseId: number,
  courseTitle: string,
  modules: EditModule[],
) => {
  const modulesData = await Promise.all(modules.map(async (module) => {
    if (module.id === 0) {
      // Cria um novo módulo quando o id é 0
      const modulesCreated = await requestPost(
        '/modules',
        { courseTitle, title: module.title },
      );
      return modulesCreated;
    }
    // Atualiza os módulos existentes quando o id não é 0
    const modulesModified = await requestUpdate(
      `/modules/${module.id}`,
      { id: module.id, courseId, title: module.title },
    );
    return modulesModified;
  }));

  return modulesData;
};

export const handleLessonEdit = async (
  lessons: LessonsType[],
) => {
  const lessonsData = await Promise.all(lessons.map(async (lesson) => {
    if (lesson.id === 0) {
      // Cria novas lições quando o id é 0
      const lessonsCreated = await requestPost(
        '/lessons',
        {
          moduleTitle: lesson.moduleTitle,
          title: lesson.title,
          content: lesson.content,
        },
      );
      return lessonsCreated;
    }
    // Atualiza as lições existentes quando o id não é 0
    const lessonsModified = await requestUpdate(
      `/lessons/${lesson.id}`,
      {
        id: lesson.id,
        moduleTitle: lesson.moduleTitle,
        title: lesson.title,
        content: lesson.content,
      },
    );
    return lessonsModified;
  }));

  return lessonsData;
};

export const handlePdfEdit = async (
  lessons: LessonsType[],
) => {
  // Cria novos pdfs quando o id é 0
  const pdfData = await Promise.all(lessons.map(async ({ id, pdfs }) => {
    pdfs.forEach(async (pdf) => {
      if (pdf.id === 0) {
        await requestPost(
          '/pdfs',
          {
            lessonId: id,
            path: pdf.path,
            title: pdf.title,
          },
        );
        return;
      }
      // Atualiza os pdfs existentes quando o id não é 0
      await requestUpdate(
        `/pdfs/${pdf.id}`,
        {
          id: pdf.id,
          path: pdf.path,
          title: pdf.title,
        },
      );
    });
  }));
  return pdfData;
};

export const showSuccessMessage = (text: string) => {
  Swal.fire({
    icon: 'success',
    title: text,
    showConfirmButton: true,
    confirmButtonColor: '#e06915',
  });
};

export const showNoCourseSelectedMessage = () => {
  Swal.fire({
    icon: 'error',
    title: 'Selecione um curso',
    showConfirmButton: true,
    confirmButtonColor: '#e06915',
  });
};

export const requestModules = async (courseId: number) => {
  const modulesData = await requestData(`/modules/${courseId}`);

  const newModules = modulesData.map((module: Module) => (
    {
      id: module.id,
      title: module.title,
    }
  ));

  return { modulesData, newModules };
};

export const requestLessons = async (modulesData: Module[]) => {
  const lessonsPromises = modulesData.map(async (module: Module) => {
    const lessonsData = await requestData(`/lessons/${module.id}`);
    return lessonsData.map((lesson: LessonsType) => ({
      id: lesson.id,
      moduleTitle: module.title,
      title: lesson.title,
      content: lesson.content,
    }));
  });
  const newLessons = (await Promise.all(lessonsPromises)).flat();

  return newLessons;
};

export const requestPdfs = async (newLessons: LessonsType[]) => {
  const pdfsData = newLessons.map(async (lesson) => {
    const pdfsResponse = await requestData(`/pdfs/${lesson.id}`);

    return pdfsResponse.map((pdf: PdfsType) => ({
      id: pdf.id ?? 0,
      lessonId: pdf.lessonId ?? 0,
      title: pdf.title ?? '',
      path: pdf.path ?? '',
    }));
  });

  return (await Promise.all(pdfsData)).flat();
};
