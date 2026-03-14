import { EntityManager } from "typeorm";

import { User } from "../models/user.model";

import { UserDTO } from "../interfaces/user.interface";
import { AddUserDTO } from "../interfaces/addUser.interface";
import dotenv from 'dotenv';
dotenv.config();


import * as bcrypt from "bcryptjs";
import jwt from 'jsonwebtoken';

export class UserService {
   constructor() {
    
   }
    async createUser(user: UserDTO, manager: EntityManager,tenantId: number) {
        const checkUser =  await manager.createQueryBuilder(User,"user").select("user.email","user.tenantId").where("user.email = :email AND user.tenantId = :tenantId", { email: user.email, tenantId: tenantId }).getOne();
        if(checkUser){
            throw new Error("User already exists");
        }
        //generate random 6 digit number
        const randomNumber = Math.floor(Math.random() * 1000000);
        const otpExpires = new Date(Date.now() + 5 * 60 * 1000); // 3 minutes
        //create a user for that tenant by admin
         const newUser = await manager
                    .createQueryBuilder()
                    .insert()
                    .into(User)
                    .values({
                       ...user,
                       password: await bcrypt.hash(user.password, 10),
                       tenantId: tenantId,
                       otp: randomNumber,
                       otpExpires: otpExpires
                    })
                    .execute()
        return newUser
    }

    async verifyOtp(tenantId: number, otp: number, manager: EntityManager) {
        const user = await manager.createQueryBuilder(User,"user").select().where("user.otp = :otp  user.tenantId = :tenantId", { otp: otp, tenantId: tenantId }).getOne();
        if(!user){
            throw new Error("Invalid OTP");
        }
        if(user.otpExpires < new Date()){
            throw new Error("OTP expired");
        }
        //update is_verified to true and set otp to null
        await manager.createQueryBuilder(User,"user")
                    .update()
                    .set({
                        isVerified: true,
                        otp: () => "NULL",
                        otpExpires: () => "NULL"
                    })
                    .where("user.id = :id", { id: user.id })
                    .execute()
        return user
    }

    async login(email: string, password: string, manager: EntityManager) {
        const user = await manager.createQueryBuilder(User,"user").select().where("user.email = :email", { email: email }).getOne();
        if(!user){
            throw new Error("Invalid email or password");
        }
        const isPasswordValid = await bcrypt.compare(password, user.password);
        if(!isPasswordValid){
            throw new Error("Invalid email or password");
        }
        //verify if user is verified
        if(!user.isVerified){
            throw new Error("User is not verified");
        }
        //generate jwt token
        const token = jwt.sign({ id: user.id ,role: user.role,tenantId: user.tenantId,email: user.email}, process.env.JWT_SECRET as string, { expiresIn: "1h" });

        return { token}
    }

    async addNewUser( userData: AddUserDTO, manager: EntityManager) {
        const user = await manager.createQueryBuilder(User,"user").select().where("user.email = :email AND user.tenantId = :tenantId", { email: userData.email, tenantId: userData.tenantId }).getOne();
        //to avoid duplication of users with same email in same tenant
        if(user){
            throw new Error("User already exists");
        }
        const newUser = await manager.createQueryBuilder(User,"user")
                    .insert()
                    .into(User)
                    .values({
                       ...userData,    
                    })
                    .execute()
                
        return newUser
    }
}
