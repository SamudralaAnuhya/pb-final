import mongoose from "mongoose";

const colorValidator = (v) => /^#([0-9a-f]{3}){1,2}$/i.test(v);
const BudgetSchema = new mongoose.Schema(
    {
        title: { type: String, required: true },
        budget: { type: Number, required: true },
        color: {
            type: String,
            validator: [colorValidator, "Invalid color"],
            required: true,
        },
    },
    { collection: "budgetData" }
);

const BudgetModel = mongoose.model("Budget", BudgetSchema);
export default BudgetModel;