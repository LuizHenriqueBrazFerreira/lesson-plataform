import { Request, Response, NextFunction } from 'express';
import * as bcrypt from 'bcryptjs';
import { verifyToken } from '../utils/jwt';

const validatePassword = (password: string, dbPassword: string): boolean => bcrypt
  .compareSync(password, dbPassword);

const validateEmail = (email: string, dbEmail: string): boolean => {
  if (email === dbEmail) {
    return true;
  }
  return false;
};

const validateToken = (req: Request) => {
  const { authorization } = req.headers;

  if (!authorization) {
    return { status: 'UNAUTHORIZED', data: { message: 'Token não encontrado' } };
  }

  const token = authorization.split(' ')[1];

  try {
    const tokenInfo = verifyToken(token);

    if (tokenInfo) {
      return true;
    }
  } catch (error) {
    console.log(error);

    return { status: 'UNAUTHORIZED', data: { message: 'Token deve ser um token válido' } };
  }
};

const validateUser = (req: Request) => {
  const { email, password } = req.body;
  const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  if (!email || !password) {
    return { status: 'BAD_REQUEST', data: { message: 'Todos os campos devem estar preenchidos' } };
  }

  const validMail = regex.test(email);

  if (!validMail || password.length < 7) {
    return { status: 'UNAUTHORIZED', data: { message: 'Senha ou e-mail inválidos' } };
  }
  return null;
};

export { validatePassword, validateToken, validateUser, validateEmail };
