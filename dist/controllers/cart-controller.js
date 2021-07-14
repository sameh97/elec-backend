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
exports.CartController = void 0;
const inversify_1 = require("inversify");
const logger_1 = require("../common/logger");
const cart_service_1 = require("../services/cart-service");
const cart_dto_mapper_1 = require("../common/dto-mappers/cart-dto-mapper");
let CartController = class CartController {
    constructor(cartService, cartDtoMapper, logger) {
        this.cartService = cartService;
        this.cartDtoMapper = cartDtoMapper;
        this.logger = logger;
        this.getCartByUserId = (req, res, next) => __awaiter(this, void 0, void 0, function* () {
            try {
                const cart = yield this.cartService.getCartById(req.query.user_id);
                const cartDto = yield this.cartDtoMapper.asDto(cart);
                next(cartDto);
            }
            catch (err) {
                this.logger.error(`cannot get cart`, err);
                next(err);
            }
        });
        this.addToCart = (req, res, next) => __awaiter(this, void 0, void 0, function* () {
            const item = req.body;
            const userId = req.query.user_id;
            let itemToAdd = null;
            try {
                itemToAdd = item;
                const createdCart = yield this.cartService.add(itemToAdd, userId);
                res.status(201);
                next(createdCart);
            }
            catch (err) {
                this.logger.error(`Cannot add to cart ${JSON.stringify(item)}`, err);
                next(err);
            }
        });
        this.delete = (req, res, next) => __awaiter(this, void 0, void 0, function* () {
            let cartId = null;
            try {
                cartId = req.query.user_id;
                yield this.cartService.delete(cartId);
                next(`Cart with id ${cartId} has been deleted successfully`);
            }
            catch (err) {
                this.logger.error(`Cannot delete product: ${cartId}`, err);
                next(err);
            }
        });
    }
};
CartController = __decorate([
    inversify_1.injectable(),
    __param(0, inversify_1.inject(cart_service_1.CartService)),
    __param(1, inversify_1.inject(cart_dto_mapper_1.CartDtoMapper)),
    __param(2, inversify_1.inject(logger_1.Logger)),
    __metadata("design:paramtypes", [cart_service_1.CartService,
        cart_dto_mapper_1.CartDtoMapper,
        logger_1.Logger])
], CartController);
exports.CartController = CartController;
//# sourceMappingURL=cart-controller.js.map