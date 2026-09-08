import React, { useState } from 'react';
import { ArrowRight, X, Mail, Lock, Sparkles } from 'lucide-react';
import { useTrip } from '../../context/TripContext';

export const AuthModal: React.FC = () => {
  const { currentPage, setCurrentPage } = useTrip();
  const [email, setEmail] = useState('traveler@yatrasetu.com');
  const [password, setPassword] = useState('••••••••');

  if (currentPage !== 'auth') return null;

  const handleSignIn = (e: React.FormEvent) => {
    e.preventDefault();
    setCurrentPage('app');
  };

  const handleGoogleSignIn = () => {
    setCurrentPage('app');
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/40 backdrop-blur-xs p-4 animate-in fade-in duration-150">
      <div className="w-full max-w-sm bg-white rounded-2xl shadow-2xl border border-slate-200 p-6 sm:p-8 relative">
        <button
          onClick={() => setCurrentPage('landing')}
          className="absolute top-4 right-4 p-1 rounded-md text-slate-400 hover:text-slate-700 hover:bg-slate-100 transition-colors"
        >
          <X className="w-4 h-4" />
        </button>

        {/* Brand Header */}
        <div className="text-center mb-6">
          <div className="w-12 h-12 rounded-xl bg-white border border-slate-200 shadow-xs flex items-center justify-center p-1 mx-auto mb-3">
            <img src="/yatrasetu-logo.jpg" alt="Logo" className="w-full h-full object-contain" />
          </div>
          <h2 className="text-xl font-bold text-slate-900 tracking-tight">Welcome back</h2>
          <p className="text-xs text-slate-500 mt-0.5">Continue your journey with YatraSetu</p>
        </div>

        {/* Google Login */}
        <button
          onClick={handleGoogleSignIn}
          className="w-full py-2.5 px-4 rounded-xl border border-slate-300 hover:bg-slate-50 text-xs font-semibold text-slate-700 flex items-center justify-center gap-2.5 transition-colors shadow-xs"
        >
          <svg className="w-4 h-4" viewBox="0 0 24 24">
            <path
              fill="#4285F4"
              d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
            />
            <path
              fill="#34A853"
              d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
            />
            <path
              fill="#FBBC05"
              d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.06H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.94l2.85-2.22.81-.63z"
            />
            <path
              fill="#EA4335"
              d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.84c.87-2.6 3.3-4.52 6.16-4.52z"
            />
          </svg>
          <span>Continue with Google</span>
        </button>

        <div className="flex items-center my-4 text-xs text-slate-400">
          <div className="flex-1 border-t border-slate-200"></div>
          <span className="px-2 font-medium">or</span>
          <div className="flex-1 border-t border-slate-200"></div>
        </div>

        {/* Email & Password Form */}
        <form onSubmit={handleSignIn} className="space-y-3">
          <div>
            <label className="text-[11px] font-semibold text-slate-700 block mb-1">Email</label>
            <div className="relative">
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full text-xs bg-slate-50 border border-slate-300 rounded-lg py-2 pl-8 pr-3 text-slate-900 focus:outline-none focus:ring-1 focus:ring-blue-500"
                required
              />
              <Mail className="w-3.5 h-3.5 text-slate-400 absolute left-2.5 top-2.5" />
            </div>
          </div>

          <div>
            <label className="text-[11px] font-semibold text-slate-700 block mb-1">Password</label>
            <div className="relative">
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full text-xs bg-slate-50 border border-slate-300 rounded-lg py-2 pl-8 pr-3 text-slate-900 focus:outline-none focus:ring-1 focus:ring-blue-500"
                required
              />
              <Lock className="w-3.5 h-3.5 text-slate-400 absolute left-2.5 top-2.5" />
            </div>
          </div>

          <button
            type="submit"
            className="w-full mt-2 py-2.5 px-4 rounded-xl bg-slate-900 hover:bg-slate-800 text-white text-xs font-semibold shadow-xs transition-colors"
          >
            Sign in
          </button>
        </form>

        <div className="mt-5 text-center text-xs text-slate-500">
          <span>Don't have an account? </span>
          <button
            onClick={() => setCurrentPage('app')}
            className="text-blue-700 font-semibold hover:underline"
          >
            Continue as Guest
          </button>
        </div>
      </div>
    </div>
  );
};
