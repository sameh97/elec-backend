"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const productSchema = new mongoose_1.Schema({
    id: { type: Number },
    name: { type: String, required: true },
    serialNumber: { type: String, required: true, unique: true },
    description: { type: String, required: true },
    categoryID: { type: Number, required: true },
    price: { type: Number },
    imgUrl: { type: String },
});
module.exports = mongoose_1.model("Product", productSchema);
//# sourceMappingURL=product.js.map