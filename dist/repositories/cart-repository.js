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
exports.CartRepository = void 0;
const inversify_1 = require("inversify");
const app_utils_1 = require("../common/app-utils");
const logger_1 = require("../common/logger");
const CartModel = require("./../models/cart");
let CartRepository = class CartRepository {
    constructor(logger) {
        this.logger = logger;
    }
    add(cartItem, userID) {
        return __awaiter(this, void 0, void 0, function* () {
            let cartInDB = null;
            yield CartModel.findOne({ userID: userID }, (err, cart) => {
                cartInDB = cart;
            });
            if (app_utils_1.AppUtils.hasValue(cartInDB)) {
                const index = cartInDB.items.findIndex((item) => item.productID === cartItem.productID);
                if (index !== -1) {
                    cartInDB.items[index].quantity =
                        cartInDB.items[index].quantity + cartItem.quantity;
                    cartInDB.items[index].productID = cartItem.productID;
                    const cartAfterAdding = yield cartInDB.save();
                    return cartAfterAdding;
                }
                else {
                    yield CartModel.update({ _id: cartInDB._id }, { $push: { items: cartItem } });
                }
                return cartInDB;
            }
            else {
                const itemsArray = [];
                itemsArray.push(cartItem);
                const createdCart = new CartModel({
                    userID: userID,
                    items: itemsArray,
                });
                yield createdCart.save();
                return createdCart;
            }
        });
    }
};
CartRepository = __decorate([
    inversify_1.injectable(),
    __param(0, inversify_1.inject(logger_1.Logger)),
    __metadata("design:paramtypes", [logger_1.Logger])
], CartRepository);
exports.CartRepository = CartRepository;
//# sourceMappingURL=cart-repository.js.map