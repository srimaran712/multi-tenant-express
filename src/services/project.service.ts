import { createProject,editProject } from "../interfaces/project.interface";
import { EntityManager } from "typeorm";
import { Project } from "../models/project.model";
import { User } from "../models/user.model";


export class ProjectService {
    
    async createNewProject(project: createProject, manager: EntityManager) {
        try{
        //check the user is belong to right tenant
        const checkUser= await manager.createQueryBuilder(User,"user").select(["user.tenantId", "user.id"]).where("user.id = :id AND user.tenantId = :tenantId", { id: project.userId, tenantId: project.tenantId }).getOne()
        if(!checkUser){
            throw new Error("You are not belong to right tenant, please check your tenant ");
        }

        //create the project
        const newProject = await manager.
        createQueryBuilder().
        insert().
        into(Project).
        values({
            ...project,
            createdById: project.userId,
            createdBy: { id: project.userId }
        }).
        execute();
        return newProject.raw[0].insertId;
        }catch(error){
            throw error;
        }
    }

    async editProject( project: editProject, manager: EntityManager) {
        try{
            //check the user is belong to right tenant
            // const checkUser= await manager.createQueryBuilder(User,"user").select(["user.tenantId", "user.id"]).where("user.id = :id AND user.tenantId = :tenantId", { id: project.userId, tenantId: project.tenantId }).getOne()
            // if(!checkUser){
            //     throw new Error("You are not belong to right tenant, please check your tenant ");
            // }
            //check only that user is able to edit that project
            const {id, tenantId, userId, ...projectData} = project;
            //edit the project
            const editProject = await manager.
            createQueryBuilder().
            update(Project).
            set({
                ...projectData,
                updatedById: project.userId,
                updatedBy: { id: project.userId }
            }).
            where("id = :id", { id: project.id }).
            andWhere("tenantId = :tenantId", { tenantId: project.tenantId }).
            andWhere("createdById = :createdById", { createdById: project.userId }). //ensure that only the creator can edit the project
            execute();
            
            if (editProject.affected === 0) {
            throw new Error("Project not found or you do not have permission to edit it.");
        }
            return editProject;
        }catch(error){
            throw error;
        }
    }
}