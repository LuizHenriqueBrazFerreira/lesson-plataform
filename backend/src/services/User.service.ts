import { DataTypes } from 'sequelize';
import UserModel from '../database/models/Users.model';
import { UserDB } from '../types/Database';
import { ServiceResponse } from '../types/Service.response';
import { createToken } from '../utils/jwt';
import { validatePassword, validateEmail, validateUser } from "../middlewares/validateLogin";
import { sendEmail } from '../utils/sendEmail';
import bcrypt from 'bcryptjs';

const SALT_ROUNDS = process.env.SALT_ROUNDS ? parseInt(process.env.SALT_ROUNDS) : 10;

type UserData = {
  name: string;
  email: string;
  password: string;
  role: 'ADMIN' | 'STUDENT';
}

const createUser = async ({ name, email, password, role }: UserData) => {
  try {
    const user = await UserModel.findOne({ where: { email } });

    const isUserValid = validateUser(email, password);

    if (isUserValid) return { status: isUserValid.status, data: isUserValid.data };

    if (user) return { status: 'CONFLICT', data: { message: 'E-mail já cadastrado' } };

    const hashedPassword = bcrypt.hashSync(password, SALT_ROUNDS);

    const newUser = await UserModel.create({ name, email, password: hashedPassword, role });

    const token = createToken({ email, password });

    await sendEmail(email, token);

    return { status: 'CREATED', data: newUser.dataValues };
  } catch (error) {
    return { status: 'INTERNAL_SERVER_ERROR', data: { message: 'Falha ao criar o usuário' } };
  }
}

const findByEmail = async (email: string, password: string) => {
  try {
    if (!email || !password) return { status: 'BAD_REQUEST', data: { message: 'Todos os campos devem estar preenchidos' } };
    
    const userExists = await UserModel.findOne({ where: { email } });
    
    if (!userExists) return { status: 'NOT_FOUND', data: { message: 'Usuário não encontrado' } };

    const isCorrectPassword = validatePassword(password, userExists.dataValues.password);

    const isCorrectEmail = validateEmail(email, userExists.dataValues.email);

    if (!isCorrectPassword || !isCorrectEmail) {
      return { status: 'UNAUTHORIZED', data: { message: 'E-mail ou senha incorretos' } };
    }
  


    const token = createToken({ email, password });

    return { status: 'SUCCESSFUL', data: { token, role: userExists.dataValues.role } };
  } catch (error: any) {
    console.log(error);
    
    return { status: 'INTERNAL_SERVER_ERROR', data: { message: error } };
  }
}

export default { createUser, findByEmail };
