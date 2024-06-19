import { Request, Response } from 'express';
import { ServiceResponse } from '../types/Service.response';
import LessonPdfsSequelize from '../database/models/LessonPdfs.model';

export interface ILessonPdfs {
  id: number;
  lessonId: number;
  path: string;
  title: string;
}

export interface IPdfLessonModel {
  insertPdf(lessonId: number, path: string, title: string): Promise<ILessonPdfs>;
  getPdfsByLessonId(lessonId: number): Promise<LessonPdfsSequelize | unknown>;
  deletePdfByPath(id: number): Promise<number>;
  updatePdfByPath(id: number, path: string, title: string): Promise<[affectedCount: number]>;
}

export interface IPdfLessonService {
  insertPdf(lessonId: number, path: string, title: string):Promise<ServiceResponse<ILessonPdfs>>;
  getPdfsByLessonId(lessonId: number): Promise<ServiceResponse<ILessonPdfs | unknown>>;
  deletePdfByPath(id: number): Promise<ServiceResponse<string>>;
  updatePdfByPath(id: number, path: string, title: string): Promise<ServiceResponse<string>>;
}

export interface IPdfLessonController {
  insertPdf(req: Request, res: Response): Promise<Response<any, Record<string, any>>>;
  getPdfsByLessonId(req: Request, res: Response): Promise<Response<any, Record<string, any>>>;
  deletePdfByPath(req: Request, res: Response): Promise<Response<any, Record<string, any>>>;
  updatePdfByPath(req: Request, res: Response): Promise<Response<any, Record<string, any>>>;
}