import { AlreadyExistError } from "./../exeptions/already-exist-error";
import { inject, injectable } from "inversify";
import { AppUtils } from "../common/app-utils";
import { NotFoundErr } from "../exeptions/not-found-error";
import { Product } from "../common/interfaces/product-interface";
import { Logger } from "../common/logger";
import { Category } from "../common/interfaces/category-interface";
const CategoryModel = require("./../models/category");

@injectable()
export class CategoryRepository {
  constructor(@inject(Logger) private logger: Logger) {}

  public async save(category: Category): Promise<Category> {
    let categoryInDB: Category = null;

    await CategoryModel.findOne(
      { categoryID: category.categoryID },
      (err, category) => {
        categoryInDB = category as Category;
      }
    );

    if (AppUtils.hasValue(categoryInDB)) {
      throw new AlreadyExistError(
        `Category with id '${category.categoryID}' already exist`
      );
    }

    const createdCategory = new CategoryModel({
      categoryID: category.categoryID,
      name: category.name,
    });

    await createdCategory.save();

    return createdCategory;
  }

  public async getAll(): Promise<Category[]> {
    let allCategorys: Category[] = [];

    await CategoryModel.find({}, (err, data) => {
      allCategorys = data as Category[];
    });

    return allCategorys;
  }

  public update = async (category: Category): Promise<Category> => {
    let categoryInDB: Category = null;

    await CategoryModel.findOne(
      { categoryID: category.categoryID },
      (err, category) => {
        categoryInDB = category;
      }
    );

    if (!AppUtils.hasValue(categoryInDB)) {
      throw new NotFoundErr(
        `Cannot update Category with id ${category.categoryID} because its not found`
      );
    }

    this.logger.info(`Updating Category with id ${categoryInDB.categoryID}`);

    let updatedCategory: Category = null;

    await CategoryModel.findByIdAndUpdate(
      category._id,
      category,
      { new: true },
      (err, updatedCategoryInDB) => {
        if (err) {
          this.logger.error(err);
        } else {
          updatedCategory = updatedCategoryInDB as Category;
        }
      }
    );

    this.logger.info(`updated category ${JSON.stringify(updatedCategory)}`);

    return updatedCategory;
  };

  // TODO: check how to bring the id:
  public delete = async (id: string) => {
    let toDelete: Category = null;

    await CategoryModel.findOne({ _id: id }, (err, category) => {
      toDelete = category;
    });

    if (!AppUtils.hasValue(toDelete)) {
      throw new NotFoundErr(
        `Cannot delete Category with id ${id} because its not found`
      );
    }

    await CategoryModel.findByIdAndRemove(id, (err, removedCategory) => {
      if (err) {
        this.logger.error(err);
      } else {
        console.log("Removed User : ", removedCategory);
      }
    });
  };
}
