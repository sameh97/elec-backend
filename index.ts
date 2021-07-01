import "reflect-metadata";
import { AppDBConnection } from "./config/database";
import container from "./inversify.config";
import { ElectronicsApp } from "./server/server";

const app = new ElectronicsApp(container.get(AppDBConnection));

app.start();
