import express = require("express");
import { inject } from "inversify";
import { AppDBConnection } from "../config/database";

export class ElectronicsApp {
  private app: express.Express;

  constructor(@inject(AppDBConnection) private dBconnection: AppDBConnection) {
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

  private listenToRequests(): void {
    const http = require("http");

    const PORT = process.env.APP_PORT || 3000;

    const server = http.createServer(this.app);

    server.listen(PORT, () => {
      console.log(`Server started on port ${PORT}`);
    });
  }
}
