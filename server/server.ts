import express = require("express");
import { inject } from "inversify";
import { AppDBConnection } from "../config/database";
import { appResponseHandler } from "../middlewares/app-response-handler";
import { CartApi } from "../routes/cart-api";
import { CategoryApi } from "../routes/category-api";
import { ProductsApi } from "../routes/product-api";
import { UsersApi } from "../routes/user-api";

const path = require("path");

export class ElectronicsApp {
  private app: express.Express;

  constructor(
    @inject(AppDBConnection) private dBconnection: AppDBConnection,
    @inject(UsersApi) private usersApi: UsersApi,
    @inject(ProductsApi) private productsApi: ProductsApi,
    @inject(CartApi) private cartApi: CartApi,
    @inject(CategoryApi) private categoryApi: CategoryApi
  ) {
    this.app = express();
    this.app.use(express.json());
    this.app.use(function (req, res, next) {
      res.header("Access-Control-Allow-Origin", "*");
      res.header(
        "Access-Control-Allow-Methods",
        "DELETE, POST, GET, PUT, PATCH, OPTIONS"
      );
      res.header("Access-Control-Allow-Headers", "*");
      res.header("Access-Control-Expose-Headers", "*");
      next();
    });
  }

  public async start(): Promise<void> {
    this.initRoutes();
    this.handleAllResponses();
    this.initDB();
    this.listenToRequests();
  }

  public async initDB(): Promise<void> {
    this.dBconnection
      .connect()
      .then((r) => {
        console.log("success: " + JSON.stringify(r));
      })
      .catch((e) => {
        console.log(e);
      });
  }

  private initRoutes(): void {
    this.app.use("/api", this.usersApi.getRouter());
    this.app.use("/api", this.productsApi.getRouter());
    this.app.use("/api", this.cartApi.getRouter());
    this.app.use("/api", this.categoryApi.getRouter());

    // Catch all other get requests
    this.app.get("/*", (req, res) => {
      res.sendFile(path.join(__dirname, "/public/index.html"));
    });
  }

  private listenToRequests(): void {
    const http = require("http");

    const PORT = process.env.APP_PORT || 3000;

    const server = http.createServer(this.app);

    server.listen(PORT, () => {
      console.log(`Server started on port ${PORT}`);
    });
  }

  private handleAllResponses(): void {
    this.app.use(appResponseHandler);
  }
}
