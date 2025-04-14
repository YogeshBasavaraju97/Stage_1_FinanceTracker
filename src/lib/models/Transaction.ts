import { Schema, model, models } from "mongoose";

const transactionSchema = new Schema({
  description: { type: String, required: true },
  amount: { type: Number, required: true },
  date: { type: Date, required: true },
  category: { type: String, required: false }, // Optional category field
});

export const Transaction =
  models.Transaction || model("Transaction", transactionSchema);
