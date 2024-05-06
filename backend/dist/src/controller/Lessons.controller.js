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
const Lessons_service_1 = __importDefault(require("../services/Lessons.service"));
const mapHttp_1 = __importDefault(require("../utils/mapHttp"));
class LessonsController {
    constructor() {
        this.service = new Lessons_service_1.default();
    }
    createLesson(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { moduleId, title, content, image, link } = req.body;
            const response = yield this.service.createLesson(moduleId, title, content, image, link);
            return res.status((0, mapHttp_1.default)(response.status)).json(response);
        });
    }
    getLessons(_req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const response = yield this.service.getLessons();
            return res.status((0, mapHttp_1.default)(response.status)).json(response);
        });
    }
    getLessonById(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { id } = req.params;
            const response = yield this.service.getLessonById(Number(id));
            return res.status((0, mapHttp_1.default)(response.status)).json(response);
        });
    }
    updateLessonById(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { id } = req.params;
            const { moduleId, title, content, image, link } = req.body;
            const response = yield this.service.updateLessonById(Number(id), moduleId, title, content, image, link);
            return res.status((0, mapHttp_1.default)(response.status)).json(response);
        });
    }
    deleteLessonById(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { id } = req.params;
            const response = yield this.service.deleteLessonById(Number(id));
            return res.status((0, mapHttp_1.default)(response.status)).json(response);
        });
    }
}
exports.default = LessonsController;
