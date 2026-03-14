import { Router } from "express";
import { ProjectController } from "../controllers/project.controller";

const router = Router();
const projectController = new ProjectController();

router.post("v1/new", projectController.createProject);
router.put("v1/edit/:id", projectController.editProject);

export default router;