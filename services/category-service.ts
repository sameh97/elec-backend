import { inject, injectable } from "inversify";
import { AppUtils } from "../common/app-utils";
import { Logger } from "../common/logger";
import { AppDBConnection } from "../config/database";
import { InputError } from "../exeptions/input-error";
import { Product } from "../common/interfaces/product-interface";
import { CategoryRepository } from "../repositories/category-repository";
import { Category } from "../common/interfaces/category-interface";

@injectable()
export class CategoryService {
  constructor(
    @inject(Logger) private logger: Logger,
    @inject(CategoryRepository) private categoryRepository: CategoryRepository,
    @inject(AppDBConnection) private appDBConnection: AppDBConnection
  ) {}

  public create = async (category: Category): Promise<Category> => {
    try {
      const createdCategory = await this.categoryRepository.save(category);

      this.logger.info(`created product with id ${createdCategory._id}`);

      return createdCategory;
    } catch (err) {
      this.logger.error(
        `Error occurred while creating category: error: ${AppUtils.getFullException(
          err
        )}`
      );
      throw err;
    }
  };

  public getAll = async (): Promise<Category[]> => {
    const categorys: Category[] = await this.categoryRepository.getAll();
    this.logger.info(`Returning ${categorys.length} categorys`);
    return categorys;
  };

  public update = async (category: Category): Promise<Category> => {
    try {
      const updatedCategory = await this.categoryRepository.update(category);

      this.logger.info(`updated category with id ${updatedCategory._id}`);

      return updatedCategory;
    } catch (err) {
      this.logger.error(
        `Error occurred while updating category: error: ${AppUtils.getFullException(
          err
        )}`
      );
      throw err;
    }
  };

  public delete = async (id: string): Promise<void> => {
    try {
      this.logger.info(`Deleting category with id: ${id}`);

      await this.categoryRepository.delete(id);

      this.logger.info(`Category with id ${id} has been deleted.`);
    } catch (err) {
      throw err;
    }
  };
}
