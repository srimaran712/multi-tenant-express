import { UserRole } from "../models/user.model";

export interface AddUserDTO {
    name: string;
    email: string;
    role: UserRole; 
    tenantId: number;   
}
