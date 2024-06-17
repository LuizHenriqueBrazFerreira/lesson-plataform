import Swal from 'sweetalert2';
import { requestPost, requestUpdate } from '../services/requests';
import { EditModule } from '../types/courseType';
import { LessonPropType } from '../types/lessons';

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
  lessons: LessonPropType[],
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
          image: lesson.image,
          link: lesson.link,
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
        image: lesson.image,
        link: lesson.link,
      },
    );
    return lessonsModified;
  }));

  return lessonsData;
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
