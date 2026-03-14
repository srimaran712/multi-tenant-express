"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const user_controller_1 = require("../controllers/user.controller");
const authMiddleware_middleware_1 = require("../middleware/authMiddleware.middleware");
const adminMiddleware_middleware_1 = require("../middleware/adminMiddleware.middleware");
const router = (0, express_1.Router)();
const userController = new user_controller_1.UserController();
router.post("/v1/login", userController.login);
//create user for your tenant
//router.post("/v1/create-user", authMiddleware, adminMiddleware, userController.createUser);
//admin can create other users
router.post('/v1/user', authMiddleware_middleware_1.authMiddleware, adminMiddleware_middleware_1.adminMiddleware, userController.addUser);
exports.default = router;
//# sourceMappingURL=user.routes.js.map