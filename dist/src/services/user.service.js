"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || (function () {
    var ownKeys = function(o) {
        ownKeys = Object.getOwnPropertyNames || function (o) {
            var ar = [];
            for (var k in o) if (Object.prototype.hasOwnProperty.call(o, k)) ar[ar.length] = k;
            return ar;
        };
        return ownKeys(o);
    };
    return function (mod) {
        if (mod && mod.__esModule) return mod;
        var result = {};
        if (mod != null) for (var k = ownKeys(mod), i = 0; i < k.length; i++) if (k[i] !== "default") __createBinding(result, mod, k[i]);
        __setModuleDefault(result, mod);
        return result;
    };
})();
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserService = void 0;
const user_model_1 = require("../models/user.model");
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
const bcrypt = __importStar(require("bcryptjs"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
class UserService {
    constructor() {
    }
    async createUser(user, manager, tenantId) {
        const checkUser = await manager.createQueryBuilder(user_model_1.User, "user").select("user.email", "user.tenantId").where("user.email = :email AND user.tenantId = :tenantId", { email: user.email, tenantId: tenantId }).getOne();
        if (checkUser) {
            throw new Error("User already exists");
        }
        //generate random 6 digit number
        const randomNumber = Math.floor(Math.random() * 1000000);
        const otpExpires = new Date(Date.now() + 5 * 60 * 1000); // 3 minutes
        //create a user for that tenant by admin
        const newUser = await manager
            .createQueryBuilder()
            .insert()
            .into(user_model_1.User)
            .values({
            ...user,
            password: await bcrypt.hash(user.password, 10),
            tenantId: tenantId,
            tenant: { id: tenantId },
            otp: randomNumber,
            otpExpires: otpExpires
        })
            .execute();
        return newUser;
    }
    async verifyOtp(tenantId, otp, manager) {
        const user = await manager.createQueryBuilder(user_model_1.User, "user").select().where("user.otp = :otp  user.tenantId = :tenantId", { otp: otp, tenantId: tenantId }).getOne();
        if (!user) {
            throw new Error("Invalid OTP");
        }
        if (user.otpExpires < new Date()) {
            throw new Error("OTP expired");
        }
        //update is_verified to true and set otp to null
        await manager.createQueryBuilder(user_model_1.User, "user")
            .update()
            .set({
            isVerified: true,
            otp: () => "NULL",
            otpExpires: () => "NULL"
        })
            .where("user.id = :id", { id: user.id })
            .execute();
        return user;
    }
    async login(email, password, manager) {
        const user = await manager.createQueryBuilder(user_model_1.User, "user").select().where("user.email = :email", { email: email }).getOne();
        if (!user) {
            throw new Error("Invalid email or password");
        }
        const isPasswordValid = await bcrypt.compare(password, user.password);
        if (!isPasswordValid) {
            throw new Error("Invalid email or password");
        }
        //verify if user is verified
        if (!user.isVerified) {
            throw new Error("User is not verified");
        }
        //generate jwt token
        const token = jsonwebtoken_1.default.sign({ id: user.id, role: user.role, tenantId: user.tenantId, email: user.email }, process.env.JWT_SECRET, { expiresIn: "1h" });
        return { token };
    }
    async addNewUser(userData, manager) {
        const user = await manager.createQueryBuilder(user_model_1.User, "user").select().where("user.email = :email AND user.tenantId = :tenantId", { email: userData.email, tenantId: userData.tenantId }).getOne();
        //to avoid duplication of users with same email in same tenant
        if (user) {
            throw new Error("User already exists");
        }
        const newUser = await manager.createQueryBuilder(user_model_1.User, "user")
            .insert()
            .into(user_model_1.User)
            .values({
            ...userData,
            tenant: { id: userData.tenantId },
        })
            .execute();
        return newUser;
    }
}
exports.UserService = UserService;
//# sourceMappingURL=user.service.js.map