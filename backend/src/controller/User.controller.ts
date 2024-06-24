import { sendSupportEmail } from './../utils/sendEmail';
import { Request, Response } from "express";
import mapStatusHTTP from "../utils/mapHttp";
import UsersService from '../services/User.service';
import { IUserController } from '../interfaces/IUsers';
import { ParamsDictionary } from 'express-serve-static-core';
import { ParsedQs } from 'qs';

class UsersController implements IUserController{
  private userService = new UsersService()

  async registerUser(req: Request, res: Response) {
    const userData = req.body;
  
    const {status, data} = await this.userService.createUser(userData);
    
  
    return res.status(mapStatusHTTP(status)).json(data);
  }

  async requestAllUsers(req: Request, res: Response) {
    const {status, data} = await this.userService.getAllUsers();
  
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

  async sendSupportEmail(req: Request, res: Response) {
    const {email, name, topic, content, contact} = req.body;

    const {status, data} = await this.userService.requestSuport(email, name, topic, content, contact);

    return res.status(mapStatusHTTP(status)).json(data);
  }

  async requestProfileData(req: Request, res: Response) {
    const {email} = req.body;

    const {status, data} = await this.userService.findProfileData(email);

    return res.status(mapStatusHTTP(status)).json(data);
  }

  async updateProfileData(req: Request, res: Response) {
    const {oldEmail, email, name, password, country, organization} = req.body;

    const {status, data} = await this.userService.updateProfileData(oldEmail, email, name, password, country, organization);

    return res.status(mapStatusHTTP(status)).json(data);
  }

  async giveUserAccessToOneCourse(req: Request, res: Response) {
    const {userId, courseId} = req.body;

    const {status, data} = await this.userService.giveUserAccessToOneCourse(userId, courseId);

    return res.status(mapStatusHTTP(status)).json(data);
  }

  async requestDeleteUser(req: Request<ParamsDictionary, any, any, ParsedQs, Record<string, any>>, res: Response<any, Record<string, any>>) {
    const {id} = req.params;

    if(Number(id) === 1) return res.status(400).json({message: 'You cannot delete the admin user'});

    const {status, data} = await this.userService.requestDeleteUser(Number(id));

    return res.status(mapStatusHTTP(status)).json(data);
  }
}

export default UsersController;