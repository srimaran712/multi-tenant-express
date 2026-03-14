import { EntityManager } from "typeorm";
import { TenantInterface } from "../interfaces/tenant.interface";
export declare class TenantService {
    constructor();
    createTenant(tenantData: TenantInterface, manager: EntityManager): Promise<any>;
}
//# sourceMappingURL=tenant.service.d.ts.map