import React, { useState } from 'react';
import { useFinance } from '../context/FinanceContext';
import { generateId } from '../utils';
import { Trash2, Plus, Download } from 'lucide-react';

export const Settings: React.FC = () => {
  const { categories, addCategory, deleteCategory, transactions, currency, setCurrency } = useFinance();
  const [newCatName, setNewCatName] = useState('');
  const [newCatColor, setNewCatColor] = useState('#3b82f6');

  const handleAddCategory = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newCatName) return;
    
    addCategory({
      id: generateId(),
      name: newCatName,
      color: newCatColor,
    });
    setNewCatName('');
  };

  const handleExportCSV = () => {
    const headers = ['Date', 'Type', 'Amount', 'Category', 'Note'];
    const rows = transactions.map(t => {
      const cat = categories.find(c => c.id === t.categoryId)?.name || 'Unknown';
      return [t.date.split('T')[0], t.type, t.amount.toString(), cat, t.note];
    });
    
    const csvContent = [headers.join(','), ...rows.map(r => r.join(','))].join('\n');
    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const link = document.createElement('a');
    const url = URL.createObjectURL(blob);
    link.setAttribute('href', url);
    link.setAttribute('download', 'transactions.csv');
    link.style.visibility = 'hidden';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div className="space-y-8 max-w-4xl">
      <div>
        <h1 className="text-2xl font-bold text-slate-900 dark:text-white mb-6">Settings</h1>
      </div>

      <div className="glass-card p-6">
        <h2 className="text-lg font-semibold text-slate-900 dark:text-white mb-4">Manage Categories</h2>
        
        <form onSubmit={handleAddCategory} className="flex gap-4 mb-6">
          <input
            type="text"
            value={newCatName}
            onChange={(e) => setNewCatName(e.target.value)}
            placeholder="New Category Name"
            className="flex-1 px-4 py-2 bg-slate-50 dark:bg-dark-bg border border-slate-200 dark:border-dark-border rounded-lg focus:ring-2 focus:ring-brand-500 outline-none text-slate-900 dark:text-white"
          />
          <input
            type="color"
            value={newCatColor}
            onChange={(e) => setNewCatColor(e.target.value)}
            className="w-12 h-10 p-1 bg-slate-50 dark:bg-dark-bg border border-slate-200 dark:border-dark-border rounded-lg cursor-pointer"
          />
          <button 
            type="submit"
            className="px-4 py-2 bg-slate-900 dark:bg-brand-600 hover:bg-slate-800 dark:hover:bg-brand-700 text-white rounded-lg transition-colors flex items-center gap-2 font-medium"
          >
            <Plus size={18} /> Add
          </button>
        </form>

        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
          {categories.map(c => (
            <div key={c.id} className="flex items-center justify-between p-3 border border-slate-200 dark:border-dark-border rounded-lg">
              <div className="flex items-center gap-3">
                <div className="w-4 h-4 rounded-full" style={{ backgroundColor: c.color }}></div>
                <span className="text-sm font-medium text-slate-700 dark:text-slate-300">{c.name}</span>
              </div>
              {c.id !== '7' && ( // Prevent deleting default Salary category for dummy data safety
                <button 
                  onClick={() => deleteCategory(c.id)}
                  className="text-slate-400 hover:text-red-500 transition-colors"
                >
                  <Trash2 size={16} />
                </button>
              )}
            </div>
          ))}
        </div>
      </div>

      <div className="glass-card p-6 flex items-center justify-between">
        <div>
          <h2 className="text-lg font-semibold text-slate-900 dark:text-white mb-1">Currency Preferences</h2>
          <p className="text-sm text-slate-500 dark:text-slate-400">Choose your default currency</p>
        </div>
        <select
          value={currency}
          onChange={(e) => setCurrency(e.target.value)}
          className="px-4 py-2 bg-slate-50 dark:bg-dark-bg border border-slate-200 dark:border-dark-border rounded-lg focus:ring-2 focus:ring-brand-500 outline-none text-slate-900 dark:text-white"
        >
          <option value="USD">USD ($)</option>
          <option value="EUR">EUR (€)</option>
          <option value="GBP">GBP (£)</option>
          <option value="INR">INR (₹)</option>
          <option value="JPY">JPY (¥)</option>
        </select>
      </div>

      <div className="glass-card p-6 flex items-center justify-between">
        <div>
          <h2 className="text-lg font-semibold text-slate-900 dark:text-white mb-1">Export Data</h2>
          <p className="text-sm text-slate-500 dark:text-slate-400">Download all your transactions as a CSV file</p>
        </div>
        <button 
          onClick={handleExportCSV}
          className="px-4 py-2 bg-slate-100 dark:bg-dark-border hover:bg-slate-200 dark:hover:bg-slate-700 text-slate-900 dark:text-white rounded-lg transition-colors flex items-center gap-2 font-medium"
        >
          <Download size={18} /> Export CSV
        </button>
      </div>
    </div>
  );
};
