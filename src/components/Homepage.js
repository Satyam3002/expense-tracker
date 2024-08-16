import React, { useState, useEffect } from 'react';
import TransactionForm from './TransactionForm';
import TransactionList from './TransactionList';
import Summary from './Summary';
import { Bar, Pie } from 'react-chartjs-2';
import { Chart as ChartJS, Title, Tooltip, Legend, BarElement, CategoryScale, LinearScale, ArcElement } from 'chart.js';

ChartJS.register(Title, Tooltip, Legend, BarElement, CategoryScale, LinearScale, ArcElement);

function HomePage() {
  const [transactions, setTransactions] = useState([]);

  useEffect(() => {
    const storedData = localStorage.getItem('transactions');
    if (storedData) {
      setTransactions(JSON.parse(storedData));
    }
  }, []);

  const addTransaction = (transaction) => {
    const updatedTransactions = [...transactions, transaction];
    setTransactions(updatedTransactions);
    localStorage.setItem('transactions', JSON.stringify(updatedTransactions));
  };

  const getSummary = () => {
    const totalIncome = transactions.filter(t => t.type === 'income').reduce((acc, t) => acc + t.amount, 0);
    const totalExpenses = transactions.filter(t => t.type === 'expense').reduce((acc, t) => acc + t.amount, 0);
    return {
      totalIncome,
      totalExpenses,
      balance: totalIncome - totalExpenses,
    };
  };

  // Data for Bar chart
  const barChartData = {
    labels: ['Income', 'Expenses'],
    datasets: [
      {
        label: 'Current Month',
        data: [
          transactions.filter(t => t.type === 'income').reduce((acc, t) => acc + t.amount, 0),
          transactions.filter(t => t.type === 'expense').reduce((acc, t) => acc + t.amount, 0),
        ],
        backgroundColor: ['rgba(54, 162, 235, 0.5)', 'rgba(255, 99, 132, 0.5)'],
        borderColor: ['rgba(54, 162, 235, 1)', 'rgba(255, 99, 132, 1)'],
        borderWidth: 1,
        hoverBackgroundColor: ['rgba(54, 162, 235, 0.7)', 'rgba(255, 99, 132, 0.7)'],
        hoverBorderColor: ['rgba(54, 162, 235, 1)', 'rgba(255, 99, 132, 1)'],
      },
    ],
  };

  // Data for Pie chart
  const expenseCategories = transactions
    .filter(t => t.type === 'expense')
    .reduce((acc, t) => {
      acc[t.category] = (acc[t.category] || 0) + t.amount;
      return acc;
    }, {});

  const pieChartData = {
    labels: Object.keys(expenseCategories),
    datasets: [
      {
        data: Object.values(expenseCategories),
        backgroundColor: [
          'rgba(255, 99, 132, 0.5)',
          'rgba(54, 162, 235, 0.5)',
          'rgba(75, 192, 192, 0.5)',
          'rgba(153, 102, 255, 0.5)',
          'rgba(255, 159, 64, 0.5)',
          'rgba(255, 206, 86, 0.5)',
        ],
        borderColor: [
          'rgba(255, 99, 132, 1)',
          'rgba(54, 162, 235, 1)',
          'rgba(75, 192, 192, 1)',
          'rgba(153, 102, 255, 1)',
          'rgba(255, 159, 64, 1)',
          'rgba(255, 206, 86, 1)',
        ],
        borderWidth: 1,
      },
    ],
  };

  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: 'top',
      },
      tooltip: {
        callbacks: {
          label: function (tooltipItem) {
            return `${tooltipItem.label}: $${tooltipItem.raw}`;
          }
        }
      }
    },
    scales: {
      x: {
        title: {
          display: true,
          text: 'Categories',
        },
      },
      y: {
        title: {
          display: true,
          text: 'Amount ($)',
        },
        beginAtZero: true,
      },
    },
  };

  return (
    <div className="p-6">
      <TransactionForm addTransaction={addTransaction} />
      <div className="my-12 flex flex-col md:flex-row justify-center items-center gap-x-12">
        <div className="w-full md:w-1/2 text-center mb-8 md:mb-0">
          <h3 className="mb-4 text-lg font-medium">Income vs Expenses</h3>
          <Bar data={barChartData} options={options} />
        </div>
        <div className="w-full md:w-1/4 text-center">
          <h3 className="mb-4 text-lg font-medium">Expense Breakdown</h3>
          <Pie data={pieChartData} />
        </div>
      </div>
      <Summary summary={getSummary()} />
      <TransactionList transactions={transactions} setTransactions={setTransactions} />
    </div>
  );
}

export default HomePage;
