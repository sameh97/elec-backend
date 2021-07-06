import { AlreadyExistError } from "./../exeptions/already-exist-error";
import { inject, injectable } from "inversify";
import { AppUtils } from "../common/app-utils";
import { NotFoundErr } from "../exeptions/not-found-error";
import { Product } from "../common/interfaces/product-interface";
import { Logger } from "../common/logger";
const ProductModel = require("./../models/product");

@injectable()
export class ProductsRepository {
  constructor(@inject(Logger) private logger: Logger) {}

  public async save(product: Product): Promise<Product> {
    let productInDB: Product = null;

    await ProductModel.findOne(
      { serialNumber: product.serialNumber },
      (err, product) => {
        productInDB = product as Product;
      }
    );

    if (AppUtils.hasValue(productInDB)) {
      throw new AlreadyExistError(
        `Product with serial number '${product.serialNumber}' already exist`
      );
    }

    const createdProduct = new ProductModel({
      name: product.name,
      description: product.description,
      quantity: product.quantity,
      categoryID: product.categoryID,
      serialNumber: product.serialNumber,
    });

    await createdProduct.save();

    return createdProduct;
  }

  public async getAll(): Promise<Product[]> {
    let allProducts: Product[] = [];

    await ProductModel.find({}, (err, data) => {
      allProducts = data as Product[];
    });

    return allProducts;
  }

  public update = async (product: Product): Promise<Product> => {
    let productInDB: Product = null;

    await ProductModel.findOne({ _id: product._id }, (err, product) => {
      productInDB = product;
    });

    if (!AppUtils.hasValue(productInDB)) {
      throw new NotFoundErr(
        `Cannot update Product with name ${product.name} because its not found`
      );
    }

    this.logger.info(`Updating product with name ${productInDB.name}`);

    let updatedProduct: Product = null;

    await ProductModel.findByIdAndUpdate(
      product._id,
      product,
      { new: true },
      (err, updatedProductInDB) => {
        if (err) {
          this.logger.error(err);
        } else {
          updatedProduct = updatedProductInDB as Product;
        }
      }
    );

    this.logger.info(`updated product ${JSON.stringify(updatedProduct)}`);

    return updatedProduct;
  };
  // TODO: check how to bring the id:
  public delete = async (id: string) => {
    let toDelete: Product = null;

    await ProductModel.findOne({ _id: id }, (err, product) => {
      toDelete = product;
    });

    if (!AppUtils.hasValue(toDelete)) {
      throw new NotFoundErr(
        `Cannot delete Product with id ${id} because its not found`
      );
    }

    await ProductModel.findByIdAndRemove(id, (err, removedProduct) => {
      if (err) {
        this.logger.error(err);
      } else {
        console.log("Removed User : ", removedProduct);
      }
    });
  };
}
