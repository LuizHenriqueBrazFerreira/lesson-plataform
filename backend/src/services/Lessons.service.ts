import LessonsModel from "../../database/models/Lessons.model";
import {LessonsDB} from '../../types/Database'
import { ServiceResponse } from "../../types/Service.response";
import {Lesson} from '../../types/Data.types'
import { where } from "sequelize";

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

const updateLesson = async ({id,content,image,link,subTopic,title,topic}:Lesson):Promise<ServiceResponse<LessonsDB>> => {
  const lessonExist = await LessonsModel.findByPk(id)
  if(!lessonExist) return {status: 'NOT_FOUND', data: {message: 'lesson not found'}}
  await LessonsModel.update({ title, content, image, link, topic, subTopic }, { where: { id } });
  
  const updatedLesson = await LessonsModel.findOne({where: {id}}) as unknown as LessonsDB
  return {status: 'SUCCESSFUL', data: updatedLesson}
}

const createLesson = async ({title, content, image, link, topic, subTopic}:Lesson):Promise<ServiceResponse<LessonsDB>> => {
  const newLesson = await LessonsModel.create({title, content, image, link, topic, subTopic})

  return {status: 'SUCCESSFUL', data: newLesson.dataValues}
}

export default {getAllLessons, deleteLesson, updateLesson, createLesson}