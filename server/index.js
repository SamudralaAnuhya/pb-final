
import express, { json } from "express";
const app = express();

const port = 3000;
import jwt from "jsonwebtoken";
import {expressjwt} from "express-jwt";
import cors from "cors";
import connectDB from "./config/database.js";
import BudgetRoute from "./routes/BudgetRoute.js";
import UserRoute from "./routes/UserRoute.js";
import expenseRoute from "./routes/ExpenseRoute.js";
import incomeRoute from "./routes/IncomeRoute.js";
import BudgetsRoute from "./routes/BudgetsRoute.js";

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', `*`);
    res.setHeader('Access-Control-Allow-Headers', 'Content-type, Authorization');
    next();
})

app.listen(port, () => {
    console.log(`Server is running on ${port}`);
});

app.get("/", (req, res) => {
    console.log("Welcome to the server");
});

connectDB();
app.use("/budget", BudgetRoute);
app.use("/user", UserRoute);
app.use("/expenses", expenseRoute);
app.use("/income", incomeRoute)
app.use("/budgets", BudgetsRoute)

