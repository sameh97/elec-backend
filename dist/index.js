"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
require("reflect-metadata");
const database_1 = require("./config/database");
const inversify_config_1 = require("./inversify.config");
const cart_api_1 = require("./routes/cart-api");
const category_api_1 = require("./routes/category-api");
const product_api_1 = require("./routes/product-api");
const user_api_1 = require("./routes/user-api");
const server_1 = require("./server/server");
const app = new server_1.ElectronicsApp(inversify_config_1.default.get(database_1.AppDBConnection), inversify_config_1.default.get(user_api_1.UsersApi), inversify_config_1.default.get(product_api_1.ProductsApi), inversify_config_1.default.get(cart_api_1.CartApi), inversify_config_1.default.get(category_api_1.CategoryApi));
app.start();
//# sourceMappingURL=index.js.map