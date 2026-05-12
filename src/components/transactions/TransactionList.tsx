import React, { useState } from 'react';
import { useFinance } from '../../context/FinanceContext';
import { formatCurrency } from '../../utils';
import { format } from 'date-fns';
import { ArrowDownRight, ArrowUpRight, MoreVertical, Edit2, Trash2 } from 'lucide-react';
import { Transaction } from '../../types';

interface TransactionListProps {
  onEdit: (t: Transaction) => void;
  searchTerm: string;
  filterType: string;
}

export const TransactionList: React.FC<TransactionListProps> = ({ onEdit, searchTerm, filterType }) => {
  const { transactions, categories, deleteTransaction, currency } = useFinance();
  const [activeMenu, setActiveMenu] = useState<string | null>(null);

  const filteredTransactions = transactions
    .filter(t => {
      const matchesSearch = t.note.toLowerCase().includes(searchTerm.toLowerCase());
      const matchesType = filterType === 'all' ? true : t.type === filterType;
      return matchesSearch && matchesType;
    })
    .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());

  return (
    <div className="glass-card overflow-hidden">
      <div className="overflow-x-auto">
        <table className="w-full text-left text-sm text-slate-500 dark:text-slate-400">
          <thead className="text-xs text-slate-700 uppercase bg-slate-50 dark:bg-dark-bg/50 dark:text-slate-300">
            <tr>
              <th scope="col" className="px-6 py-4 font-medium">Transaction</th>
              <th scope="col" className="px-6 py-4 font-medium">Category</th>
              <th scope="col" className="px-6 py-4 font-medium">Date</th>
              <th scope="col" className="px-6 py-4 font-medium text-right">Amount</th>
              <th scope="col" className="px-6 py-4 font-medium text-center">Action</th>
            </tr>
          </thead>
          <tbody>
            {filteredTransactions.length === 0 ? (
              <tr>
                <td colSpan={5} className="px-6 py-8 text-center">
                  No transactions found.
                </td>
              </tr>
            ) : (
              filteredTransactions.map(t => {
                const category = categories.find(c => c.id === t.categoryId);
                const isIncome = t.type === 'income';

                return (
                  <tr key={t.id} className="border-b border-slate-200 dark:border-dark-border hover:bg-slate-50 dark:hover:bg-dark-border/30 transition-colors">
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center gap-3">
                        <div 
                          className="w-8 h-8 rounded-full flex items-center justify-center text-white shrink-0"
                          style={{ backgroundColor: category?.color || '#cbd5e1' }}
                        >
                          {isIncome ? <ArrowUpRight size={14} /> : <ArrowDownRight size={14} />}
                        </div>
                        <span className="font-medium text-slate-900 dark:text-white">{t.note}</span>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <span className="px-2.5 py-1 rounded-full text-xs font-medium border"
                        style={{ 
                          backgroundColor: `${category?.color}15`, 
                          color: category?.color,
                          borderColor: `${category?.color}30`
                        }}>
                        {category?.name || 'Unknown'}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      {format(new Date(t.date), 'MMM dd, yyyy')}
                    </td>
                    <td className={`px-6 py-4 whitespace-nowrap text-right font-semibold ${isIncome ? 'text-green-600 dark:text-green-500' : 'text-slate-900 dark:text-white'}`}>
                      {isIncome ? '+' : '-'}{formatCurrency(t.amount, currency)}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-center relative">
                      <button 
                        onClick={() => setActiveMenu(activeMenu === t.id ? null : t.id)}
                        className="p-1.5 text-slate-400 hover:text-slate-600 dark:hover:text-slate-300 rounded-md hover:bg-slate-100 dark:hover:bg-dark-bg transition-colors"
                      >
                        <MoreVertical size={16} />
                      </button>
                      
                      {activeMenu === t.id && (
                        <div className="absolute right-10 top-4 w-32 bg-white dark:bg-dark-card rounded-lg shadow-lg border border-slate-200 dark:border-dark-border z-10 overflow-hidden">
                          <button 
                            onClick={() => { onEdit(t); setActiveMenu(null); }}
                            className="w-full text-left px-4 py-2 text-sm text-slate-700 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-dark-border flex items-center gap-2"
                          >
                            <Edit2 size={14} /> Edit
                          </button>
                          <button 
                            onClick={() => { deleteTransaction(t.id); setActiveMenu(null); }}
                            className="w-full text-left px-4 py-2 text-sm text-red-600 hover:bg-red-50 dark:hover:bg-red-900/20 flex items-center gap-2"
                          >
                            <Trash2 size={14} /> Delete
                          </button>
                        </div>
                      )}
                    </td>
                  </tr>
                );
              })
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};
