import {DataSource} from "typeorm";
import { User } from "../models/user.model";
import { Tenant } from "../models/tenant.model";
import { Project } from "../models/project.model";

export const AppDataSource = new DataSource({
    type: "postgres",
    host: "localhost",
    port: 5433,
    username: "postgres",
    password: "Remember001",
    database: "multi-tenant",
    synchronize: true,
    logging: false,
    entities: [User, Tenant, Project],
    migrations: [],
    subscribers: [],
});
