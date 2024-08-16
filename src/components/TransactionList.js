// src/components/TransactionList.js
import React, { useState, useEffect } from 'react';

function TransactionList({ transactions, setTransactions }) {
  const [editIndex, setEditIndex] = useState(null);
  const [formData, setFormData] = useState({
    type: '',
    amount: '',
    category: '',
    date: '',
    description: ''
  });

  useEffect(() => {
    if (editIndex !== null) {
      document.body.style.overflow = 'hidden'; // Disable scrolling
    } else {
      document.body.style.overflow = 'auto'; // Enable scrolling
    }

    return () => {
      document.body.style.overflow = 'auto'; // Cleanup on unmount
    };
  }, [editIndex]);

  const handleEdit = (index) => {
    const transaction = transactions[index];
    setFormData({ ...transaction });
    setEditIndex(index);
  };

  const handleSave = () => {
    const updatedTransactions = transactions.map((transaction, index) =>
      index === editIndex ? { ...formData, amount: parseFloat(formData.amount) } : transaction
    );
    setTransactions(updatedTransactions);
    localStorage.setItem('transactions', JSON.stringify(updatedTransactions));
    setEditIndex(null);
    setFormData({
      type: '',
      amount: '',
      category: '',
      date: '',
      description: ''
    });
  };

  const handleDelete = (index) => {
    const updatedTransactions = transactions.filter((_, i) => i !== index);
    setTransactions(updatedTransactions);
    localStorage.setItem('transactions', JSON.stringify(updatedTransactions));
  };

  return (
    <div className="relative">
      <ul className="mt-6 px-8 space-y-4">
        {transactions.map((transaction, index) => (
          <li
            key={index}
            className="bg-white p-4 px-6 rounded-lg shadow-lg flex justify-between items-center border border-gray-200 transition-transform transform hover:scale-105 hover:shadow-xl"
          >
            <div>
              <p className={`text-lg font-semibold ${transaction.type === 'income' ? 'text-green-600' : 'text-red-600'}`}>
                {transaction.type}: ${transaction.amount.toFixed(2)}
              </p>
              <p className="text-gray-600">{transaction.category} - {transaction.date} - {transaction.description}</p>
            </div>
            <div className="flex space-x-2">
              <button
                onClick={() => handleEdit(index)}
                className="bg-yellow-500 text-white p-2 rounded-lg hover:bg-yellow-600 transition-colors"
              >
                Edit
              </button>
              <button
                onClick={() => handleDelete(index)}
                className="bg-red-500 text-white p-2 rounded-lg hover:bg-red-600 transition-colors"
              >
                Delete
              </button>
            </div>
          </li>
        ))}
      </ul>

      {editIndex !== null && (
        <div className="fixed inset-0 bg-gray-800 bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white p-6 rounded-lg shadow-lg w-full max-w-lg relative">
            <h3 className="text-xl font-semibold mb-4 text-gray-800">Edit Transaction</h3>
            <form>
              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-600">Type</label>
                <select
                  value={formData.type}
                  onChange={(e) => setFormData({ ...formData, type: e.target.value })}
                  className="mt-1 block w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  <option value="income">Income</option>
                  <option value="expense">Expense</option>
                </select>
              </div>
              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-600">Amount</label>
                <input
                  type="number"
                  value={formData.amount}
                  onChange={(e) => setFormData({ ...formData, amount: e.target.value })}
                  className="mt-1 block w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-600">Category</label>
                <input
                  type="text"
                  value={formData.category}
                  onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                  className="mt-1 block w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-600">Date</label>
                <input
                  type="date"
                  value={formData.date}
                  onChange={(e) => setFormData({ ...formData, date: e.target.value })}
                  className="mt-1 block w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-600">Description</label>
                <input
                  type="text"
                  value={formData.description}
                  onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                  className="mt-1 block w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
              <div className="flex justify-end space-x-2">
                <button
                  type="button"
                  onClick={() => setEditIndex(null)}
                  className="bg-gray-300 text-gray-800 p-2 rounded-lg hover:bg-gray-400 transition-colors"
                >
                  Cancel
                </button>
                <button
                  type="button"
                  onClick={handleSave}
                  className="bg-blue-600 text-white p-2 rounded-lg hover:bg-blue-700 transition-colors"
                >
                  Save
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}

export default TransactionList;
