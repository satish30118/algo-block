import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import authRoutes from "./routes/auth.routes";
import { protect } from "./middleware/auth.middleware";
import strategyRoutes from "./routes/strategy.routes";
import backtestRoutes from "./routes/backtest.routes";
import priceRoutes from "./routes/price.routes";



dotenv.config();
const app = express();

app.use(cors());
app.use(express.json());

app.use("/api", authRoutes);
app.use("/strategies", strategyRoutes);
app.get("/private", protect, (req, res) => {
    res.json({ message: "Private route accessed ✅" });
});
app.use("/backtest", backtestRoutes);
app.use("/price", priceRoutes);

export default app;
