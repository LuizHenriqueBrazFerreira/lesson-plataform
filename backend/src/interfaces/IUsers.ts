import { sendSupportEmail } from './../utils/sendEmail';
import { UserData, LoginResponse } from '../types/Data.types';
import { ServiceResponse } from '../types/Service.response';
import UsersSequelize from '../database/models/Users.model';
import { Request, Response } from 'express';
import UserCoursesSequelize from '../database/models/UserCourses.model';
import CoursesSequelize from '../database/models/Courses.model';

export interface IUsers {
  id: number;
  name: string;
  email: string;
  password: string;
  country: string;
  organization?: string;
  role?: string;
  confirmEmailToken?: string;
}

export interface IUserModel {
  createUser({ name, email, password, role }: UserData): Promise<UsersSequelize>;
  getAllUsers(): Promise<UsersSequelize[]>;
  findByEmail(email: string): Promise<UsersSequelize | null>;
  updateUser(key: string, value: string, email: string): Promise<[affectedCount: number]>;
  deleteUser(id: number): Promise<number>;
}

export interface IUserService {
  createUser({ name, email, password, role }: UserData): Promise<ServiceResponse<UserData>>;
  getAllUsers(): Promise<ServiceResponse<UsersSequelize[]>>;
  findByEmail(email: string, password: string): Promise<ServiceResponse<LoginResponse>>;
  confirmEmail(confirmEmailToken: string): Promise<ServiceResponse<''>>;
  resendEmail(email: string): Promise<ServiceResponse<''>>;
  forgotPassword(email: string): Promise<ServiceResponse<''>>;
  resetPassword(emailToken: string, password: string): Promise<ServiceResponse<''>>;
  findProfileData(email: string): Promise<ServiceResponse<UserData>>;
  requestSuport(email: string, name: string, topic: string, content: string, cell:string): Promise<ServiceResponse<''>>;
  updateProfileData(oldEmail: string, email: string, name: string, password: string, country: string, organization: string): Promise<ServiceResponse<number>>;
  requestDeleteUser(id:number): Promise<ServiceResponse<number>>;
}

export interface IUserController {
  registerUser(req: Request, res: Response): Promise<Response<any, Record<string, any>>>;
  requestAllUsers(req: Request, res: Response): Promise<Response<any, Record<string, any>>>;
  requestUserByEmail(req: Request, res: Response): Promise<Response<any, Record<string, any>>>;
  confirmEmail(req: Request, res: Response): Promise<Response<any, Record<string, any>>>;
  resendEmail(req: Request, res: Response): Promise<Response<any, Record<string, any>>>;
  forgotPassword(req: Request, res: Response): Promise<Response<any, Record<string, any>>>;
  resetPassword(req: Request, res: Response): Promise<Response<any, Record<string, any>>>;
  sendSupportEmail(req: Request, res: Response): Promise<Response<any, Record<string, any>>>;
  requestProfileData(req: Request, res: Response): Promise<Response<any, Record<string, any>>>;
  updateProfileData(req: Request, res: Response): Promise<Response<any, Record<string, any>>>;
  requestDeleteUser(req: Request, res: Response): Promise<Response<any, Record<string, any>>>;
}

export interface IUserCourses {
  userId: number;
  courseTitle: string;
  courseId: number;
  progress?: number;
  bookmarked?: boolean;
  subscribed?: boolean;
}

type UserInfo = {
  name?: string;
  email?: string;
  country?: string;
  organization?: string;
};

export interface IUserCoursesModel {
  createUserCourse({ userId, courseTitle, courseId, progress, bookmarked, subscribed }: IUserCourses): Promise<UserCoursesSequelize>;
  findCoursesByUserId(userId: number): Promise<UserCoursesSequelize[] | CoursesSequelize[]>;
  updateUserCourse(key: string, value: string, userId: number, courseId: number): Promise<number>;
  getAllSubscribedUsers(): Promise<{ course: string; users: UserInfo[] }[]>;
  getSubscribedUsersByCourse(courseTitle: string): Promise<{ course: string; users: UserInfo[] }[]>;
}
export interface IUserCoursesService {
  createUserCourse({ userId, courseId, progress, bookmarked, subscribed }: IUserCourses): Promise<ServiceResponse<UserCoursesSequelize>>;
  findCoursesByUserId(userId: number): Promise<ServiceResponse<IUserCourses[] | CoursesSequelize[]>>;
  updateUserCourse(key: string, value: string, userId: number, courseId: number): Promise<ServiceResponse<number>>;
  getAllSubscribedUsers(): Promise<ServiceResponse<{ course: string; users: UserInfo[] }[]>>;
  getSubscribedUsersByCourse(courseTitle: string): Promise<ServiceResponse<{ course: string; users: UserInfo[] }[]>>;
}

export interface IUserCoursesController {
  createUserCourse(req: Request, res: Response): Promise<Response<any, Record<string, any>>>;
  requestUserCoursesByUserId(req: Request, res: Response): Promise<Response<any, Record<string, any>>>;
  updateUserCourse(req: Request, res: Response): Promise<Response<any, Record<string, any>>>;
  requestAllSubscribedUsers(req: Request, res: Response): Promise<Response<any, Record<string, any>>>;
  requestSubscribedUsersByCourse(req: Request, res: Response): Promise<Response<any, Record<string, any>>>;
}