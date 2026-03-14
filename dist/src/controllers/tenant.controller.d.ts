import { Request, Response } from "express";
export declare class TenantController {
    private tenantService;
    private userService;
    constructor();
    createTenantWithAdmin: (req: Request, res: Response) => Promise<void>;
    verifyAdminWithOtp: (req: Request, res: Response) => Promise<Response<any, Record<string, any>> | undefined>;
}
//# sourceMappingURL=tenant.controller.d.ts.map