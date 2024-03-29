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

export default {getAllLessons}