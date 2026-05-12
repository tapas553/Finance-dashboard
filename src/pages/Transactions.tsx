import React, { useState } from 'react';
import { TransactionList } from '../components/transactions/TransactionList';
import { TransactionForm } from '../components/transactions/TransactionForm';
import { Transaction } from '../types';
import { Filter, Search, Plus } from 'lucide-react';
import { AnimatePresence } from 'framer-motion';

export const Transactions: React.FC = () => {
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [editingTransaction, setEditingTransaction] = useState<Transaction | undefined>();
  const [searchTerm, setSearchTerm] = useState('');
  const [filterType, setFilterType] = useState('all');

  const handleEdit = (t: Transaction) => {
    setEditingTransaction(t);
    setIsFormOpen(true);
  };

  const handleCloseForm = () => {
    setIsFormOpen(false);
    setEditingTransaction(undefined);
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <h1 className="text-2xl font-bold text-slate-900 dark:text-white">Transactions History</h1>
        <button 
          onClick={() => setIsFormOpen(true)}
          className="px-4 py-2 bg-brand-600 hover:bg-brand-700 text-white text-sm font-medium rounded-lg transition-colors shadow-sm flex items-center gap-2"
        >
          <Plus size={18} /> Add Transaction
        </button>
      </div>

      <div className="flex flex-col sm:flex-row gap-4">
        <div className="relative flex-1">
          <Search size={18} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
          <input
            type="text"
            placeholder="Search transactions..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-10 pr-4 py-2 bg-white dark:bg-dark-card border border-slate-200 dark:border-dark-border rounded-lg focus:ring-2 focus:ring-brand-500 outline-none text-slate-900 dark:text-white"
          />
        </div>
        <div className="relative w-full sm:w-48 shrink-0">
          <Filter size={18} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
          <select
            value={filterType}
            onChange={(e) => setFilterType(e.target.value)}
            className="w-full pl-10 pr-4 py-2 bg-white dark:bg-dark-card border border-slate-200 dark:border-dark-border rounded-lg focus:ring-2 focus:ring-brand-500 outline-none text-slate-900 dark:text-white appearance-none"
          >
            <option value="all">All Types</option>
            <option value="income">Income Only</option>
            <option value="expense">Expense Only</option>
          </select>
        </div>
      </div>

      <TransactionList 
        onEdit={handleEdit} 
        searchTerm={searchTerm} 
        filterType={filterType} 
      />

      <AnimatePresence>
        {isFormOpen && (
          <TransactionForm 
            onClose={handleCloseForm} 
            editTransaction={editingTransaction} 
          />
        )}
      </AnimatePresence>
    </div>
  );
};
