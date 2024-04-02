import UserModel from "../../database/models/Users.model";
import {UserDB} from '../../types/Database'
import {ServiceResponse} from '../../types/Service.response'
import bcrypt from 'bcryptjs'

const SALTS = process.env.SALT_ROUNDS || 10

type UserData = {
  name: string;
  email: string;
  password: string;
  role: 'ADMIN' | 'STUDENT';
}

const createUser = async ({name, email, password, role}: UserData):Promise<ServiceResponse<UserDB>> => {
  const newUser = await UserModel.create({name, email, password: bcrypt.hashSync(password, SALTS), role})

  if (!newUser) return {status: "ERROR", data: {message: 'Falha no cadastro do usuário'}}
  return {status: 'CREATED', data: newUser.dataValues}
}

const findByEmail = async (email: string): Promise<ServiceResponse<UserDB>> => {
  const userExists = await UserModel.findOne({where: {email}})

  if(!userExists) return {status: 'NOT_FOUND', data: {message: 'Usuário não encontrado'}}
  return {status: 'SUCCESSFUL', data: userExists.dataValues}
}

export default {createUser, findByEmail}