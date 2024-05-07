// BudgetOverview.js
import React from 'react';
import { PieChart, Pie, Cell, Legend } from 'recharts';
import Header from '../Header';

const BudgetOverview = ({ budgets }) => {
  const COLORS = ['#0088FE', '#00C49F'];

  const calculateSpentAmount = (budget) => {
    let spentAmount = 0;
    for (const category in budget.categories) {
      spentAmount += parseFloat(budget.categories[category] || 0);
    }
    return spentAmount;
  };

  return (
    <div className="budget-overview">
      <h3>Budget Overview</h3>
      {budgets.map((budget) => {
        const spentAmount = calculateSpentAmount(budget);
        const remainingAmount = (budget.amount || 0) - spentAmount;

        return (
          <div key={budget.id} className="budget-chart">
            <h4>{budget.name}</h4>
            <PieChart width={200} height={200}>
              <Pie
                data={[
                  { name: 'Spent', value: spentAmount },
                  { name: 'Remaining', value: remainingAmount },
                ]}
                dataKey="value"
                innerRadius={60}
                outerRadius={80}
                fill="#8884d8"
                paddingAngle={5}
              >
                {[
                  { name: 'Spent', value: spentAmount },
                  { name: 'Remaining', value: remainingAmount },
                ].map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                ))}
              </Pie>
              <Legend />
            </PieChart>
            <p>
              You've spent ${spentAmount.toFixed(2)} of your ${(budget.amount || 0).toFixed(2)} budget
            </p>
          </div>
        );
      })}
    </div>
  );
};

export default BudgetOverview;