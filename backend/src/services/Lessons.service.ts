import LessonsModel from "../../database/models/Lessons.model";
import {LessonsDB} from '../../types/Database'
import { ServiceResponse } from "../../types/Service.response";

const getAllLessons = async ():Promise<ServiceResponse<LessonsDB[]>> => {
  try {
    const allLessons = await LessonsModel.findAll();
    const filteredLessons = allLessons.map((lesson) => lesson.dataValues)
    return {status: 'SUCCESSFUL', data: filteredLessons }
  } catch (error) {
    return {status: 'ERROR', data: {message: 'Erro na requisição'}}
  }
}

const deleteLesson = async ({title}: any):Promise<ServiceResponse<null>> => {
  const lessonExist = await LessonsModel.findOne({where: {title}}) as LessonsDB | null

  if (!lessonExist) return {status: 'NOT_FOUND', data: {message: 'Lesson not found'}}
  
  await LessonsModel.destroy({where: {title}})

  return {status: 'DELETED', data: null}
}

export default {getAllLessons, deleteLesson}