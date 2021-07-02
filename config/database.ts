const mongoose = require("mongoose");
import { injectable } from "inversify";

@injectable()
export class AppDBConnection {
  private db: any;

  async connect(): Promise<void> {
    const mongoDB = "mongodb://127.0.0.1/elec-store";

    mongoose.connect(mongoDB, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      useCreateIndex: true,
    });

    this.db = mongoose.connection;

    this.db.on("open", () => {
      console.log("Connected to MongoDB");
    });

    this.db.on(
      "error",
      console.error.bind(console, "MongoDB connection error:")
    );
  }
}
