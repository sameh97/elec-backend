import { inject, injectable } from "inversify";
import { ProductDtoMapper } from "../common/dto-mappers/product-dto-mapper";
import { Logger } from "../common/logger";
import { ProductDto } from "../common/interfaces/dto/product-dto";
import { Product } from "../common/interfaces/product-interface";
import { ProductsService } from "../services/product-service";
import { CategoryService } from "../services/category-service";
import { Category } from "../common/interfaces/category-interface";

@injectable()
export class CategoryController {
  constructor(
    @inject(CategoryService) private categoryService: CategoryService,
    @inject(ProductDtoMapper) private productDtoMapper: ProductDtoMapper,
    @inject(Logger) private logger: Logger
  ) {}

  public getAll = async (req: any, res: any, next: any) => {
    try {
      const categorys: Category[] = await this.categoryService.getAll();

      //   const productDto: ProductDto[] = categorys.map((product) =>
      //     this.productDtoMapper.asDto(product)
      //   );

      next(categorys);
    } catch (err) {
      this.logger.error(`cannot get all categorys`, err);
      next(err);
    }
  };

  public create = async (req: any, res: any, next: any) => {
    let categoryToCreate: Category = null;
    try {
      // categoryToCreate = this.productDtoMapper.asEntity(req.body);

      categoryToCreate = req.body as Category;

      const createdCategory: Category = await this.categoryService.create(
        categoryToCreate
      );

      res.status(201);

      //   next(this.productDtoMapper.asDto(createdProduct));
      next(createdCategory);
    } catch (err) {
      this.logger.error(
        `Cannot create category ${JSON.stringify(req.body)}`,
        err
      );
      next(err);
    }
  };

  public update = async (req: any, res: any, next: any) => {
    let categoryToUpdate: Category = null;
    try {
      //   categoryToUpdate = this.productDtoMapper.asEntity(req.body);

      categoryToUpdate = req.body as Category;

      const updatedCategory: Category = await this.categoryService.update(
        categoryToUpdate
      );

      res.status(201);

      //   next(this.productDtoMapper.asDto(updatedProduct));

      next(updatedCategory);
    } catch (err) {
      this.logger.error(
        `Cannot update category ${JSON.stringify(req.body)}`,
        err
      );
      next(err);
    }
  };

  public delete = async (req: any, res: any, next: any) => {
    let categoryId: string = null;
    try {
      categoryId = req.params.id;

      await this.categoryService.delete(categoryId);

      next(`category with id ${categoryId} has been deleted successfully`);
    } catch (err) {
      this.logger.error(`Cannot delete category: ${categoryId}`, err);
      next(err);
    }
  };
}
