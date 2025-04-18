import express from "express";
import {
    createStrategy,
    getUserStrategies,
    getStrategyById,
} from "../controllers/strategy.controller";
import { protect } from "../middleware/auth.middleware";

const router = express.Router();

router.use(protect); // all strategy routes are protected

router.post("/", createStrategy);
router.get("/", getUserStrategies);
router.get("/:id", getStrategyById);

export default router;
