import React from 'react';
import { NavLink } from 'react-router-dom';
import { LayoutDashboard, ListPlus, PieChart, Settings, Wallet } from 'lucide-react';
import { cn } from '../utils';

const navItems = [
  { name: 'Dashboard', path: '/', icon: LayoutDashboard },
  { name: 'Transactions', path: '/transactions', icon: ListPlus },
  { name: 'Analytics', path: '/analytics', icon: PieChart },
  { name: 'Settings', path: '/settings', icon: Settings },
];

export const Sidebar: React.FC = () => {
  return (
    <aside className="w-64 flex-col hidden md:flex h-screen border-r border-slate-200 dark:border-dark-border bg-white dark:bg-dark-card transition-colors duration-200 sticky top-0">
      <div className="h-16 flex items-center px-6 border-b border-slate-200 dark:border-dark-border">
        <div className="flex items-center gap-2 text-brand-600 dark:text-brand-500">
          <Wallet size={28} strokeWidth={2.5} />
          <span className="text-xl font-bold tracking-tight text-slate-900 dark:text-white">FinDash</span>
        </div>
      </div>
      <nav className="flex-1 px-4 py-6 space-y-1 overflow-y-auto">
        {navItems.map((item) => (
          <NavLink
            key={item.name}
            to={item.path}
            className={({ isActive }) =>
              cn(
                'flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-all duration-200 group',
                isActive
                  ? 'bg-brand-50 text-brand-600 dark:bg-brand-900/30 dark:text-brand-500'
                  : 'text-slate-600 hover:bg-slate-100 dark:text-slate-400 dark:hover:bg-dark-border dark:hover:text-white'
              )
            }
          >
            {({ isActive }) => (
              <>
                <item.icon
                  size={20}
                  className={cn(
                    'transition-colors',
                    isActive ? 'text-brand-600 dark:text-brand-500' : 'text-slate-400 group-hover:text-slate-600 dark:text-slate-500 dark:group-hover:text-slate-300'
                  )}
                />
                {item.name}
              </>
            )}
          </NavLink>
        ))}
      </nav>
      <div className="p-4 border-t border-slate-200 dark:border-dark-border">
        <div className="flex items-center gap-3 px-3 py-2">
          <div className="w-8 h-8 rounded-full bg-gradient-to-tr from-brand-500 to-blue-500 flex items-center justify-center text-white font-bold text-sm">
            US
          </div>
          <div className="flex flex-col">
            <span className="text-sm font-medium text-slate-900 dark:text-white">User Name</span>
            <span className="text-xs text-slate-500 dark:text-slate-400">user@example.com</span>
          </div>
        </div>
      </div>
    </aside>
  );
};
