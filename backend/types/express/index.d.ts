import { UserData, UserCourses } from '../../src/types/Data.types';
import { Request } from 'express';

type User = {
  courses: UserCourses[];
} & UserData;

declare module 'express' {
  interface Request {
    user?: User;
  }
}
