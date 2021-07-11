"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.CartDtoMapper = void 0;
const app_utils_1 = require("../app-utils");
const inversify_1 = require("inversify");
let CartDtoMapper = class CartDtoMapper {
    asDto(cart) {
        if (!app_utils_1.AppUtils.hasValue(cart)) {
            return null;
        }
        return {
            _id: cart._id,
            items: cart.items,
            userID: cart.userID,
        };
    }
    asEntity(cartDto) {
        if (!app_utils_1.AppUtils.hasValue(cartDto)) {
            return null;
        }
        return {
            _id: cartDto._id,
            items: cartDto.items,
            userID: cartDto.userID,
        };
    }
};
CartDtoMapper = __decorate([
    inversify_1.injectable()
], CartDtoMapper);
exports.CartDtoMapper = CartDtoMapper;
//# sourceMappingURL=cart-dto-mapper.js.map