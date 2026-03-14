import { UserRole } from "../models/user.model";
export interface UserDTO {
    name: string;
    email: string;
    password: string;
    role: UserRole;
}
export interface LoginDTO {
    email: string;
    password: string;
}
//# sourceMappingURL=user.interface.d.ts.map