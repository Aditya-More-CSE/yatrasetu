import React from 'react';
import { useTrip } from '../../context/TripContext';
import { ShieldCheck, Compass, Sparkles, PlusCircle } from 'lucide-react';

export const Navbar: React.FC = () => {
  const { screen, setScreen, loadDemoTrip, setIsSignInModalOpen, trip, isRecovered } = useTrip();

  return (
    <header className="sticky top-0 z-40 bg-white/95 backdrop-blur-md border-b border-slate-200/80 transition-all">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between gap-4">
        {/* Logo */}
        <button
          onClick={() => setScreen('landing')}
          className="flex items-center gap-3 group focus:outline-none text-left"
          title="YatraSetu Home"
        >
          <img
            src="/logo.jpg"
            alt="YatraSetu - Your Journey. Our Priority."
            className="h-10 w-auto object-contain transition-transform group-hover:scale-[1.02]"
          />
        </button>

        {/* Center Navigation / Screen Stepper */}
        {screen === 'landing' ? (
          <nav className="hidden md:flex items-center gap-8 text-sm font-medium text-slate-600">
            <a
              href="#how-it-works"
              className="hover:text-slate-900 transition-colors"
              onClick={(e) => {
                e.preventDefault();
                const el = document.getElementById('how-it-works');
                if (el) el.scrollIntoView({ behavior: 'smooth' });
              }}
            >
              How it works
            </a>
            <a
              href="#features"
              className="hover:text-slate-900 transition-colors"
              onClick={(e) => {
                e.preventDefault();
                const el = document.getElementById('features');
                if (el) el.scrollIntoView({ behavior: 'smooth' });
              }}
            >
              Features
            </a>
            <a
              href="#disruption-impact"
              className="hover:text-slate-900 transition-colors"
              onClick={(e) => {
                e.preventDefault();
                const el = document.getElementById('disruption-impact');
                if (el) el.scrollIntoView({ behavior: 'smooth' });
              }}
            >
              The Problem
            </a>
          </nav>
        ) : (
          /* Subtle Flow breadcrumb for hackathon evaluation */
          <div className="hidden lg:flex items-center gap-1.5 text-xs font-medium text-slate-500 bg-slate-50 px-3 py-1.5 rounded-full border border-slate-200">
            <button
              onClick={() => setScreen('dashboard')}
              className={`px-2.5 py-1 rounded-full transition-colors ${
                screen === 'dashboard'
                  ? 'bg-slate-900 text-white font-semibold'
                  : 'hover:text-slate-900'
              }`}
            >
              Dashboard
            </button>
            <span className="text-slate-300">›</span>
            <button
              onClick={() => setScreen('disruption_sim')}
              className={`px-2.5 py-1 rounded-full transition-colors ${
                screen === 'disruption_sim'
                  ? 'bg-slate-900 text-white font-semibold'
                  : 'hover:text-slate-900'
              }`}
            >
              Disruption
            </button>
            <span className="text-slate-300">›</span>
            <button
              onClick={() => setScreen('impact_analysis')}
              className={`px-2.5 py-1 rounded-full transition-colors ${
                screen === 'impact_analysis'
                  ? 'bg-slate-900 text-white font-semibold'
                  : 'hover:text-slate-900'
              }`}
            >
              Impact
            </button>
            <span className="text-slate-300">›</span>
            <button
              onClick={() => setScreen('recovery_options')}
              className={`px-2.5 py-1 rounded-full transition-colors ${
                screen === 'recovery_options' || screen === 'plan_details'
                  ? 'bg-slate-900 text-white font-semibold'
                  : 'hover:text-slate-900'
              }`}
            >
              Recovery
            </button>
            <span className="text-slate-300">›</span>
            <button
              onClick={() => setScreen('updated_itinerary')}
              className={`px-2.5 py-1 rounded-full transition-colors ${
                screen === 'updated_itinerary'
                  ? 'bg-emerald-700 text-white font-semibold'
                  : isRecovered
                  ? 'text-emerald-700 hover:text-emerald-800'
                  : 'text-slate-400 hover:text-slate-600'
              }`}
            >
              Recovered
            </button>
          </div>
        )}

        {/* Right CTA Actions */}
        <div className="flex items-center gap-3">
          {screen === 'landing' ? (
            <>
              <button
                onClick={() => setIsSignInModalOpen(true)}
                className="text-sm font-medium text-slate-700 hover:text-slate-900 px-3 py-2 rounded-lg transition-colors"
              >
                Sign in
              </button>
              <button
                onClick={loadDemoTrip}
                className="hidden sm:inline-flex items-center gap-2 text-sm font-medium text-slate-700 bg-slate-100 hover:bg-slate-200 px-3.5 py-2 rounded-lg transition-colors border border-slate-200"
              >
                <Sparkles className="w-4 h-4 text-blue-600" />
                <span>Try Demo Trip</span>
              </button>
              <button
                onClick={() => setScreen('create_trip')}
                className="inline-flex items-center gap-2 text-sm font-medium text-white bg-slate-900 hover:bg-slate-800 px-4 py-2 rounded-lg shadow-sm transition-all"
              >
                <span>Get Started</span>
              </button>
            </>
          ) : (
            <>
              <button
                onClick={() => setScreen('create_trip')}
                className="inline-flex items-center gap-1.5 text-xs font-medium text-slate-700 hover:text-slate-900 bg-white hover:bg-slate-50 border border-slate-200 px-3 py-1.5 rounded-lg transition-colors"
                title="Create a new trip"
              >
                <PlusCircle className="w-3.5 h-3.5 text-slate-600" />
                <span className="hidden sm:inline">New Trip</span>
              </button>
              <button
                onClick={() => setScreen('dashboard')}
                className="inline-flex items-center gap-1.5 text-xs font-medium text-slate-900 bg-slate-100 hover:bg-slate-200 border border-slate-200 px-3 py-1.5 rounded-lg transition-colors"
              >
                <Compass className="w-3.5 h-3.5 text-blue-700" />
                <span className="truncate max-w-[120px] font-medium">{trip.name}</span>
              </button>
              <button
                onClick={() => setIsSignInModalOpen(true)}
                className="inline-flex items-center gap-1 text-xs text-slate-500 hover:text-slate-700 px-2 py-1"
                title="Guest Access Active"
              >
                <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" />
                <span className="hidden md:inline">Guest</span>
              </button>
            </>
          )}
        </div>
      </div>
    </header>
  );
};
