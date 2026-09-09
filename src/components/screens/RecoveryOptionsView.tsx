import React from 'react';
import { useTrip } from '../../context/TripContext';
import { ArrowRight, CheckCircle2 } from 'lucide-react';

export const RecoveryOptionsView: React.FC = () => {
  const { setScreen, setSelectedPlanId, impactResult } = useTrip();

  const handleSelectPlan = (planId: 'recommended' | 'lowest_cost' | 'fastest') => {
    setSelectedPlanId(planId);
    setScreen('plan_details');
  };

  return (
    <div className="p-6 md:p-8 max-w-4xl mx-auto space-y-6 font-sans">
      {/* Header */}
      <div>
        <div className="text-[10px] font-bold uppercase tracking-wider text-slate-400">
          Recovery Strategy
        </div>
        <h1 className="text-xl font-bold text-slate-900 mt-0.5">
          Choose how to recover your trip
        </h1>
        <p className="text-xs text-slate-500 mt-1">
          Three practical recovery plans evaluated for cost, schedule recovery, and traveler convenience.
        </p>
      </div>

      {/* 3 COMPARISON CARDS / ROWS */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {impactResult.recoveryOptions.map((option) => {
          const isRecommended = option.id === 'recommended';
          const isLowestCost = option.id === 'lowest_cost';

          return (
            <div
              key={option.id}
              className={`bg-white rounded-xl p-5 border transition-all flex flex-col justify-between ${
                isRecommended
                  ? 'border-slate-900 shadow-sm ring-1 ring-slate-900/10'
                  : 'border-slate-200/90 shadow-2xs hover:border-slate-300'
              }`}
            >
              <div>
                {/* Header Tag */}
                <div className="flex items-center justify-between pb-3 border-b border-slate-100 mb-4">
                  <span
                    className={`text-[10px] font-bold tracking-wider uppercase px-2 py-0.5 rounded ${
                      isRecommended
                        ? 'bg-slate-900 text-white'
                        : isLowestCost
                        ? 'bg-emerald-100 text-emerald-800'
                        : 'bg-blue-100 text-blue-800'
                    }`}
                  >
                    {option.tag}
                  </span>
                  {isRecommended && (
                    <span className="text-[11px] font-semibold text-slate-700 flex items-center gap-1">
                      <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
                      Suggested
                    </span>
                  )}
                </div>

                {/* Focus on actual itinerary changes */}
                <div className="space-y-1 mb-5">
                  {option.id === 'recommended' && (
                    <div className="text-xs font-semibold text-slate-800 space-y-1.5">
                      <div>• Keep flight</div>
                      <div>• Move transfer → 11:00 PM</div>
                      <div>• Move activity → 20 Sep</div>
                    </div>
                  )}
                  {option.id === 'lowest_cost' && (
                    <div className="text-xs font-semibold text-slate-800 space-y-1.5">
                      <div>• Keep flight</div>
                      <div>• Move transfer → 11:00 PM</div>
                      <div>• Cancel activity → ₹3,500 refund</div>
                    </div>
                  )}
                  {option.id === 'fastest' && (
                    <div className="text-xs font-semibold text-slate-800 space-y-1.5">
                      <div>• Rebook flight → AF-218 (4:35 PM)</div>
                      <div>• Keep transfer (7:30 PM)</div>
                      <div>• Keep activity (10:00 AM)</div>
                    </div>
                  )}
                </div>

                {/* Metrics */}
                <div className="p-3 bg-slate-50 rounded-lg space-y-1 text-xs border border-slate-200/60 mb-5">
                  <div className="font-bold text-slate-900 font-mono">
                    {option.additionalCost === 0
                      ? '₹0 additional'
                      : `₹${option.additionalCost.toLocaleString('en-IN')} additional`}
                    {option.refund ? ` (₹${option.refund.toLocaleString('en-IN')} refund)` : ''}
                  </div>
                  <div className="text-slate-500 text-[11px]">
                    {option.bookingsChangedCount} booking{option.bookingsChangedCount === 1 ? '' : 's'} changed • {option.timeImpactText}
                  </div>
                </div>
              </div>

              {/* Action */}
              <button
                onClick={() => handleSelectPlan(option.id)}
                className={`w-full py-2 px-3 rounded-lg text-xs font-semibold flex items-center justify-center gap-1.5 transition-all ${
                  isRecommended
                    ? 'bg-slate-900 hover:bg-slate-800 text-white shadow-2xs'
                    : 'bg-white hover:bg-slate-50 text-slate-800 border border-slate-300'
                }`}
              >
                <span>Review Plan</span>
                <ArrowRight className="w-3 h-3" />
              </button>
            </div>
          );
        })}
      </div>

      <div className="pt-2 flex items-center justify-between">
        <button
          onClick={() => setScreen('impact_analysis')}
          className="text-xs font-medium text-slate-500 hover:text-slate-800"
        >
          ← Back to Impact Analysis
        </button>
      </div>
    </div>
  );
};
