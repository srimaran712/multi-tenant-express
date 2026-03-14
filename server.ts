import "reflect-metadata";
import app from "./app";
import dotenv from "dotenv";
import config from "./src/config/config";

dotenv.config();

const PORT = config.port;

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});