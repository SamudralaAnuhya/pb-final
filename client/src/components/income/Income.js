// Income.js

import React, { useState, useEffect } from 'react';
import api from '../../api';
import './Income.css';
import axios from "axios";

const Income = () => {
    const [incomes, setIncomes] = useState([]);
    const [newIncome, setNewIncome] = useState({
        Amount: '',
        Type: '',
        Month: '',
    });

    useEffect(() => {
        fetchIncomes();
    }, []);

    const fetchIncomes = async () => {
        try {
            const userString = localStorage.getItem('user');
            const user = JSON.parse(userString);
            const response = await api.get(`/income/${user._id}`);
            setIncomes(response.data);
        } catch (error) {
            console.error('Error fetching incomes:', error);
        }
    };

    const handleInputChange = (event) => {
        const { name, value } = event.target;
        setNewIncome((prevIncome) => ({
            ...prevIncome,
            [name]: value,
        }));
    };

    const handleSubmit = async (event) => {
        event.preventDefault();
        try {
            const userString = localStorage.getItem('user');
            console.log("userString", userString);
            const user = JSON.parse(userString);
            const incomeData = {
                ...newIncome,
                user: user._id,
            };
            await axios.post('http://localhost:3000/income/add', incomeData);

            // await api.post('/income/add', { incomeData });
            setIncomes((prevExpenses) => [...prevExpenses, incomeData]);
            fetchIncomes();
        } catch (error) {
            console.error('Error adding income:', error);
        }
    };

    return (
        <div className="income-container">
            <h2>Income</h2>
            <form onSubmit={handleSubmit} className="income-form">
                <div className="form-group">
                    <label htmlFor="Amount">Amount:</label>
                    <input
                        type="number"
                        id="Amount"
                        name="Amount"
                        value={newIncome.Amount}
                        onChange={handleInputChange}
                        required
                    />
                </div>
                <div className="form-group">
                    <label htmlFor="Type">Type:</label>
                    <input
                        type="text"
                        id="Type"
                        name="Type"
                        value={newIncome.Type}
                        onChange={handleInputChange}
                        required
                    />
                </div>
                <div className="form-group">
                    <label htmlFor="Month">Month:</label>
                    <input
                        type="text"
                        id="Month"
                        name="Month"
                        value={newIncome.Month}
                        onChange={handleInputChange}
                        required
                    />
                </div>
                <button type="submit">Add Income</button>
            </form>
            <h3>Income History</h3>
            <ul className="income-list">
                {incomes.map((income) => (
                    <li key={income._id}>
                        Amount: {income.Amount}, Type: {income.Type}, Month: {income.Month}
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default Income;