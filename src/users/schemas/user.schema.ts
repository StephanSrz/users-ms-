import * as mongoose from "mongoose"

export const UserSchema = new mongoose.Schema(
  {
    id: String,
    name: {type: String, unique: true},
    email: {type: String, unique: true},
    userName: String,
    passowrd: String,
  },{ timestamps: true }
);
