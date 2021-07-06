import { inject, injectable } from "inversify";
import { ProductDtoMapper } from "../common/dto-mappers/product-dto-mapper";
import { Logger } from "../common/logger";
import { ProductDto } from "../common/interfaces/product-dto";
import { Product } from "../common/interfaces/product-interface";
import { ProductsService } from "../services/product-service";

@injectable()
export class ProductsController {
  constructor(
    @inject(ProductsService) private productsService: ProductsService,
    @inject(ProductDtoMapper) private productDtoMapper: ProductDtoMapper,
    @inject(Logger) private logger: Logger
  ) {}

  public getAll = async (req: any, res: any, next: any) => {
    try {
      const products: Product[] = await this.productsService.getAll();

      const productDto: ProductDto[] = products.map((product) =>
        this.productDtoMapper.asDto(product)
      );

      next(productDto);
    } catch (err) {
      this.logger.error(`cannot get all products`, err);
      next(err);
    }
  };

  public createProduct = async (req: any, res: any, next: any) => {
    let productToCreate: Product = null;
    try {
      productToCreate = this.productDtoMapper.asEntity(req.body);

      const createdProduct: Product = await this.productsService.create(
        productToCreate
      );

      res.status(201);

      next(this.productDtoMapper.asDto(createdProduct));
    } catch (err) {
      this.logger.error(
        `Cannot create product ${JSON.stringify(req.body)}`,
        err
      );
      next(err);
    }
  };

  public update = async (req: any, res: any, next: any) => {
    let productToUpdate: Product = null;
    try {
      productToUpdate = this.productDtoMapper.asEntity(req.body);

      const updatedProduct: Product = await this.productsService.update(
        productToUpdate
      );

      res.status(201);

      next(this.productDtoMapper.asDto(updatedProduct));
    } catch (err) {
      this.logger.error(
        `Cannot update product ${JSON.stringify(req.body)}`,
        err
      );
      next(err);
    }
  };

  public delete = async (req: any, res: any, next: any) => {
    let productId: string = null;
    try {
      productId = req.params.id;

      await this.productsService.delete(productId);

      next(`product with id ${productId} has been deleted successfully`);
    } catch (err) {
      this.logger.error(`Cannot delete product: ${productId}`, err);
      next(err);
    }
  };
}
