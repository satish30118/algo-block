export interface Candle {
    time: string;
    open: number;
    high: number;
    low: number;
    close: number;
    volume: number;
  }
  
  export interface StrategyResult {
    totalTrades: number;
    winRate: number;
    totalProfit: number;
    maxDrawdown: number;
    trades: Trade[];
  }
  
  export interface Trade {
    entryPrice: number;
    exitPrice: number;
    profit: number;
    entryTime: string;
    exitTime: string;
  }
  