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
exports.CartService = void 0;
const inversify_1 = require("inversify");
const app_utils_1 = require("../common/app-utils");
const logger_1 = require("../common/logger");
const database_1 = require("../config/database");
const cart_repository_1 = require("../repositories/cart-repository");
let CartService = class CartService {
    constructor(logger, cartRepository, appDBConnection) {
        this.logger = logger;
        this.cartRepository = cartRepository;
        this.appDBConnection = appDBConnection;
        this.add = (cartItem, userID) => __awaiter(this, void 0, void 0, function* () {
            try {
                const createdCart = yield this.cartRepository.add(cartItem, userID);
                this.logger.info(`added to cart with id ${createdCart._id}`);
                return createdCart;
            }
            catch (err) {
                this.logger.error(`cannot add to cart ${app_utils_1.AppUtils.getFullException(err)}`);
            }
        });
        this.getCartById = (user_id) => __awaiter(this, void 0, void 0, function* () {
            const cart = yield this.cartRepository.getCartByUserId(user_id);
            return cart;
        });
        this.delete = (id) => __awaiter(this, void 0, void 0, function* () {
            try {
                this.logger.info(`Deleting cart with id: ${id}`);
                yield this.cartRepository.delete(id);
                this.logger.info(`Cart with id ${id} has been deleted.`);
            }
            catch (err) {
                throw err;
            }
        });
    }
};
CartService = __decorate([
    inversify_1.injectable(),
    __param(0, inversify_1.inject(logger_1.Logger)),
    __param(1, inversify_1.inject(cart_repository_1.CartRepository)),
    __param(2, inversify_1.inject(database_1.AppDBConnection)),
    __metadata("design:paramtypes", [logger_1.Logger,
        cart_repository_1.CartRepository,
        database_1.AppDBConnection])
], CartService);
exports.CartService = CartService;
//# sourceMappingURL=cart-service.js.map