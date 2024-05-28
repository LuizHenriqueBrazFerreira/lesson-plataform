"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const User_controller_1 = __importDefault(require("../controller/User.controller"));
const userController = new User_controller_1.default();
const userRouter = (0, express_1.Router)();
userRouter.post('/create-account', (req, res) => userController.registerUser(req, res));
userRouter.post('/login', (req, res) => userController.requestUserByEmail(req, res));
userRouter.put('/confirm', (req, res) => userController.confirmEmail(req, res));
userRouter.post('/resend-email', (req, res) => userController.resendEmail(req, res));
userRouter.post('/forgot-password', (req, res) => userController.forgotPassword(req, res));
userRouter.put('/reset-password', (req, res) => userController.resetPassword(req, res));
userRouter.post('/profile', (req, res) => userController.requestProfileData(req, res));
userRouter.put('/profile', (req, res) => userController.updateProfileData(req, res));
exports.default = userRouter;
