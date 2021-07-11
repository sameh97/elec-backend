import { Product } from "./product-interface";

export interface CartItem {
  _id: string;
  product: Product;
  quantity: string;
}
