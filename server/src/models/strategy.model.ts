import mongoose, { Schema, Document } from "mongoose";

export interface IBlock {
  id: string;
  type: string; // e.g., "indicator", "condition", "order"
  config: Record<string, any>;
}

export interface IStrategy extends Document {
  user: mongoose.Types.ObjectId;
  name: string;
  blocks: IBlock[];
  createdAt: Date;
  updatedAt: Date;
  isPublic?: boolean;
}

const StrategySchema = new Schema<IStrategy>(
  {
    user: { type: Schema.Types.ObjectId, ref: "User", required: true },
    name: { type: String, required: true },
    blocks: [
      {
        id: String,
        type: String,
        config: Schema.Types.Mixed,
      },
    ],
    isPublic: { type: Boolean, default: false },
  },
  { timestamps: true }
);

export default mongoose.model<IStrategy>("Strategy", StrategySchema);
