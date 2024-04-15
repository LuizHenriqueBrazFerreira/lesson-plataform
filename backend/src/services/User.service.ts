import UserModel from '../database/models/Users.model';
import { UserDB } from '../types/Database';
import { ServiceResponse } from '../types/Service.response';
import { createToken } from '../utils/jwt';
import { validatePassword, validateEmail } from "../middlewares/validateLogin";
import bcrypt from 'bcryptjs';

const SALT_ROUNDS = process.env.SALT_ROUNDS ? parseInt(process.env.SALT_ROUNDS) : 10;

type UserData = {
  name: string;
  email: string;
  password: string;
  role: 'ADMIN' | 'STUDENT';
}

const createUser = async ({ name, email, password, role }: UserData): Promise<ServiceResponse<UserDB>> => {
  try {
    const hashedPassword = bcrypt.hashSync(password, SALT_ROUNDS);

    const newUser = await UserModel.create({ name, email, password: hashedPassword, role });

    return { status: 'CREATED', data: newUser.dataValues };
  } catch (error) {
    return { status: 'INTERNAL_SERVER_ERROR', data: { message: 'Falha ao criar o usuário' } };
  }
}

const findByEmail = async (email: string, password: string) => {
  try {
    const userExists = await UserModel.findOne({ where: { email } });

    if (!userExists) return { status: 'NOT_FOUND', data: { message: 'Usuário não encontrado' } };

    const isCorrectPassword = validatePassword(password, userExists.dataValues.password);

    const isCorrectEmail = validateEmail(email, userExists.dataValues.email);

    if (!isCorrectPassword || !isCorrectEmail) {
      return { status: 'UNAUTHORIZED', data: { message: 'E-mail ou senha incorretos' } };
    }

    const token = createToken({ email, password });

    return { status: 'SUCCESSFUL', data: { token } };
  } catch (error: any) {
    console.log(error);
    
    return { status: 'INTERNAL_SERVER_ERROR', data: { message: error } };
  }
}

export default { createUser, findByEmail };
