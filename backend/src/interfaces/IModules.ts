import ModulesSequelize from '../database/models/Modules.model';
import { ServiceResponse } from '../types/Service.response';
import { Request, Response } from 'express';

export interface IModules {
  id: number;
  courseId: number;
  title: string;
} 

export interface IModulesModel {
  createModule(courseId: number, title: string): Promise<IModules>;
  getModules(): Promise<IModules[]>;
  getModuleById(id: number): Promise<ModulesSequelize[]>;
  updateModuleById(id: number, courseId: number, title: string): Promise<[affectedCount: number]>;
  deleteModuleById(id: number): Promise<number>;
}

export interface IModulesService {
  createModule(courseId: number, title: string): Promise<ServiceResponse<IModules>>;
  getModules(): Promise<ServiceResponse<IModules[]>>;
  getModuleById(id: number): Promise<ServiceResponse<ModulesSequelize[] | null>>;
  updateModuleById(id: number, courseId: number, title: string): Promise<ServiceResponse<[affectedCount: number]>>;
  deleteModuleById(id: number): Promise<ServiceResponse<number>>;
}

export interface IModulesController {
  createModule(req: Request, res: Response): Promise<Response<any, Record<string, any>>>;
  getModules(req: Request, res: Response): Promise<Response<any, Record<string, any>>>;
  getModuleById(req: Request, res: Response): Promise<Response<any, Record<string, any>>>;
  updateModuleById(req: Request, res: Response): Promise<Response<any, Record<string, any>>>;
  deleteModuleById(req: Request, res: Response): Promise<Response<any, Record<string, any>>>;
}