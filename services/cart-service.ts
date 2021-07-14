import { inject, injectable } from "inversify";
import { AppUtils } from "../common/app-utils";
import { Logger } from "../common/logger";
import { AppDBConnection } from "../config/database";
import { InputError } from "../exeptions/input-error";
import { Product } from "../common/interfaces/product-interface";
import { ProductsRepository } from "../repositories/product-repository";
import { Cart } from "../common/interfaces/cart-interface";
import { CartRepository } from "../repositories/cart-repository";
import { CartItem } from "../common/interfaces/cart-item-interface";

@injectable()
export class CartService {
  constructor(
    @inject(Logger) private logger: Logger,
    @inject(CartRepository) private cartRepository: CartRepository,
    @inject(AppDBConnection) private appDBConnection: AppDBConnection
  ) {}

  public add = async (cartItem: CartItem, userID: string): Promise<Cart> => {
    try {
      const createdCart: Cart = await this.cartRepository.add(cartItem, userID);

      this.logger.info(`added to cart with id ${createdCart._id}`);

      return createdCart;
    } catch (err) {
      this.logger.error(`cannot add to cart ${AppUtils.getFullException(err)}`);
    }
  };

  public getCartById = async (user_id: string): Promise<Cart> => {
    const cart: Cart = await this.cartRepository.getCartByUserId(user_id);
    // this.logger.info(`Returning cart with id ${cart._id} `);
    return cart;
  };

  public delete = async (id: string): Promise<void> => {
    try {
      this.logger.info(`Deleting cart with id: ${id}`);

      await this.cartRepository.delete(id);

      this.logger.info(`Cart with id ${id} has been deleted.`);
    } catch (err) {
      throw err;
    }
  };
}
