// src/components/Summary.js
import React from 'react';

function Summary({ summary }) {
  return (
    <div className="bg-white p-6 py-36 rounded-lg shadow-lg max-w-md mx-auto">
      <h2 className="text-2xl font-bold mb-4 text-gray-800">Financial Summary</h2>
      <div className="grid grid-cols-1 gap-4">
        <div className="bg-green-50 p-4 rounded-lg border border-green-200">
          <h3 className="text-lg font-semibold text-green-800">Total Income</h3>
          <p className="text-xl font-bold text-green-700">${summary.totalIncome.toFixed(2)}</p>
        </div>
        <div className="bg-red-50 p-4 rounded-lg border border-red-200">
          <h3 className="text-lg font-semibold text-red-800">Total Expenses</h3>
          <p className="text-xl font-bold text-red-700">${summary.totalExpenses.toFixed(2)}</p>
        </div>
        <div className="bg-blue-50 p-4 rounded-lg border border-blue-200">
          <h3 className="text-lg font-semibold text-blue-800">Balance</h3>
          <p className={`text-xl font-bold ${summary.balance >= 0 ? 'text-blue-700' : 'text-red-700'}`}>
            ${summary.balance.toFixed(2)}
          </p>
        </div>
      </div>
    </div>
  );
}

export default Summary;
