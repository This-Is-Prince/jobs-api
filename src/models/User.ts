import mongoose, { Schema } from "mongoose";
import bcrypt from "bcryptjs";
import { sign } from "jsonwebtoken";

interface IUser {
  name: string;
  email: string;
  password: string;
}

interface IUserDocument extends IUser, Document {
  createJWT: (userId: string, name: string) => string;
}

const UserSchema: Schema<IUserDocument> = new mongoose.Schema({
  name: {
    type: String,
    required: [true, "Please provide name."],
    minlength: 3,
    maxlength: 50,
  },
  email: {
    type: String,
    required: [true, "Please provide email."],
    match: [
      /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
      "Please provide a valid email",
    ],
    unique: true,
  },
  password: {
    type: String,
    required: [true, "Please provide password."],
    minlength: 6,
  },
});

UserSchema.pre("save", async function (next) {
  const salt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password, salt);
  next();
});

UserSchema.methods.createJWT = function (userId: string, name: string) {
  return sign({ userId, name }, process.env.JWT_SECRET as string, {
    expiresIn: process.env.JWT_LIFETIME as string,
  });
};

const User = mongoose.model<IUserDocument>("User", UserSchema);

export default User;
