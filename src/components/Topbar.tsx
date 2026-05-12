import React from 'react';
import { Bell, Search, Sun, Moon, Menu } from 'lucide-react';
import { useFinance } from '../context/FinanceContext';

interface TopbarProps {
  onMenuClick: () => void;
}

export const Topbar: React.FC<TopbarProps> = ({ onMenuClick }) => {
  const { theme, setTheme } = useFinance();

  return (
    <header className="h-16 flex items-center justify-between px-4 sm:px-6 border-b border-slate-200 dark:border-dark-border bg-white/70 dark:bg-dark-card/70 backdrop-blur-md sticky top-0 z-20">
      <div className="flex items-center gap-4">
        <button onClick={onMenuClick} className="md:hidden p-2 text-slate-500 hover:bg-slate-100 rounded-lg dark:text-slate-400 dark:hover:bg-dark-border transition-colors">
          <Menu size={20} />
        </button>
        <div className="hidden sm:flex items-center bg-slate-100 dark:bg-dark-bg rounded-lg px-3 py-2 border border-transparent dark:border-dark-border focus-within:border-brand-500 dark:focus-within:border-brand-500 transition-colors w-64">
          <Search size={18} className="text-slate-400 dark:text-slate-500" />
          <input 
            type="text" 
            placeholder="Search transactions..." 
            className="bg-transparent border-none outline-none text-sm ml-2 w-full text-slate-700 dark:text-slate-200 placeholder-slate-400 dark:placeholder-slate-500"
          />
        </div>
      </div>

      <div className="flex items-center gap-2 sm:gap-4">
        <button 
          onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
          className="p-2 text-slate-500 hover:bg-slate-100 rounded-lg dark:text-slate-400 dark:hover:bg-dark-border transition-colors"
        >
          {theme === 'dark' ? <Sun size={20} /> : <Moon size={20} />}
        </button>
        <button className="p-2 text-slate-500 hover:bg-slate-100 rounded-lg dark:text-slate-400 dark:hover:bg-dark-border transition-colors relative">
          <Bell size={20} />
          <span className="absolute top-1.5 right-1.5 w-2 h-2 rounded-full bg-red-500 border-2 border-white dark:border-dark-card"></span>
        </button>
      </div>
    </header>
  );
};
