import { Request, Response } from 'express';
import { ServiceResponse } from '../types/Service.response';
import LessonPdfsSequelize from '../database/models/LessonPdfs.model';

export interface ILessonPdfs {
  lessonId: number;
  path: string;
}

export interface IPdfLessonModel {
  insertPdf(lessonId: number, path: string): Promise<ILessonPdfs>;
  getPdfByLessonId(): Promise<LessonPdfsSequelize | null>;
  deletePdfByPath(path: string): Promise<string>;
}

export interface IPdfLessonService {
  insertPdf(lessonId: number, path: string):Promise<ServiceResponse<ILessonPdfs>>;
  getPdfByLessonId(): Promise<ServiceResponse<ILessonPdfs[]>>;
  deletePdfByPath(path: string): Promise<ServiceResponse<string>>;
}

export interface IPdfLessonController {
  insertPdf(req: Request, res: Response): Promise<Response<any, Record<string, any>>>;
  getPdfByLessonId(req: Request, res: Response): Promise<Response<any, Record<string, any>>>;
  deletePdfByPath(req: Request, res: Response): Promise<Response<any, Record<string, any>>>;
}