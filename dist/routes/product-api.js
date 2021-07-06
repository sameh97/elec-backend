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
Object.defineProperty(exports, "__esModule", { value: true });
exports.ProductsApi = void 0;
const express_1 = require("express");
const inversify_1 = require("inversify");
const product_controller_1 = require("../controllers/product-controller");
let ProductsApi = class ProductsApi {
    constructor(productsController) {
        this.productsController = productsController;
        this.setRoutes();
    }
    getRouter() {
        return this.router;
    }
    setRoutes() {
        this.router = express_1.Router();
        this.router.get("/products", this.productsController.getAll);
        this.router.post("/add-product", this.productsController.createProduct);
        this.router.put("/update", this.productsController.update);
        this.router.delete("/delete/:id", this.productsController.delete);
    }
};
ProductsApi = __decorate([
    inversify_1.injectable(),
    __param(0, inversify_1.inject(product_controller_1.ProductsController)),
    __metadata("design:paramtypes", [product_controller_1.ProductsController])
], ProductsApi);
exports.ProductsApi = ProductsApi;
//# sourceMappingURL=product-api.js.map