import { Request, Response } from "express";
import User from "../models/user.model";
import { generateToken } from "../services/auth.service";

export const register = async (req: Request, res: Response) => {
    const { email, password } = req.body;
    const exists = await User.findOne({ email });
    if (exists) {
        res.status(400).json({ message: "User already exists" });
        return
    }

    const user = new User({ email, password });
    await user.save();
    const token = generateToken(user);
    res.status(201).json({ user: { id: user._id, email }, token });
};

export const login = async (req: Request, res: Response) => {
    const { email, password } = req.body;
    const user = await User.findOne({ email });
    if (!user) {
        res.status(401).json({ message: "Invalid credentials" });
        return
    }

    const isMatch = await user.comparePassword(password);
    if (!isMatch) {
        res.status(401).json({ message: "Invalid credentials" });
        return
    }

    const token = generateToken(user);
    res.status(200).json({ user: { id: user._id, email }, token });
};
