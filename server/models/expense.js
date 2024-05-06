import mongoose from "mongoose";

const colorValidator = (v) => /^#([0-9a-f]{3}){1,2}$/i.test(v);
const ExpenseSchema = new mongoose.Schema(
    {
        Description: { type: String, required: true },
        Category: { type: String, required: true },
        Amount: {type: Number, required: true },
        Date: { type: Date, required: true, default: Date.now },
    },
    { collection: "expense" }
);

const ExpenseModel = mongoose.model("Expense", ExpenseSchema);
export default ExpenseModel;