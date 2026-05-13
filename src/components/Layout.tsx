import React, { useState } from 'react';
import { Outlet } from 'react-router-dom';
import { Sidebar } from './Sidebar';
import { Topbar } from './Topbar';
import { motion, AnimatePresence } from 'framer-motion';
import { AuthModal } from './AuthModal';
import { useAuth } from '../context/AuthContext';

export const Layout: React.FC = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const { user, loading } = useAuth();

  return (
    <div className="flex h-screen overflow-hidden bg-slate-50 dark:bg-dark-bg transition-colors duration-200">
      <Sidebar />
      
      {/* Mobile Menu Overlay - simple implementation */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setMobileMenuOpen(false)}
            className="fixed inset-0 bg-black/50 z-40 md:hidden"
          />
        )}
      </AnimatePresence>
      
      <div className="flex-1 flex flex-col w-full overflow-hidden relative">
        <Topbar onMenuClick={() => setMobileMenuOpen(!mobileMenuOpen)} />
        <main className="flex-1 overflow-y-auto p-4 sm:p-6 lg:p-8">
          <Outlet />
        </main>
      </div>

      {/* Auth Modal Overlay */}
      <AnimatePresence>
        {!loading && !user && <AuthModal />}
      </AnimatePresence>
    </div>
  );
};
