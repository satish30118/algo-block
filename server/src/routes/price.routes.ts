import express from "express";
import { fetchCurrentPrice, fetchCandles } from "../controllers/price.controller";
import { protect } from "../middleware/auth.middleware";

const router = express.Router();

router.use(protect);

router.get("/current", fetchCurrentPrice);
router.get("/candles", fetchCandles);

export default router;
