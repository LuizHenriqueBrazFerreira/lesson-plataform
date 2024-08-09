import { Request, Response, NextFunction } from 'express';
import * as bcrypt from 'bcryptjs';
import { verifyToken } from '../utils/jwt';
import UsersModel from '../models/UsersModel';
import UserCoursesModel from '../models/UserCoursesModel';

const validatePassword = (password: string, dbPassword: string): boolean => bcrypt
  .compareSync(password, dbPassword);

const validateToken = async (req: Request, res: Response, next: NextFunction) => {
  const { authorization } = req.headers;
  const userModel = new UsersModel();
  const userCoursesModel = new UserCoursesModel();

  if (!authorization) {
    return res.status(401).json({ message: 'Token não encontrado' });
  }

  const token = authorization.split(' ')[1];

  const { email } = verifyToken(token);

  const user = await userModel.findByEmail(email);

  if (!user) {
    return res.status(401).json({ message: 'Token inválido' });
  }

  const courses = await userCoursesModel.findCoursesByUserId(user.id);

  const userData = { 
    ...user.dataValues, 
    courses: courses.map((course: any) => course.dataValues),
  };

  req.user = userData;
  
  next();
};


const validateUser = (email: string, password: string, name: string, country: string) => {
  const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  if (!email || !password || !name || !country) {
    return { status: 'BAD_REQUEST', data: { message: 'Todos os campos obrigatórios devem estar preenchidos.' } };
  }

  const validMail = regex.test(email);

  if (!validMail) {
    return { status: 'UNAUTHORIZED', data: { message: 'E-mail inválido.' } };
  }

  if (password.length < 8) {
    return { status: 'UNAUTHORIZED', data: { message: 'Senha deve ter pelo menos 8 caracteres.' } };
  }

  return null;
};


const validateConfirmEmailToken = (emailToken: string | null, userEmail: string) => {
  const { email } = verifyToken(emailToken ?? '');

  return email === userEmail;
};
  

export { validatePassword, validateToken, validateUser, validateConfirmEmailToken };
