import { AppUtils } from "../app-utils";
import { injectable } from "inversify";
import { CartDto } from "../interfaces/dto/cart-dto";
import { Cart } from "../interfaces/cart-interface";

@injectable()
export class CartDtoMapper {
  public asDto(cart: Cart): CartDto {
    if (!AppUtils.hasValue(cart)) {
      return null;
    }
    return {
      _id: cart._id,
      items: cart.items,
      userID: cart.userID,
    } as CartDto;
  }

  public asEntity(cartDto: CartDto): Cart {
    if (!AppUtils.hasValue(cartDto)) {
      return null;
    }
    return {
      _id: cartDto._id,
      items: cartDto.items,
      userID: cartDto.userID,
    } as Cart;
  }
}
