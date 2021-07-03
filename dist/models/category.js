"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const categorySchema = new mongoose_1.Schema({
    categoryID: { type: Number, required: true, unique: true },
    name: { type: String, required: true },
});
module.exports = mongoose_1.model("Category", categorySchema);
//# sourceMappingURL=category.js.map