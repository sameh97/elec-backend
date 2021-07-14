import { inject, injectable } from "inversify";
import { ProductDtoMapper } from "../common/dto-mappers/product-dto-mapper";
import { Logger } from "../common/logger";
import { ProductDto } from "../common/interfaces/dto/product-dto";
import { Product } from "../common/interfaces/product-interface";
import { ProductsService } from "../services/product-service";
import { Cart } from "../common/interfaces/cart-interface";
import { CartService } from "../services/cart-service";
import { CartItem } from "../common/interfaces/cart-item-interface";
import { CartDto } from "../common/interfaces/dto/cart-dto";
import { CartDtoMapper } from "../common/dto-mappers/cart-dto-mapper";

@injectable()
export class CartController {
  constructor(
    @inject(CartService) private cartService: CartService,
    @inject(CartDtoMapper) private cartDtoMapper: CartDtoMapper,
    @inject(Logger) private logger: Logger
  ) {}

  //   public getAll = async (req: any, res: any, next: any) => {
  //     try {
  //       const products: Product[] = await this.productsService.getAll();

  //       const productDto: ProductDto[] = products.map((product) =>
  //         this.productDtoMapper.asDto(product)
  //       );

  //       next(productDto);
  //     } catch (err) {
  //       this.logger.error(`cannot get all products`, err);
  //       next(err);
  //     }
  //   };

  public getCartByUserId = async (req: any, res: any, next: any) => {
    try {
      const cart: Cart = await this.cartService.getCartById(req.query.user_id);

      const cartDto: CartDto = await this.cartDtoMapper.asDto(cart);

      next(cartDto);
    } catch (err) {
      this.logger.error(`cannot get cart`, err);
      next(err);
    }
  };

  public addToCart = async (req: any, res: any, next: any) => {
    const item = req.body;

    const userId = req.query.user_id;

    let itemToAdd: CartItem = null;
    try {
      itemToAdd = item;

      const createdCart: Cart = await this.cartService.add(itemToAdd, userId);

      res.status(201);

      next(createdCart);
    } catch (err) {
      this.logger.error(`Cannot add to cart ${JSON.stringify(item)}`, err);
      next(err);
    }
  };

  //   public update = async (req: any, res: any, next: any) => {
  //     let productToUpdate: Product = null;
  //     try {
  //       productToUpdate = this.productDtoMapper.asEntity(req.body);

  //       const updatedProduct: Product = await this.productsService.update(
  //         productToUpdate
  //       );

  //       res.status(201);

  //       next(this.productDtoMapper.asDto(updatedProduct));
  //     } catch (err) {
  //       this.logger.error(
  //         `Cannot update product ${JSON.stringify(req.body)}`,
  //         err
  //       );
  //       next(err);
  //     }
  //   };

  public delete = async (req: any, res: any, next: any) => {
    let cartId: string = null;
    try {
      cartId = req.query.user_id;

      await this.cartService.delete(cartId);

      next(`Cart with id ${cartId} has been deleted successfully`);
    } catch (err) {
      this.logger.error(`Cannot delete product: ${cartId}`, err);
      next(err);
    }
  };
}
