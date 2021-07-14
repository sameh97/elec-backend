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
exports.CartDtoMapper = void 0;
const app_utils_1 = require("../app-utils");
const inversify_1 = require("inversify");
const product_service_1 = require("../../services/product-service");
let CartDtoMapper = class CartDtoMapper {
    constructor(productsService) {
        this.productsService = productsService;
    }
    asDto(cart) {
        return __awaiter(this, void 0, void 0, function* () {
            if (!app_utils_1.AppUtils.hasValue(cart)) {
                return null;
            }
            console.log(cart);
            let cartItems = [];
            const allProducts = yield this.productsService.getAll();
            for (let item of cart.items) {
                for (let product of allProducts) {
                    if (item.productID == product._id) {
                        const cartItemToSave = {
                            _id: item._id,
                            product: product,
                            quantity: item.quantity,
                        };
                        cartItems.push(cartItemToSave);
                    }
                }
            }
            return {
                _id: cart._id,
                items: cartItems,
                userID: cart.userID,
            };
        });
    }
};
CartDtoMapper = __decorate([
    inversify_1.injectable(),
    __param(0, inversify_1.inject(product_service_1.ProductsService)),
    __metadata("design:paramtypes", [product_service_1.ProductsService])
], CartDtoMapper);
exports.CartDtoMapper = CartDtoMapper;
//# sourceMappingURL=cart-dto-mapper.js.map