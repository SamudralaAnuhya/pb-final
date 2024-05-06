import mongoose from "mongoose";

const IncomeSchema = new mongoose.Schema(
    {
        Amount: { type: Number, required: true },
        Type: { type: String, required: true },
        Month: { type: String, required: true },
        user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    },
    { collection: "income" }
);

const IncomeModel = mongoose.model("Income", IncomeSchema);
export default IncomeModel;