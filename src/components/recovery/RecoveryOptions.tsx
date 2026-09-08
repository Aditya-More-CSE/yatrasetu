import React, { useState } from 'react';
import {
  ShieldCheck,
  Check,
  ArrowRight,
  Sparkles,
  Sliders,
  CheckCircle2,
  SlidersHorizontal,
} from 'lucide-react';
import { useTrip } from '../../context/TripContext';
import { RecoveryPlan } from '../../types/trip';

export const RecoveryOptions: React.FC = () => {
  const {
    recoveryPlans,
    selectedPlan,
    applyRecoveryPlan,
    weights,
    updateWeights,
    isRecovered,
    setActiveTab,
  } = useTrip();

  const [showPreferences, setShowPreferences] = useState<boolean>(false);

  const handleSelect = (plan: RecoveryPlan) => {
    applyRecoveryPlan(plan.id);
    setActiveTab('mytrip');
  };

  return (
    <div className="space-y-6 max-w-4xl mx-auto pb-12">
      {/* Header */}
      <div className="bg-white border border-slate-200 rounded-2xl p-6 shadow-card">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <span className="text-[10px] uppercase font-bold tracking-wider px-2 py-0.5 rounded bg-blue-50 text-blue-700 border border-blue-200">
              Optimal Recovery Strategy
            </span>
            <h1 className="text-2xl font-bold text-slate-900 mt-1">Here's the best way forward.</h1>
            <p className="text-xs text-slate-500 mt-0.5">
              We found 3 feasible recovery options based on your trip and carrier availability.
            </p>
          </div>

          <button
            onClick={() => setShowPreferences(!showPreferences)}
            className="flex items-center gap-1.5 text-xs font-semibold px-3 py-1.5 rounded-xl border border-slate-200 bg-slate-50 hover:bg-slate-100 text-slate-700 transition-colors shrink-0 self-start sm:self-center"
          >
            <Sliders className="w-3.5 h-3.5 text-blue-600" />
            <span>{showPreferences ? 'Hide Weights' : 'Adjust Priorities'}</span>
          </button>
        </div>

        {/* Optional Preference Tuning Sliders */}
        {showPreferences && (
          <div className="mt-4 pt-4 border-t border-slate-100 bg-slate-50/70 p-4 rounded-xl border border-slate-200/80">
            <span className="text-xs font-bold text-slate-900 block mb-2">
              Customize Multi-Criteria Scoring:
            </span>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
              <div className="space-y-1 bg-white p-2.5 rounded-lg border border-slate-200">
                <div className="flex justify-between text-xs">
                  <span className="text-slate-600">Budget Priority</span>
                  <span className="font-bold font-mono text-blue-700">{weights.budget}/10</span>
                </div>
                <input
                  type="range"
                  min="1"
                  max="10"
                  value={weights.budget}
                  onChange={(e) => updateWeights({ budget: Number(e.target.value) })}
                  className="w-full accent-blue-600 h-1.5 bg-slate-200 rounded-lg cursor-pointer"
                />
              </div>

              <div className="space-y-1 bg-white p-2.5 rounded-lg border border-slate-200">
                <div className="flex justify-between text-xs">
                  <span className="text-slate-600">Time Priority</span>
                  <span className="font-bold font-mono text-blue-700">{weights.time}/10</span>
                </div>
                <input
                  type="range"
                  min="1"
                  max="10"
                  value={weights.time}
                  onChange={(e) => updateWeights({ time: Number(e.target.value) })}
                  className="w-full accent-blue-600 h-1.5 bg-slate-200 rounded-lg cursor-pointer"
                />
              </div>

              <div className="space-y-1 bg-white p-2.5 rounded-lg border border-slate-200">
                <div className="flex justify-between text-xs">
                  <span className="text-slate-600">Experience Priority</span>
                  <span className="font-bold font-mono text-blue-700">{weights.experience}/10</span>
                </div>
                <input
                  type="range"
                  min="1"
                  max="10"
                  value={weights.experience}
                  onChange={(e) => updateWeights({ experience: Number(e.target.value) })}
                  className="w-full accent-blue-600 h-1.5 bg-slate-200 rounded-lg cursor-pointer"
                />
              </div>
            </div>
          </div>
        )}
      </div>

      {/* 3 Main Recovery Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
        {recoveryPlans.map((plan) => {
          const isRecommended = plan.id === 'plan-best-experience';
          const isSelected = isRecovered && selectedPlan?.id === plan.id;

          return (
            <div
              key={plan.id}
              className={`rounded-2xl border transition-all flex flex-col justify-between bg-white relative shadow-card p-6 ${
                isRecommended
                  ? 'border-2 border-blue-600 ring-2 ring-blue-600/10 shadow-elevated'
                  : 'border-slate-200 hover:border-slate-300'
              }`}
            >
              {isRecommended && (
                <span className="absolute -top-3 right-5 text-[10px] font-bold uppercase tracking-wider px-2.5 py-0.5 rounded-full bg-blue-600 text-white shadow-xs">
                  ★ Recommended
                </span>
              )}

              <div>
                <div className="flex items-center justify-between mb-3">
                  <span
                    className={`text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded ${
                      isRecommended
                        ? 'bg-blue-50 text-blue-700 border border-blue-200'
                        : 'bg-slate-100 text-slate-700'
                    }`}
                  >
                    {plan.name}
                  </span>
                  <span className="font-mono text-xs font-bold text-slate-500">
                    Match {plan.calculatedScore}%
                  </span>
                </div>

                {/* Main Cost & Time Highlights */}
                <div className="my-3">
                  <span className="text-3xl font-extrabold text-slate-900 font-mono">
                    ₹{plan.additionalCost.toLocaleString('en-IN')}
                  </span>
                  <span className="text-xs text-slate-500 ml-1">add'l cost</span>
                </div>

                <div className="space-y-1 text-xs text-slate-600 mb-4 pb-3 border-b border-slate-100">
                  <p className="font-semibold text-slate-800">+{plan.timeImpactMinutes} min schedule delta</p>
                  <p>{plan.bookingsChanged} booking changed</p>
                  <p
                    className={`font-semibold ${
                      plan.activitiesPreserved ? 'text-emerald-700' : 'text-amber-700'
                    }`}
                  >
                    {plan.activitiesPreserved ? '✓ Tour preserved' : 'Tour moved to tomorrow'}
                  </p>
                </div>

                {/* Recommendation explanation under recommended plan */}
                {isRecommended && (
                  <div className="bg-blue-50/70 border border-blue-200 rounded-xl p-3 mb-4 space-y-2 text-xs">
                    <span className="font-bold text-blue-950 block">Why this is best for you:</span>
                    <ul className="space-y-1 text-blue-900">
                      <li className="flex items-center gap-1.5">
                        <Check className="w-3.5 h-3.5 text-blue-700 shrink-0" />
                        <span>Keeps your city tour (twilight slot)</span>
                      </li>
                      <li className="flex items-center gap-1.5">
                        <Check className="w-3.5 h-3.5 text-blue-700 shrink-0" />
                        <span>Changes only one booking</span>
                      </li>
                      <li className="flex items-center gap-1.5">
                        <Check className="w-3.5 h-3.5 text-blue-700 shrink-0" />
                        <span>Adds just 15 minutes of downtime</span>
                      </li>
                      <li className="flex items-center gap-1.5">
                        <Check className="w-3.5 h-3.5 text-blue-700 shrink-0" />
                        <span>Maintains luxury private transfer</span>
                      </li>
                    </ul>
                  </div>
                )}
              </div>

              <button
                onClick={() => handleSelect(plan)}
                className={`w-full py-3 px-4 rounded-xl text-xs font-bold transition-all shadow-xs flex items-center justify-center gap-1.5 ${
                  isSelected
                    ? 'bg-emerald-600 text-white'
                    : isRecommended
                    ? 'bg-blue-700 hover:bg-blue-800 text-white'
                    : 'bg-slate-900 hover:bg-slate-800 text-white'
                }`}
              >
                {isSelected ? (
                  <>
                    <Check className="w-4 h-4" /> Selected & Applied
                  </>
                ) : (
                  <>
                    <span>Choose this plan</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </>
                )}
              </button>
            </div>
          );
        })}
      </div>

      {/* Secondary What-If Explore Link */}
      <div className="bg-white border border-slate-200 rounded-2xl p-5 shadow-card flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        <div>
          <h4 className="text-xs font-bold text-slate-900">
            Want to explore other possibilities?
          </h4>
          <p className="text-xs text-slate-500">
            Simulate taking alternative flights or changing transport modes before deciding.
          </p>
        </div>
        <button
          onClick={() => setActiveTab('whatif')}
          className="text-xs font-semibold text-blue-700 hover:text-blue-800 flex items-center gap-1.5 self-start sm:self-center shrink-0"
        >
          <SlidersHorizontal className="w-3.5 h-3.5" />
          <span>Compare scenarios →</span>
        </button>
      </div>
    </div>
  );
};
