"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserRepository = void 0;
const data_source_config_1 = require("./data-source.config");
const user_model_1 = require("../models/user.model");
exports.UserRepository = data_source_config_1.AppDataSource.getRepository(user_model_1.User);
//# sourceMappingURL=user-repository.config.js.map