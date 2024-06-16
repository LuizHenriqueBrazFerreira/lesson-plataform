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
const LessonsModel_1 = __importDefault(require("../models/LessonsModel"));
const ModulesModel_1 = __importDefault(require("../models/ModulesModel"));
class LessonsService {
    constructor() {
        this.model = new LessonsModel_1.default();
        this._moduleModel = new ModulesModel_1.default();
    }
    createLesson(moduleTitle, title, content, image, link) {
        return __awaiter(this, void 0, void 0, function* () {
            console.log(moduleTitle);
            try {
                const moduleExists = yield this._moduleModel.getModuleByTitle(moduleTitle);
                if (!moduleExists)
                    return { status: 'NOT_FOUND', data: { message: 'Módulo não encontrado' } };
                if (!title || !content)
                    return { status: 'BAD_REQUEST', data: { message: 'Campos obrigatórios não preenchidos' } };
                const moduleId = moduleExists.id;
                const lesson = yield this.model.createLesson(moduleId, title, content, image, link);
                return { status: 'SUCCESSFUL', data: lesson };
            }
            catch (error) {
                console.log(error);
                return { status: 'INTERNAL_SERVER_ERROR', data: { message: 'Falha ao criar Lições' } };
            }
        });
    }
    getLessons() {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const lessons = yield this.model.getLessons();
                return { status: 'SUCCESSFUL', data: lessons };
            }
            catch (error) {
                return { status: 'INTERNAL_SERVER_ERROR', data: { message: 'Falha ao buscar Lições' } };
            }
        });
    }
    getLessonById(id) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const lesson = yield this.model.getLessonById(id);
                if (!lesson) {
                    return { status: 'NOT_FOUND', data: { message: 'Lições não encontradas' } };
                }
                return { status: 'SUCCESSFUL', data: lesson };
            }
            catch (error) {
                return { status: 'INTERNAL_SERVER_ERROR', data: { message: 'Falha ao buscar Lições' } };
            }
        });
    }
    getLessonsByModuleId(moduleId) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const lessons = yield this.model.getLessonsByModuleId(moduleId);
                return { status: 'SUCCESSFUL', data: lessons };
            }
            catch (error) {
                return { status: 'INTERNAL_SERVER_ERROR', data: { message: 'Falha ao buscar Lições' } };
            }
        });
    }
    updateLessonById(id, moduleTitle, title, content, image, link) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const moduleExists = yield this._moduleModel.getModuleByTitle(moduleTitle);
                if (!moduleExists)
                    throw new Error('Módulo não encontrado');
                const moduleId = moduleExists.id;
                const lesson = yield this.model.updateLessonById(id, moduleId, title, content, image, link);
                return { status: 'SUCCESSFUL', data: lesson };
            }
            catch (error) {
                return { status: 'INTERNAL_SERVER_ERROR', data: { message: 'Falha ao atualizar Lições' } };
            }
        });
    }
    deleteLessonById(id) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const lesson = yield this.model.deleteLessonById(id);
                return { status: 'SUCCESSFUL', data: lesson };
            }
            catch (error) {
                return { status: 'INTERNAL_SERVER_ERROR', data: { message: 'Falha ao deletar Lições' } };
            }
        });
    }
}
exports.default = LessonsService;
