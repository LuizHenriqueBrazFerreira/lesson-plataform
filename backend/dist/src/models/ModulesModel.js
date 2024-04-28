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
const Modules_model_1 = __importDefault(require("../database/models/Modules.model"));
class ModulesModel {
    constructor() {
        this.model = Modules_model_1.default;
    }
    createModule(courseId, title) {
        return __awaiter(this, void 0, void 0, function* () {
            const module = yield this.model.create({ courseId, title });
            return module;
        });
    }
    getModules() {
        return __awaiter(this, void 0, void 0, function* () {
            const modules = yield this.model.findAll();
            return modules;
        });
    }
    getModuleById(id) {
        return __awaiter(this, void 0, void 0, function* () {
            const module = yield this.model.findByPk(id);
            return module;
        });
    }
    updateModuleById(id, courseId, title) {
        return __awaiter(this, void 0, void 0, function* () {
            const module = yield this.model.update({ courseId, title }, { where: { id } });
            return module;
        });
    }
    deleteModuleById(id) {
        return __awaiter(this, void 0, void 0, function* () {
            const module = yield this.model.destroy({ where: { id } });
            return module;
        });
    }
}
exports.default = ModulesModel;
