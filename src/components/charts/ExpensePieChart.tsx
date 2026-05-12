import React from 'react';
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip, Legend } from 'recharts';
import { useFinance } from '../../context/FinanceContext';
import { formatCurrency } from '../../utils';

export const ExpensePieChart: React.FC = () => {
  const { transactions, categories, theme, currency } = useFinance();

  const expenseData = Object.values(
    transactions.reduce((acc, t) => {
      if (t.type === 'expense') {
        const cat = categories.find(c => c.id === t.categoryId);
        const name = cat ? cat.name : 'Uncategorized';
        const color = cat ? cat.color : '#94a3b8';
        if (!acc[name]) {
          acc[name] = { name, value: 0, color };
        }
        acc[name].value += t.amount;
      }
      return acc;
    }, {} as Record<string, { name: string; value: number; color: string }>)
  ).filter(d => d.value > 0);

  if (expenseData.length === 0) {
    return (
      <div className="glass-card p-6 h-80 flex items-center justify-center">
        <p className="text-slate-500 dark:text-slate-400">No expense data available.</p>
      </div>
    );
  }

  const textColor = theme === 'dark' ? '#f8fafc' : '#0f172a';
  const tooltipBg = theme === 'dark' ? '#1e293b' : '#ffffff';

  return (
    <div className="glass-card p-6 h-96 flex flex-col">
      <h2 className="text-lg font-semibold text-slate-900 dark:text-white mb-4">Expenses by Category</h2>
      <div className="flex-1 min-h-0">
        <ResponsiveContainer width="100%" height="100%">
          <PieChart>
            <Pie
              data={expenseData}
              cx="50%"
              cy="50%"
              innerRadius={60}
              outerRadius={100}
              paddingAngle={5}
              dataKey="value"
              stroke="none"
              label={({ name }) => name}
              labelLine={{ stroke: textColor, strokeWidth: 1, opacity: 0.5 }}
            >
              {expenseData.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={entry.color} />
              ))}
            </Pie>
            <Tooltip 
              formatter={(value: number) => [formatCurrency(value, currency), 'Amount']}
              contentStyle={{ backgroundColor: tooltipBg, borderColor: 'transparent', borderRadius: '8px', color: textColor }}
              itemStyle={{ color: textColor }}
            />
            <Legend verticalAlign="bottom" height={36} />
          </PieChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};
