import { Request, Response } from "express";
import { AppDataSource } from "../config/data-source.config";
import {ProjectService} from "../services/project.service";

export class ProjectController {
    private projectService: ProjectService;
    constructor() {
        this.projectService = new ProjectService();
    }

createProject = async (req: Request, res: Response) => {

     try{
        const {name,description}= req.body

        const tenantId = req.user?.tenantId!
        const userId = req.user?.id!

        //transaction
        const result = await AppDataSource.transaction(async(transactionalEntityManager) => {
            
            const project = await this.projectService.createNewProject({name, description, tenantId, userId}, transactionalEntityManager);
            return project;
        })
  res.status(200).json({ message: "Project created successfully", project: result });
        
     }catch(error){
        return res.status(500).json({ message: "Internal server error",error:(error as Error).message });
     }
}
    editProject = async (req: Request, res: Response) => {
      try{
          const tenantId = req.user?.tenantId!
          const userId = req.user?.id!
          const projectId = Number(req.params?.id!)
           const result = await AppDataSource.transaction(async(transactionalEntityManager) => {
            
            const project = await this.projectService.editProject( {projectId,...req.body, tenantId, userId}, transactionalEntityManager);
            return project;
        })
        res.status(200).json({ message: "Project edited successfully", project: result });
      }catch(error){
        return res.status(500).json({ message: "Internal server error",error:(error as Error).message });
      }
    }
}