import express, { Request, Response } from "express";
import Cors from "cors";
import dotenv from "dotenv";
import reflectMetadata from "reflect-metadata";
import {AppDataSource} from "./src/config/data-source.config";
import tenantRoutes from './src/routes/tenant.routes'
import userRoutes from './src/routes/user.routes'
import projectRoutes from './src/routes/project.routes'

dotenv.config();

const app = express();

//enable the json parser
app.use(express.json());
//enabling the cors middleware
app.use(Cors({
    origin: "*",
    credentials: true,
    methods: ["GET", "POST", "PUT", "DELETE"],
    allowedHeaders: ["Content-Type", "Authorization"]
}));

//health check
app.get("/health", (req: Request, res: Response) => {
    res.send("I'm healthy");
});

//tenant routes
app.use("/tenant", tenantRoutes);

//user routes
app.use("/user", userRoutes);

//project routes
app.use("/project", projectRoutes);

//initialize the database
AppDataSource.initialize()
    .then(() => {
        console.log("Database initialized");
    })
    .catch((error) => console.log(error));

export default app;

