import mongoose, { Document, Schema } from "mongoose";

export interface IExpense extends Document {
  title: string;
  amount: number;
  category: Schema.Types.ObjectId;
  chargedDate: Date;
  userId: Schema.Types.ObjectId;
  history: Array<{ amount: number; updatedAt: Date }>;
}

const ExpenseSchema: Schema = new Schema({
  title: { type: String, required: true },
  amount: { type: Number, required: true },
  category: { type: Schema.Types.ObjectId, ref: "Category", required: true },
  chargedDate: { type: Date, required: true },
  userId: { type: Schema.Types.ObjectId, ref: "User", required: true },
  history: [
    {
      amount: Number,
      updatedAt: { type: Date, default: Date.now },
    },
  ],
});

export default mongoose.model<IExpense>("Expense", ExpenseSchema);
