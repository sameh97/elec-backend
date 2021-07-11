import { Schema, model } from "mongoose";

import { Product } from "./../common/interfaces/product-interface";

const productSchema = new Schema<Product>({
  name: { type: String, required: true },
  serialNumber: { type: String, required: true, unique: true },
  description: { type: String, required: true },
  quantity: { type: String, required: true },
  categoryID: { type: Number, required: true },
  price: { type: Number, required: true },
  imgUrl: { type: String, required: true },
});

module.exports = [model<Product>("Product", productSchema), productSchema];
