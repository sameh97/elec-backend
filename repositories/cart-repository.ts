import { AlreadyExistError } from "./../exeptions/already-exist-error";
import { inject, injectable } from "inversify";
import { AppUtils } from "../common/app-utils";
import { NotFoundErr } from "../exeptions/not-found-error";
import { Logger } from "../common/logger";
import { Cart } from "../common/interfaces/cart-interface";
import { CartItem } from "../common/interfaces/cart-item-interface";
import { CartDtoMapper } from "../common/dto-mappers/cart-dto-mapper";
import { AppDBConnection } from "../config/database";
const CartModel = require("./../models/cart");

@injectable()
export class CartRepository {
  constructor(
    @inject(Logger) private logger: Logger // @inject(CartDtoMapper) private cartDtoMapper: CartDtoMapper,
  ) {}

  public add = async (cartItem: CartItem, userID: string): Promise<Cart> => {
    let cartInDB = null;

    await CartModel.findOne({ userID: userID }, (err, cart) => {
      cartInDB = cart;
    });

    if (AppUtils.hasValue(cartInDB)) {
      const index = cartInDB.items.findIndex(
        (item) => item.productID === cartItem.productID
      );

      if (index !== -1) {
        cartInDB.items[index].quantity =
          cartInDB.items[index].quantity + cartItem.quantity;

        const cartAfterAdding = await cartInDB.save();

        return cartAfterAdding;
      } else {
        await CartModel.update(
          { _id: cartInDB._id },
          { $push: { items: cartItem } }
        );
      }

      return cartInDB;
    } else {
      const itemsArray: CartItem[] = [];
      itemsArray.push(cartItem);

      let createdCart = new CartModel({
        userID: userID,
        items: itemsArray,
      });

      await createdCart.save();

      return createdCart;
    }
  };

  public async getCartByUserId(user_id: string): Promise<Cart> {
    let cart: Cart = null;

    await CartModel.findOne({ userID: user_id }, (err, data) => {
      cart = data as Cart;
    });

    return cart;
  }

  //   // TODO: check how to bring the id:
  public delete = async (id: string) => {
    let toDelete: Cart = null;

    await CartModel.findOne({ userID: id }, (err, cart) => {
      toDelete = cart;
    });

    if (!AppUtils.hasValue(toDelete)) {
      throw new NotFoundErr(
        `Cannot delete Cart for user with id ${id} because its not found`
      );
    }

    await CartModel.remove({ userID: id }, (err, removedCart) => {
      if (err) {
        this.logger.error(err);
      } else {
        console.log("Removed Cart : ", removedCart);
      }
    });
  };
}
