import { Request, Response } from "express";
import { getCurrentPrice, getHistoricalCandles } from "../services/price.service";

export const fetchCurrentPrice = async (req: Request, res: Response) => {
  const { symbol } = req.query;
  if (!symbol) return res.status(400).json({ message: "Symbol is required" });

  try {
    const price = await getCurrentPrice(symbol as string);
    res.json(price);
  } catch (error) {
    res.status(500).json({ message: "Failed to fetch price" });
  }
};

export const fetchCandles = async (req: Request, res: Response) => {
  const { symbol, interval = "1h", limit = "100" } = req.query;
  if (!symbol) return res.status(400).json({ message: "Symbol is required" });

  try {
    const candles = await getHistoricalCandles(symbol as string, interval as string, +limit);
    res.json(candles);
  } catch (error) {
    res.status(500).json({ message: "Failed to fetch candles" });
  }
};
