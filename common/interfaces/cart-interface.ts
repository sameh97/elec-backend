import { CartItem } from "./cart-item-interface";

export interface Cart {
  _id: string;
  items: CartItem[];
  userID: string;
}
