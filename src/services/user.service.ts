import { EntityManager } from "typeorm";

import { User } from "../models/user.model";

import { UserDTO } from "../interfaces/user.interface";

import * as bcrypt from "bcryptjs";

export class UserService {
   constructor() {
    
   }
    async createUser(user: UserDTO, manager: EntityManager,tenantId: number) {
        const checkUser =  await manager.createQueryBuilder(User,"user").select("user.email","user.tenantId").where("user.email = :email AND user.tenantId = :tenantId", { email: user.email, tenantId: tenantId }).getOne();
        if(checkUser){
            throw new Error("User already exists");
        }
        //create a user for that tenant by admin
         const newUser = await manager
                    .createQueryBuilder()
                    .insert()
                    .into(User)
                    .values({
                       ...user,
                       password: await bcrypt.hash(user.password, 10),
                       tenantId: tenantId
                    })
                    .execute()
        return newUser
    }

}