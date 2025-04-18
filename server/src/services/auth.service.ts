import jwt from "jsonwebtoken";
import { IUser } from "../models/user.model";

export const generateToken = (user: IUser) => {
  return jwt.sign({ id: user._id }, process.env.JWT_SECRET as string, {
    expiresIn: "7d",
  });
};
