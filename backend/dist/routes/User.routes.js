"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const User_controller_1 = __importDefault(require("../src/controller/User.controller"));
const userRouter = (0, express_1.Router)();
userRouter.post('/create-account', User_controller_1.default.registerUser);
userRouter.post('/login', User_controller_1.default.requestUserByEmail);
exports.default = userRouter;
