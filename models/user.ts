import { Schema, model } from "mongoose";

import { User } from "./../common/interfaces/user";

const schema = new Schema<User>({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
});

module.exports = model<User>("User", schema);
