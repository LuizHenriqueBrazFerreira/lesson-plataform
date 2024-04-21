import { Request, Response } from "express";
import UserService from "../services/User.service";
import mapStatusHTTP from "../utils/mapHttp";

const registerUser = async (req: Request, res: Response) => {
  const userData = req.body;

  const {status, data} = await UserService.createUser(userData);
  

  res.status(mapStatusHTTP(status)).json(data);
}

const requestUserByEmail = async (req: Request, res: Response) => {
  const {email, password} = req.body;

  const {status, data} = await UserService.findByEmail(email, password);

 return res.status(mapStatusHTTP(status)).json(data)
}

const confirmEmail = async (req: Request, res: Response) => {
  const {token} = req.body;

  const {status, data} = await UserService.confirmEmail(token);

  return res.status(mapStatusHTTP(status)).json(data);
}

const resendEmail = async (req: Request, res: Response) => {
  const {email} = req.body;

  const {status, data} = await UserService.resendEmail(email);

  return res.status(mapStatusHTTP(status)).json(data);
}

const forgotPassword = async (req: Request, res: Response) => {
  const {email} = req.body;

  const {status, data} = await UserService.forgotPassword(email);

  return res.status(mapStatusHTTP(status)).json(data);
}

const resetPassword = async (req: Request, res: Response) => {
  const {token, password} = req.body;

  const {status, data} = await UserService.resetPassword(token, password);

  return res.status(mapStatusHTTP(status)).json(data);
}

export default {registerUser, requestUserByEmail, confirmEmail, resendEmail, forgotPassword, resetPassword}