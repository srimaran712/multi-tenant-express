import {DataSource} from "typeorm";
import { User } from "../models/user.model";
import { Tenant } from "../models/tenant.model";
import { Project } from "../models/project.model";
import dotenv from "dotenv";

dotenv.config();



export const AppDataSource = new DataSource({
    type: "postgres",
    host: process.env.DB_HOST || "localhost",
    port: parseInt(process.env.DB_PORT || "5432"),
    username: process.env.DB_USERNAME || "postgres",
    password: process.env.DB_PASSWORD?.toString() || "",
    database: process.env.DB_NAME || "multi_tenant",
    synchronize: true, // Enable for development - change to false in production
    logging: true, // Enable logging to see connection details
    entities: [User, Tenant, Project],
    migrations: [],
    subscribers: [],
    ssl: true, // This is the simple toggle
    extra: {
        ssl: {
            rejectUnauthorized: false, // Required for RDS unless you provide the CA certificate
        },
    },
});
