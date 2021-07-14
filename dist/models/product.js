"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const productSchema = new mongoose_1.Schema({
    name: { type: String, required: true },
    serialNumber: { type: String, required: true },
    description: { type: String, required: true },
    quantity: { type: String, required: true },
    status: { type: String, required: true },
    categoryID: { type: Number, required: true },
    price: { type: Number, required: true },
    imgUrl: { type: String, required: true },
});
module.exports = [mongoose_1.model("Product", productSchema), productSchema];
//# sourceMappingURL=product.js.map