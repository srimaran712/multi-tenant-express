import { Router } from "express";
import { UserController } from "../controllers/user.controller";
import { authMiddleware } from "../middleware/authMiddleware.middleware";
import { adminMiddleware } from "../middleware/adminMiddleware.middleware";

const router = Router();
const userController = new UserController();

router.post("/v1/login", userController.login);

//create user for your tenant
//router.post("/v1/create-user", authMiddleware, adminMiddleware, userController.createUser);
//admin can create other users

router.post('/v1/user', authMiddleware, adminMiddleware, userController.addUser);

export default router;