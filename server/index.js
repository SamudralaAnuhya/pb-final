
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


app.use(function (req, res, next) {

    // Website you wish to allow to connect
    res.setHeader('Access-Control-Allow-Origin', 'http://localhost:3001');

    // Request methods you wish to allow
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');

    // Request headers you wish to allow
    res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type');

    // Set to true if you need the website to include cookies in the requests sent
    // to the API (e.g. in case you use sessions)
    res.setHeader('Access-Control-Allow-Credentials', true);

    // Pass to next layer of middleware
    next();
});
app.use(
    cors({origin: ['http://localhost:3001', 'http://127.0.0.1:3001']})
);

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.listen(port, () => {
    // console.log(`Server is running on http://localhost:${port}`);
});

app.get("/", (req, res) => {
    // console.log("Welcome to the server");
});

connectDB();
app.use("/budget", BudgetRoute);
app.use("/user", UserRoute);
app.use("/expenses", expenseRoute);
app.use("/income", incomeRoute)
app.use("/budgets", BudgetsRoute)

