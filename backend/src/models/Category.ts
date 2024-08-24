import mongoose, { Document, Schema } from "mongoose";

export interface ICategory extends Document {
  title: string;
  color: string;
  icon?: string;
}

const CategorySchema: Schema = new Schema({
  title: { type: String, required: true },
  color: { type: String, required: true },
  icon: { type: String },
});

export default mongoose.model<ICategory>("Category", CategorySchema);
