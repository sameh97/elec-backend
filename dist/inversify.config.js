"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const inversify_1 = require("inversify");
const database_1 = require("./config/database");
const container = new inversify_1.Container({ defaultScope: "Singleton" });
container.bind(database_1.AppDBConnection).toSelf();
exports.default = container;
//# sourceMappingURL=inversify.config.js.map