import { Schema, model } from "mongoose";

import { CartItem } from "../common/interfaces/cart-item-interface";

const cartItemSchema = new Schema<CartItem>(
  {
    productID: { type: String, required: true, unique: true },
    quantity: {
      type: Number,
      required: true,
      min: [1, "Quantity can not be less then 1."],
    },
  },
  {
    timestamps: true,
  }
);

const CartSchema = new Schema(
  {
    items: [cartItemSchema],
  },
  {
    timestamps: true,
  }
);

module.exports = model<CartItem>("Cart", CartSchema);
