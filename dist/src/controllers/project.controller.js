"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ProjectController = void 0;
const data_source_config_1 = require("../config/data-source.config");
const project_service_1 = require("../services/project.service");
class ProjectController {
    constructor() {
        this.createProject = async (req, res) => {
            try {
                const { name, description } = req.body;
                const tenantId = req.user?.tenantId;
                const userId = req.user?.id;
                //transaction
                const result = await data_source_config_1.AppDataSource.transaction(async (transactionalEntityManager) => {
                    const project = await this.projectService.createNewProject({ name, description, tenantId, userId }, transactionalEntityManager);
                    return project;
                });
                res.status(200).json({ message: "Project created successfully", project: result });
            }
            catch (error) {
                return res.status(500).json({ message: "Internal server error", error: error.message });
            }
        };
        this.editProject = async (req, res) => {
            try {
                const tenantId = req.user?.tenantId;
                const userId = req.user?.id;
                const projectId = Number(req.params?.id);
                const result = await data_source_config_1.AppDataSource.transaction(async (transactionalEntityManager) => {
                    const project = await this.projectService.editProject({ projectId, ...req.body, tenantId, userId }, transactionalEntityManager);
                    return project;
                });
                res.status(200).json({ message: "Project edited successfully", project: result });
            }
            catch (error) {
                return res.status(500).json({ message: "Internal server error", error: error.message });
            }
        };
        this.projectService = new project_service_1.ProjectService();
    }
}
exports.ProjectController = ProjectController;
//# sourceMappingURL=project.controller.js.map