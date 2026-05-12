import React from 'react';
import { ArrowDownRight, ArrowUpRight, Wallet } from 'lucide-react';
import { useFinance } from '../../context/FinanceContext';
import { formatCurrency } from '../../utils';
import { motion } from 'framer-motion';

export const BalanceCards: React.FC = () => {
  const { totalIncome, totalExpense, balance, currency } = useFinance();

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3 }}
        className="glass-card p-6 relative overflow-hidden"
      >
        <div className="absolute -right-6 -top-6 w-24 h-24 bg-brand-500/10 dark:bg-brand-500/20 rounded-full blur-2xl"></div>
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-sm font-medium text-slate-500 dark:text-slate-400">Total Balance</h3>
          <div className="p-2 bg-brand-50 dark:bg-brand-900/30 text-brand-600 dark:text-brand-500 rounded-lg">
            <Wallet size={20} />
          </div>
        </div>
        <div className="text-3xl font-bold text-slate-900 dark:text-white mb-1">
          {formatCurrency(balance, currency)}
        </div>
        <p className="text-sm text-slate-500 dark:text-slate-400">Across all accounts</p>
      </motion.div>

      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3, delay: 0.1 }}
        className="glass-card p-6 relative overflow-hidden"
      >
        <div className="absolute -right-6 -top-6 w-24 h-24 bg-green-500/10 dark:bg-green-500/20 rounded-full blur-2xl"></div>
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-sm font-medium text-slate-500 dark:text-slate-400">Total Income</h3>
          <div className="p-2 bg-green-50 dark:bg-green-900/30 text-green-600 dark:text-green-500 rounded-lg">
            <ArrowUpRight size={20} />
          </div>
        </div>
        <div className="text-3xl font-bold text-slate-900 dark:text-white mb-1">
          {formatCurrency(totalIncome, currency)}
        </div>
        <p className="text-sm text-green-600 dark:text-green-500 flex items-center gap-1">
          <span>+2.5%</span> from last month
        </p>
      </motion.div>

      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3, delay: 0.2 }}
        className="glass-card p-6 relative overflow-hidden"
      >
        <div className="absolute -right-6 -top-6 w-24 h-24 bg-red-500/10 dark:bg-red-500/20 rounded-full blur-2xl"></div>
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-sm font-medium text-slate-500 dark:text-slate-400">Total Expenses</h3>
          <div className="p-2 bg-red-50 dark:bg-red-900/30 text-red-600 dark:text-red-500 rounded-lg">
            <ArrowDownRight size={20} />
          </div>
        </div>
        <div className="text-3xl font-bold text-slate-900 dark:text-white mb-1">
          {formatCurrency(totalExpense, currency)}
        </div>
        <p className="text-sm text-red-600 dark:text-red-500 flex items-center gap-1">
          <span>+1.2%</span> from last month
        </p>
      </motion.div>
    </div>
  );
};
