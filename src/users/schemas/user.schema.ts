import * as mongoose from "mongoose"

export const UserSchema = new mongoose.Schema(
  {
    id: String,
    name: {
      type: String,
      unique: true,
      validate: {
        validator: async function(value) {
          const existingUser = await this.constructor.findOne({ name: value });
          return !existingUser;
        },
        message: "Name already registered", 
      },
    },
    email: {
      type: String,
      unique: true,
      validate: {
        validator: async function(value) {
          const existingUser = await this.constructor.findOne({ email: value });
          return !existingUser;
        },
        message: "Email already registered",
      },
    },
    userName: String,
    password: String,
  },
  { timestamps: true }
);
