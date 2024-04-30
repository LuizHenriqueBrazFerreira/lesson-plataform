import { UserData, LoginResponse } from '../types/Data.types';
import { ServiceResponse } from '../types/Service.response';
import UsersSequelize from '../database/models/Users.model';
import { Request, Response } from 'express';
import UserCoursesSequelize from '../database/models/UserCourses.model';

export interface IUsers {
  id: number;
  name: string;
  email: string;
  password: string;
  role?: string;
  confirmEmailToken?: string;
}

export interface IUserModel {
  createUser({ name, email, password, role }: UserData): Promise<UsersSequelize>;
  findByEmail(email: string): Promise<UsersSequelize | null>;
  updateUser(key:string, value: string, email: string): Promise<[affectedCount: number]>;
}

export interface IUserService {
  createUser({ name, email, password, role }: UserData): Promise<ServiceResponse<UserData>>;
  findByEmail(email: string, password: string): Promise<ServiceResponse<LoginResponse>>;
  confirmEmail(confirmEmailToken: string): Promise<ServiceResponse<''>>;
  resendEmail(email: string): Promise<ServiceResponse<''>>;
  forgotPassword(email: string): Promise<ServiceResponse<''>>;
  resetPassword(emailToken: string, password: string): Promise<ServiceResponse<''>>;
}

export interface IUserController {
  registerUser(req: Request, res: Response): Promise<Response<any, Record<string, any>>>;
  requestUserByEmail(req: Request, res: Response): Promise<Response<any, Record<string, any>>>;
  confirmEmail(req: Request, res: Response): Promise<Response<any, Record<string, any>>>;
  resendEmail(req: Request, res: Response): Promise<Response<any, Record<string, any>>>;
  forgotPassword(req: Request, res: Response): Promise<Response<any, Record<string, any>>>;
  resetPassword(req: Request, res: Response): Promise<Response<any, Record<string, any>>>;
}

export interface IUserCourses {
  userId: number;
  courseTitle: string;
  courseId: number;
  progress?: number;
  bookmarked?: boolean;
}

export interface IUserCoursesModel {
  createUserCourse({ userId, courseTitle, courseId, progress, bookmarked }: IUserCourses): Promise<UserCoursesSequelize>;
  findCoursesByUserId(userId: number): Promise<UserCoursesSequelize[]>;
  updateUserCourse(key:string, value: string, userId: number, courseId: number): Promise<number>;
}

export interface IUserCoursesService {
  createUserCourse({ userId, courseId, progress, bookmarked }: IUserCourses): Promise<ServiceResponse<UserCoursesSequelize>>;
  findCoursesByUserId(userId: number): Promise<ServiceResponse<IUserCourses[]>>;
  updateUserCourse(key:string, value: string, userId: number, courseId: number): Promise<ServiceResponse<number>>;
}

export interface IUserCoursesController {
  createUserCourse(req: Request, res: Response): Promise<Response<any, Record<string, any>>>;
  requestUserCoursesByUserId(req: Request, res: Response): Promise<Response<any, Record<string, any>>>;
  updateUserCourse(req: Request, res: Response): Promise<Response<any, Record<string, any>>>;
}