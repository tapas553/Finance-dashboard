import React from 'react';
import { Link } from 'react-router-dom';
import { BalanceCards } from '../components/dashboard/BalanceCards';
import { RecentTransactions } from '../components/dashboard/RecentTransactions';
import { ExpensePieChart } from '../components/charts/ExpensePieChart';
import { MonthlyBarChart } from '../components/charts/MonthlyBarChart';

export const Dashboard: React.FC = () => {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold text-slate-900 dark:text-white">Dashboard Overview</h1>
        <div className="flex gap-2">
          <Link to="/transactions" className="px-4 py-2 bg-brand-600 hover:bg-brand-700 text-white text-sm font-medium rounded-lg transition-colors shadow-sm flex items-center justify-center">
            + Add Transaction
          </Link>
        </div>
      </div>

      <BalanceCards />

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <MonthlyBarChart />
        <ExpensePieChart />
      </div>

      <div className="grid grid-cols-1 gap-6">
        <RecentTransactions />
      </div>
    </div>
  );
};
