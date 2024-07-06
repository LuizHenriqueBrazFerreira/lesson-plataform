import { IUserModel } from '../interfaces/IUsers';
import { UserData } from '../types/Data.types';
import { createToken, createEmailToken, verifyToken } from '../utils/jwt';
import { validatePassword, validateUser, validateConfirmEmailToken } from "../middlewares/validateLogin";
import { sendConfirmEmail, sendForgotPasswordEmail, sendSupportEmail } from '../utils/sendEmail';
import { IUserService } from '../interfaces/IUsers';
import UsersModel from '../models/UsersModel';
import { giveAccessToAll, giveAcessToOne } from '../utils/giveAccess';
import bcrypt from 'bcryptjs';
import { ServiceResponse } from '../types/Service.response';

const SALT_ROUNDS = process.env.SALT_ROUNDS ? parseInt(process.env.SALT_ROUNDS) : 10;

class UsersService implements IUserService {
  private userModel: IUserModel = new UsersModel();

  async createUser({ name, email, password, role, country, organization = '' }: UserData) {
    try {
      const user = await this.userModel.findByEmail(email);
  
      const isUserInvalid = validateUser(email, password, name, country);
  
      if (isUserInvalid) return { status: isUserInvalid.status, data: isUserInvalid.data };
  
      if (user) return { status: 'CONFLICT', data: { message: 'E-mail já cadastrado.' } };
  
      await this.userModel.createUser({ name, email, password, role, country, organization });
  
      const confirmEmailToken = createEmailToken({ email });
  
      const firstName = name.split(' ')[0];
  
      await sendConfirmEmail(email, confirmEmailToken, firstName);
  
      return { status: 'CREATED', data: { message: 'Usuário criado com sucesso.' }};
    } catch (error) {
      return { status: 'INTERNAL_SERVER_ERROR', data: { message: 'Falha ao criar o usuário' } };
    }
  }

  async getAllUsers() {
    try {
      const users = await this.userModel.getAllUsers();
  
      return { status: 'SUCCESSFUL', data: users };
    } catch (error: any) {
      return { status: 'INTERNAL_SERVER_ERROR', data: { message: error } };
    }
  }
  
  async findByEmail(email: string, password: string) {
    try {
      if (!email || !password) return { status: 'BAD_REQUEST', data: { message: 'Todos os campos devem estar preenchidos.' } };
      
      let isCorrectPassword;
  
      const userExists = await this.userModel.findByEmail(email);
  
      if (userExists){
        isCorrectPassword = validatePassword(password, userExists.dataValues.password);
  
        const isConfirmedEmail = validateConfirmEmailToken(userExists.dataValues.confirmEmailToken, email);
        
        if (!isConfirmedEmail) return { status: 'BAD_REQUEST', data: { message: 'Por favor, confirme seu e-mail.' } };
      }
  
      
      if (!userExists || !isCorrectPassword) return { status: 'NOT_FOUND', data: { message: 'E-mail ou senha incorretos.' } };
      
      const token = createToken({ email, id: userExists.dataValues.id});
  
      return { status: 'SUCCESSFUL', data: { token, user: userExists.dataValues } };
    } catch (error: any) {
      console.log(error);
      
      return { status: 'INTERNAL_SERVER_ERROR', data: { message: error } };
    }
  }
  
  async confirmEmail(confirmEmailToken: string){
    try {
      const { email } = verifyToken(confirmEmailToken);
  
      await this.userModel.updateUser('confirmEmailToken', confirmEmailToken, email);

      const user = await this.userModel.findByEmail(email);

      if (!user) return { status: 'NOT_FOUND', data: { message: 'E-mail não encontrado.' } };

      await giveAccessToAll(user.dataValues.id);

      return { status: 'SUCCESSFUL', data: { message: 'E-mail confirmado com sucesso.' } };
    } catch (error: any) {
      return { status: 'INTERNAL_SERVER_ERROR', data: { message: error } };
    }
  }
  
  async resendEmail(email: string) {
    try {
      const user = await this.userModel.findByEmail(email);
  
      if (!user) return { status: 'NOT_FOUND', data: { message: 'E-mail não encontrado.' } };
  
      const confirmEmailToken = createEmailToken({ email });
  
      const name = user.dataValues.name.split(' ')[0];
  
      await sendConfirmEmail(email, confirmEmailToken, name);
  
      return { status: 'SUCCESSFUL', data: { message: 'E-mail reenviado com sucesso.' } };
    } catch (error: any) {
      return { status: 'INTERNAL_SERVER_ERROR', data: { message: error } };
    }
  }
  
