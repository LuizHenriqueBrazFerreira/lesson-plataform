"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const Modules_controller_1 = __importDefault(require("../controller/Modules.controller"));
const moduleRouter = (0, express_1.Router)();
const modulesController = new Modules_controller_1.default();
moduleRouter.get('/modules', (req, res) => modulesController.getModules(req, res));
moduleRouter.post('/modules', (req, res) => modulesController.createModule(req, res));
moduleRouter.get('/modules/:id', (req, res) => modulesController.getModuleById(req, res));
moduleRouter.put('/modules/:id', (req, res) => modulesController.updateModuleById(req, res));
moduleRouter.delete('/modules/:id', (req, res) => modulesController.deleteModuleById(req, res));
exports.default = moduleRouter;
