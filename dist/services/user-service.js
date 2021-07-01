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
exports.UserService = void 0;
const inversify_1 = require("inversify");
const authentication_error_1 = require("../exeptions/authentication-error");
const user_repository_1 = require("../repositories/user-repository");
const password_manager_service_1 = require("./password-manager-service");
const database_1 = require("../config/database");
const app_utils_1 = require("../common/app-utils");
let UserService = class UserService {
    constructor(usersRepository, passwordManager, appDBconnection) {
        this.usersRepository = usersRepository;
        this.passwordManager = passwordManager;
        this.appDBconnection = appDBconnection;
    }
    login(email, password) {
        return __awaiter(this, void 0, void 0, function* () {
            const userInDB = yield this.usersRepository.getByEmail(email);
            const isPasswordOk = yield this.passwordManager.isEqual(password, userInDB.password);
            if (!isPasswordOk) {
                throw new authentication_error_1.AuthenticationError(`User with ${email} not authenticated`);
            }
            return userInDB;
        });
    }
    create(user) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const hashedPassword = yield this.passwordManager.hashAndSalt(user.password);
                user.password = hashedPassword;
                const createdUser = yield this.usersRepository.save(user);
                return createdUser;
            }
            catch (err) {
                console.log(`Error while creating user , error: ${app_utils_1.AppUtils.getFullException(err)}`);
                throw err;
            }
        });
    }
};
UserService.TOKEN_SECRET = "asfwsgvwregwegfrgfwg";
UserService.TOKEN_EXPIRATION_HOURS = 240;
UserService = __decorate([
    inversify_1.injectable(),
    __param(0, inversify_1.inject(user_repository_1.UsersRepository)),
    __param(1, inversify_1.inject(password_manager_service_1.PasswordManagerService)),
    __param(2, inversify_1.inject(database_1.AppDBConnection)),
    __metadata("design:paramtypes", [user_repository_1.UsersRepository,
        password_manager_service_1.PasswordManagerService,
        database_1.AppDBConnection])
], UserService);
exports.UserService = UserService;
//# sourceMappingURL=user-service.js.map