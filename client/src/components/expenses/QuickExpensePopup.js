import React, { useState } from 'react';
import './QuickExpensePopup.css';

const QuickExpensePopup = ({ onAddExpense, onClose }) => {
    const [description, setDescription] = useState('');
    const [category, setCategory] = useState('');
    const [newCategory, setNewCategory] = useState('');
    const [date, setDate] = useState('');
    const [amount, setAmount] = useState('');

    // Hardcoded categories for demonstration purposes
    const categories = ['Groceries', 'Dining Out', 'Transportation', 'Entertainment', 'Utilities'];

    const handleSubmit = (e) => {
        e.preventDefault();
        // Validation and submission of expense data
        const selectedCategory = newCategory ? newCategory : category;
        const newExpense = {
            description,
            category: selectedCategory,
            date,
            amount
        };
        onAddExpense(newExpense);
        // Clear input fields after submission
        clearFields();
    };

    const handleCategoryChange = (e) => {
        setCategory(e.target.value);
        if (e.target.value === 'addNew') {
            // Reset the category field and set focus on the input for new category
            setNewCategory('');
            document.getElementById('newCategoryInput').focus();
        }
    };

    const handleClose = () => {
        // Clear input fields when closing the popup
        clearFields();
        onClose();
    };

    const clearFields = () => {
        setDescription('');
        setCategory('');
        setNewCategory('');
        setDate('');
        setAmount('');
    };

    return (
        <div className="quick-expense-popup">
            <h2>Add Quick Expense</h2>
            <form onSubmit={handleSubmit}>
                <div className="form-group">
                    <label>Description:</label>
                    <input type="text" value={description} onChange={(e) => setDescription(e.target.value)} required />
                </div>
                <div className="form-group">
                    <label>Category:</label>
                    <select value={category} onChange={handleCategoryChange} required>
                        <option value="">Select Category</option>
                        {categories.map((cat, index) => (
                            <option key={index} value={cat}>{cat}</option>
                        ))}
                        <option value="addNew">Add New Category</option>
                    </select>
                    {/* Input field for new category */}
                    {category === 'addNew' && (
                        <input
                            id="newCategoryInput"
                            type="text"
                            placeholder="Enter New Category"
                            value={newCategory}
                            onChange={(e) => setNewCategory(e.target.value)}
                            required
                        />
                    )}
                </div>
                <div className="form-group">
                    <label>Date:</label>
                    <input type="date" value={date} onChange={(e) => setDate(e.target.value)} required />
                </div>
                <div className="form-group">
                    <label>Amount:</label>
                    <input type="number" value={amount} onChange={(e) => setAmount(e.target.value)} required />
                </div>
                <div className="button-group">
                    <button type="submit" className="save-button">Save Expense</button>
                    <button type="button" className="close-button" onClick={handleClose}>Close</button>
                </div>
            </form>
        </div>
    );
}

export default QuickExpensePopup;
