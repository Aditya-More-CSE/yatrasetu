import React from 'react';
import {
  AlertTriangle,
  ArrowRight,
  Clock,
  ShieldAlert,
  CheckCircle2,
  TrendingDown,
  Layers,
  ArrowDown,
  ExternalLink,
} from 'lucide-react';
import { useTrip } from '../../context/TripContext';

export const ImpactAnalysis: React.FC = () => {
  const { impact, activeDisruption, isRecovered, setActiveTab } = useTrip();

  return (
    <div className="space-y-6 max-w-4xl mx-auto pb-12">
      {/* Header */}
      <div className="bg-white border border-slate-200 rounded-xl p-5 shadow-card">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <span className="text-[10px] uppercase font-bold tracking-wider px-2 py-0.5 rounded bg-red-50 text-red-700 border border-red-200">
              Downstream Disruption Propagation
            </span>
            <h1 className="text-xl font-bold text-slate-900 mt-1">Impact Analysis</h1>
            <p className="text-xs text-slate-500 mt-0.5">
              Flight AI-142 • Mumbai (BOM) → Paris (CDG)
            </p>
          </div>

          {/* Departure Delta Badges */}
          <div className="flex items-center gap-2 text-xs">
            <div className="bg-slate-50 border border-slate-200 rounded-lg p-2.5 text-center">
              <span className="text-[10px] uppercase font-medium text-slate-500 block">Original Departure</span>
              <span className="font-mono font-bold text-slate-800 text-sm">10:00</span>
            </div>
            <ArrowRight className="w-4 h-4 text-slate-300" />
            <div className="bg-red-50 border border-red-200 rounded-lg p-2.5 text-center">
              <span className="text-[10px] uppercase font-medium text-red-600 block">New Departure</span>
              <span className="font-mono font-bold text-red-700 text-sm">12:00</span>
            </div>
            <div className="bg-red-600 text-white rounded-lg p-2.5 text-center shadow-xs">
              <span className="text-[10px] uppercase font-medium text-red-100 block">Delay</span>
              <span className="font-mono font-bold text-sm">+2h 00m</span>
            </div>
          </div>
        </div>
      </div>

      {/* Grid: Impact Summary + Explainable Score */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Left: Impact Summary (2 cols) */}
        <div className="md:col-span-2 bg-white border border-slate-200 rounded-xl p-5 shadow-card space-y-4">
          <div className="flex items-center justify-between">
            <h2 className="text-sm font-bold text-slate-900">Impact Summary</h2>
            <span className="text-xs font-semibold px-2 py-0.5 rounded-full bg-amber-100 text-amber-800">
              3 downstream bookings affected
            </span>
          </div>

          <div className="space-y-3">
            <div className="p-3 rounded-lg border border-red-200 bg-red-50/50 flex items-start justify-between">
              <div className="flex items-start gap-2.5">
                <span className="text-sm">🔴</span>
                <div>
                  <h4 className="text-xs font-bold text-red-900">Paris City Tour & Seine Cruise</h4>
                  <p className="text-xs text-red-700">Likely missed • Strict 18:30 boat boarding window</p>
                </div>
              </div>
              <span className="text-[11px] font-mono font-bold text-red-700 px-2 py-0.5 rounded bg-red-100">
                Buffer: -15 min
              </span>
            </div>

            <div className="p-3 rounded-lg border border-amber-200 bg-amber-50/50 flex items-start justify-between">
              <div className="flex items-start gap-2.5">
                <span className="text-sm">🟠</span>
                <div>
                  <h4 className="text-xs font-bold text-amber-900">Airport Transfer</h4>
                  <p className="text-xs text-amber-700">At risk • Pickup was 15:10; flight lands at 16:40</p>
                </div>
              </div>
              <span className="text-[11px] font-mono font-bold text-amber-700 px-2 py-0.5 rounded bg-amber-100">
                Buffer: -90 min
              </span>
            </div>

            <div className="p-3 rounded-lg border border-amber-200 bg-amber-50/50 flex items-start justify-between">
              <div className="flex items-start gap-2.5">
                <span className="text-sm">🟠</span>
                <div>
                  <h4 className="text-xs font-bold text-amber-900">Hotel Le Grand Check-in</h4>
                  <p className="text-xs text-amber-700">Delayed • Arrival pushed from 16:00 to 17:45</p>
                </div>
              </div>
              <span className="text-[11px] font-mono font-bold text-amber-700 px-2 py-0.5 rounded bg-amber-100">
                Notice sent
              </span>
            </div>

            <div className="p-3 rounded-lg border border-emerald-200 bg-emerald-50/50 flex items-start justify-between">
              <div className="flex items-start gap-2.5">
                <span className="text-sm">🟢</span>
                <div>
                  <h4 className="text-xs font-bold text-emerald-900">Dinner at Le Bistro Paris</h4>
                  <p className="text-xs text-emerald-700">Unaffected • 21:00 reservation safely preserved</p>
                </div>
              </div>
              <span className="text-[11px] font-mono font-bold text-emerald-700 px-2 py-0.5 rounded bg-emerald-100">
                Buffer: +90 min
              </span>
            </div>
          </div>

          {/* Compact visual chain */}
          <div className="mt-4 pt-4 border-t border-slate-100">
            <span className="text-xs font-semibold text-slate-500 uppercase tracking-wider block mb-2">
              Propagation Path
            </span>
            <div className="flex items-center gap-2 overflow-x-auto py-1">
              <span className="px-2.5 py-1 rounded bg-red-100 text-red-800 text-xs font-bold border border-red-200 shrink-0">
                Flight AI-142 (+2h)
              </span>
              <ArrowRight className="w-3.5 h-3.5 text-red-400 shrink-0" />
              <span className="px-2.5 py-1 rounded bg-amber-100 text-amber-800 text-xs font-bold border border-amber-200 shrink-0">
                Transfer (Missed)
              </span>
              <ArrowRight className="w-3.5 h-3.5 text-amber-400 shrink-0" />
              <span className="px-2.5 py-1 rounded bg-amber-100 text-amber-800 text-xs font-bold border border-amber-200 shrink-0">
                Hotel (Late check-in)
              </span>
              <ArrowRight className="w-3.5 h-3.5 text-amber-400 shrink-0" />
              <span className="px-2.5 py-1 rounded bg-red-100 text-red-800 text-xs font-bold border border-red-200 shrink-0">
                City Tour (At risk)
              </span>
            </div>
          </div>
        </div>

        {/* Right: Explainable Impact Score Card */}
        <div className="bg-white border border-slate-200 rounded-xl p-5 shadow-card flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between mb-2">
              <span className="text-xs font-semibold uppercase tracking-wider text-slate-400">
                Disruption Severity
              </span>
              <span className="text-xs font-bold px-2 py-0.5 rounded bg-red-100 text-red-700 font-mono">
                {impact.severity}
              </span>
            </div>

            <div className="flex items-baseline gap-1 my-3">
              <span className="text-4xl font-extrabold text-slate-900 font-mono">
                {impact.totalScore}
              </span>
              <span className="text-slate-400 text-lg font-mono">/ 100</span>
            </div>

            <p className="text-xs text-slate-500 mb-4">
              Deterministic severity score calculated based on downstream buffer shrinkage and monetary risk.
            </p>

            {/* Breakdown lines */}
            <div className="space-y-2 text-xs border-t border-slate-100 pt-3">
              <div className="flex items-center justify-between text-slate-600">
                <span>Time impact</span>
                <span className="font-mono font-semibold text-slate-900">{impact.timeImpact} pts</span>
              </div>
              <div className="flex items-center justify-between text-slate-600">
                <span>Cost impact</span>
                <span className="font-mono font-semibold text-slate-900">{impact.costImpact} pts</span>
              </div>
              <div className="flex items-center justify-between text-slate-600">
                <span>Bookings affected</span>
                <span className="font-mono font-semibold text-slate-900">{impact.bookingsAffected} pts</span>
              </div>
              <div className="flex items-center justify-between text-slate-600">
                <span>Activity risk</span>
                <span className="font-mono font-semibold text-slate-900">{impact.activityRisk} pts</span>
              </div>
              <div className="flex items-center justify-between font-bold text-slate-900 pt-2 border-t border-slate-200">
                <span>Total Calculated Score</span>
                <span className="font-mono text-red-600">{impact.totalScore} pts</span>
              </div>
            </div>
          </div>

          <button
            onClick={() => setActiveTab('recovery')}
            className="w-full mt-5 py-2.5 px-3 bg-blue-700 hover:bg-blue-800 text-white rounded-lg text-xs font-semibold shadow-sm transition-colors flex items-center justify-center gap-1.5"
          >
            <span>Proceed to Recovery Plans</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>

      {/* Buffer Analysis Deep Dive */}
      <div className="bg-white border border-slate-200 rounded-xl p-5 shadow-card">
        <h2 className="text-sm font-bold text-slate-900 mb-1">Buffer Analysis & Connection Feasibility</h2>
        <p className="text-xs text-slate-500 mb-4">
          Shows why downstream events are flagged. When safety margin turns negative, physical connection is impossible.
        </p>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {/* Transfer Buffer */}
          <div className="p-4 rounded-lg border border-slate-200 bg-slate-50/60 space-y-2">
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold text-slate-900">Airport Transfer Connection</span>
              <span className="text-[10px] font-bold px-2 py-0.5 rounded bg-red-100 text-red-800">
                Connection Impossible
              </span>
            </div>
            <div className="text-xs text-slate-600 space-y-1">
              <div className="flex justify-between">
                <span>Transfer pickup scheduled:</span>
                <span className="font-mono font-semibold">15:10</span>
              </div>
              <div className="flex justify-between">
                <span>Estimated flight arrival:</span>
                <span className="font-mono font-semibold text-red-600">16:40</span>
              </div>
              <div className="flex justify-between border-t border-slate-200 pt-1 font-bold">
                <span>Safety margin buffer:</span>
                <span className="font-mono text-red-600">-90 min</span>
              </div>
            </div>
            <p className="text-[11px] text-red-700 bg-red-50 p-2 rounded border border-red-200">
              ⚠ Traveler is still in flight at original pickup time. Rescheduling required.
            </p>
          </div>

          {/* City Tour Buffer */}
          <div className="p-4 rounded-lg border border-slate-200 bg-slate-50/60 space-y-2">
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold text-slate-900">City Tour & Pier Departure</span>
              <span className="text-[10px] font-bold px-2 py-0.5 rounded bg-amber-100 text-amber-800">
                Low Safety Margin
              </span>
            </div>
            <div className="text-xs text-slate-600 space-y-1">
              <div className="flex justify-between">
                <span>Boat pier departure:</span>
                <span className="font-mono font-semibold">18:30</span>
              </div>
              <div className="flex justify-between">
                <span>Estimated hotel arrival:</span>
                <span className="font-mono font-semibold">17:45</span>
              </div>
              <div className="flex justify-between border-t border-slate-200 pt-1 font-bold">
                <span>Buffer before pier transfer:</span>
                <span className="font-mono text-amber-600">+5 min</span>
              </div>
            </div>
            <p className="text-[11px] text-amber-800 bg-amber-50 p-2 rounded border border-amber-200">
              ⚠ 5-minute margin is insufficient for luggage check-in and transit to Pont de l’Alma.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};
