"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ElectronicsApp = void 0;
const express = require("express");
const inversify_1 = require("inversify");
const database_1 = require("../config/database");
const cart_api_1 = require("../routes/cart-api");
const product_api_1 = require("../routes/product-api");
const user_api_1 = require("../routes/user-api");
const path = require("path");
let ElectronicsApp = class ElectronicsApp {
    constructor(dBconnection, usersApi, productsApi, cartApi) {
        this.dBconnection = dBconnection;
        this.usersApi = usersApi;
        this.productsApi = productsApi;
        this.cartApi = cartApi;
        this.app = express();
        this.app.use(express.json());
        this.app.use(function (req, res, next) {
            res.header("Access-Control-Allow-Origin", "*");
            res.header("Access-Control-Allow-Methods", "DELETE, POST, GET, PUT, PATCH, OPTIONS");
            res.header("Access-Control-Allow-Headers", "*");
            res.header("Access-Control-Expose-Headers", "*");
            next();
        });
    }
    start() {
        return __awaiter(this, void 0, void 0, function* () {
            this.initRoutes();
            this.initDB();
            this.listenToRequests();
        });
    }
    initDB() {
        return __awaiter(this, void 0, void 0, function* () {
            this.dBconnection
                .connect()
                .then((r) => {
                console.log("success: " + JSON.stringify(r));
            })
                .catch((e) => {
                console.log(e);
            });
        });
    }
    initRoutes() {
        this.app.use("/api", this.usersApi.getRouter());
        this.app.use("/api", this.productsApi.getRouter());
        this.app.use("/api", this.cartApi.getRouter());
        this.app.get("/*", (req, res) => {
            res.sendFile(path.join(__dirname, "/public/index.html"));
        });
    }
    listenToRequests() {
        const http = require("http");
        const PORT = process.env.APP_PORT || 3000;
        const server = http.createServer(this.app);
        server.listen(PORT, () => {
            console.log(`Server started on port ${PORT}`);
        });
    }
};
ElectronicsApp = __decorate([
    __param(0, inversify_1.inject(database_1.AppDBConnection)),
    __param(1, inversify_1.inject(user_api_1.UsersApi)),
    __param(2, inversify_1.inject(product_api_1.ProductsApi)),
    __param(3, inversify_1.inject(cart_api_1.CartApi)),
    __metadata("design:paramtypes", [database_1.AppDBConnection,
        user_api_1.UsersApi,
        product_api_1.ProductsApi,
        cart_api_1.CartApi])
], ElectronicsApp);
exports.ElectronicsApp = ElectronicsApp;
//# sourceMappingURL=server.js.map