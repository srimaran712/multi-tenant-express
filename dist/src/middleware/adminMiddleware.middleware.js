"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.adminMiddleware = void 0;
const user_repository_config_1 = require("../config/user-repository.config");
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const dotenv_1 = __importDefault(require("dotenv"));
const user_model_1 = require("../models/user.model");
dotenv_1.default.config();
const adminMiddleware = async (req, res, next) => {
    // Get token from authorization header
    const token = req.headers.authorization?.split(" ")[1];
    if (!token) {
        return res.status(401).json({ message: "Unauthorized" });
    }
    try {
        // Verify and decode the token
        const decoded = jsonwebtoken_1.default.verify(token, process.env.JWT_SECRET, (err, decoded) => {
            if (err) {
                return res.status(401).json({ message: "Invalid token" });
            }
            return decoded;
        });
        // Attach user data to request
        req.user = decoded;
        //check only the admin user
        if (req.user?.role !== user_model_1.UserRole.ADMIN) {
            return res.status(403).json({ message: "Forbidden: Admin access required" });
        }
        //check the tenant id 
        const tenantId = req.user?.tenantId;
        const checkTenant = await user_repository_config_1.UserRepository.findOne({ where: { tenantId } });
        if (!checkTenant) {
            return res.status(403).json({ message: "Forbidden: You are not authorized to access this tenant" });
        }
        next();
    }
    catch (error) {
        return res.status(401).json({ message: "Invalid token" });
    }
};
exports.adminMiddleware = adminMiddleware;
//# sourceMappingURL=adminMiddleware.middleware.js.map