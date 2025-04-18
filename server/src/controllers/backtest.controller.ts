import { Request, Response } from "express";
import { runRSIStrategy } from "../backtesting/strategies/rsiStrategy";
import dummyCandles from "../backtesting/data/dummyData.json";

export const backtest = async (req: Request, res: Response) => {
  const { oversold = 30, overbought = 70 } = req.body;

  const result = runRSIStrategy(dummyCandles, oversold, overbought);
  res.json(result);
};
