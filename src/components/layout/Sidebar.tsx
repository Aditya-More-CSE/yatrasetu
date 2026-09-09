import React from 'react';
import { useTrip } from '../../context/TripContext';
import {
  LayoutDashboard,
  Compass,
  PlusCircle,
  AlertTriangle,
  Settings,
  HelpCircle,
  CheckCircle2,
  Calendar,
  Layers,
} from 'lucide-react';

export const Sidebar: React.FC<{ onCloseMobile?: () => void }> = ({ onCloseMobile }) => {
  const { screen, setScreen, trip, isRecovered, loadDemoTrip, setIsSignInModalOpen } = useTrip();

  const handleNav = (targetScreen: typeof screen) => {
    setScreen(targetScreen);
    if (onCloseMobile) onCloseMobile();
  };

  const isCurrentTripActive = ['dashboard', 'disruption_sim', 'impact_analysis', 'recovery_options', 'plan_details', 'updated_itinerary'].includes(screen);

  return (
    <aside className="w-64 bg-slate-900 text-slate-300 flex flex-col h-full border-r border-slate-800 select-none">
      {/* Brand Header */}
      <div className="h-16 px-5 flex items-center justify-between border-b border-slate-800/80 bg-slate-950/40">
        <button
          onClick={() => handleNav('landing')}
          className="flex items-center gap-2.5 focus:outline-none text-left group"
          title="Return to Landing Page"
        >
          <img
            src="/logo.jpg"
            alt="YatraSetu"
            className="h-9 w-auto object-contain rounded bg-white p-0.5"
          />
        </button>
      </div>

      {/* Main Navigation */}
      <div className="flex-1 py-5 px-3 space-y-6 overflow-y-auto">
        {/* Workspace Menu */}
        <div className="space-y-1">
          <div className="px-3 pb-1 text-[10px] font-bold uppercase tracking-wider text-slate-500">
            Workspace
          </div>

          <button
            onClick={() => handleNav('dashboard')}
            className={`w-full flex items-center gap-3 px-3 py-2 rounded-lg text-xs font-medium transition-all ${
              screen === 'dashboard'
                ? 'bg-blue-600/20 text-blue-400 font-semibold border border-blue-500/30'
                : 'text-slate-300 hover:bg-slate-800/60 hover:text-white'
            }`}
          >
            <LayoutDashboard className="w-4 h-4 text-slate-400" />
            <span>Overview</span>
          </button>

          <button
            onClick={() => handleNav('create_trip')}
            className={`w-full flex items-center gap-3 px-3 py-2 rounded-lg text-xs font-medium transition-all ${
              screen === 'create_trip'
                ? 'bg-blue-600/20 text-blue-400 font-semibold border border-blue-500/30'
                : 'text-slate-300 hover:bg-slate-800/60 hover:text-white'
            }`}
          >
            <PlusCircle className="w-4 h-4 text-slate-400" />
            <span>New Trip</span>
          </button>
        </div>

        {/* Current Trip Section */}
        <div className="space-y-1.5 pt-2 border-t border-slate-800/80">
          <div className="px-3 pb-1 text-[10px] font-bold uppercase tracking-wider text-slate-500 flex items-center justify-between">
            <span>Active Journey</span>
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse"></span>
          </div>

          <button
            onClick={() => handleNav('dashboard')}
            className={`w-full text-left p-3 rounded-xl border transition-all ${
              isCurrentTripActive
                ? 'bg-slate-800/90 border-slate-700 text-white'
                : 'bg-slate-800/40 border-slate-800 text-slate-400 hover:bg-slate-800/70'
            }`}
          >
            <div className="flex items-center gap-2">
              <Compass className="w-3.5 h-3.5 text-blue-400 shrink-0" />
              <div className="text-xs font-bold text-slate-100 truncate">{trip.name}</div>
            </div>
            <div className="text-[11px] text-slate-400 mt-1 pl-5 truncate">
              {trip.destination}
            </div>
            <div className="mt-2 pl-5 flex items-center gap-2">
              <span
                className={`inline-flex items-center gap-1 text-[10px] font-medium px-2 py-0.5 rounded-full ${
                  isRecovered
                    ? 'bg-emerald-950 text-emerald-300 border border-emerald-800'
                    : trip.status === 'Disrupted'
                    ? 'bg-rose-950 text-rose-300 border border-rose-800'
                    : 'bg-slate-700 text-slate-300'
                }`}
              >
                <span
                  className={`w-1.5 h-1.5 rounded-full ${
                    isRecovered
                      ? 'bg-emerald-400'
                      : trip.status === 'Disrupted'
                      ? 'bg-rose-400'
                      : 'bg-emerald-400'
                  }`}
                ></span>
                {isRecovered ? 'Recovered' : trip.status}
              </span>
            </div>
          </button>

          {/* Quick Flow Shortcuts */}
          <div className="pt-2 pl-2 space-y-1 text-xs">
            <button
              onClick={() => handleNav('disruption_sim')}
              className={`w-full flex items-center gap-2.5 px-2.5 py-1.5 rounded-lg transition-colors text-[11px] ${
                screen === 'disruption_sim'
                  ? 'text-amber-300 bg-amber-950/40 font-semibold'
                  : 'text-slate-400 hover:text-slate-200'
              }`}
            >
              <AlertTriangle className="w-3.5 h-3.5 text-amber-500" />
              <span>Simulate Disruption</span>
            </button>

            {isRecovered && (
              <button
                onClick={() => handleNav('updated_itinerary')}
                className={`w-full flex items-center gap-2.5 px-2.5 py-1.5 rounded-lg transition-colors text-[11px] ${
                  screen === 'updated_itinerary'
                    ? 'text-emerald-300 bg-emerald-950/40 font-semibold'
                    : 'text-slate-400 hover:text-slate-200'
                }`}
              >
                <CheckCircle2 className="w-3.5 h-3.5 text-emerald-500" />
                <span>Recovery Plan</span>
              </button>
            )}
          </div>
        </div>
      </div>

      {/* Footer Navigation: Settings & Help */}
      <div className="p-3 border-t border-slate-800/80 bg-slate-950/30 space-y-1">
        <button
          onClick={() => setIsSignInModalOpen(true)}
          className="w-full flex items-center gap-2.5 px-3 py-2 rounded-lg text-xs text-slate-400 hover:text-white hover:bg-slate-800/60 transition-colors"
          title="Prototype Environment Info"
        >
          <HelpCircle className="w-3.5 h-3.5 text-slate-500" />
          <span>Prototype Info</span>
          <span className="ml-auto text-[10px] font-mono text-slate-500">v1.0</span>
        </button>
      </div>
    </aside>
  );
};
