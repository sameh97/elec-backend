import { CartItemDto } from "./cart-item-dto";

export interface CartDto {
  _id: string;
  items: CartItemDto[];
  userID: string;
}
