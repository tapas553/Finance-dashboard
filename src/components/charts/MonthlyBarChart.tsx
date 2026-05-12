import React, { useMemo } from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend } from 'recharts';
import { useFinance } from '../../context/FinanceContext';
import { formatCurrency } from '../../utils';
import { format, subMonths, startOfMonth, endOfMonth, isWithinInterval } from 'date-fns';

export const MonthlyBarChart: React.FC = () => {
  const { transactions, theme, currency } = useFinance();

  const data = useMemo(() => {
    const last6Months = Array.from({ length: 6 }).map((_, i) => {
      const date = subMonths(new Date(), i);
      return {
        month: format(date, 'MMM'),
        start: startOfMonth(date),
        end: endOfMonth(date),
        income: 0,
        expense: 0,
      };
    }).reverse();

    transactions.forEach(t => {
      const tDate = new Date(t.date);
      const monthData = last6Months.find(m => isWithinInterval(tDate, { start: m.start, end: m.end }));
      if (monthData) {
        if (t.type === 'income') monthData.income += t.amount;
        else monthData.expense += t.amount;
      }
    });

    return last6Months;
  }, [transactions]);

  const textColor = theme === 'dark' ? '#94a3b8' : '#64748b';
  const gridColor = theme === 'dark' ? '#334155' : '#e2e8f0';
  const tooltipBg = theme === 'dark' ? '#1e293b' : '#ffffff';
  const tooltipText = theme === 'dark' ? '#f8fafc' : '#0f172a';

  return (
    <div className="glass-card p-6 h-96 flex flex-col">
      <h2 className="text-lg font-semibold text-slate-900 dark:text-white mb-4">Cash Flow (Last 6 Months)</h2>
      <div className="flex-1 min-h-0">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={data} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
            <CartesianGrid strokeDasharray="3 3" vertical={false} stroke={gridColor} />
            <XAxis dataKey="month" axisLine={false} tickLine={false} tick={{ fill: textColor, fontSize: 12 }} dy={10} />
            <YAxis axisLine={false} tickLine={false} tick={{ fill: textColor, fontSize: 12 }} tickFormatter={(val) => formatCurrency(val, currency)} />
            <Tooltip 
              cursor={{ fill: theme === 'dark' ? '#334155' : '#f1f5f9' }}
              contentStyle={{ backgroundColor: tooltipBg, borderColor: 'transparent', borderRadius: '8px', color: tooltipText }}
              formatter={(value: number) => [formatCurrency(value, currency), '']}
            />
            <Legend iconType="circle" wrapperStyle={{ paddingTop: '20px' }} />
            <Bar dataKey="income" name="Income" fill="#22c55e" radius={[4, 4, 0, 0]} barSize={20} />
            <Bar dataKey="expense" name="Expense" fill="#ef4444" radius={[4, 4, 0, 0]} barSize={20} />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};
