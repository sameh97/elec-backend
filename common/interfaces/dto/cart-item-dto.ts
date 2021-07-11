import { Product } from "../product-interface";

export interface CartItemDto {
  _id: string;
  product: Product;
  quantity: string;
}
