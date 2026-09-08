import React from 'react';
import {
  RotateCcw,
  Sparkles,
  History,
  AlertTriangle,
} from 'lucide-react';
import { useTrip } from '../../context/TripContext';

export const Topbar: React.FC = () => {
  const {
    disruptions,
    activeDisruption,
    applyDisruption,
    resetTrip,
    changeHistory,
    setIsChangeHistoryOpen,
    setIsAssistantOpen,
    setIsDisruptionModalOpen,
    setDisruptionStep,
  } = useTrip();

  return (
    <header className="h-14 border-b border-slate-200 bg-white px-4 md:px-6 flex items-center justify-between shrink-0 z-10">
      {/* Left: Trip Route & Mobile Brand */}
      <div className="flex items-center gap-3">
        <div className="md:hidden flex items-center gap-2">
          <img src="/yatrasetu-logo.jpg" alt="Logo" className="w-7 h-7 object-contain" />
          <span className="font-bold text-sm text-slate-900">YatraSetu</span>
        </div>

        <div className="hidden md:flex items-center gap-2 text-xs">
          <span className="font-semibold text-slate-900 flex items-center gap-1.5">
            <span className="w-2 h-2 rounded-full bg-blue-600"></span>
            Paris & Amsterdam
          </span>
          <span className="text-slate-300">|</span>
          <span className="text-slate-600 font-medium">12 Apr — 20 Apr 2025</span>
          <span className="text-slate-300">|</span>
          <span className="text-slate-500 font-mono text-[11px]">BOM → CDG → AMS</span>
        </div>
      </div>

      {/* Right Controls */}
      <div className="flex items-center gap-2.5">
        {/* Report Disruption Wizard Trigger */}
        <button
          onClick={() => {
            setDisruptionStep('what_happened');
            setIsDisruptionModalOpen(true);
          }}
          className="flex items-center gap-1.5 text-xs bg-amber-50 hover:bg-amber-100 text-amber-800 border border-amber-200 px-2.5 py-1.5 rounded-lg font-semibold transition-colors"
        >
          <AlertTriangle className="w-3.5 h-3.5 text-amber-600" />
          <span className="hidden sm:inline">Report Disruption</span>
        </button>

        {/* Quick Simulator Dropdown for Testing */}
        <div className="hidden lg:flex items-center gap-1.5 bg-slate-50 p-1 rounded-lg border border-slate-200">
          <select
            value={activeDisruption?.id || 'none'}
            onChange={(e) => {
              if (e.target.value === 'none') {
                resetTrip();
              } else {
                applyDisruption(e.target.value);
              }
            }}
            className="text-xs bg-white text-slate-800 font-medium py-1 px-2 rounded border border-slate-200 focus:outline-none focus:ring-1 focus:ring-blue-500 cursor-pointer"
          >
            <option value="none">No Disruption (Baseline)</option>
            {disruptions.map((s) => (
              <option key={s.id} value={s.id}>
                {s.label}
              </option>
            ))}
          </select>

          {activeDisruption && (
            <button
              onClick={resetTrip}
              title="Reset to baseline itinerary"
              className="p-1 text-slate-400 hover:text-slate-600 rounded hover:bg-slate-200 transition-colors"
            >
              <RotateCcw className="w-3.5 h-3.5" />
            </button>
          )}
        </div>

        {/* Audit Log pill */}
        <button
          onClick={() => setIsChangeHistoryOpen(true)}
          className="hidden sm:flex items-center gap-1.5 text-xs text-slate-600 hover:text-slate-900 px-2.5 py-1.5 rounded-md hover:bg-slate-100 transition-colors border border-transparent hover:border-slate-200"
        >
          <History className="w-3.5 h-3.5 text-slate-400" />
          <span className="hidden md:inline">Changes</span>
          <span className="text-[10px] font-mono px-1 rounded bg-slate-100 text-slate-600">
            {changeHistory.length}
          </span>
        </button>

        {/* AI Assistant button */}
        <button
          onClick={() => setIsAssistantOpen(true)}
          className="flex items-center gap-1.5 text-xs bg-blue-50 text-blue-700 hover:bg-blue-100 border border-blue-200 px-2.5 py-1.5 rounded-md font-medium transition-colors"
        >
          <Sparkles className="w-3.5 h-3.5" />
          <span className="hidden sm:inline">Ask AI</span>
        </button>
      </div>
    </header>
  );
};
