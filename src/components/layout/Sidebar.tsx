import React from 'react';
import {
  Compass,
  AlertTriangle,
  RotateCcw,
  GitBranch,
  Settings,
  History,
  Sparkles,
  SlidersHorizontal,
  Home,
  Plus,
} from 'lucide-react';
import { useTrip } from '../../context/TripContext';

export const Sidebar: React.FC = () => {
  const {
    activeTab,
    setActiveTab,
    alerts,
    setIsChangeHistoryOpen,
    setIsAssistantOpen,
    isRecovered,
    setCurrentPage,
    setIsCreateTripOpen,
  } = useTrip();

  const activeAlertCount = alerts.filter((a) => a.level === 'critical' || a.level === 'warning').length;

  const navItems = [
    {
      id: 'trips_list' as const,
      label: 'All Trips',
      icon: Home,
      badge: null,
    },
    {
      id: 'mytrip' as const,
      label: 'Paris Journey',
      icon: Compass,
      badge: null,
    },
    {
      id: 'recovery' as const,
      label: 'Recovery Options',
      icon: RotateCcw,
      badge: isRecovered ? 'Active' : '3 Plans',
      badgeColor: isRecovered ? 'bg-emerald-600 text-white' : 'bg-blue-600 text-white',
    },
    {
      id: 'graph' as const,
      label: 'Timeline & Graph',
      icon: GitBranch,
      badge: null,
    },
    {
      id: 'whatif' as const,
      label: 'What-If Sandbox',
      icon: SlidersHorizontal,
      badge: null,
    },
    {
      id: 'alerts' as const,
      label: 'Proactive Alerts',
      icon: AlertTriangle,
      badge: activeAlertCount > 0 ? `${activeAlertCount}` : null,
      badgeColor: activeAlertCount > 0 ? 'bg-amber-500 text-white' : undefined,
    },
    {
      id: 'settings' as const,
      label: 'Preferences',
      icon: Settings,
      badge: null,
    },
  ];

  return (
    <aside className="w-64 bg-white border-r border-slate-200 flex flex-col justify-between shrink-0 select-none shadow-[1px_0_3px_0_rgba(0,0,0,0.02)] z-20">
      {/* Top Brand Header */}
      <div>
        <div className="p-4 border-b border-slate-100 flex flex-col gap-2">
          <div
            onClick={() => setCurrentPage('landing')}
            className="flex items-center gap-3 cursor-pointer group"
          >
            <div className="h-10 w-10 rounded-lg overflow-hidden bg-white border border-slate-100 shadow-sm flex items-center justify-center p-0.5 shrink-0 group-hover:border-blue-300 transition-colors">
              <img
                src="/yatrasetu-logo.jpg"
                alt="YatraSetu Logo"
                className="w-full h-full object-contain"
              />
            </div>
            <div className="flex flex-col min-w-0">
              <div className="flex items-center gap-1.5">
                <span className="font-bold text-base text-slate-900 tracking-tight">YatraSetu</span>
                <span className="text-[10px] uppercase font-semibold px-1.5 py-0.5 rounded bg-blue-50 text-blue-700 border border-blue-200/60">
                  Engine
                </span>
              </div>
              <p className="text-[11px] text-slate-500 truncate font-medium">Your Journey. Our Priority.</p>
            </div>
          </div>
        </div>

        {/* Create Trip Action Button */}
        <div className="p-3">
          <button
            onClick={() => setIsCreateTripOpen(true)}
            className="w-full py-2 px-3 rounded-lg text-xs font-semibold bg-slate-900 hover:bg-slate-800 text-white flex items-center justify-center gap-1.5 transition-colors shadow-xs"
          >
            <Plus className="w-3.5 h-3.5" />
            <span>+ Create New Trip</span>
          </button>
        </div>

        {/* Primary Navigation */}
        <nav className="px-2 space-y-1 mt-1">
          {navItems.map((item) => {
            const Icon = item.icon;
            const isActive = activeTab === item.id;
            return (
              <button
                key={item.id}
                onClick={() => setActiveTab(item.id)}
                className={`w-full flex items-center justify-between px-3 py-2 rounded-md text-xs font-medium transition-colors ${
                  isActive
                    ? 'bg-blue-50/80 text-blue-700 font-semibold'
                    : 'text-slate-600 hover:bg-slate-100/70 hover:text-slate-900'
                }`}
              >
                <span className="flex items-center gap-2.5">
                  <Icon
                    className={`w-4 h-4 ${
                      isActive ? 'text-blue-700' : 'text-slate-400'
                    }`}
                  />
                  {item.label}
                </span>
                {item.badge && (
                  <span
                    className={`text-[10px] px-1.5 py-0.5 rounded-full font-semibold ${
                      item.badgeColor || 'bg-slate-100 text-slate-600'
                    }`}
                  >
                    {item.badge}
                  </span>
                )}
              </button>
            );
          })}
        </nav>
      </div>

      {/* Bottom Utility & Assistant Card */}
      <div className="p-3 border-t border-slate-100 space-y-2">
        <div className="grid grid-cols-2 gap-1.5">
          <button
            onClick={() => setIsChangeHistoryOpen(true)}
            className="flex items-center justify-center gap-1.5 py-1.5 px-2 rounded bg-slate-50 hover:bg-slate-100 text-[11px] font-medium text-slate-600 border border-slate-200/70 transition-colors"
          >
            <History className="w-3.5 h-3.5 text-slate-500" />
            Audit Log
          </button>
          <button
            onClick={() => setIsAssistantOpen(true)}
            className="flex items-center justify-center gap-1.5 py-1.5 px-2 rounded bg-blue-50/70 hover:bg-blue-100/70 text-[11px] font-medium text-blue-700 border border-blue-200/60 transition-colors"
          >
            <Sparkles className="w-3.5 h-3.5 text-blue-600" />
            Ask AI
          </button>
        </div>

        {/* Back to landing page button */}
        <button
          onClick={() => setCurrentPage('landing')}
          className="w-full py-1.5 text-center text-[11px] text-slate-500 hover:text-slate-800 transition-colors"
        >
          ← Return to Marketing Page
        </button>
      </div>
    </aside>
  );
};
