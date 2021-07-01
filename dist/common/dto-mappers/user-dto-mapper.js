"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserDtoMapper = void 0;
const app_utils_1 = require("../app-utils");
const inversify_1 = require("inversify");
let UserDtoMapper = class UserDtoMapper {
    asDto(user) {
        if (!app_utils_1.AppUtils.hasValue(user)) {
            return null;
        }
        return {
            email: user.email,
            name: user.name,
        };
    }
    asEntity(userDto) {
        if (!app_utils_1.AppUtils.hasValue(userDto)) {
            return null;
        }
        return {
            email: userDto.email,
            name: userDto.name,
            password: userDto.password,
        };
    }
};
UserDtoMapper = __decorate([
    inversify_1.injectable()
], UserDtoMapper);
exports.UserDtoMapper = UserDtoMapper;
//# sourceMappingURL=user-dto-mapper.js.map