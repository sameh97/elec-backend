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
exports.CategoryController = void 0;
const inversify_1 = require("inversify");
const product_dto_mapper_1 = require("../common/dto-mappers/product-dto-mapper");
const logger_1 = require("../common/logger");
const category_service_1 = require("../services/category-service");
let CategoryController = class CategoryController {
    constructor(categoryService, productDtoMapper, logger) {
        this.categoryService = categoryService;
        this.productDtoMapper = productDtoMapper;
        this.logger = logger;
        this.getAll = (req, res, next) => __awaiter(this, void 0, void 0, function* () {
            try {
                const categorys = yield this.categoryService.getAll();
                next(categorys);
            }
            catch (err) {
                this.logger.error(`cannot get all categorys`, err);
                next(err);
            }
        });
        this.create = (req, res, next) => __awaiter(this, void 0, void 0, function* () {
            let categoryToCreate = null;
            try {
                categoryToCreate = req.body;
                const createdCategory = yield this.categoryService.create(categoryToCreate);
                res.status(201);
                next(createdCategory);
            }
            catch (err) {
                this.logger.error(`Cannot create category ${JSON.stringify(req.body)}`, err);
                next(err);
            }
        });
        this.update = (req, res, next) => __awaiter(this, void 0, void 0, function* () {
            let categoryToUpdate = null;
            try {
                categoryToUpdate = req.body;
                const updatedCategory = yield this.categoryService.update(categoryToUpdate);
                res.status(201);
                next(updatedCategory);
            }
            catch (err) {
                this.logger.error(`Cannot update category ${JSON.stringify(req.body)}`, err);
                next(err);
            }
        });
        this.delete = (req, res, next) => __awaiter(this, void 0, void 0, function* () {
            let categoryId = null;
            try {
                categoryId = req.params.id;
                yield this.categoryService.delete(categoryId);
                next(`category with id ${categoryId} has been deleted successfully`);
            }
            catch (err) {
                this.logger.error(`Cannot delete category: ${categoryId}`, err);
                next(err);
            }
        });
    }
};
CategoryController = __decorate([
    inversify_1.injectable(),
    __param(0, inversify_1.inject(category_service_1.CategoryService)),
    __param(1, inversify_1.inject(product_dto_mapper_1.ProductDtoMapper)),
    __param(2, inversify_1.inject(logger_1.Logger)),
    __metadata("design:paramtypes", [category_service_1.CategoryService,
        product_dto_mapper_1.ProductDtoMapper,
        logger_1.Logger])
], CategoryController);
exports.CategoryController = CategoryController;
//# sourceMappingURL=category-controller.js.map