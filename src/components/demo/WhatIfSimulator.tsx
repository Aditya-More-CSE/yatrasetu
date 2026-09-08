import React, { useState } from 'react';
import {
  SlidersHorizontal,
  Plane,
  ArrowRight,
  ShieldCheck,
  Clock,
  DollarSign,
  AlertCircle,
  Sparkles,
  CheckCircle2,
  RefreshCw,
} from 'lucide-react';
import { WHAT_IF_OPTIONS } from '../../data/seedData';
import { WhatIfOption } from '../../types/trip';
import { useTrip } from '../../context/TripContext';

export const WhatIfSimulator: React.FC = () => {
  const { bookings, applyRecoveryPlan, setActiveTab } = useTrip();
  const [selectedOption, setSelectedOption] = useState<WhatIfOption>(WHAT_IF_OPTIONS[0]);

  return (
    <div className="space-y-6 max-w-4xl mx-auto pb-12">
      {/* Header */}
      <div className="bg-white border border-slate-200 rounded-xl p-5 shadow-card">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <div>
            <div className="flex items-center gap-2">
              <span className="text-[10px] uppercase font-bold tracking-wider px-2 py-0.5 rounded bg-purple-50 text-purple-700 border border-purple-200">
                Decision Sandbox
              </span>
              <span className="text-xs text-slate-400">•</span>
              <span className="text-xs font-medium text-slate-500">Non-Destructive Scenario Testing</span>
            </div>
            <h1 className="text-xl font-bold text-slate-900 mt-1">What-If Simulator</h1>
            <p className="text-xs text-slate-500 mt-0.5">
              Simulate speculative carrier reroutes or modal switches to preview downstream consequences before committing changes.
            </p>
          </div>
        </div>
      </div>

      {/* Side-by-Side Comparison: Current Delayed Scenario vs What-If Scenario */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Left: Current State */}
        <div className="bg-white border border-slate-200 rounded-xl p-5 shadow-card space-y-4">
          <div className="flex items-center justify-between pb-3 border-b border-slate-100">
            <span className="text-xs font-bold uppercase tracking-wider text-slate-400">
              Current Disrupted State
            </span>
            <span className="text-xs font-mono font-bold px-2 py-0.5 rounded bg-red-100 text-red-700">
              Disruption: HIGH
            </span>
          </div>

          <div className="space-y-3 text-xs">
            <div className="flex justify-between items-center p-2.5 rounded bg-slate-50 border border-slate-200">
              <span className="text-slate-600 font-medium">Inbound Flight</span>
              <span className="font-mono font-bold text-red-600">AI-142 (Dep: 12:00, Arr: 16:40)</span>
            </div>

            <div className="flex justify-between items-center p-2.5 rounded bg-amber-50/70 border border-amber-200">
              <span className="text-amber-800 font-medium">Airport Transfer</span>
              <span className="font-bold text-amber-700">At Risk (-90m buffer)</span>
            </div>

            <div className="flex justify-between items-center p-2.5 rounded bg-amber-50/70 border border-amber-200">
              <span className="text-amber-800 font-medium">Hotel Check-in</span>
              <span className="font-bold text-amber-700">Delayed to 17:45</span>
            </div>

            <div className="flex justify-between items-center p-2.5 rounded bg-red-50/70 border border-red-200">
              <span className="text-red-800 font-medium">Paris City Tour</span>
              <span className="font-bold text-red-700">Likely Missed</span>
            </div>

            <div className="flex justify-between items-center p-2.5 rounded bg-emerald-50/70 border border-emerald-200">
              <span className="text-emerald-800 font-medium">Dinner Le Bistro</span>
              <span className="font-bold text-emerald-700">On Schedule (21:00)</span>
            </div>
          </div>
        </div>

        {/* Right: What-If Selected Scenario */}
        <div className="bg-white border-2 border-blue-600 rounded-xl p-5 shadow-elevated space-y-4">
          <div className="flex items-center justify-between pb-3 border-b border-slate-100">
            <div className="flex items-center gap-2">
              <Sparkles className="w-4 h-4 text-blue-600" />
              <span className="text-xs font-bold uppercase tracking-wider text-blue-900">
                Simulated Outcome Preview
              </span>
            </div>
            <span
              className={`text-xs font-mono font-bold px-2 py-0.5 rounded ${
                selectedOption.disruptionLevel === 'LOW'
                  ? 'bg-emerald-100 text-emerald-800'
                  : 'bg-amber-100 text-amber-800'
              }`}
            >
              Disruption: {selectedOption.disruptionLevel}
            </span>
          </div>

          {/* Option Selector Dropdown */}
          <div>
            <label className="text-xs font-semibold text-slate-700 block mb-1">
              Select What-If Scenario:
            </label>
            <select
              value={selectedOption.id}
              onChange={(e) => {
                const opt = WHAT_IF_OPTIONS.find((o) => o.id === e.target.value);
                if (opt) setSelectedOption(opt);
              }}
              className="w-full text-xs font-medium bg-slate-50 border border-slate-300 rounded-lg p-2.5 text-slate-900 focus:outline-none focus:ring-2 focus:ring-blue-500 cursor-pointer"
            >
              {WHAT_IF_OPTIONS.map((opt) => (
                <option key={opt.id} value={opt.id}>
                  {opt.title} ({opt.carrier} • Dep: {opt.departure})
                </option>
              ))}
            </select>
          </div>

          {/* Predicted Consequences */}
          <div className="space-y-2.5 text-xs">
            <div className="flex justify-between items-center p-2 rounded bg-slate-50 border border-slate-200">
              <span className="text-slate-600">Simulated Flight Departure</span>
              <span className="font-mono font-bold text-blue-700">{selectedOption.departure}</span>
            </div>

            <div className="flex justify-between items-center p-2 rounded bg-emerald-50 border border-emerald-200">
              <span className="text-emerald-900 font-medium">Hotel Le Grand</span>
              <span className="font-bold text-emerald-700">✓ Preserved & on time</span>
            </div>

            <div className="flex justify-between items-center p-2 rounded bg-emerald-50 border border-emerald-200">
              <span className="text-emerald-900 font-medium">Airport Transfer</span>
              <span className="font-bold text-emerald-700">✓ Preserved</span>
            </div>

            <div className="flex justify-between items-center p-2 rounded bg-emerald-50 border border-emerald-200">
              <span className="text-emerald-900 font-medium">Paris City Tour</span>
              <span className="font-bold text-emerald-700">✓ Preserved (100% attendance)</span>
            </div>

            <div className="flex justify-between items-center p-2 rounded bg-blue-50 border border-blue-200">
              <span className="text-blue-900 font-medium">Estimated Additional Cost</span>
              <span className="font-mono font-bold text-blue-700 text-sm">
                +₹{selectedOption.additionalCost.toLocaleString('en-IN')}
              </span>
            </div>
          </div>

          <p className="text-[11px] text-slate-500 bg-slate-50 p-2.5 rounded border border-slate-200 leading-relaxed">
            {selectedOption.feasibilityNotes}
          </p>

          <button
            onClick={() => {
              applyRecoveryPlan('plan-best-experience');
              setActiveTab('mytrip');
            }}
            className="w-full py-2.5 px-3 bg-blue-700 hover:bg-blue-800 text-white rounded-lg text-xs font-semibold shadow-sm transition-colors flex items-center justify-center gap-1.5"
          >
            <span>Apply This Scenario To Live Trip</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>
    </div>
  );
};
