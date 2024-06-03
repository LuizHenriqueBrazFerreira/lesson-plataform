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
const CoursesModel_1 = __importDefault(require("../models/CoursesModel"));
const ModulesModel_1 = __importDefault(require("../models/ModulesModel"));
class ModulesService {
    constructor() {
        this.modulesModel = new ModulesModel_1.default();
        this._coursesModel = new CoursesModel_1.default();
    }
    createModule(courseTitle, title) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const courseExists = yield this._coursesModel.getCourseByTitle(courseTitle);
                if (!courseExists)
                    return { status: 'NOT_FOUND', data: { message: 'Curso não encontrado.' } };
                if (!title)
                    return { status: 'BAD_REQUEST', data: { message: 'Título do módulo é obrigatório.' } };
                const courseId = courseExists.id;
                const module = yield this.modulesModel.createModule(courseId, title);
                return { status: 'CREATED', data: module };
            }
            catch (error) {
                return { status: 'INTERNAL_SERVER_ERROR', data: { message: 'Falha ao criar módulo.' } };
            }
        });
    }
    getModules() {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const modules = yield this.modulesModel.getModules();
                return { status: 'SUCCESSFUL', data: modules };
            }
            catch (error) {
                return { status: 'INTERNAL_SERVER_ERROR', data: { message: 'Falha ao buscar módulos.' } };
            }
        });
    }
    getModuleById(id) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const module = yield this.modulesModel.getModuleById(id);
                return { status: 'SUCCESSFUL', data: module };
            }
            catch (error) {
                return { status: 'INTERNAL_SERVER_ERROR', data: { message: 'Falha ao buscar módulo.' } };
            }
        });
    }
    getModulesByCourseId(courseId) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const modules = yield this.modulesModel.getModulesByCourseId(courseId);
                return { status: 'SUCCESSFUL', data: modules };
            }
            catch (error) {
                return { status: 'INTERNAL_SERVER_ERROR', data: { message: 'Falha ao buscar módulos.' } };
            }
        });
    }
    updateModuleById(id, courseId, title) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const updatedModule = yield this.modulesModel.updateModuleById(id, courseId, title);
                return { status: 'SUCCESSFUL', data: updatedModule };
            }
            catch (error) {
                return { status: 'INTERNAL_SERVER_ERROR', data: { message: 'Falha ao atualizar módulo.' } };
            }
        });
    }
    deleteModuleById(id) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const deletedModule = yield this.modulesModel.deleteModuleById(id);
                return { status: 'SUCCESSFUL', data: deletedModule };
            }
            catch (error) {
                return { status: 'INTERNAL_SERVER_ERROR', data: { message: 'Falha ao deletar módulo.' } };
            }
        });
    }
}
exports.default = ModulesService;
