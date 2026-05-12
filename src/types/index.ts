export type TransactionType = 'income' | 'expense';

export interface Category {
  id: string;
  name: string;
  color: string;
  icon?: string;
}

export interface Transaction {
  id: string;
  amount: number;
  type: TransactionType;
  categoryId: string;
  date: string; // ISO date string
  note: string;
}

export interface BudgetGoal {
  id: string;
  categoryId: string;
  amount: number;
  period: 'monthly' | 'yearly';
}

export interface AppState {
  transactions: Transaction[];
  categories: Category[];
  budgetGoals: BudgetGoal[];
  theme: 'light' | 'dark';
  currency: string;
}
