import LessonsService from "../services/Lessons.service";
import { Request, Response } from "express";
import mapStatusHttp from "../utils/mapHttp";
import { LessonsDB } from "../types/Database";

const requestAllLessons = async (_req: Request, res: Response):Promise<Response> => {
  const {status, data} = await LessonsService.getAllLessons()

  if (status !== 'SUCCESSFUL') return res.status(mapStatusHttp(status)).json(data)

  return res.status(200).json(data)
}

const requestDeleteLesson = async (req: Request, res: Response): Promise<Response> => {
  const {title} = req.body;

  const {status, data} = await LessonsService.deleteLesson({title})

  if(status !== 'NO_CONTENT') return res.status(mapStatusHttp(status)).json(data)
  return res.status(204).end();
}

const requestUpdateLesson = async (req:Request, res: Response):Promise<Response> => {
  const lessonData = req.body;

  const {status, data} = await LessonsService.updateLesson(lessonData)

  if (status !== 'SUCCESSFUL') return res.status(mapStatusHttp(status)).json(data)

  return res.status(204).json(data)
}

const requestCreateLesson = async (req: Request, res: Response):Promise<Response> => {
  const lessonData = req.body;
  const {data} = await LessonsService.createLesson(lessonData)
  console.log(data);
  

  return res.status(201).json(data)

}

const requestLessonById = async (req: Request, res: Response): Promise<Response> => {
  const id = Number(req.params.id)

  const {data} = await LessonsService.getLessonById(id)
  return res.status(200).json(data)
}

export default {requestAllLessons, requestDeleteLesson, requestUpdateLesson, requestCreateLesson, requestLessonById}