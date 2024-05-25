"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const Courses_controller_1 = __importDefault(require("../controller/Courses.controller"));
const courseRouter = (0, express_1.Router)();
const coursesController = new Courses_controller_1.default();
courseRouter.get('/courses', (req, res) => coursesController.getCourses(req, res));
courseRouter.post('/courses', (req, res) => coursesController.createCourse(req, res));
courseRouter.get('/courses/:id', (req, res) => coursesController.getCourseById(req, res));
courseRouter.put('/courses/:id', (req, res) => coursesController.updateCourseById(req, res));
courseRouter.delete('/courses/:id', (req, res) => coursesController.deleteCourseById(req, res));
exports.default = courseRouter;
