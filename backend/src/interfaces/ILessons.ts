import { Request, Response } from 'express';
import { ServiceResponse } from '../types/Service.response';
import LessonsSequelize from '../database/models/Lessons.model';

export interface ILessons {
  id: number;
  moduleId: number;
  title: string;
  content: string;
}

export interface ILessonsModel {
  createLesson(moduleId: number, title: string, content: string): Promise<ILessons>;
  getLessons(): Promise<ILessons[]>;
  getLessonById(id: number): Promise<LessonsSequelize | null>;
  getLessonsByTitle(title: string): Promise<ILessons | null>;
  getLessonsByModuleId(moduleId: number): Promise<ILessons[]>;
  updateLessonById(id: number, moduleId: number, title: string, content: string): Promise<[affectedCount: number]>;
  deleteLessonById(id: number): Promise<number>;
}

export interface ILessonsService {
  createLesson(moduleTitle: string, title: string, content: string): Promise<ServiceResponse<ILessons>>;
  getLessons(): Promise<ServiceResponse<any>>;
  getLessonById(id: number): Promise<ServiceResponse<ILessons>>;
  getLessonsByModuleId(moduleId: number): Promise<ServiceResponse<ILessons[]>>;
  updateLessonById(id: number, moduleTitle: string, title: string, content: string): Promise<ServiceResponse<[affectedCount: number]>>;
  deleteLessonById(id: number): Promise<ServiceResponse<number | string>>;
}

export interface ILessonsController {
  createLesson(req: Request, res: Response): Promise<Response<any, Record<string, any>>>;
  getLessons(req: Request, res: Response): Promise<Response<any, Record<string, any>>>;
  getLessonById(req: Request, res: Response): Promise<Response<any, Record<string, any>>>;
  getLessonsByModuleId(req: Request, res: Response): Promise<Response<any, Record<string, any>>>;
  updateLessonById(req: Request, res: Response): Promise<Response<any, Record<string, any>>>;
  deleteLessonById(req: Request, res: Response): Promise<Response<any, Record<string, any>>>;
} 