"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const cartItemSchema = new mongoose_1.Schema({
    productID: { type: String, required: true, unique: true },
    quantity: {
        type: String,
        required: true,
        min: [1, "Quantity can not be less then 1."],
    },
});
module.exports = mongoose_1.model("CartItem", cartItemSchema);
//# sourceMappingURL=cart-item.js.map