  async forgotPassword(email: string) {
    try {
      const user = await this.userModel.findByEmail(email);
  
      if (!user) return { status: 'NOT_FOUND', data: { message: 'E-mail não encontrado.' } };
  
      const forgotPasswordToken = user.dataValues.confirmEmailToken ?? '';
  
      const name = user.dataValues.name.split(' ')[0];
  
      await sendForgotPasswordEmail(email, forgotPasswordToken, name);
  
      return { status: 'SUCCESSFUL', data: { message: 'E-mail enviado com sucesso.' } };
    } catch (error: any) {
      return { status: 'INTERNAL_SERVER_ERROR', data: { message: error } };
    }
  }

  async requestSuport(email: string, name: string, topic: string, content: string, contact: string) {
    try {
      await sendSupportEmail(email, name, topic, content, contact);
  
      return { status: 'SUCCESSFUL', data: { message: 'E-mail enviado com sucesso.' } };
    } catch (error: any) {
      return { status: 'INTERNAL_SERVER_ERROR', data: { message: error } };
    }
  }
  
  async resetPassword(emailToken: string, password: string) {
   try {
      const { email } = verifyToken(emailToken);
  
      const user = await this.userModel.findByEmail(email);
  
      if (!user) return { status: 'NOT_FOUND', data: { message: 'E-mail não encontrado.' } };
  
      const hashedPassword = bcrypt.hashSync(password, SALT_ROUNDS);
  
      await this.userModel.updateUser('password', hashedPassword, email);
  
      return { status: 'SUCCESSFUL', data: { message: 'Senha alterada com sucesso.' } };
    } catch (error: any) {
      return { status: 'INTERNAL_SERVER_ERROR', data: { message: error } };
    }
  }

  async findProfileData(email: string) {
    try {
      const user = await this.userModel.findByEmail(email);
  
      if (!user) return { status: 'NOT_FOUND', data: { message: 'Usuário não encontrado.' } };
  
      return { status: 'SUCCESSFUL', data: user.dataValues };
    } catch (error: any) {
      return { status: 'INTERNAL_SERVER_ERROR', data: { message: error } };
    }
  }

  async updateProfileData(oldEmail: string, email: string, name: string, password: string, country: string, organization: string) {
    try {
      const user = await this.userModel.findByEmail(oldEmail);
  
      if (!user) return { status: 'NOT_FOUND', data: { message: 'Usuário não encontrado.' } };
  
      if (password.length > 8) {
        const hashedPassword = bcrypt.hashSync(password, SALT_ROUNDS);
        await this.userModel.updateUser('password', hashedPassword, oldEmail);
      }
  
      await this.userModel.updateUser('country', country, oldEmail);

      await this.userModel.updateUser('organization', organization, oldEmail);

      await this.userModel.updateUser('name', name, oldEmail);

      await this.userModel.updateUser('email', email, oldEmail);

      if (oldEmail !== email) {
        const confirmEmailToken = createEmailToken({ email });
        await this.userModel.updateUser('confirmEmailToken', confirmEmailToken, email);
      }
  
      return { status: 'SUCCESSFUL', data: { message: 'Perfil atualizado com sucesso!' } };
    } catch (error: any) {
      return { status: 'INTERNAL_SERVER_ERROR', data: { message: 'Erro ao atualizar perfil.' } };
    }
  }

  async giveUserAccessToOneCourse(userId: number, courseId: number) {
    try {
      const userCourse = await giveAcessToOne(userId, courseId);
  
      return { status: 'SUCCESSFUL', data: userCourse };
    } catch (error: any) {
      return { status: 'INTERNAL_SERVER_ERROR', data: error };
    }
  }

  async requestDeleteUser(id: number) {
    const deletedUser = await this.userModel.deleteUser(id);

    if (deletedUser) return { status: 'SUCCESSFUL', data: { message: 'Usuário deletado com sucesso.' } };

    return { status: 'NOT_FOUND', data: { message: 'Usuário não encontrado.' } };
  }
}

export default UsersService;
