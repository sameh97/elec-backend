"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const inversify_1 = require("inversify");
const user_dto_mapper_1 = require("./common/dto-mappers/user-dto-mapper");
const database_1 = require("./config/database");
const user_controller_1 = require("./controller/user-controller");
const user_repository_1 = require("./repositories/user-repository");
const password_manager_service_1 = require("./services/password-manager-service");
const user_service_1 = require("./services/user-service");
const container = new inversify_1.Container({ defaultScope: "Singleton" });
container.bind(database_1.AppDBConnection).toSelf();
container.bind(user_dto_mapper_1.UserDtoMapper).toSelf();
container.bind(user_repository_1.UsersRepository).toSelf();
container.bind(user_service_1.UserService).toSelf();
container.bind(user_controller_1.UserController).toSelf();
container.bind(password_manager_service_1.PasswordManagerService).toSelf();
exports.default = container;
//# sourceMappingURL=inversify.config.js.map