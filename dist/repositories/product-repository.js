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
exports.ProductsRepository = void 0;
const already_exist_error_1 = require("./../exeptions/already-exist-error");
const inversify_1 = require("inversify");
const app_utils_1 = require("../common/app-utils");
const not_found_error_1 = require("../exeptions/not-found-error");
const logger_1 = require("../common/logger");
const ProductModel = require("./../models/product");
let ProductsRepository = class ProductsRepository {
    constructor(logger) {
        this.logger = logger;
        this.update = (product) => __awaiter(this, void 0, void 0, function* () {
            let productInDB = null;
            yield ProductModel.findOne({ _id: product.id }, (err, product) => {
                productInDB = product;
            });
            if (!app_utils_1.AppUtils.hasValue(productInDB)) {
                throw new not_found_error_1.NotFoundErr(`Cannot update Product with name ${product.name} because its not found`);
            }
            this.logger.info(`Updating product with name ${productInDB.name}`);
            let updatedProduct = null;
            ProductModel.findByIdAndUpdate(product.id, product, (err, updatedProductInDB) => {
                if (err) {
                    this.logger.error(err);
                }
                else {
                    updatedProduct = updatedProductInDB;
                }
            });
            this.logger.info(`updated product ${JSON.stringify(updatedProduct)}`);
            return updatedProduct;
        });
        this.delete = (id) => __awaiter(this, void 0, void 0, function* () {
            let toDelete = null;
            yield ProductModel.findOne({ _id: id }, (err, product) => {
                toDelete = product;
            });
            if (!app_utils_1.AppUtils.hasValue(toDelete)) {
                throw new not_found_error_1.NotFoundErr(`Cannot delete Product with id ${id} because its not found`);
            }
            ProductModel.findByIdAndRemove(id, (err, removedProduct) => {
                if (err) {
                    this.logger.error(err);
                }
                else {
                    console.log("Removed User : ", removedProduct);
                }
            });
        });
    }
    save(product) {
        return __awaiter(this, void 0, void 0, function* () {
            let productInDB = null;
            yield ProductModel.findOne({ name: product.name }, (err, product) => {
                productInDB = product;
            });
            if (app_utils_1.AppUtils.hasValue(productInDB)) {
                throw new already_exist_error_1.AlreadyExistError(`Product with name '${product.name}' already exist`);
            }
            const createdProduct = new ProductModel({
                id: null,
                name: product.name,
                description: product.description,
                quantity: product.quantity,
                categoryID: product.categoryID,
                serialNumber: product.serialNumber,
            });
            yield createdProduct.save();
            createdProduct.id = createdProduct._id;
            return createdProduct;
        });
    }
    getAll() {
        return __awaiter(this, void 0, void 0, function* () {
            let allProducts = [];
            yield ProductModel.findAll((err, productsFromDB) => {
                allProducts = productsFromDB;
            });
            return allProducts;
        });
    }
};
ProductsRepository = __decorate([
    inversify_1.injectable(),
    __param(0, inversify_1.inject(logger_1.Logger)),
    __metadata("design:paramtypes", [logger_1.Logger])
], ProductsRepository);
exports.ProductsRepository = ProductsRepository;
//# sourceMappingURL=product-repository.js.map