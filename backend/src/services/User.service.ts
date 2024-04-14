import UserModel from '../database/models/Users.model';
import { UserDB } from '../types/Database';
import { ServiceResponse } from '../types/Service.response';
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
    return { status: 'ERROR', data: { message: 'Falha ao criar o usuário' } };
  }
}

const findByEmail = async (email: string): Promise<ServiceResponse<UserDB>> => {
  try {
    const userExists = await UserModel.findOne({ where: { email } });
    if (!userExists) return { status: 'NOT_FOUND', data: { message: 'Usuário não encontrado' } };
    return { status: 'SUCCESSFUL', data: userExists.dataValues };
  } catch (error: any) {
    console.log(error);
    
    return { status: 'ERROR', data: { message: error } };
  }
}

export default { createUser, findByEmail };
