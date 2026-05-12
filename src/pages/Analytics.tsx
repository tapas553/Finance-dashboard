import React from 'react';
import { ExpensePieChart } from '../components/charts/ExpensePieChart';
import { MonthlyBarChart } from '../components/charts/MonthlyBarChart';
import { useFinance } from '../context/FinanceContext';
import { formatCurrency } from '../utils';

export const Analytics: React.FC = () => {
  const { totalIncome, totalExpense, transactions, categories, currency } = useFinance();
  const savingsRate = totalIncome > 0 ? ((totalIncome - totalExpense) / totalIncome) * 100 : 0;

  const expensesByCategory = Object.values(
    transactions.reduce((acc, t) => {
      if (t.type === 'expense') {
        const cat = categories.find(c => c.id === t.categoryId);
        const name = cat ? cat.name : 'Uncategorized';
        if (!acc[name]) {
          acc[name] = { name, amount: 0, percentage: 0 };
        }
        acc[name].amount += t.amount;
      }
      return acc;
    }, {} as Record<string, { name: string; amount: number; percentage: number }>)
  ).map(item => {
    item.percentage = totalExpense > 0 ? (item.amount / totalExpense) * 100 : 0;
    return item;
  }).sort((a, b) => b.amount - a.amount);

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold text-slate-900 dark:text-white">Analytics</h1>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <div className="glass-card p-6 flex flex-col items-center justify-center text-center">
          <h3 className="text-sm font-medium text-slate-500 dark:text-slate-400 mb-2">Total Income vs Expense</h3>
          <div className="w-full bg-slate-100 dark:bg-dark-border h-3 rounded-full overflow-hidden mt-2 flex">
            <div 
              className="bg-green-500 h-full" 
              style={{ width: `${(totalIncome / (totalIncome + totalExpense || 1)) * 100}%` }}
            ></div>
            <div 
              className="bg-red-500 h-full" 
              style={{ width: `${(totalExpense / (totalIncome + totalExpense || 1)) * 100}%` }}
            ></div>
          </div>
          <div className="flex justify-between w-full mt-2 text-xs text-slate-500">
            <span>{formatCurrency(totalIncome, currency)}</span>
            <span>{formatCurrency(totalExpense, currency)}</span>
          </div>
        </div>

        <div className="glass-card p-6 flex flex-col items-center justify-center text-center">
          <h3 className="text-sm font-medium text-slate-500 dark:text-slate-400 mb-2">Savings Rate</h3>
          <div className="text-3xl font-bold text-brand-600 dark:text-brand-500">
            {savingsRate.toFixed(1)}%
          </div>
          <p className="text-xs text-slate-400 mt-1">of total income</p>
        </div>

        <div className="glass-card p-6 flex flex-col items-center justify-center text-center">
          <h3 className="text-sm font-medium text-slate-500 dark:text-slate-400 mb-2">Expenses by Category</h3>
          <select className="w-full px-3 py-2 bg-slate-50 dark:bg-dark-bg border border-slate-200 dark:border-dark-border rounded-lg text-sm text-slate-900 dark:text-white outline-none focus:ring-2 focus:ring-brand-500">
            {expensesByCategory.length === 0 && <option>No expenses yet</option>}
            {expensesByCategory.map((c, i) => (
              <option key={i} value={c.name}>
                {c.name} - {c.percentage.toFixed(1)}%
              </option>
            ))}
          </select>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <MonthlyBarChart />
        <ExpensePieChart />
      </div>
    </div>
  );
};
