import mongoose, { Document, Schema } from "mongoose";

export interface IGoal extends Document {
  title: string;
  targetAmount: number;
  category?: Schema.Types.ObjectId;
  linkedExpense?: string;
  linkedSubscription?: string;
  startDate: Date;
  userId: Schema.Types.ObjectId;
}

const GoalSchema: Schema = new Schema({
  title: { type: String, required: true },
  targetAmount: { type: Number, required: true },
  category: { type: Schema.Types.ObjectId, ref: "Category" },
  linkedExpense: { type: String },
  linkedSubscription: { type: String },
  startDate: { type: Date, default: new Date() },
  userId: { type: Schema.Types.ObjectId, ref: "User", required: true },
});

export default mongoose.model<IGoal>("Goal", GoalSchema);
