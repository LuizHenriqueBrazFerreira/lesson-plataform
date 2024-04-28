"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const Lessons_controller_1 = __importDefault(require("../controller/Lessons.controller"));
const express_1 = require("express");
const lessonRouter = (0, express_1.Router)();
const lessonsController = new Lessons_controller_1.default();
lessonRouter.get('/lessons', (req, res) => lessonsController.getLessons(req, res));
lessonRouter.get('/lesosns/:id', (req, res) => lessonsController.getLessonById(req, res));
lessonRouter.post('/lessons', (req, res) => lessonsController.createLesson(req, res));
lessonRouter.put('/lessons/:id', (req, res) => lessonsController.updateLessonById(req, res));
lessonRouter.delete('/lessons/:id', (req, res) => lessonsController.deleteLessonById(req, res));
exports.default = lessonRouter;
