import React, { createContext, useContext, useEffect, useMemo } from 'react';
import { useLocalStorage } from '../hooks/useLocalStorage';
import { AppState, Transaction, Category } from '../types';

const defaultCategories: Category[] = [
  { id: '1', name: 'Food', color: '#ef4444', icon: 'pizza' },
  { id: '2', name: 'Travel', color: '#3b82f6', icon: 'plane' },
  { id: '3', name: 'Bills', color: '#eab308', icon: 'file-text' },
  { id: '4', name: 'Petrol', color: '#f97316', icon: 'fuel' },
  { id: '5', name: 'Shopping', color: '#ec4899', icon: 'shopping-bag' },
  { id: '6', name: 'Entertainment', color: '#8b5cf6', icon: 'film' },
  { id: '7', name: 'Salary', color: '#22c55e', icon: 'briefcase' },
];

const dummyTransactions: Transaction[] = [
  { id: 't1', amount: 5000, type: 'income', categoryId: '7', date: new Date(Date.now() - 86400000 * 5).toISOString(), note: 'Monthly Salary' },
  { id: 't2', amount: 120, type: 'expense', categoryId: '1', date: new Date(Date.now() - 86400000 * 2).toISOString(), note: 'Groceries' },
  { id: 't3', amount: 50, type: 'expense', categoryId: '4', date: new Date(Date.now() - 86400000 * 1).toISOString(), note: 'Gas Station' },
  { id: 't4', amount: 200, type: 'expense', categoryId: '5', date: new Date().toISOString(), note: 'New Shoes' },
];

interface FinanceContextType extends AppState {
  addTransaction: (t: Transaction) => void;
  updateTransaction: (t: Transaction) => void;
  deleteTransaction: (id: string) => void;
  addCategory: (c: Category) => void;
  deleteCategory: (id: string) => void;
  setTheme: (theme: 'light' | 'dark') => void;
  setCurrency: (currency: string) => void;
  totalIncome: number;
  totalExpense: number;
  balance: number;
}

const FinanceContext = createContext<FinanceContextType | undefined>(undefined);

export const FinanceProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [state, setState] = useLocalStorage<AppState>('finance-app-state', {
    transactions: dummyTransactions,
    categories: defaultCategories,
    budgetGoals: [],
    theme: 'dark',
    currency: 'USD',
  });

  useEffect(() => {
    if (state.theme === 'dark') {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [state.theme]);

  const addTransaction = (t: Transaction) => setState(prev => ({ ...prev, transactions: [...prev.transactions, t] }));
  const updateTransaction = (t: Transaction) => setState(prev => ({ ...prev, transactions: prev.transactions.map(tr => tr.id === t.id ? t : tr) }));
  const deleteTransaction = (id: string) => setState(prev => ({ ...prev, transactions: prev.transactions.filter(tr => tr.id !== id) }));
  const addCategory = (c: Category) => setState(prev => ({ ...prev, categories: [...prev.categories, c] }));
  const deleteCategory = (id: string) => setState(prev => ({ ...prev, categories: prev.categories.filter(cat => cat.id !== id) }));
  const setTheme = (theme: 'light' | 'dark') => setState(prev => ({ ...prev, theme }));
  const setCurrency = (currency: string) => setState(prev => ({ ...prev, currency }));

  const { totalIncome, totalExpense, balance } = useMemo(() => {
    const income = state.transactions.filter(t => t.type === 'income').reduce((acc, t) => acc + t.amount, 0);
    const expense = state.transactions.filter(t => t.type === 'expense').reduce((acc, t) => acc + t.amount, 0);
    return { totalIncome: income, totalExpense: expense, balance: income - expense };
  }, [state.transactions]);

  return (
    <FinanceContext.Provider value={{ ...state, addTransaction, updateTransaction, deleteTransaction, addCategory, deleteCategory, setTheme, setCurrency, totalIncome, totalExpense, balance }}>
      {children}
    </FinanceContext.Provider>
  );
};

export const useFinance = () => {
  const context = useContext(FinanceContext);
  if (context === undefined) {
    throw new Error('useFinance must be used within a FinanceProvider');
  }
  return context;
};
