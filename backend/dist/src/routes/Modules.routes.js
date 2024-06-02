"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const Modules_controller_1 = __importDefault(require("../controller/Modules.controller"));
const validateLogin_1 = require("../middlewares/validateLogin");
const moduleRouter = (0, express_1.Router)();
const modulesController = new Modules_controller_1.default();
moduleRouter.get('/modules', validateLogin_1.validateToken, (req, res) => modulesController.getModules(req, res));
moduleRouter.post('/modules', validateLogin_1.validateToken, (req, res) => modulesController.createModule(req, res));
moduleRouter.get('/modules/:courseId', validateLogin_1.validateToken, (req, res) => modulesController.getModulesByCourseId(req, res));
moduleRouter.get('/module/:id', validateLogin_1.validateToken, (req, res) => modulesController.getModuleById(req, res));
moduleRouter.put('/modules/:id', validateLogin_1.validateToken, (req, res) => modulesController.updateModuleById(req, res));
moduleRouter.delete('/modules/:id', validateLogin_1.validateToken, (req, res) => modulesController.deleteModuleById(req, res));
exports.default = moduleRouter;
