"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const UserCourses_controller_1 = __importDefault(require("../controller/UserCourses.controller"));
const userCoursesRouter = (0, express_1.Router)();
const userCoursesController = new UserCourses_controller_1.default();
userCoursesRouter.post('/user-courses', (req, res) => userCoursesController.createUserCourse(req, res));
userCoursesRouter.get('/user-courses/:userId', (req, res) => userCoursesController.requestUserCoursesByUserId(req, res));
userCoursesRouter.put('/user-courses', (req, res) => userCoursesController.updateUserCourse(req, res));
exports.default = userCoursesRouter;
