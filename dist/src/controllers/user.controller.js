"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserController = void 0;
const user_model_1 = require("../models/user.model");
const user_service_1 = require("../services/user.service");
const data_source_config_1 = require("../config/data-source.config");
class UserController {
    constructor() {
        this.login = async (req, res) => {
            try {
                const { email, password } = req.body;
                if (!email || !password) {
                    return res.status(400).json({ message: "Email and password are required" });
                }
                const userDetails = await data_source_config_1.AppDataSource.transaction(async (transactionalEntityManager) => {
                    const user = await this.userSerivce.login(email, password, transactionalEntityManager);
                    return user;
                });
                //need to pass token in the response
                res.status(200).json({ message: "User logged in successfully", user: userDetails });
            }
            catch (err) {
                res.status(500).json({ message: "Internal server error", err: err.message });
            }
        };
        this.addUser = async (req, res) => {
            try {
                const { name, email } = req.body;
                const tenantId = req.user?.tenantId;
                if (!email || !name) {
                    return res.status(400).json({ message: "Email and password are required" });
                }
                const userDetails = await data_source_config_1.AppDataSource.transaction(async (transactionalEntityManager) => {
                    const user = await this.userSerivce.addNewUser({ name, email, role: user_model_1.UserRole.USER, tenantId }, transactionalEntityManager);
                    return user;
                });
                //send invite to user
                //need to pass token in the response
                res.status(200).json({ message: "User added successfully", user: userDetails });
            }
            catch (err) {
                res.status(500).json({ message: "Internal server error", err: err.message });
            }
        };
        this.userSerivce = new user_service_1.UserService();
    }
}
exports.UserController = UserController;
//# sourceMappingURL=user.controller.js.map