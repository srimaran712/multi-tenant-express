

import { AppDataSource } from "./data-source.config";
import { User } from "../models/user.model";

export const UserRepository = AppDataSource.getRepository(User);
