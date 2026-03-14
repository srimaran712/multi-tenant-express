import { Request, Response } from "express"
import { TenantService } from "../services/tenant.service"
import { UserService } from "../services/user.service"
import { AppDataSource } from "../config/data-source.config"
import { UserRole } from "../models/user.model"
import * as bcrypt from "bcryptjs"

export class TenantController {
    private tenantService: TenantService
    private userService: UserService
    
    constructor() {
        this.tenantService = new TenantService()
        this.userService = new UserService()
    }
    //super level 
     createTenantWithAdmin=async (req: Request, res: Response)=> {
        try{
        const {companyName,name, email, password} = req.body
        const result= await AppDataSource.transaction(async (transactionalEntityManager)=>{

        const tenant = await this.tenantService.createTenant({name: companyName},transactionalEntityManager)
        console.log(tenant)
        const user = await this.userService.createUser({name, email, password, role: UserRole.ADMIN},transactionalEntityManager,tenant)

      
        })

         res.status(200).json({ message: "Tenant created", result });
        }catch(error){
            res.status(500).json({ message: "Internal server error",err:(error as Error).message });
        }
        

       
    }

    verifyAdminWithOtp=async (req: Request, res: Response) => {
        try{
       const {tenantId,otp} = req.body

       if(!tenantId || !otp){
        return res.status(400).json({ message: "Tenant ID and OTP are required" });
       }

       const result = await AppDataSource.transaction(async (transactionalEntityManager)=>{
        // Verify OTP logic here
         const otpVerification = await this.userService.verifyOtp(tenantId, otp, transactionalEntityManager)
         
       })
       res.status(200).json({ message: "OTP verified successfully" });


        }catch(err){
            res.status(500).json({ message: "Internal server error",err:(err as Error).message });
        }
     //   const tenant = await this.tenantService(req.params.id)
     //   res.json({ message: "Tenant verified" });
    }
}