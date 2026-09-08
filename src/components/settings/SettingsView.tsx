import React from 'react';
import { Sliders, Shield, Bell, CheckCircle2, RotateCcw } from 'lucide-react';
import { useTrip } from '../../context/TripContext';

export const SettingsView: React.FC = () => {
  const { weights, updateWeights, resetTrip } = useTrip();

  return (
    <div className="space-y-6 max-w-3xl mx-auto pb-12">
      {/* Header */}
      <div className="bg-white border border-slate-200 rounded-xl p-5 shadow-card">
        <div className="flex items-center gap-2 mb-1">
          <span className="text-[10px] uppercase font-bold tracking-wider px-2 py-0.5 rounded bg-slate-100 text-slate-700">
            System Preferences
          </span>
        </div>
        <h1 className="text-xl font-bold text-slate-900 mt-1">Traveler Settings & Priorities</h1>
        <p className="text-xs text-slate-500 mt-0.5">
          Define how the AI recovery engine balances budget, schedule adherence, and itinerary protection during disruptions.
        </p>
      </div>

      {/* Recovery Engine Weights Card */}
      <div className="bg-white border border-slate-200 rounded-xl p-5 shadow-card space-y-5">
        <h2 className="text-sm font-bold text-slate-900 border-b border-slate-100 pb-2">
          Recovery Optimization Priorities
        </h2>

        {/* Budget priority radio group */}
        <div className="space-y-2">
          <label className="text-xs font-semibold text-slate-700 block">
            Budget Priority:
          </label>
          <div className="grid grid-cols-3 gap-3">
            {[
              { label: 'Low (Flexible)', val: 3 },
              { label: 'Medium (Balanced)', val: 6 },
              { label: 'High (Minimize Cost)', val: 9 },
            ].map((opt) => (
              <button
                key={opt.val}
                type="button"
                onClick={() => updateWeights({ budget: opt.val })}
                className={`p-3 rounded-lg border text-xs font-medium text-center transition-all ${
                  Math.abs(weights.budget - opt.val) <= 1
                    ? 'border-blue-600 bg-blue-50/70 text-blue-900 font-bold ring-1 ring-blue-600'
                    : 'border-slate-200 hover:border-slate-300 text-slate-700'
                }`}
              >
                {opt.label}
              </button>
            ))}
          </div>
        </div>

        {/* Time priority radio group */}
        <div className="space-y-2">
          <label className="text-xs font-semibold text-slate-700 block">
            Time & Schedule Priority:
          </label>
          <div className="grid grid-cols-3 gap-3">
            {[
              { label: 'Low (Relaxed)', val: 3 },
              { label: 'Medium (Moderate)', val: 6 },
              { label: 'High (Zero Delay)', val: 9 },
            ].map((opt) => (
              <button
                key={opt.val}
                type="button"
                onClick={() => updateWeights({ time: opt.val })}
                className={`p-3 rounded-lg border text-xs font-medium text-center transition-all ${
                  Math.abs(weights.time - opt.val) <= 1
                    ? 'border-blue-600 bg-blue-50/70 text-blue-900 font-bold ring-1 ring-blue-600'
                    : 'border-slate-200 hover:border-slate-300 text-slate-700'
                }`}
              >
                {opt.label}
              </button>
            ))}
          </div>
        </div>

        {/* Protection Constraints */}
        <div className="space-y-3 pt-3 border-t border-slate-100">
          <label className="text-xs font-semibold text-slate-700 block">
            Hard Constraints & Protections:
          </label>

          <label className="flex items-center justify-between p-3 rounded-lg border border-slate-200 bg-slate-50/50 cursor-pointer">
            <div>
              <span className="text-xs font-semibold text-slate-900 block">
                Preserve All Activities & Tours
              </span>
              <span className="text-[11px] text-slate-500">
                AI will avoid dropping or cancelling sightseeing tickets even if costs rise.
              </span>
            </div>
            <input
              type="checkbox"
              checked={weights.preserveActivities}
              onChange={(e) => updateWeights({ preserveActivities: e.target.checked })}
              className="w-4 h-4 text-blue-600 rounded focus:ring-0 cursor-pointer"
            />
          </label>

          <label className="flex items-center justify-between p-3 rounded-lg border border-slate-200 bg-slate-50/50 cursor-pointer">
            <div>
              <span className="text-xs font-semibold text-slate-900 block">
                Avoid Hotel Location Changes
              </span>
              <span className="text-[11px] text-slate-500">
                Keep the original hotel property; only reschedule arrival window.
              </span>
            </div>
            <input
              type="checkbox"
              checked={weights.avoidChangingHotels}
              onChange={(e) => updateWeights({ avoidChangingHotels: e.target.checked })}
              className="w-4 h-4 text-blue-600 rounded focus:ring-0 cursor-pointer"
            />
          </label>
        </div>
      </div>

      {/* Reset System Card */}
      <div className="bg-white border border-slate-200 rounded-xl p-5 shadow-card flex items-center justify-between">
        <div>
          <h3 className="text-xs font-bold text-slate-900">Reset Demo Data</h3>
          <p className="text-[11px] text-slate-500">
            Restore original Paris itinerary baseline and clear disruption simulations.
          </p>
        </div>
        <button
          onClick={resetTrip}
          className="px-3 py-1.5 rounded-lg border border-slate-300 hover:bg-slate-100 text-slate-700 text-xs font-semibold transition-colors flex items-center gap-1.5"
        >
          <RotateCcw className="w-3.5 h-3.5" />
          Reset Itinerary
        </button>
      </div>
    </div>
  );
};
