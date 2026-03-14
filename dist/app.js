"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const dotenv_1 = __importDefault(require("dotenv"));
const data_source_config_1 = require("./src/config/data-source.config");
const tenant_routes_1 = __importDefault(require("./src/routes/tenant.routes"));
const user_routes_1 = __importDefault(require("./src/routes/user.routes"));
const project_routes_1 = __importDefault(require("./src/routes/project.routes"));
dotenv_1.default.config();
const app = (0, express_1.default)();
//enable the json parser
app.use(express_1.default.json());
//enabling the cors middleware
app.use((0, cors_1.default)({
    origin: "*",
    credentials: true,
    methods: ["GET", "POST", "PUT", "DELETE"],
    allowedHeaders: ["Content-Type", "Authorization"]
}));
//health check
app.get("/health", (req, res) => {
    res.send("I'm healthy");
});
//tenant routes
app.use("/tenant", tenant_routes_1.default);
//user routes
app.use("/user", user_routes_1.default);
//project routes
app.use("/project", project_routes_1.default);
//initialize the database
data_source_config_1.AppDataSource.initialize()
    .then(() => {
    console.log("✅ Database connected successfully!");
    console.log(`📊 Database: ${data_source_config_1.AppDataSource.options.database}`);
    console.log(`🌐 Host: ${process.env.DB_HOST}:${process.env.DB_PORT}`);
})
    .catch((error) => {
    console.error("❌ Database connection failed:", error);
    console.error("🔧 Check your environment variables in .env file");
});
exports.default = app;
//# sourceMappingURL=app.js.map