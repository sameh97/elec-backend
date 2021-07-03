import { Schema, model } from "mongoose";

import { Product } from "./../common/interfaces/product-interface";

const productSchema = new Schema<Product>({
  id: { type: Number },
  name: { type: String, required: true },
  serialNumber: { type: String, required: true, unique: true },
  description: { type: String, required: true },
  categoryID: { type: Number, required: true },
  price: { type: Number },
  imgUrl: { type: String },
});

module.exports = model<Product>("Product", productSchema);
