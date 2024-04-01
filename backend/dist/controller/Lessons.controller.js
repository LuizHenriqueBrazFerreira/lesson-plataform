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
const Lessons_service_1 = __importDefault(require("../src/services/Lessons.service"));
const mapHttp_1 = __importDefault(require("../utils/mapHttp"));
const requestAllLessons = (_req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { status, data } = yield Lessons_service_1.default.getAllLessons();
    if (status !== 'SUCCESSFUL')
        return res.status((0, mapHttp_1.default)(status)).json(data);
    return res.status(200).json(data);
});
const requestDeleteLesson = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { title } = req.body;
    const { status, data } = yield Lessons_service_1.default.deleteLesson({ title });
    if (status !== 'DELETED')
        return res.status((0, mapHttp_1.default)(status)).json(data);
    return res.status(204).end();
});
const requestUpdateLesson = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const lessonData = req.body;
    const { status, data } = yield Lessons_service_1.default.updateLesson(lessonData);
    if (status !== 'SUCCESSFUL')
        return res.status((0, mapHttp_1.default)(status)).json(data);
    return res.status(204).json(data);
});
const requestCreateLesson = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const lessonData = req.body;
    const { data } = yield Lessons_service_1.default.createLesson(lessonData);
    return res.status(201).json(data);
});
exports.default = { requestAllLessons, requestDeleteLesson, requestUpdateLesson, requestCreateLesson };
