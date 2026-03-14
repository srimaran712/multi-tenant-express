import {Request,Response} from 'express'
import { User, UserRole } from '../models/user.model'
import { UserService } from '../services/user.service'

import { LoginDTO } from '../interfaces/user.interface'
import { AppDataSource } from '../config/data-source.config'
import {AddUserDTO} from '../interfaces/addUser.interface'

export class UserController {
    private userSerivce: UserService;
    constructor() {
        this.userSerivce = new UserService();
    }

    login =async(req:Request,res:Response)=>{
        try{
            const {email,password}:LoginDTO = req.body;
            if(!email || !password){
                return res.status(400).json({ message: "Email and password are required" });
            }
            const userDetails= await AppDataSource.transaction(async (transactionalEntityManager)=>{
            const user = await this.userSerivce.login(email,password,transactionalEntityManager)
                return user;
               
            })
            //need to pass token in the response
            res.status(200).json({ message: "User logged in successfully", user: userDetails });
            
        }catch(err){
            res.status(500).json({ message: "Internal server error",err:(err as Error).message });
        }
    }

    addUser= async(req:Request,res:Response)=>{
        try{
            const {name,email}:AddUserDTO = req.body;
            const tenantId = req.user?.tenantId!;
            if(!email || !name){
                return res.status(400).json({ message: "Email and password are required" });
            }
            const userDetails= await AppDataSource.transaction(async (transactionalEntityManager)=>{
            const user = await this.userSerivce.addNewUser({name,email,role:UserRole.USER,tenantId},transactionalEntityManager)
                return user;
               
            })
            //send invite to user
            
            //need to pass token in the response
            res.status(200).json({ message: "User added successfully", user: userDetails });
            
        }catch(err){
            res.status(500).json({ message: "Internal server error",err:(err as Error).message });
        }
    }
}
