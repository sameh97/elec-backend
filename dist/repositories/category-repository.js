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
exports.CategoryRepository = void 0;
const already_exist_error_1 = require("./../exeptions/already-exist-error");
const inversify_1 = require("inversify");
const app_utils_1 = require("../common/app-utils");
const not_found_error_1 = require("../exeptions/not-found-error");
const logger_1 = require("../common/logger");
const CategoryModel = require("./../models/category");
let CategoryRepository = class CategoryRepository {
    constructor(logger) {
        this.logger = logger;
        this.update = (category) => __awaiter(this, void 0, void 0, function* () {
            let categoryInDB = null;
            yield CategoryModel.findOne({ categoryID: category.categoryID }, (err, category) => {
                categoryInDB = category;
            });
            if (!app_utils_1.AppUtils.hasValue(categoryInDB)) {
                throw new not_found_error_1.NotFoundErr(`Cannot update Category with id ${category.categoryID} because its not found`);
            }
            this.logger.info(`Updating Category with id ${categoryInDB.categoryID}`);
            let updatedCategory = null;
            yield CategoryModel.findByIdAndUpdate(category._id, category, { new: true }, (err, updatedCategoryInDB) => {
                if (err) {
                    this.logger.error(err);
                }
                else {
                    updatedCategory = updatedCategoryInDB;
                }
            });
            this.logger.info(`updated category ${JSON.stringify(updatedCategory)}`);
            return updatedCategory;
        });
        this.delete = (id) => __awaiter(this, void 0, void 0, function* () {
            let toDelete = null;
            yield CategoryModel.findOne({ _id: id }, (err, category) => {
                toDelete = category;
            });
            if (!app_utils_1.AppUtils.hasValue(toDelete)) {
                throw new not_found_error_1.NotFoundErr(`Cannot delete Category with id ${id} because its not found`);
            }
            yield CategoryModel.findByIdAndRemove(id, (err, removedCategory) => {
                if (err) {
                    this.logger.error(err);
                }
                else {
                    console.log("Removed User : ", removedCategory);
                }
            });
        });
    }
    save(category) {
        return __awaiter(this, void 0, void 0, function* () {
            let categoryInDB = null;
            yield CategoryModel.findOne({ categoryID: category.categoryID }, (err, category) => {
                categoryInDB = category;
            });
            if (app_utils_1.AppUtils.hasValue(categoryInDB)) {
                throw new already_exist_error_1.AlreadyExistError(`Category with id '${category.categoryID}' already exist`);
            }
            const createdCategory = new CategoryModel({
                categoryID: category.categoryID,
                name: category.name,
            });
            yield createdCategory.save();
            return createdCategory;
        });
    }
    getAll() {
        return __awaiter(this, void 0, void 0, function* () {
            let allCategorys = [];
            yield CategoryModel.find({}, (err, data) => {
                allCategorys = data;
            });
            return allCategorys;
        });
    }
};
CategoryRepository = __decorate([
    inversify_1.injectable(),
    __param(0, inversify_1.inject(logger_1.Logger)),
    __metadata("design:paramtypes", [logger_1.Logger])
], CategoryRepository);
exports.CategoryRepository = CategoryRepository;
//# sourceMappingURL=category-repository.js.map