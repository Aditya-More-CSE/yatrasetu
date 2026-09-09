import React from 'react';
import { useTrip } from '../../context/TripContext';
import {
  ArrowLeft,
  ArrowRight,
  Sparkles,
  CheckCircle2,
} from 'lucide-react';

export const RecoveryOptionsView: React.FC = () => {
  const { setScreen, setSelectedPlanId, impactResult } = useTrip();

  const handleSelectPlan = (planId: 'recommended' | 'lowest_cost' | 'fastest') => {
    setSelectedPlanId(planId);
    setScreen('plan_details');
  };

  return (
    <div className="min-h-screen bg-slate-50 py-10 px-4 sm:px-6 lg:px-8 font-sans">
      <div className="max-w-4xl mx-auto space-y-6">
        {/* Navigation back */}
        <div className="flex items-center justify-between">
          <button
            onClick={() => setScreen('impact_analysis')}
            className="inline-flex items-center gap-2 text-xs font-medium text-slate-500 hover:text-slate-900 transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Back to Impact Analysis</span>
          </button>
          <span className="text-xs font-semibold text-slate-400 uppercase tracking-wider">
            Decision Matrix
          </span>
        </div>

        {/* HEADER */}
        <div className="text-center max-w-2xl mx-auto pb-4">
          <div className="inline-flex items-center gap-2 text-xs font-bold text-blue-900 bg-blue-50 px-3 py-1 rounded-full border border-blue-200 mb-3">
            <Sparkles className="w-3.5 h-3.5 text-blue-700" />
            Recovery Intelligence Engine
          </div>
          <h1 className="text-3xl font-bold text-slate-900 tracking-tight">
            Choose how to recover your trip
          </h1>
          <p className="text-sm text-slate-600 mt-2">
            We found 3 feasible ways to keep your journey moving.
          </p>
        </div>

        {/* THREE DIFFERENTIATED OPTIONS */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {impactResult.recoveryOptions.map((option) => {
            const isRecommended = option.id === 'recommended';
            const isLowestCost = option.id === 'lowest_cost';

            return (
              <div
                key={option.id}
                className={`bg-white rounded-2xl p-6 border transition-all flex flex-col justify-between relative shadow-sm hover:shadow-md ${
                  isRecommended
                    ? 'border-slate-900 ring-1 ring-slate-900/10'
                    : 'border-slate-200 hover:border-slate-300'
                }`}
              >
                <div>
                  {/* Top Badge */}
                  <div className="flex items-center justify-between mb-4">
                    <span
                      className={`text-xs font-bold px-2.5 py-1 rounded-full uppercase tracking-wide ${
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
                      <span className="text-[11px] font-semibold text-slate-900 flex items-center gap-1">
                        <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
                        Recommended
                      </span>
                    )}
                  </div>

                  {/* Strategy Description (Headline) */}
                  <div className="min-h-[72px] mb-6">
                    <h3 className="text-sm font-bold text-slate-900 leading-snug whitespace-pre-line">
                      {option.id === 'recommended' && (
                        <>
                          Keep flight<br />
                          Move airport transfer<br />
                          Reschedule Eiffel Tower tour
                        </>
                      )}
                      {option.id === 'lowest_cost' && (
                        <>
                          Keep flight<br />
                          Cancel tour<br />
                          Claim activity refund
                        </>
                      )}
                      {option.id === 'fastest' && (
                        <>
                          Change flight<br />
                          Keep transfer<br />
                          Keep activity
                        </>
                      )}
                    </h3>
                  </div>

                  {/* Metrics Comparison Grid: STRICTLY IDENTICAL ORDER ON EVERY CARD */}
                  <div className="space-y-3 py-4 border-y border-slate-100 text-xs">
                    {/* 1. Additional cost */}
                    <div className="flex items-center justify-between">
                      <span className="text-slate-500 font-medium">Additional cost:</span>
                      <span className="font-bold text-slate-900 font-mono">
                        {option.additionalCost === 0 ? '₹0' : `₹${option.additionalCost.toLocaleString('en-IN')}`}
                      </span>
                    </div>

                    {/* 2. Refund */}
                    <div className="flex items-center justify-between">
                      <span className="text-slate-500 font-medium">Refund credit:</span>
                      <span
                        className={`font-mono font-bold ${
                          option.refund ? 'text-emerald-700' : 'text-slate-400'
                        }`}
                      >
                        {option.refund ? `+₹${option.refund.toLocaleString('en-IN')}` : '₹0'}
                      </span>
                    </div>

                    {/* 3. Time impact */}
                    <div className="flex items-center justify-between">
                      <span className="text-slate-500 font-medium">Time impact:</span>
                      <span className="font-semibold text-slate-800">
                        {option.timeImpactText}
                      </span>
                    </div>

                    {/* 4. Bookings changed */}
                    <div className="flex items-center justify-between">
                      <span className="text-slate-500 font-medium">Bookings changed:</span>
                      <span className="font-bold text-slate-800">
                        {option.bookingsChangedCount}
                      </span>
                    </div>
                  </div>

                  {/* Summary note */}
                  <p className="text-[11px] text-slate-500 mt-4 leading-relaxed">
                    {option.description}
                  </p>
                </div>

                {/* Card Button */}
                <div className="pt-6 mt-6 border-t border-slate-100">
                  <button
                    onClick={() => handleSelectPlan(option.id)}
                    className={`w-full py-2.5 px-4 rounded-xl text-xs font-semibold transition-all shadow-xs flex items-center justify-center gap-1.5 ${
                      isRecommended
                        ? 'bg-slate-900 hover:bg-slate-800 text-white'
                        : 'bg-white hover:bg-slate-50 text-slate-800 border border-slate-300'
                    }`}
                  >
                    <span>View Plan</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            );
          })}
        </div>

        {/* COMPARISON TABLE SUMMARY */}
        <div className="bg-white rounded-2xl p-6 border border-slate-200 shadow-sm mt-8">
          <h4 className="text-xs font-bold uppercase tracking-wider text-slate-400 mb-4">
            Side-by-Side Attribute Comparison
          </h4>
          <div className="overflow-x-auto">
            <table className="w-full text-xs text-left">
              <thead>
                <tr className="border-b border-slate-200 text-slate-500">
                  <th className="pb-3 font-semibold">Plan</th>
                  <th className="pb-3 font-semibold">Additional Cost</th>
                  <th className="pb-3 font-semibold">Refund Credit</th>
                  <th className="pb-3 font-semibold">Time Impact</th>
                  <th className="pb-3 font-semibold">Bookings Changed</th>
                  <th className="pb-3 font-semibold text-right">Action</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {impactResult.recoveryOptions.map((opt) => (
                  <tr key={opt.id}>
                    <td className="py-3 font-bold text-slate-900 flex items-center gap-2">
                      <span
                        className={`w-2 h-2 rounded-full ${
                          opt.id === 'recommended'
                            ? 'bg-slate-900'
                            : opt.id === 'lowest_cost'
                            ? 'bg-emerald-600'
                            : 'bg-blue-600'
                        }`}
                      ></span>
                      {opt.tag}
                    </td>
                    <td className="py-3 text-slate-800 font-mono font-medium">
                      {opt.additionalCost === 0 ? '₹0' : `₹${opt.additionalCost.toLocaleString('en-IN')}`}
                    </td>
                    <td className="py-3 text-slate-800 font-mono font-medium">
                      {opt.refund ? `+₹${opt.refund.toLocaleString('en-IN')}` : '₹0'}
                    </td>
                    <td className="py-3 text-slate-600">{opt.timeImpactText}</td>
                    <td className="py-3 text-slate-600">{opt.bookingsChangedCount} modified</td>
                    <td className="py-3 text-right">
                      <button
                        onClick={() => handleSelectPlan(opt.id)}
                        className="text-xs font-semibold text-blue-900 hover:underline"
                      >
                        View Plan →
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};
