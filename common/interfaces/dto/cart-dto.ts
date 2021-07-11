import { CartItem } from "./../cart-item-interface";

export interface CartDto {
  _id: string;
  items: CartItem[];
  userID: string;
}
