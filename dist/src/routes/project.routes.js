"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const project_controller_1 = require("../controllers/project.controller");
const router = (0, express_1.Router)();
const projectController = new project_controller_1.ProjectController();
router.post("v1/new", projectController.createProject);
router.put("v1/edit/:id", projectController.editProject);
exports.default = router;
//# sourceMappingURL=project.routes.js.map