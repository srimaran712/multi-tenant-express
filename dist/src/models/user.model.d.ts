import { Tenant } from "./tenant.model";
import { Project } from "./project.model";
export declare enum UserRole {
    ADMIN = "admin",
    USER = "user"
}
export declare class User {
    id: number;
    name: string;
    email: string;
    password: string;
    role: UserRole;
    isVerified: boolean;
    otp: number;
    otpExpires: Date;
    tenant: Tenant;
    tenantId: number;
    projects: Project[];
}
//# sourceMappingURL=user.model.d.ts.map