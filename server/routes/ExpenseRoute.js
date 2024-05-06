import ExpenseModel from "../models/expense.js";
import express, { json } from "express";
const erouter = express.Router();


erouter.get("/:userId", async (req, res) => {
    const userId = req.params.userId;
    const expenses = await ExpenseModel.find({ user: userId });
    res.send(expenses);
});

erouter.post("/add", async (req, res) => {
    const budget = new ExpenseModel(req.body);

    try {
        await budget.save();
        res.send(budget);
    } catch (error) {
        res.status(400).send(error);
    }
});

export default erouter;