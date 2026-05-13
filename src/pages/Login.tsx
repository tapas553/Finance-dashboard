import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { supabase } from '../lib/supabase';
import { motion } from 'framer-motion';
import { Mail, Lock, Loader2, ArrowRight } from 'lucide-react';

export const Login: React.FC = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const navigate = useNavigate();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      const { error } = await supabase.auth.signInWithPassword({
        email,
        password,
      });

      if (error) throw error;
      navigate('/');
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-slate-50 dark:bg-dark-bg p-4">
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="max-w-md w-full"
      >
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-brand-500 text-white mb-4 shadow-lg shadow-brand-500/20">
            <Lock size={32} />
          </div>
          <h1 className="text-3xl font-bold text-slate-900 dark:text-white">Welcome Back</h1>
          <p className="text-slate-500 dark:text-slate-400 mt-2">Enter your credentials to access your dashboard</p>
        </div>

        <div className="bg-white dark:bg-dark-card rounded-2xl shadow-xl shadow-slate-200/50 dark:shadow-none border border-slate-100 dark:border-dark-border p-8">
          <form onSubmit={handleLogin} className="space-y-6">
            {error && (
              <div className="p-3 rounded-lg bg-red-50 dark:bg-red-500/10 border border-red-100 dark:border-red-500/20 text-red-600 dark:text-red-400 text-sm">
                {error}
              </div>
            )}

            <div>
              <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1.5">
                Email Address
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-slate-400">
                  <Mail size={18} />
                </div>
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="block w-full pl-10 pr-3 py-2.5 bg-slate-50 dark:bg-dark-bg border border-slate-200 dark:border-dark-border rounded-xl text-slate-900 dark:text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-brand-500/20 focus:border-brand-500 transition-all"
                  placeholder="name@example.com"
                  required
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1.5">
                Password
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-slate-400">
                  <Lock size={18} />
                </div>
                <input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="block w-full pl-10 pr-3 py-2.5 bg-slate-50 dark:bg-dark-bg border border-slate-200 dark:border-dark-border rounded-xl text-slate-900 dark:text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-brand-500/20 focus:border-brand-500 transition-all"
                  placeholder="••••••••"
                  required
                />
              </div>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full flex items-center justify-center py-3 px-4 rounded-xl bg-brand-500 hover:bg-brand-600 text-white font-semibold shadow-lg shadow-brand-500/25 transition-all disabled:opacity-70 disabled:cursor-not-allowed group"
            >
              {loading ? (
                <Loader2 className="animate-spin mr-2" size={20} />
              ) : (
                <>
                  Sign In
                  <ArrowRight className="ml-2 group-hover:translate-x-1 transition-transform" size={20} />
                </>
              )}
            </button>
          </form>

          <div className="mt-8 pt-6 border-t border-slate-100 dark:border-dark-border text-center">
            <p className="text-slate-500 dark:text-slate-400 text-sm">
              Don't have an account?{' '}
              <Link to="/signup" className="text-brand-500 hover:text-brand-600 font-semibold underline-offset-4 hover:underline transition-all">
                Create account
              </Link>
            </p>
          </div>
        </div>
      </motion.div>
    </div>
  );
};
