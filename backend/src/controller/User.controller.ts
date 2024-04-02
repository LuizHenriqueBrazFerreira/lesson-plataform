import { Request, Response } from "express";
import UserService from "../services/User.service";
import mapStatusHttp from "../../utils/mapHttp";

const registerUser = async (req: Request, res: Response) => {
  const userData = req.body;

  const {status, data} = await UserService.createUser(userData);

  if(status !== 'CREATED') return res.status(mapStatusHttp(status)).json(data);
  return res.status(201).json(data)
}

const requestUserByEmail = async (req: Request, res: Response) => {
  const {email} = req.body;

  const {status, data} = await UserService.findByEmail(email);

  if(status !== 'SUCCESSFUL') return res.status(mapStatusHttp(status)).json(data)
  return res.status(200).json(data)

}

export default {registerUser, requestUserByEmail}