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
const Modules_service_1 = __importDefault(require("../services/Modules.service"));
const mapHttp_1 = __importDefault(require("../utils/mapHttp"));
class ModulesController {
    constructor(modulesService = new Modules_service_1.default()) {
        this.modulesService = modulesService;
    }
    createModule(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { courseTitle, title } = req.body;
            const { status, data } = yield this.modulesService.createModule(courseTitle, title);
            return res.status((0, mapHttp_1.default)(status)).json(data);
        });
    }
    getModules(_req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { status, data } = yield this.modulesService.getModules();
            return res.status((0, mapHttp_1.default)(status)).json(data);
        });
    }
    getModuleById(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { moduleId } = req.params;
            const { status, data } = yield this.modulesService.getModuleById(Number(moduleId));
            return res.status((0, mapHttp_1.default)(status)).json(data);
        });
    }
    getModulesByCourseId(req, res) {
        var _a, _b;
        return __awaiter(this, void 0, void 0, function* () {
            const { courseId } = req.params;
            const courses = (_a = req.user) === null || _a === void 0 ? void 0 : _a.courses.map((course) => course.courseId);
            const role = (_b = req.user) === null || _b === void 0 ? void 0 : _b.role;
            if (!(courses === null || courses === void 0 ? void 0 : courses.includes(Number(courseId))) && role !== 'ADMIN') {
                return res.status(401).json({ message: 'Unauthorized' });
            }
            const { status, data } = yield this.modulesService.getModulesByCourseId(Number(courseId));
            return res.status((0, mapHttp_1.default)(status)).json(data);
        });
    }
    updateModuleById(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { id } = req.params;
            const { courseId, title } = req.body;
            const { status, data } = yield this.modulesService.updateModuleById(Number(id), Number(courseId), title);
            return res.status((0, mapHttp_1.default)(status)).json(data);
        });
    }
    deleteModuleById(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { id } = req.params;
            const { status, data } = yield this.modulesService.deleteModuleById(Number(id));
            return res.status((0, mapHttp_1.default)(status)).json(data);
        });
    }
}
exports.default = ModulesController;
