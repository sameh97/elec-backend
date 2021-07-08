import { AlreadyExistError } from "./../exeptions/already-exist-error";
import { inject, injectable } from "inversify";
import { AppUtils } from "../common/app-utils";
import { NotFoundErr } from "../exeptions/not-found-error";
import { Product } from "../common/interfaces/product-interface";
import { Logger } from "../common/logger";
import { Cart } from "../common/interfaces/cart-interface";
import { CartItem } from "../common/interfaces/cart-item-interface";
const CartModel = require("./../models/cart");

@injectable()
export class CartRepository {
  constructor(@inject(Logger) private logger: Logger) {}

  public async add(cartItem: CartItem, userID: string): Promise<Cart> {
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
        cartInDB.items[index].productID = cartItem.productID;

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

      const createdCart = new CartModel({
        userID: userID,
        items: itemsArray,
      });

      await createdCart.save();

      return createdCart;
    }
  }

  // public async getAll(): Promise<Product[]> {
  //   let allProducts: Product[] = [];

  //   await ProductModel.find({}, (err, data) => {
  //     allProducts = data as Product[];
  //   });

  //   return allProducts;
  // }

  // public update = async (
  //   cartIem: CartItem,
  //   userID: string
  // ): Promise<Product> => {
  //   let cartInDB: Cart = null;

  //   await CartModel.findOne({ userID: userID }, (err, cart) => {
  //     cartInDB = cart as Cart;
  //   });

  //   if (!AppUtils.hasValue(cartInDB)) {
  //     throw new NotFoundErr(
  //       `Cannot update Cart for user ${userID} because its not found`
  //     );
  //   }

  //   this.logger.info(`Updating Cart for user ${userID}`);

  //   let updatedCart: Cart = null;

  //   await CartModel.findByIdAndUpdate(
  //     cartIem._id,
  //     product,
  //     { new: true },
  //     (err, updatedProductInDB) => {
  //       if (err) {
  //         this.logger.error(err);
  //       } else {
  //         updatedProduct = updatedProductInDB as Product;
  //       }
  //     }
  //   );

  //   this.logger.info(`updated product ${JSON.stringify(updatedProduct)}`);

  //   return updatedProduct;
  // };

  //   // TODO: check how to bring the id:
  //   public delete = async (id: string) => {
  //     let toDelete: Product = null;

  //     await ProductModel.findOne({ _id: id }, (err, product) => {
  //       toDelete = product;
  //     });

  //     if (!AppUtils.hasValue(toDelete)) {
  //       throw new NotFoundErr(
  //         `Cannot delete Product with id ${id} because its not found`
  //       );
  //     }

  //     await ProductModel.findByIdAndRemove(id, (err, removedProduct) => {
  //       if (err) {
  //         this.logger.error(err);
  //       } else {
  //         console.log("Removed User : ", removedProduct);
  //       }
  //     });
  //   };
}
