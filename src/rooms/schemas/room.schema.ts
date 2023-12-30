import * as mongoose from "mongoose";

export const RoomSchema = new mongoose.Schema(
  {
    id: String,
    name: String,
    description: {type: String, default: null},
    roomCode: {type: String, unique: true},
    maxNumUsers: {type: String, default: null},
    createdBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'users'
    },
    users: [{
      type: mongoose.Schema.Types.ObjectId,
      ref: 'users',
      unique: true
    }]
  },{ timestamps: true }
  );
RoomSchema.index({ roomCode: 1 }, { unique: true });
