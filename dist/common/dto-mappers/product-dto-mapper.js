"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ProductDtoMapper = void 0;
const app_utils_1 = require("../app-utils");
const inversify_1 = require("inversify");
let ProductDtoMapper = class ProductDtoMapper {
    asDto(product) {
        if (!app_utils_1.AppUtils.hasValue(product)) {
            return null;
        }
        return {
            _id: product._id,
            name: product.name,
            description: product.description,
            quantity: product.quantity,
            categoryID: product.categoryID,
            status: product.status,
            serialNumber: product.serialNumber,
            imgUrl: product.imgUrl,
            price: product.price,
        };
    }
    asEntity(productDto) {
        if (!app_utils_1.AppUtils.hasValue(productDto)) {
            return null;
        }
        return {
            _id: productDto._id,
            name: productDto.name,
            description: productDto.description,
            quantity: productDto.quantity,
            categoryID: productDto.categoryID,
            status: productDto.status,
            serialNumber: productDto.serialNumber,
            imgUrl: productDto.imgUrl,
            price: productDto.price,
        };
    }
};
ProductDtoMapper = __decorate([
    inversify_1.injectable()
], ProductDtoMapper);
exports.ProductDtoMapper = ProductDtoMapper;
//# sourceMappingURL=product-dto-mapper.js.map