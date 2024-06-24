import ModulesProgressSequelize from '../database/models/ModulesProgress';
import { Request, Response } from "express";
import { ServiceResponse } from "../types/Service.response";

export interface IModulesProgressModel {
  getModulesProgressByUserIdAndCourseId(userId: number, courseId: number): Promise<ModulesProgressSequelize[]>;
  updateModuleProgress(userId: number, moduleId: number, progress: number): Promise<[affectedCount: number]>;
}

export interface IModulesProgressService {
  getModulesProgressByUserIdAndCourseId(userId: number, courseId: number): Promise<ServiceResponse<ModulesProgressSequelize[]>>;
  updateModuleProgress(userId: number, moduleId: number, progress: number): Promise<ServiceResponse<[affectedCount: number]>>;
}

export interface IModulesProgressController {
  requestModulesProgressByUserIdAndCourseId(req: Request, res: Response): Promise<Response<any, Record<string, any>>>;
  requestUpdateModuleProgress(req: Request, res: Response): Promise<Response<any, Record<string, any>>>;
}