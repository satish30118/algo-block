import axios from "axios";

export const getCurrentPrice = async (symbol: string) => {
    const { data } = await axios.get(`https://api.binance.com/api/v3/ticker/price`, {
        params: { symbol: symbol.toUpperCase() }
    });
    return { symbol: data.symbol, price: parseFloat(data.price) };
};

export const getHistoricalCandles = async (symbol: string, interval = "1h", limit = 100) => {
    const { data } = await axios.get(`https://api.binance.com/api/v3/klines`, {
        params: { symbol: symbol.toUpperCase(), interval, limit }
    });

    return data.map((item: any[]) => ({
        time: new Date(item[0]).toISOString(),
        open: parseFloat(item[1]),
        high: parseFloat(item[2]),
        low: parseFloat(item[3]),
        close: parseFloat(item[4]),
        volume: parseFloat(item[5]),
    }));
};
