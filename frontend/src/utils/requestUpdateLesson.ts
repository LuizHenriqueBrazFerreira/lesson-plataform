import { requestPost, requestUpdate } from '../services/requests';
import { LessonPropType } from '../types/lessons';
import setDataToUpdate from './isUpdate';

async function requestUpdateLesson(
  oldData:LessonPropType[],
  newData:LessonPropType[],
  modules: any[],
) {
  // Função responsável por comparar os dados da base de dados e fazer a coleta de dados para adicionar e atualizar
  const { toUpdate } = setDataToUpdate(oldData, newData);

  if (toUpdate.length === 0) return false;
  await Promise.all(toUpdate.map(async (lesson) => {
    const module = modules.find((mod) => mod.title === lesson.moduleTitle) as any;
    const lessonData = await requestUpdate(`/lessons/${lesson.id}`, {
      moduleTitle: module.title,
      title: lesson.title,
      content: lesson.content,
      image: lesson.image,
      link: lesson.link,
    });
    return lessonData;
  }));

  return true;
}

async function requestAddLessons(
  oldData:LessonPropType[],
  newData:LessonPropType[],
  modules: any[],
) {
  const { toAdd } = setDataToUpdate(oldData, newData);

  if (toAdd.length === 0) return false;
  await Promise.all(toAdd.map(async (lesson) => {
    const module = modules.find((mod) => mod.title === lesson.moduleTitle) as any;
    const lessonData = await requestPost('/lessons/', {
      moduleId: module.id,
      title: lesson.title,
      content: lesson.content,
      image: lesson.image,
      link: lesson.link,
    });
    console.log(`lessonData => ${lessonData}`);

    return lessonData;
  }));

  return true;
}

export { requestUpdateLesson, requestAddLessons };
