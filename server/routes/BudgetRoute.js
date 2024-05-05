import BudgetModel from "../models/budget.js";
import express, { json } from "express";
const router = express.Router();


router.get("/", async (req, res) => {
    const budget = await BudgetModel.find();
    res.send(budget);
});

router.post("/add", async (req, res) => {
    const budget = new BudgetModel(req.body);

    try {
        await budget.save();
        res.send(budget);
    } catch (error) {
        res.status(400).send(error);
    }
});

export default router;