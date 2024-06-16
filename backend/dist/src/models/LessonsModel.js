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
class LessonsModel {
    constructor() {
        this.model = Lessons_model_1.default;
    }
    createLesson(moduleId, title, content, image, link) {
        return __awaiter(this, void 0, void 0, function* () {
            console.log(`title no model: ${title}`);
            const lesson = yield this.model.create({ moduleId, title, content, image, link });
            return lesson;
        });
    }
    getLessons() {
        return __awaiter(this, void 0, void 0, function* () {
            const lessons = yield this.model.findAll();
            return lessons;
        });
    }
    getLessonById(id) {
        return __awaiter(this, void 0, void 0, function* () {
            const lesson = yield this.model.findByPk(id);
            return lesson;
        });
    }
    getLessonsByModuleId(moduleId) {
        return __awaiter(this, void 0, void 0, function* () {
            const lesson = yield this.model.findAll({ where: { moduleId } });
            return lesson;
        });
    }
    getLessonsByCourseId(courseId) {
        return __awaiter(this, void 0, void 0, function* () {
            const lesson = yield this.model.findAll({
                include: {
                    association: 'module',
                    where: { courseId },
                },
            });
            return lesson;
        });
    }
    updateLessonById(id, moduleId, title, content, image, link) {
        return __awaiter(this, void 0, void 0, function* () {
            const lesson = yield this.model.update({ moduleId, title, content, image, link }, { where: { id } });
            console.log(`lesson => ${lesson}`);
            return lesson;
        });
    }
    deleteLessonById(id) {
        return __awaiter(this, void 0, void 0, function* () {
            const lesson = yield this.model.destroy({ where: { id } });
            return lesson;
        });
    }
}
exports.default = LessonsModel;
