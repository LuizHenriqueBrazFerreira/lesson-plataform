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
const Courses_service_1 = __importDefault(require("../services/Courses.service"));
const mapHttp_1 = __importDefault(require("../utils/mapHttp"));
class CoursesController {
    constructor(coursesService = new Courses_service_1.default()) {
        this.coursesService = coursesService;
    }
    createCourse(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { title } = req.body;
            const { status, data } = yield this.coursesService.createCourse(title);
            return res.status((0, mapHttp_1.default)(status)).json(data);
        });
    }
    getCourses(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { status, data } = yield this.coursesService.getCourses();
            return res.status((0, mapHttp_1.default)(status)).json(data);
        });
    }
    getCourseById(req, res) {
        var _a;
        return __awaiter(this, void 0, void 0, function* () {
            const { id } = req.params;
            const courses = (_a = req.user) === null || _a === void 0 ? void 0 : _a.courses;
            const hasAccess = courses === null || courses === void 0 ? void 0 : courses.some((course) => course.id === Number(id));
            if (!hasAccess) {
                const data = { message: 'Você não tem acesso a este curso.' };
                return res.status((0, mapHttp_1.default)('FORBIDDEN')).json(data);
            }
            const { status, data } = yield this.coursesService.getCourseById(Number(id));
            return res.status((0, mapHttp_1.default)(status)).json(data);
        });
    }
    updateCourseById(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { id } = req.params;
            const { title } = req.body;
            const { status, data } = yield this.coursesService.updateCourseById(Number(id), title);
            return res.status((0, mapHttp_1.default)(status)).json(data);
        });
    }
    deleteCourseById(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { id } = req.params;
            const { status, data } = yield this.coursesService.deleteCourseById(Number(id));
            return res.status((0, mapHttp_1.default)(status)).json(data);
        });
    }
}
exports.default = CoursesController;
