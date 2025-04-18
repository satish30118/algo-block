import express from "express";
import { backtest } from "../controllers/backtest.controller";
import { protect } from "../middleware/auth.middleware";

const router = express.Router();
router.post("/", protect, backtest);

export default router;
