
import express, { json } from "express";
const app = express();

const port = 3000;
import jwt from "jsonwebtoken";
import {expressjwt} from "express-jwt";
import cors from "cors";
import connectDB from "./config/database.js";
import BudgetRoute from "./routes/BudgetRoute.js";

app.use(cors());

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});

app.get("/", (req, res) => {
    console.log("Welcome to the server");
    res.body("Welcome to the server");
});

connectDB();
app.use("/budget", BudgetRoute);

