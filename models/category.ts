import { Schema, model } from "mongoose";

import { Category } from "./../common/interfaces/category-interface";

const categorySchema = new Schema<Category>({
  categoryID: { type: Number, required: true, unique: true },
  name: { type: String, required: true },
});

module.exports = model<Category>("Category", categorySchema);
