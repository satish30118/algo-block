import jwt from "jsonwebtoken";
import { Request, Response, NextFunction } from "express";
import User from "../models/user.model";

export const protect = async (req: Request, res: Response, next: NextFunction) => {
    let token;
    if (req.headers.authorization?.startsWith("Bearer")) {
        token = req.headers.authorization.split(" ")[1];
    }

    if (!token) {
        res.status(401).json({ message: "Not authorized" });
        return
    }

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET as string) as any;
        const user = await User.findById(decoded.id).select("-password");
        if (!user) {
            res.status(401).json({ message: "User not found" });
            return
        }
        (req as any).user = user;
        next();
    } catch (err) {
        res.status(401).json({ message: "Invalid token" });
    }
};
