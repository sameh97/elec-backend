"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
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
exports.PasswordManagerService = void 0;
const input_error_1 = require("./../exeptions/input-error");
const app_utils_1 = require("./../common/app-utils");
const inversify_1 = require("inversify");
const bcrypt = require("bcrypt");
let PasswordManagerService = class PasswordManagerService {
    constructor() {
        this.SALT_ROUNDS = 10;
    }
    hashAndSalt(password) {
        return __awaiter(this, void 0, void 0, function* () {
            if (!app_utils_1.AppUtils.hasValue(password)) {
                throw new input_error_1.InputError("Cannot hash password because it is not defined");
            }
            const salt = yield bcrypt.genSalt(this.SALT_ROUNDS);
            return yield bcrypt.hash(password, salt);
        });
    }
    isEqual(password, hash) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield bcrypt.compare(password, hash);
        });
    }
};
PasswordManagerService = __decorate([
    inversify_1.injectable()
], PasswordManagerService);
exports.PasswordManagerService = PasswordManagerService;
//# sourceMappingURL=password-manager-service.js.map