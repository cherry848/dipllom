import mongoose, { Schema, Types } from "mongoose";
import type { User } from "../types/user.types";
import { userService } from "../services/user.service";

const UserSchema = new Schema<User>(
  {
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    name: { type: String, required: true, default: userService.generateName() },
    avatar: { type: String, default: null },
    activeCourseIds: { type: [Types.ObjectId], default: [] },
  },
  { timestamps: true }
);

export default mongoose.model<User>("User", UserSchema);
