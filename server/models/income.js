import mongoose from "mongoose";

const colorValidator = (v) => /^#([0-9a-f]{3}){1,2}$/i.test(v);
const IncomeSchema = new mongoose.Schema(
    {
        Amount: { type: Number, required: true },
        Type: { type: String, required: true },
        Month: { type: String, required: true },
    },
    { collection: "income" }
);

const IncomeModel = mongoose.model("Income", IncomeSchema);
export default IncomeModel;