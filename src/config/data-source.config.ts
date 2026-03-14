import {DataSource} from "typeorm";
import { User } from "../models/user.model";
import { Tenant } from "../models/tenant.model";
import { Project } from "../models/project.model";
import dotenv from "dotenv";

dotenv.config();


export const AppDataSource = new DataSource({
    type: "postgres",
    host: process.env.DB_HOST as string,
    port: parseInt(process.env.DB_PORT as string),
    username: process.env.DB_USERNAME as string,
    password: process.env.DB_PASSWORD as string,
    database: process.env.DB_NAME as string,
    synchronize: false,
    logging: false,
    entities: [User, Tenant, Project],
    migrations: [],
    subscribers: [],
    ssl: {
    rejectUnauthorized: false
  }
});
