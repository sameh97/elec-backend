import { inject, injectable } from "inversify";
import { AppUtils } from "../common/app-utils";
import { Logger } from "../common/logger";
import { AppDBConnection } from "../config/database";
import { InputError } from "../exeptions/input-error";
import { Product } from "../common/interfaces/product-interface";
import { ProductsRepository } from "../repositories/product-repository";

@injectable()
export class ProductsService {
  constructor(
    @inject(Logger) private logger: Logger,
    @inject(ProductsRepository) private productRepo: ProductsRepository,
    @inject(AppDBConnection) private appDBConnection: AppDBConnection
  ) {}

  public create = async (product: Product): Promise<Product> => {
    try {
      const createdProduct = await this.productRepo.save(product);

      this.logger.info(`created product with id ${createdProduct.id}`);

      return createdProduct;
    } catch (err) {
      this.logger.error(
        `Error occurred while creating product: error: ${AppUtils.getFullException(
          err
        )}`
      );
      throw err;
    }
  };

  public getAll = async (): Promise<Product[]> => {
    const products: Product[] = await this.productRepo.getAll();
    this.logger.info(`Returning ${products.length} products`);
    return products;
  };

  public update = async (product: Product): Promise<Product> => {
    try {
      const updatedProduct = await this.productRepo.update(product);

      this.logger.info(`updated product with id ${updatedProduct.id}`);

      return updatedProduct;
    } catch (err) {
      this.logger.error(
        `Error occurred while updating product: error: ${AppUtils.getFullException(
          err
        )}`
      );
      throw err;
    }
  };

  public delete = async (id: number): Promise<void> => {
    if (!AppUtils.isInteger(id)) {
      throw new InputError(`Cannot delete product, the id must be an integer`);
    }

    try {
      this.logger.info(`Deleting product with id: ${id}`);

      await this.productRepo.delete(id);

      this.logger.info(`Product with id ${id} has been deleted.`);
    } catch (err) {
      throw err;
    }
  };
}
