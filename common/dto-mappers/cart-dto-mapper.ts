import { AppUtils } from "../app-utils";
import { inject, injectable } from "inversify";
import { CartDto } from "../interfaces/dto/cart-dto";
import { Cart } from "../interfaces/cart-interface";
import { Product } from "../interfaces/product-interface";
import { ProductsService } from "../../services/product-service";
import { CartItemDto } from "../interfaces/dto/cart-item-dto";

@injectable()
export class CartDtoMapper {
  constructor(
    @inject(ProductsService) private productsService: ProductsService
  ) {}

  public async asDto(cart: Cart): Promise<CartDto> {
    if (!AppUtils.hasValue(cart)) {
      return null;
    }

    console.log(cart);

    let cartItems: CartItemDto[] = [];

    const allProducts: Product[] = await this.productsService.getAll();

    for (let item of cart.items) {
      for (let product of allProducts) {
        if (item.productID == product._id) {
          const cartItemToSave: CartItemDto = {
            _id: item._id,
            product: product,
            quantity: item.quantity,
          } as CartItemDto;

          cartItems.push(cartItemToSave);
        }
      }
    }

    return {
      _id: cart._id,
      items: cartItems,
      userID: cart.userID,
    } as CartDto;
  }
}
