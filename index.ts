import "reflect-metadata";
import { AppDBConnection } from "./config/database";
import container from "./inversify.config";
import { UsersApi } from "./routes/user-api";
import { ElectronicsApp } from "./server/server";

const app = new ElectronicsApp(
  container.get(AppDBConnection),
  container.get(UsersApi)
);

app.start();
