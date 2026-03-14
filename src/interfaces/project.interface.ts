import { ProjectStatus } from "../models/project.model";

export interface createProject {
    name: string;
    description: string;
    tenantId: number;
    userId: number
}


export interface editProject extends createProject {
    id: number,
    status: ProjectStatus
}