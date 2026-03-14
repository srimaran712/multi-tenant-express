"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.TenantController = void 0;
const tenant_service_1 = require("../services/tenant.service");
const user_service_1 = require("../services/user.service");
const data_source_config_1 = require("../config/data-source.config");
const user_model_1 = require("../models/user.model");
class TenantController {
    constructor() {
        //super level 
        this.createTenantWithAdmin = async (req, res) => {
            try {
                const { companyName, name, email, password } = req.body;
                const result = await data_source_config_1.AppDataSource.transaction(async (transactionalEntityManager) => {
                    const tenant = await this.tenantService.createTenant({ name: companyName }, transactionalEntityManager);
                    console.log(tenant);
                    const user = await this.userService.createUser({ name, email, password, role: user_model_1.UserRole.ADMIN }, transactionalEntityManager, tenant);
                });
                res.status(200).json({ message: "Tenant created", result });
            }
            catch (error) {
                res.status(500).json({ message: "Internal server error", err: error.message });
            }
        };
        this.verifyAdminWithOtp = async (req, res) => {
            try {
                const { tenantId, otp } = req.body;
                if (!tenantId || !otp) {
                    return res.status(400).json({ message: "Tenant ID and OTP are required" });
                }
                const result = await data_source_config_1.AppDataSource.transaction(async (transactionalEntityManager) => {
                    // Verify OTP logic here
                    const otpVerification = await this.userService.verifyOtp(tenantId, otp, transactionalEntityManager);
                });
                res.status(200).json({ message: "OTP verified successfully" });
            }
            catch (err) {
                res.status(500).json({ message: "Internal server error", err: err.message });
            }
            //   const tenant = await this.tenantService(req.params.id)
            //   res.json({ message: "Tenant verified" });
        };
        this.tenantService = new tenant_service_1.TenantService();
        this.userService = new user_service_1.UserService();
    }
}
exports.TenantController = TenantController;
//# sourceMappingURL=tenant.controller.js.map