import { Request, Response } from "express"
import { TenantService } from "../services/tenant.service"
import { UserService } from "../services/user.service"
import { AppDataSource } from "../config/data-source.config"
import * as bcrypt from "bcryptjs"

export class TenantController {
    private tenantService: TenantService
    private userService: UserService
    
    constructor() {
        this.tenantService = new TenantService()
        this.userService = new UserService()
    }
    //super level 
    async createTenantWithAdmin(req: Request, res: Response) {

        const result= await AppDataSource.transaction(async (transactionalEntityManager)=>{

        const tenant = await this.tenantService.createTenant(req.body,transactionalEntityManager)
      //  const user = await this.userService.createUser(req.body,transactionalEntityManager)

      
        })

         res.status(200).json({ message: "Tenant created", result });

       
    }

    async verifyAdminWithOtp(req: Request, res: Response) {
     //   const tenant = await this.tenantService(req.params.id)
        res.json({ message: "Tenant verified" });
    }
}