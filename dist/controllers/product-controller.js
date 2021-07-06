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
exports.ProductsController = void 0;
const inversify_1 = require("inversify");
const product_dto_mapper_1 = require("../common/dto-mappers/product-dto-mapper");
const logger_1 = require("../common/logger");
const product_service_1 = require("../services/product-service");
let ProductsController = class ProductsController {
    constructor(productsService, productDtoMapper, logger) {
        this.productsService = productsService;
        this.productDtoMapper = productDtoMapper;
        this.logger = logger;
        this.getAll = (req, res, next) => __awaiter(this, void 0, void 0, function* () {
            try {
                const products = yield this.productsService.getAll();
                const productDto = products.map((product) => this.productDtoMapper.asDto(product));
                next(productDto);
            }
            catch (err) {
                this.logger.error(`cannot get all products`, err);
                next(err);
            }
        });
        this.createProduct = (req, res, next) => __awaiter(this, void 0, void 0, function* () {
            let productToCreate = null;
            try {
                productToCreate = this.productDtoMapper.asEntity(req.body);
                const createdProduct = yield this.productsService.create(productToCreate);
                res.status(201);
                next(this.productDtoMapper.asDto(createdProduct));
            }
            catch (err) {
                this.logger.error(`Cannot create product ${JSON.stringify(req.body)}`, err);
                next(err);
            }
        });
        this.update = (req, res, next) => __awaiter(this, void 0, void 0, function* () {
            let productToUpdate = null;
            try {
                productToUpdate = this.productDtoMapper.asEntity(req.body);
                const updatedProduct = yield this.productsService.update(productToUpdate);
                res.status(201);
                next(this.productDtoMapper.asDto(updatedProduct));
            }
            catch (err) {
                this.logger.error(`Cannot update product ${JSON.stringify(req.body)}`, err);
                next(err);
            }
        });
        this.delete = (req, res, next) => __awaiter(this, void 0, void 0, function* () {
            let productId = null;
            try {
                productId = req.params.id;
                yield this.productsService.delete(productId);
                next(`product with id ${productId} has been deleted successfully`);
            }
            catch (err) {
                this.logger.error(`Cannot delete product: ${productId}`, err);
                next(err);
            }
        });
    }
};
ProductsController = __decorate([
    inversify_1.injectable(),
    __param(0, inversify_1.inject(product_service_1.ProductsService)),
    __param(1, inversify_1.inject(product_dto_mapper_1.ProductDtoMapper)),
    __param(2, inversify_1.inject(logger_1.Logger)),
    __metadata("design:paramtypes", [product_service_1.ProductsService,
        product_dto_mapper_1.ProductDtoMapper,
        logger_1.Logger])
], ProductsController);
exports.ProductsController = ProductsController;
//# sourceMappingURL=product-controller.js.map