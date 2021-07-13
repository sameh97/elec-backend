import "reflect-metadata";
import { AppDBConnection } from "./config/database";
import container from "./inversify.config";
import { CartApi } from "./routes/cart-api";
import { CategoryApi } from "./routes/category-api";
import { ProductsApi } from "./routes/product-api";
import { UsersApi } from "./routes/user-api";
import { ElectronicsApp } from "./server/server";

const app = new ElectronicsApp(
  container.get(AppDBConnection),
  container.get(UsersApi),
  container.get(ProductsApi),
  container.get(CartApi),
  container.get(CategoryApi)
);

app.start();
