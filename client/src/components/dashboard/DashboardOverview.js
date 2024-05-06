// DashboardOverview.js

import React from 'react';
import './DashboardOverview.css';
import {ThemeProvider} from "@emotion/react";
import Header from "../Header";
import {createTheme} from "@mui/material";
const defaultTheme = createTheme();


const DashboardOverview = ({ remainingIncome, totalExpenses, monthlyExpense, weeklyExpense }) => {
    return (
        <ThemeProvider theme={defaultTheme}>
            <Header/>
        <section className="dashboard-overview">
            <h2>Dashboard Overview</h2>
            <div className="metrics">
                <div>
                    <h3>Remaining Income</h3>
                    <p>${remainingIncome}</p>
                </div>
                <div>
                    <h3>Total Expenses</h3>
                    <p>${totalExpenses}</p>
                </div>
                <div>
                    <h3>Monthly Expense</h3>
                    <p>${monthlyExpense}</p>
                </div>
                <div>
                    <h3>Weekly Expense</h3>
                    <p>${weeklyExpense}</p>
                </div>
            </div>
        </section>
        </ThemeProvider>
    );

}

export default DashboardOverview;
