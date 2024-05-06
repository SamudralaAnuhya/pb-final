// BudgetOverview.js

import React from 'react';
// import './BudgetOverview.css';

const BudgetOverview = ({ budgets }) => {
    return (
        <section className="budget-overview">
            <h2>Budget Overview</h2>
            <div className="budget-list">
                {budgets.map(budget => (
                    <div key={budget.id} className="budget-item">
                        <p><strong>Category:</strong> {budget.category}</p>
                        <p><strong>Budget:</strong> ${budget.budget}</p>
                    </div>
                ))}
            </div>
        </section>
    );
}

export default BudgetOverview;
