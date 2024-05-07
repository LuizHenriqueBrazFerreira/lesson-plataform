import { Request, Response } from 'express';
import { ServiceResponse } from '../types/Service.response';
import CoursesSequelize from '../database/models/Courses.model';

export interface ICourses {
    id: number;
    title: string;
}

export interface ICoursesModel {
  createCourse(title: string): Promise<ICourses>;
  getCourses(): Promise<ICourses[]>;
  getCourseById(id: number): Promise<CoursesSequelize | null>;
  getCourseByTitle(courseTitle: string): Promise<CoursesSequelize | null>;
  updateCourseById(id: number, title: string): Promise<[affectedCount: number]>;
  deleteCourseById(id: number): Promise<number>;
}

export interface ICoursesService {
  createCourse(title: string): Promise<ServiceResponse<CoursesSequelize>>;
  getCourses(): Promise<ServiceResponse<CoursesSequelize[]>>;
  getCourseById(id: number): Promise<ServiceResponse<CoursesSequelize | null>>;
  updateCourseById(id: number, title: string): Promise<ServiceResponse<[affectedCount: number]>>;
  deleteCourseById(id: number): Promise<ServiceResponse<number>>;
}

export interface ICoursesController {
  createCourse(req: Request, res: Response): Promise<Response<any, Record<string, any>>>;
  getCourses(req: Request, res: Response): Promise<Response<any, Record<string, any>>>;
  getCourseById(req: Request, res: Response): Promise<Response<any, Record<string, any>>>;
  updateCourseById(req: Request, res: Response): Promise<Response<any, Record<string, any>>>;
  deleteCourseById(req: Request, res: Response): Promise<Response<any, Record<string, any>>>;
}