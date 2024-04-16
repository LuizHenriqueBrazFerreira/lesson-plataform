"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const Lessons_model_1 = __importDefault(require("../database/models/Lessons.model"));
const getAllLessons = () => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const allLessons = yield Lessons_model_1.default.findAll();
        const filteredLessons = allLessons.map((lesson) => lesson.dataValues);
        return { status: 'SUCCESSFUL', data: filteredLessons };
    }
    catch (error) {
        return { status: 'INTERNAL_SERVER_ERROR', data: { message: 'Erro na requisição' } };
    }
});
const deleteLesson = ({ title }) => __awaiter(void 0, void 0, void 0, function* () {
    const lessonExist = yield Lessons_model_1.default.findOne({ where: { title } });
    if (!lessonExist)
        return { status: 'NOT_FOUND', data: { message: 'Lesson not found' } };
    yield Lessons_model_1.default.destroy({ where: { title } });
    return { status: 'NO_CONTENT', data: null };
});
const updateLesson = ({ id, content, image, link, subTopic, title, topic }) => __awaiter(void 0, void 0, void 0, function* () {
    const lessonExist = yield Lessons_model_1.default.findByPk(id);
    if (!lessonExist)
        return { status: 'NOT_FOUND', data: { message: 'lesson not found' } };
    yield Lessons_model_1.default.update({ title, content, image, link, topic, subTopic }, { where: { id } });
    const updatedLesson = yield Lessons_model_1.default.findOne({ where: { id } });
    return { status: 'SUCCESSFUL', data: updatedLesson };
});
const createLesson = ({ title, content, image, link, topic, subTopic }) => __awaiter(void 0, void 0, void 0, function* () {
    const newLesson = yield Lessons_model_1.default.create({ title, content, image, link, topic, subTopic });
    return { status: 'SUCCESSFUL', data: newLesson.dataValues };
});
exports.default = { getAllLessons, deleteLesson, updateLesson, createLesson };
