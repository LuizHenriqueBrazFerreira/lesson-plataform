import { Request, Response } from "express";
import mapStatusHTTP from "../utils/mapHttp";
import UsersService from '../services/User.service';
import { IUserController } from '../interfaces/IUsers';

class UsersController implements IUserController{
  private userService = new UsersService()

  async registerUser(req: Request, res: Response) {
    const userData = req.body;
  
    const {status, data} = await this.userService.createUser(userData);
    
  
    return res.status(mapStatusHTTP(status)).json(data);
  }
  
  async requestUserByEmail(req: Request, res: Response) {
    const {email, password} = req.body;
  
    const {status, data} = await this.userService.findByEmail(email, password);
  
   return res.status(mapStatusHTTP(status)).json(data)
  }
  
  async confirmEmail(req: Request, res: Response) {
    const {token} = req.body;
  
    const {status, data} = await this.userService.confirmEmail(token);
  
    return res.status(mapStatusHTTP(status)).json(data);
  }
  
  async resendEmail(req: Request, res: Response){
    const {email} = req.body;
  
    const {status, data} = await this.userService.resendEmail(email);
  
    return res.status(mapStatusHTTP(status)).json(data);
  }
  
  async forgotPassword(req: Request, res: Response) {
    const {email} = req.body;
  
    const {status, data} = await this.userService.forgotPassword(email);
  
    return res.status(mapStatusHTTP(status)).json(data);
  }
  
  async resetPassword(req: Request, res: Response) {
    const {token, password} = req.body;
  
    const {status, data} = await this.userService.resetPassword(token, password);
  
    return res.status(mapStatusHTTP(status)).json(data);
  }
}

export default UsersController;