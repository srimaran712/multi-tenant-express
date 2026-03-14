"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const tenant_controller_1 = require("../controllers/tenant.controller");
const router = (0, express_1.Router)();
//router.use(authMiddleware);
const tenantController = new tenant_controller_1.TenantController();
// TODO: Add tenant routes here 
// register tenant with create super admin user
router.post("/v1/register", tenantController.createTenantWithAdmin);
router.post('/v1/verify-otp', tenantController.verifyAdminWithOtp);
exports.default = router;
//# sourceMappingURL=tenant.routes.js.map