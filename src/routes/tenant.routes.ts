import { Router } from "express";

import { authMiddleware,} from "../middleware/authMiddleware.middleware";

import { TenantController } from "../controllers/tenant.controller";

import { adminMiddleware } from "../middleware/adminMiddleware.middleware";





const router = Router();



//router.use(authMiddleware);





const tenantController = new TenantController();

// TODO: Add tenant routes here 

// register tenant with create super admin user

router.post("/v1/register", tenantController.createTenantWithAdmin);



router.post('/v1/verify-otp', tenantController.verifyAdminWithOtp);



//admin can create other users

router.post('/v1/user', authMiddleware, adminMiddleware);

export default router;

