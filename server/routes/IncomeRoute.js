import IncomeModel from "../models/income.js";
import express, { json } from "express";
const ierouter = express.Router();


ierouter.get("/", async (req, res) => {
    const budget = await IncomeModel.find();
    res.send(budget);
});

ierouter.post("/add", async (req, res) => {
    const budget = new IncomeModel(req.body);

    try {
        await budget.save();
        res.send(budget);
    } catch (error) {
        res.status(400).send(error);
    }
});

export default ierouter;