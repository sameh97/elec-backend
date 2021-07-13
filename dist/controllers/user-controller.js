"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserController = void 0;
const inversify_1 = require("inversify");
const user_service_1 = require("../services/user-service");
const user_dto_mapper_1 = require("../common/dto-mappers/user-dto-mapper");
const logger_1 = require("../common/logger");
const app_utils_1 = require("../common/app-utils");
let UserController = class UserController {
    constructor(userService, dtoMapper, logger) {
        this.userService = userService;
        this.dtoMapper = dtoMapper;
        this.logger = logger;
        this.login = (req, res, next) => __awaiter(this, void 0, void 0, function* () {
            let userFromBody = null;
            try {
                userFromBody = req.body;
                const token = yield this.userService.login(userFromBody.email, userFromBody.password);
                res.setHeader("Authorization", token);
                res.send({});
            }
            catch (e) {
                const email = app_utils_1.AppUtils.hasValue(userFromBody) ? userFromBody.email : "";
                this.logger.error(`Cannot login user: ${email}`, e);
                next(e);
            }
        });
        this.createUser = (req, res, next) => __awaiter(this, void 0, void 0, function* () {
            let userToCreate = null;
            try {
                userToCreate = this.dtoMapper.asEntity(req.body);
                const createdUser = yield this.userService.create(userToCreate);
                res.status(201);
                next(this.dtoMapper.asDto(createdUser));
            }
            catch (err) {
                this.logger.error(`Cannot create user: ${JSON.stringify(userToCreate)}`, err);
                next(err);
            }
        });
    }
};
UserController = __decorate([
    inversify_1.injectable(),
    __param(0, inversify_1.inject(user_service_1.UserService)),
    __param(1, inversify_1.inject(user_dto_mapper_1.UserDtoMapper)),
    __param(2, inversify_1.inject(logger_1.Logger)),
    __metadata("design:paramtypes", [user_service_1.UserService,
        user_dto_mapper_1.UserDtoMapper,
        logger_1.Logger])
], UserController);
exports.UserController = UserController;
//# sourceMappingURL=user-controller.js.map