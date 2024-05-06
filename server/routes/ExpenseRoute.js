import ExpenseModel from "../models/expense.js";
import express, { json } from "express";
const erouter = express.Router();


erouter.get("/", async (req, res) => {
    const budget = await ExpenseModel.find();
    res.send(budget);
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