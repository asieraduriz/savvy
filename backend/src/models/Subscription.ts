import mongoose, { Document, Schema } from "mongoose";

export interface ISubscription extends Document {
  title: string;
  amount: number;
  category: Schema.Types.ObjectId;
  startDate: Date;
  frequency: string; // e.g., 'weekly', 'monthly'
  userId: Schema.Types.ObjectId;
  history: Array<{ amount: number; updatedAt: Date }>;
}

const SubscriptionSchema: Schema = new Schema({
  title: { type: String, required: true },
  amount: { type: Number, required: true },
  category: { type: Schema.Types.ObjectId, ref: "Category", required: true },
  startDate: { type: Date, required: true },
  frequency: { type: String, required: true },
  userId: { type: Schema.Types.ObjectId, ref: "User", required: true },
  history: [
    {
      amount: Number,
      updatedAt: { type: Date, default: Date.now },
    },
  ],
});

export default mongoose.model<ISubscription>("Subscription", SubscriptionSchema);
