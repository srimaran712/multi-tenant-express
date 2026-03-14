"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AppDataSource = void 0;
const typeorm_1 = require("typeorm");
const user_model_1 = require("../models/user.model");
const tenant_model_1 = require("../models/tenant.model");
const project_model_1 = require("../models/project.model");
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
exports.AppDataSource = new typeorm_1.DataSource({
    type: "postgres",
    host: process.env.DB_HOST || "localhost",
    port: parseInt(process.env.DB_PORT || "5432"),
    username: process.env.DB_USERNAME || "postgres",
    password: process.env.DB_PASSWORD?.toString() || "",
    database: process.env.DB_NAME || "multi_tenant",
    synchronize: true, // Enable for development - change to false in production
    logging: true, // Enable logging to see connection details
    entities: [user_model_1.User, tenant_model_1.Tenant, project_model_1.Project],
    migrations: [],
    subscribers: [],
    ssl: true, // This is the simple toggle
    extra: {
        ssl: {
            rejectUnauthorized: false, // Required for RDS unless you provide the CA certificate
        },
    },
});
//# sourceMappingURL=data-source.config.js.map