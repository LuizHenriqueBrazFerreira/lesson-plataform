import { DataTypes } from 'sequelize';
import UserModel from '../database/models/Users.model';
import { UserDB } from '../types/Database';
import { ServiceResponse } from '../types/Service.response';
import { createToken, createEmailToken, verifyToken } from '../utils/jwt';
import { validatePassword, validateUser, validateConfirmEmailToken } from "../middlewares/validateLogin";
import { sendConfirmEmail, sendForgotPasswordEmail } from '../utils/sendEmail';
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

    if (user) return { status: 'CONFLICT', data: { message: 'E-mail já cadastrado.' } };

    const hashedPassword = bcrypt.hashSync(password, SALT_ROUNDS);

    await UserModel.create({ name, email, password: hashedPassword, role });

    const confirmEmailToken = createEmailToken({ email });

    await sendConfirmEmail(email, confirmEmailToken, name);

    return { status: 'CREATED', data: { message: 'Usuário criado com sucesso.' }};
  } catch (error) {
    return { status: 'INTERNAL_SERVER_ERROR', data: { message: 'Falha ao criar o usuário' } };
  }
}

const findByEmail = async (email: string, password: string) => {
  try {
    if (!email || !password) return { status: 'BAD_REQUEST', data: { message: 'Todos os campos devem estar preenchidos.' } };
    
    let isCorrectPassword;
    let isConfirmedEmail;

    const userExists = await UserModel.findOne({ where: { email } });

    if (userExists){
      isCorrectPassword = validatePassword(password, userExists.dataValues.password);
      isConfirmedEmail = validateConfirmEmailToken(userExists.dataValues.confirmEmailToken, email);
    }

    if (!isConfirmedEmail) return { status: 'BAD_REQUEST', data: { message: 'Por favor, confirme seu e-mail.' } };
    
    if (!userExists || !isCorrectPassword) return { status: 'NOT_FOUND', data: { message: 'E-mail ou senha incorretos.' } };
    const token = createToken({ email, password });

    return { status: 'SUCCESSFUL', data: { token, role: userExists.dataValues.role } };
  } catch (error: any) {
    console.log(error);
    
    return { status: 'INTERNAL_SERVER_ERROR', data: { message: error } };
  }
}

const confirmEmail = async (confirmEmailToken: string) => {
  try {
    const { email } = verifyToken(confirmEmailToken);

    await UserModel.update({ confirmEmailToken }, { where: { email } });

    return { status: 'SUCCESSFUL', data: { message: 'E-mail confirmado com sucesso.' } };
  } catch (error: any) {
    return { status: 'INTERNAL_SERVER_ERROR', data: { message: error } };
  }
}

const resendEmail = async (email: string) => {
  try {
    const user = await UserModel.findOne({ where: { email } });

    if (!user) return { status: 'NOT_FOUND', data: { message: 'E-mail não encontrado.' } };

    const confirmEmailToken = createEmailToken({ email });

    await sendConfirmEmail(email, confirmEmailToken, user.dataValues.name);

    return { status: 'SUCCESSFUL', data: { message: 'E-mail reenviado com sucesso.' } };
  } catch (error: any) {
    return { status: 'INTERNAL_SERVER_ERROR', data: { message: error } };
  }
}

const forgotPassword = async (email: string) => {
  try {
    const user = await UserModel.findOne({ where: { email } });

    if (!user) return { status: 'NOT_FOUND', data: { message: 'E-mail não encontrado.' } };

    const forgotPasswordToken = user.dataValues.confirmEmailToken ?? '';

    await sendForgotPasswordEmail(email, forgotPasswordToken, user.dataValues.name);

    return { status: 'SUCCESSFUL', data: { message: 'E-mail enviado com sucesso.' } };
  } catch (error: any) {
    return { status: 'INTERNAL_SERVER_ERROR', data: { message: error } };
  }
}

const resetPassword = async (emailToken: string, password: string) => {
 try {
    const { email } = verifyToken(emailToken);

    const user = await UserModel.findOne({ where: { email } });

    if (!user) return { status: 'NOT_FOUND', data: { message: 'E-mail não encontrado.' } };

    const hashedPassword = bcrypt.hashSync(password, SALT_ROUNDS);

    await UserModel.update({ password: hashedPassword }, { where: { email } });

    return { status: 'SUCCESSFUL', data: { message: 'Senha alterada com sucesso.' } };
  } catch (error: any) {
    return { status: 'INTERNAL_SERVER_ERROR', data: { message: error } };
  }
}

export default { createUser, findByEmail, confirmEmail, resendEmail, forgotPassword, resetPassword };
