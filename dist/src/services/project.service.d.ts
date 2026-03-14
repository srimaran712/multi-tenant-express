import { createProject, editProject } from "../interfaces/project.interface";
import { EntityManager } from "typeorm";
export declare class ProjectService {
    createNewProject(project: createProject, manager: EntityManager): Promise<any>;
    editProject(project: editProject, manager: EntityManager): Promise<import("typeorm").UpdateResult>;
}
//# sourceMappingURL=project.service.d.ts.map