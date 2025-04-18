import { Candle, Trade } from "../types";

const calculateRSI = (candles: Candle[], period = 14): number[] => {
  const gains: number[] = [];
  const losses: number[] = [];
  const rsiValues: number[] = [];

  for (let i = 1; i < candles.length; i++) {
    const diff = candles[i].close - candles[i - 1].close;
    gains.push(Math.max(0, diff));
    losses.push(Math.max(0, -diff));

    if (i >= period) {
      const avgGain = gains.slice(i - period, i).reduce((a, b) => a + b, 0) / period;
      const avgLoss = losses.slice(i - period, i).reduce((a, b) => a + b, 0) / period;

      const rs = avgGain / (avgLoss || 1);
      const rsi = 100 - 100 / (1 + rs);
      rsiValues.push(rsi);
    } else {
      rsiValues.push(50); // neutral
    }
  }

  return rsiValues;
};

export const runRSIStrategy = (candles: Candle[], oversold = 30, overbought = 70) => {
  const rsi = calculateRSI(candles);
  const trades: Trade[] = [];
  let inPosition = false;
  let entryPrice = 0;
  let entryTime = "";

  for (let i = 15; i < candles.length; i++) {
    const candle = candles[i];

    if (!inPosition && rsi[i] < oversold) {
      // Buy signal
      entryPrice = candle.close;
      entryTime = candle.time;
      inPosition = true;
    }

    if (inPosition && rsi[i] > overbought) {
      // Sell signal
      const profit = candle.close - entryPrice;
      trades.push({
        entryPrice,
        exitPrice: candle.close,
        profit,
        entryTime,
        exitTime: candle.time,
      });
      inPosition = false;
    }
  }

  const totalProfit = trades.reduce((sum, t) => sum + t.profit, 0);
  const winRate = trades.filter(t => t.profit > 0).length / trades.length || 0;
  const maxDrawdown = Math.min(...trades.map(t => t.profit));

  return {
    trades,
    totalTrades: trades.length,
    totalProfit,
    winRate: +winRate.toFixed(2),
    maxDrawdown,
  };
};
