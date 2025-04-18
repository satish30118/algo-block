import { Request, Response } from "express";
import Strategy from "../models/strategy.model";

export const createStrategy = async (req: Request, res: Response) => {
    const { name, blocks } = req.body;
    const user = (req as any).user;

    if (!name || !blocks) return res.status(400).json({ message: "Name and blocks are required." });

    const strategy = await Strategy.create({ user: user._id, name, blocks });
    res.status(201).json(strategy);
};

export const getUserStrategies = async (req: Request, res: Response) => {
    const user = (req as any).user;
    const strategies = await Strategy.find({ user: user._id });
    res.json(strategies);
};

export const getStrategyById = async (req: Request, res: Response) => {
    const user = (req as any).user;
    const { id } = req.params;

    const strategy = await Strategy.findOne({ _id: id, user: user._id });
    if (!strategy) return res.status(404).json({ message: "Strategy not found." });

    res.json(strategy);
};
