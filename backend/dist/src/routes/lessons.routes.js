"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const Lessons_controller_1 = __importDefault(require("../controller/Lessons.controller"));
const express_1 = require("express");
const lessonRouter = (0, express_1.Router)();
lessonRouter.get('/lessons', Lessons_controller_1.default.requestAllLessons);
lessonRouter.delete('/lessons/:id', Lessons_controller_1.default.requestDeleteLesson);
lessonRouter.put('/lessons/:id', Lessons_controller_1.default.requestUpdateLesson);
lessonRouter.post('/lessons', Lessons_controller_1.default.requestCreateLesson);
lessonRouter.get('/lesosns/:id', Lessons_controller_1.default.requestLessonById);
exports.default = lessonRouter;
