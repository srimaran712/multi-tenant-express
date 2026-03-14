import { Tenant } from "./tenant.model";
import { User } from "./user.model";
export declare enum ProjectStatus {
    NOTSTARTED = "not_started",
    INPROGRESS = "in_progress",
    COMPLETED = "completed"
}
export declare class Project {
    id: number;
    name: string;
    description: string;
    status: ProjectStatus;
    createdAt: Date;
    updatedAt: Date;
    tenant: Tenant;
    tenantId: number;
    createdBy: User;
    createdById: number;
}
//# sourceMappingURL=project.model.d.ts.map