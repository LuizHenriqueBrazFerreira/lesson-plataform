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

export default {registerUser, requestUserByEmail}