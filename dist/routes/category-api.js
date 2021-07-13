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
exports.CategoryApi = void 0;
const express_1 = require("express");
const inversify_1 = require("inversify");
const category_controller_1 = require("../controllers/category-controller");
let CategoryApi = class CategoryApi {
    constructor(categoryController) {
        this.categoryController = categoryController;
        this.setRoutes();
    }
    getRouter() {
        return this.router;
    }
    setRoutes() {
        this.router = express_1.Router();
        this.router.post("/category/add", this.categoryController.create);
        this.router.post("/category/categorys", this.categoryController.getAll);
        this.router.put("/category/update", this.categoryController.update);
        this.router.delete("/category/delete/:id", this.categoryController.delete);
    }
};
CategoryApi = __decorate([
    inversify_1.injectable(),
    __param(0, inversify_1.inject(category_controller_1.CategoryController)),
    __metadata("design:paramtypes", [category_controller_1.CategoryController])
], CategoryApi);
exports.CategoryApi = CategoryApi;
//# sourceMappingURL=category-api.js.map