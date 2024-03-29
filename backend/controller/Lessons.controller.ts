import LessonsService from "../src/services/Lessons.service";
import { Request, Response } from "express";
import mapStatusHttp from "../utils/mapHttp";

const requestAllLessons = async (_req: Request, res: Response):Promise<Response> => {
  const {status, data} = await LessonsService.getAllLessons()

  if (status !== 'SUCCESSFUL') return res.status(mapStatusHttp(status)).json(data)

  return res.status(200).json(data)
}

export default {requestAllLessons}