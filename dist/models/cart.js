"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const cartItemSchema = new mongoose_1.Schema({
    productID: { type: String, required: true, unique: true },
    quantity: {
        type: Number,
        required: true,
        min: [1, "Quantity can not be less then 1."],
    },
}, {
    timestamps: true,
});
const CartSchema = new mongoose_1.Schema({
    userID: {
        type: mongoose_1.Schema.Types.ObjectId,
        ref: "User",
    },
    items: [cartItemSchema],
}, { timestamps: true });
module.exports = mongoose_1.model("Cart", CartSchema);
//# sourceMappingURL=cart.js.map