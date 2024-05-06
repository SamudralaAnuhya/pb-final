import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './LastFiveExpenses.css'
import Header from "../Header";

const ListExpenses = () => {
    const [expenses, setExpenses] = useState([]);
    const [showAllExpenses, setShowAllExpenses] = useState(false);
    const [showAddExpensePopup, setShowAddExpensePopup] = useState(false);
    const [newExpense, setNewExpense] = useState({
        Description: '',
        Amount: '',
        Date: '',
        Category: '',
    });
    const [formErrors, setFormErrors] = useState({});

    useEffect(() => {
        // Fetch expenses from the backend API
        const fetchExpenses = async () => {
            try {
                // const response = await axios.get('http://localhost:3000/expenses');

                const userString = localStorage.getItem('user');
                const user = JSON.parse(userString);
                const response = await axios.get(`http://localhost:3000/expenses/${user._id}`);
                setExpenses(response.data);
            } catch (error) {
                console.error('Error fetching expenses:', error);
            }
        };

        fetchExpenses();
    }, []);

    const toggleShowAllExpenses = () => {
        setShowAllExpenses(!showAllExpenses);
    };

    const openAddExpensePopup = () => {
        setShowAddExpensePopup(true);
    };

    const closeAddExpensePopup = () => {
        setShowAddExpensePopup(false);
        setNewExpense({
            Description: '',
            Amount: '',
            Date: '',
            Category: '',
        });
        setFormErrors({});
    };

    const handleInputChange = (event) => {
        const { name, value } = event.target;
        setNewExpense((prevExpense) => ({
            ...prevExpense,
            [name]: value,
        }));
    };

    const validateForm = () => {
        const errors = {};

        if (!newExpense.Description) {
            errors.Description = 'Description is required';
        }

        if (!newExpense.Amount) {
            errors.Amount = 'Amount is required';
        } else if (isNaN(newExpense.Amount) || newExpense.Amount <= 0) {
            errors.Amount = 'Amount must be a positive number';
        }

        if (!newExpense.Date) {
            errors.Date = 'Date is required';
        }

        if (!newExpense.Category) {
            errors.Category = 'Category is required';
        }

        setFormErrors(errors);

        return Object.keys(errors).length === 0;
    };

    const saveExpense = async () => {
        if (validateForm()) {
            try {
                const userString = localStorage.getItem('user');
                const user = JSON.parse(userString);
                const expenseData = {
                    ...newExpense,
                    user: user._id,
                };
                await axios.post('http://localhost:3000/expenses/add', expenseData);
                setExpenses((prevExpenses) => [...prevExpenses, expenseData]);
                closeAddExpensePopup();
            } catch (error) {
                console.error('Error saving expense:', error);
            }
        }
    };
    return (
        <div className="last-five-expenses">
            <Header/>
            <h2>Expense List</h2>
            {expenses.length === 0 ? (
                <p>No expenses found.</p>
            ) : (
                <ul>
                    {(showAllExpenses ? expenses : expenses.slice(0, 5)).map((expense) => (
                        <li key={expense._id}>
                            {expense.Description} - ${expense.Amount} - {new Date(expense.Date).toLocaleDateString()} - {expense.Category}
                        </li>
                    ))}
                </ul>
            )}
            {expenses.length > 5 && (
                <button onClick={toggleShowAllExpenses}>
                    {showAllExpenses ? 'Show Less' : 'Show More'}
                </button>
            )}
            <button onClick={openAddExpensePopup}>Add Expense</button>

            {showAddExpensePopup && (
                <div className="popup">
                    <h3>Add Expense</h3>
                    <input
                        type="text"
                        name="Description"
                        placeholder="Description"
                        value={newExpense.Description}
                        onChange={handleInputChange}
                    />
                    {formErrors.Description && <span className="error">{formErrors.Description}</span>}
                    <input
                        type="number"
                        name="Amount"
                        placeholder="Amount"
                        value={newExpense.Amount}
                        onChange={handleInputChange}
                    />
                    {formErrors.Amount && <span className="error">{formErrors.Amount}</span>}
                    <input
                        type="date"
                        name="Date"
                        value={newExpense.Date}
                        onChange={handleInputChange}
                    />
                    {formErrors.Date && <span className="error">{formErrors.Date}</span>}
                    <select
                        name="Category"
                        value={newExpense.Category}
                        onChange={handleInputChange}
                    >
                        <option value="">Select Category</option>
                        <option value="Food">Food</option>
                        <option value="Transportation">Transportation</option>
                        <option value="Entertainment">Entertainment</option>
                        <option value="Other">Other</option>
                    </select>
                    {formErrors.Category && <span className="error">{formErrors.Category}</span>}
                    <button onClick={saveExpense}>Save</button>
                    <button onClick={closeAddExpensePopup}>Close</button>
                </div>
            )}
        </div>
    );
};

export default ListExpenses;