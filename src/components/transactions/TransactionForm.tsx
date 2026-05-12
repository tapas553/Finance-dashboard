import React, { useState } from 'react';
import { useFinance } from '../../context/FinanceContext';
import { Transaction, TransactionType } from '../../types';
import { generateId } from '../../utils';
import { X, Plus, Check } from 'lucide-react';

interface TransactionFormProps {
  onClose: () => void;
  editTransaction?: Transaction;
}

export const TransactionForm: React.FC<TransactionFormProps> = ({ onClose, editTransaction }) => {
  const { categories, addTransaction, updateTransaction, currency, setCurrency } = useFinance();
  
  const [type, setType] = useState<TransactionType>(editTransaction?.type || 'expense');
  const [amount, setAmount] = useState(editTransaction?.amount.toString() || '');
  const [categoryId, setCategoryId] = useState(editTransaction?.categoryId || '');
  const [date, setDate] = useState(editTransaction ? new Date(editTransaction.date).toISOString().split('T')[0] : new Date().toISOString().split('T')[0]);
  const [note, setNote] = useState(editTransaction?.note || '');
  
  const [isAddingCategory, setIsAddingCategory] = useState(false);
  const [newCategoryName, setNewCategoryName] = useState('');
  const [error, setError] = useState<string>('');
  
  const { addCategory } = useFinance();

  const filteredCategories = categories.filter(c => 
    type === 'income' ? c.name.toLowerCase().includes('salary') || c.name.toLowerCase().includes('income') || c.id === '7'
    : c.id !== '7'
  );

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    if (!amount || !categoryId || !date) {
      setError('Please fill in all required fields.');
      return;
    }

    const parsedAmount = parseFloat(amount);
    if (isNaN(parsedAmount) || parsedAmount <= 0) {
      setError('Please enter a valid amount greater than 0.');
      return;
    }

    if (note.length > 200) {
      setError('Note cannot exceed 200 characters.');
      return;
    }

    const transaction: Transaction = {
      id: editTransaction?.id || generateId(),
      amount: parsedAmount,
      type,
      categoryId,
      date: new Date(date).toISOString(),
      note: note.trim(),
    };

    if (editTransaction) {
      updateTransaction(transaction);
    } else {
      addTransaction(transaction);
    }
    onClose();
  };

  const handleAddCategory = () => {
    setError('');
    const trimmedName = newCategoryName.trim();
    if (!trimmedName) {
      setError('Category name cannot be empty.');
      return;
    }
    if (trimmedName.length > 50) {
      setError('Category name cannot exceed 50 characters.');
      return;
    }

    const defaultColor = type === 'income' ? '#22c55e' : '#ef4444';
    // Ensure color is a valid hex before saving
    const colorPattern = /^#[0-9A-Fa-f]{6}$/;
    const validColor = colorPattern.test(defaultColor) ? defaultColor : '#94a3b8';

    const newCat = {
      id: generateId(),
      name: trimmedName,
      color: validColor
    };
    addCategory(newCat);
    setCategoryId(newCat.id);
    setIsAddingCategory(false);
    setNewCategoryName('');
  };

  return (
    <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4 backdrop-blur-sm">
      <div className="bg-white dark:bg-dark-card rounded-2xl w-full max-w-md shadow-xl overflow-hidden border border-slate-200 dark:border-dark-border">
        <div className="flex justify-between items-center p-6 border-b border-slate-200 dark:border-dark-border">
          <h2 className="text-xl font-semibold text-slate-900 dark:text-white">
            {editTransaction ? 'Edit Transaction' : 'Add Transaction'}
          </h2>
          <button onClick={onClose} className="text-slate-500 hover:text-slate-700 dark:text-slate-400 dark:hover:text-white">
            <X size={24} />
          </button>
        </div>
        
        <form onSubmit={handleSubmit} className="p-6 space-y-4">
          {error && (
            <div className="p-3 bg-red-50 dark:bg-red-900/20 text-red-600 dark:text-red-400 rounded-lg text-sm">
              {error}
            </div>
          )}
          <div className="flex p-1 bg-slate-100 dark:bg-dark-bg rounded-lg">
            <button
              type="button"
              className={`flex-1 py-2 text-sm font-medium rounded-md transition-colors ${type === 'expense' ? 'bg-white dark:bg-dark-card shadow-sm text-slate-900 dark:text-white' : 'text-slate-500 dark:text-slate-400'}`}
              onClick={() => setType('expense')}
            >
              Expense
            </button>
            <button
              type="button"
              className={`flex-1 py-2 text-sm font-medium rounded-md transition-colors ${type === 'income' ? 'bg-white dark:bg-dark-card shadow-sm text-slate-900 dark:text-white' : 'text-slate-500 dark:text-slate-400'}`}
              onClick={() => setType('income')}
            >
              Income
            </button>
          </div>

          <div>
            <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1">Amount</label>
            <div className="relative flex items-center">
              <select
                value={currency}
                onChange={(e) => setCurrency(e.target.value)}
                className="absolute left-0 top-0 bottom-0 px-3 bg-transparent border-r border-slate-200 dark:border-dark-border text-slate-500 text-sm outline-none focus:ring-0 appearance-none cursor-pointer"
                style={{ WebkitAppearance: 'none', MozAppearance: 'none' }}
              >
                <option value="USD">$</option>
                <option value="EUR">€</option>
                <option value="GBP">£</option>
                <option value="INR">₹</option>
                <option value="JPY">¥</option>
              </select>
              <input
                type="number"
                step="0.01"
                min="0"
                value={amount}
                onChange={(e) => setAmount(e.target.value)}
                className="w-full pl-14 pr-4 py-2 bg-slate-50 dark:bg-dark-bg border border-slate-200 dark:border-dark-border rounded-lg focus:ring-2 focus:ring-brand-500 outline-none text-slate-900 dark:text-white"
                placeholder="0.00"
                required
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1">Category</label>
            {!isAddingCategory ? (
              <div className="flex gap-2">
                <select
                  value={categoryId}
                  onChange={(e) => setCategoryId(e.target.value)}
                  className="flex-1 px-4 py-2 bg-slate-50 dark:bg-dark-bg border border-slate-200 dark:border-dark-border rounded-lg focus:ring-2 focus:ring-brand-500 outline-none text-slate-900 dark:text-white"
                  required
                >
                  <option value="">Select a category</option>
                  {filteredCategories.map(c => (
                    <option key={c.id} value={c.id}>{c.name}</option>
                  ))}
                </select>
                <button
                  type="button"
                  onClick={() => setIsAddingCategory(true)}
                  className="px-3 py-2 bg-slate-100 dark:bg-dark-border text-slate-700 dark:text-slate-300 rounded-lg hover:bg-slate-200 dark:hover:bg-slate-700 transition-colors flex items-center gap-1 text-sm font-medium whitespace-nowrap"
                >
                  <Plus size={16} /> Add Category
                </button>
              </div>
            ) : (
              <div className="flex gap-2">
                <input
                  type="text"
                  value={newCategoryName}
                  onChange={(e) => setNewCategoryName(e.target.value)}
                  placeholder="New Category Name"
                  className="flex-1 px-4 py-2 bg-slate-50 dark:bg-dark-bg border border-slate-200 dark:border-dark-border rounded-lg focus:ring-2 focus:ring-brand-500 outline-none text-slate-900 dark:text-white"
                  autoFocus
                />
                <button
                  type="button"
                  onClick={handleAddCategory}
                  className="p-2 bg-brand-600 hover:bg-brand-700 text-white rounded-lg transition-colors"
                >
                  <Check size={20} />
                </button>
                <button
                  type="button"
                  onClick={() => setIsAddingCategory(false)}
                  className="p-2 bg-slate-100 dark:bg-dark-border text-slate-700 dark:text-slate-300 rounded-lg hover:bg-slate-200 dark:hover:bg-slate-700 transition-colors"
                >
                  <X size={20} />
                </button>
              </div>
            )}
          </div>

          <div>
            <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1">Date</label>
            <input
              type="date"
              value={date}
              onChange={(e) => setDate(e.target.value)}
              className="w-full px-4 py-2 bg-slate-50 dark:bg-dark-bg border border-slate-200 dark:border-dark-border rounded-lg focus:ring-2 focus:ring-brand-500 outline-none text-slate-900 dark:text-white"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1">Note</label>
            <input
              type="text"
              value={note}
              onChange={(e) => setNote(e.target.value)}
              className="w-full px-4 py-2 bg-slate-50 dark:bg-dark-bg border border-slate-200 dark:border-dark-border rounded-lg focus:ring-2 focus:ring-brand-500 outline-none text-slate-900 dark:text-white"
              placeholder="What was this for? (Optional)"
            />
          </div>

          <div className="pt-4 flex gap-3">
            <button
              type="button"
              onClick={onClose}
              className="flex-1 px-4 py-2 bg-slate-100 dark:bg-dark-border text-slate-700 dark:text-slate-300 rounded-lg hover:bg-slate-200 dark:hover:bg-slate-700 transition-colors font-medium"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="flex-1 px-4 py-2 bg-brand-600 hover:bg-brand-700 text-white rounded-lg transition-colors font-medium shadow-sm"
            >
              {editTransaction ? 'Save Changes' : 'Add Transaction'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
