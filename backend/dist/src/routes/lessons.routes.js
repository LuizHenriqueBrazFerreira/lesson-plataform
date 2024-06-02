"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const Lessons_controller_1 = __importDefault(require("../controller/Lessons.controller"));
const express_1 = require("express");
const validateLogin_1 = require("../middlewares/validateLogin");
const lessonRouter = (0, express_1.Router)();
const lessonsController = new Lessons_controller_1.default();
lessonRouter.get('/lessons', validateLogin_1.validateToken, (req, res) => lessonsController.getLessons(req, res));
lessonRouter.get('/lesson/:id', validateLogin_1.validateToken, (req, res) => lessonsController.getLessonById(req, res));
lessonRouter.get('/lessons/:moduleId', validateLogin_1.validateToken, (req, res) => lessonsController.getLessonsByModuleId(req, res));
lessonRouter.post('/lessons', validateLogin_1.validateToken, (req, res) => lessonsController.createLesson(req, res));
lessonRouter.put('/lessons/:id', validateLogin_1.validateToken, (req, res) => lessonsController.updateLessonById(req, res));
lessonRouter.delete('/lessons/:id', validateLogin_1.validateToken, (req, res) => lessonsController.deleteLessonById(req, res));
exports.default = lessonRouter;
