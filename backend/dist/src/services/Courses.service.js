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
class CoursesService {
    constructor() {
        this.coursesModel = new CoursesModel_1.default();
    }
    createCourse(title) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const course = yield this.coursesModel.createCourse(title);
                return { status: 'CREATED', data: course };
            }
            catch (error) {
                return { status: 'INTERNAL_SERVER_ERROR', data: { message: 'Falha ao criar curso.' } };
            }
        });
    }
    getCourses() {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const courses = yield this.coursesModel.getCourses();
                return { status: 'SUCCESSFUL', data: courses };
            }
            catch (error) {
                return { status: 'INTERNAL_SERVER_ERROR', data: { message: 'Falha ao buscar cursos.' } };
            }
        });
    }
    getCourseById(id) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const course = yield this.coursesModel.getCourseById(id);
                return { status: 'SUCCESSFUL', data: course };
            }
            catch (error) {
                return { status: 'INTERNAL_SERVER_ERROR', data: { message: 'Falha ao buscar curso.' } };
            }
        });
    }
    updateCourseById(id, title) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const updatedCourse = yield this.coursesModel.updateCourseById(id, title);
                return { status: 'SUCCESSFUL', data: updatedCourse };
            }
            catch (error) {
                return { status: 'INTERNAL_SERVER_ERROR', data: { message: 'Falha ao atualizar curso.' } };
            }
        });
    }
    deleteCourseById(id) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const deletedCourse = yield this.coursesModel.deleteCourseById(id);
                return { status: 'SUCCESSFUL', data: deletedCourse };
            }
            catch (error) {
                return { status: 'INTERNAL_SERVER_ERROR', data: { message: 'Falha ao deletar curso.' } };
            }
        });
    }
}
exports.default = CoursesService;
