import React from 'react';
import { useFinance } from '../../context/FinanceContext';
import { formatCurrency } from '../../utils';
import { format } from 'date-fns';
import { ArrowDownRight, ArrowUpRight } from 'lucide-react';

export const RecentTransactions: React.FC = () => {
  const { transactions, categories, currency } = useFinance();
  
  // Sort by date descending and take top 5
  const recent = [...transactions].sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()).slice(0, 5);

  return (
    <div className="glass-card p-6">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-lg font-semibold text-slate-900 dark:text-white">Recent Transactions</h2>
        <button className="text-sm text-brand-600 dark:text-brand-500 hover:underline font-medium">View All</button>
      </div>
      
      <div className="space-y-4">
        {recent.length === 0 ? (
          <p className="text-sm text-slate-500 dark:text-slate-400 text-center py-4">No recent transactions</p>
        ) : (
          recent.map(t => {
            const category = categories.find(c => c.id === t.categoryId);
            const isIncome = t.type === 'income';
            
            return (
              <div key={t.id} className="flex items-center justify-between p-3 hover:bg-slate-50 dark:hover:bg-dark-border/50 rounded-xl transition-colors">
                <div className="flex items-center gap-4">
                  <div 
                    className="w-10 h-10 rounded-full flex items-center justify-center text-white"
                    style={{ backgroundColor: category?.color || '#cbd5e1' }}
                  >
                    {isIncome ? <ArrowUpRight size={18} /> : <ArrowDownRight size={18} />}
                  </div>
                  <div>
                    <h4 className="text-sm font-medium text-slate-900 dark:text-white">{t.note}</h4>
                    <p className="text-xs text-slate-500 dark:text-slate-400">{format(new Date(t.date), 'MMM dd, yyyy')}</p>
                  </div>
                </div>
                <div className={`text-sm font-semibold ${isIncome ? 'text-green-600 dark:text-green-500' : 'text-slate-900 dark:text-white'}`}>
                  {isIncome ? '+' : '-'}{formatCurrency(t.amount, currency)}
                </div>
              </div>
            );
          })
        )}
      </div>
    </div>
  );
};
