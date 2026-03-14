import { EntityManager } from "typeorm";
import { User } from "../models/user.model";
import { UserDTO } from "../interfaces/user.interface";
import { AddUserDTO } from "../interfaces/addUser.interface";
export declare class UserService {
    constructor();
    createUser(user: UserDTO, manager: EntityManager, tenantId: number): Promise<import("typeorm").InsertResult>;
    verifyOtp(tenantId: number, otp: number, manager: EntityManager): Promise<User>;
    login(email: string, password: string, manager: EntityManager): Promise<{
        token: string;
    }>;
    addNewUser(userData: AddUserDTO, manager: EntityManager): Promise<import("typeorm").InsertResult>;
}
//# sourceMappingURL=user.service.d.ts.map