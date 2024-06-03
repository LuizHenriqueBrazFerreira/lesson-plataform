"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const Courses_controller_1 = __importDefault(require("../controller/Courses.controller"));
const validateLogin_1 = require("../middlewares/validateLogin");
const validateAdmin_1 = __importDefault(require("../middlewares/validateAdmin"));
const courseRouter = (0, express_1.Router)();
const coursesController = new Courses_controller_1.default();
courseRouter.get('/courses', validateLogin_1.validateToken, validateAdmin_1.default, (req, res) => coursesController.getCourses(req, res));
courseRouter.post('/courses', validateLogin_1.validateToken, validateAdmin_1.default, (req, res) => coursesController.createCourse(req, res));
courseRouter.get('/courses/:id', validateLogin_1.validateToken, (req, res) => coursesController.getCourseById(req, res));
courseRouter.put('/courses/:id', validateLogin_1.validateToken, validateAdmin_1.default, (req, res) => coursesController.updateCourseById(req, res));
courseRouter.delete('/courses/:id', validateLogin_1.validateToken, validateAdmin_1.default, (req, res) => coursesController.deleteCourseById(req, res));
exports.default = courseRouter;
