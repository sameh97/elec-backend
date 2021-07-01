"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
require("reflect-metadata");
const database_1 = require("./config/database");
const inversify_config_1 = require("./inversify.config");
const server_1 = require("./server/server");
const app = new server_1.ElectronicsApp(inversify_config_1.default.get(database_1.AppDBConnection));
app.start();
//# sourceMappingURL=index.js.map