import React, { useState, useEffect } from 'react';
import {
  X,
  ArrowRight,
  Minus,
  Plus,
  AlertTriangle,
  Clock,
  Sparkles,
  CheckCircle2,
  Check,
  ChevronRight,
  Layers,
} from 'lucide-react';
import { useTrip } from '../../context/TripContext';

export const ReportDisruptionModal: React.FC = () => {
  const {
    isDisruptionModalOpen,
    setIsDisruptionModalOpen,
    disruptionStep,
    setDisruptionStep,
    selectedDisruptionReason,
    setSelectedDisruptionReason,
    delayHours,
    setDelayHours,
    applyReportedDisruption,
    setActiveTab,
  } = useTrip();

  // Animation checklist state for 'analyzing' step
  const [checklistIndex, setChecklistIndex] = useState(0);

  const checklistItems = [
    'Checking connections & terminal gates',
    'Tracing booking dependencies across itinerary',
    'Recalculating arrival time & customs buffers',
    'Checking activity & tour reservation windows',
    'Finding feasible alternative options',
  ];

  useEffect(() => {
    if (disruptionStep === 'analyzing') {
      setChecklistIndex(0);
      const timer1 = setTimeout(() => setChecklistIndex(1), 500);
      const timer2 = setTimeout(() => setChecklistIndex(2), 1000);
      const timer3 = setTimeout(() => setChecklistIndex(3), 1500);
      const timer4 = setTimeout(() => setChecklistIndex(4), 2000);
      const timer5 = setTimeout(() => {
        applyReportedDisruption(delayHours);
        setDisruptionStep('impact_result');
      }, 2600);

      return () => {
        clearTimeout(timer1);
        clearTimeout(timer2);
        clearTimeout(timer3);
        clearTimeout(timer4);
        clearTimeout(timer5);
      };
    }
  }, [disruptionStep, delayHours]);

  if (!isDisruptionModalOpen) return null;

  const disruptionReasons = [
    'Flight delayed',
    'Flight cancelled',
    'Train delayed',
    'Transfer unavailable',
    'Hotel issue',
    'Activity cancelled',
    'Something else',
  ];

  const delayPresets = [
    { label: '15 min', val: 0.25 },
    { label: '30 min', val: 0.5 },
    { label: '1 hour', val: 1 },
    { label: '2 hours', val: 2 },
    { label: '3+ hours', val: 4 },
  ];

  const handleStartAnalysis = () => {
    setDisruptionStep('analyzing');
  };

  const handleGoToRecovery = () => {
    setIsDisruptionModalOpen(false);
    setActiveTab('recovery');
  };

  const handleViewImpactDetails = () => {
    setIsDisruptionModalOpen(false);
    setActiveTab('impact');
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/40 backdrop-blur-xs p-4 animate-in fade-in duration-150">
      <div className="w-full max-w-lg bg-white rounded-2xl shadow-2xl border border-slate-200 overflow-hidden">
        {/* Modal Header */}
        <div className="p-5 border-b border-slate-100 flex items-center justify-between bg-slate-50/70">
          <div>
            <span className="text-[10px] uppercase font-bold tracking-wider px-2 py-0.5 rounded bg-amber-50 text-amber-800 border border-amber-200">
              Trip Assistance Sentinel
            </span>
            <h2 className="text-base font-bold text-slate-900 mt-1">
              {disruptionStep === 'what_happened' && 'What changed?'}
              {disruptionStep === 'delay_amount' && 'How much is your flight delayed?'}
              {disruptionStep === 'analyzing' && 'Analyzing your journey...'}
              {disruptionStep === 'impact_result' && 'Disruption Impact Identified'}
            </h2>
          </div>
          {disruptionStep !== 'analyzing' && (
            <button
              onClick={() => setIsDisruptionModalOpen(false)}
              className="p-1 rounded-md text-slate-400 hover:text-slate-700 hover:bg-slate-200 transition-colors"
            >
              <X className="w-4 h-4" />
            </button>
          )}
        </div>

        {/* STEP 1: What happened? */}
        {disruptionStep === 'what_happened' && (
          <div className="p-6 space-y-4 text-xs">
            <p className="text-slate-600 font-medium">
              What happened to your journey? Select an incident below:
            </p>

            <div className="space-y-2">
              {disruptionReasons.map((reason) => (
                <label
                  key={reason}
                  onClick={() => setSelectedDisruptionReason(reason)}
                  className={`flex items-center justify-between p-3 rounded-xl border transition-all cursor-pointer ${
                    selectedDisruptionReason === reason
                      ? 'border-blue-600 bg-blue-50/60 font-semibold text-blue-900 ring-1 ring-blue-600'
                      : 'border-slate-200 hover:bg-slate-50 text-slate-700'
                  }`}
                >
                  <span className="text-xs">{reason}</span>
                  <input
                    type="radio"
                    name="disruptionReason"
                    checked={selectedDisruptionReason === reason}
                    onChange={() => setSelectedDisruptionReason(reason)}
                    className="w-4 h-4 text-blue-600 focus:ring-0 cursor-pointer"
                  />
                </label>
              ))}
            </div>

            <div className="pt-4 border-t border-slate-100 flex justify-end">
              <button
                onClick={() => setDisruptionStep('delay_amount')}
                className="px-5 py-2.5 bg-slate-900 hover:bg-slate-800 text-white rounded-xl text-xs font-semibold shadow-xs flex items-center gap-1.5 transition-colors"
              >
                <span>Continue</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>
        )}

        {/* STEP 2: How much is the delay? */}
        {disruptionStep === 'delay_amount' && (
          <div className="p-6 space-y-6 text-xs text-center">
            <p className="text-slate-500 font-medium">
              Specify the delay announced for Flight AI-142:
            </p>

            {/* Stepper Counter */}
            <div className="flex items-center justify-center gap-6 py-4">
              <button
                onClick={() => setDelayHours(Math.max(1, delayHours - 1))}
                className="w-12 h-12 rounded-full border border-slate-300 hover:bg-slate-100 flex items-center justify-center text-slate-700 transition-colors shadow-xs"
              >
                <Minus className="w-5 h-5" />
              </button>

              <div className="min-w-[120px]">
                <span className="text-5xl font-mono font-extrabold text-slate-900 block">
                  {delayHours}
                </span>
                <span className="text-xs uppercase font-semibold text-slate-400">
                  {delayHours === 1 ? 'hour' : 'hours'}
                </span>
              </div>

              <button
                onClick={() => setDelayHours(delayHours + 1)}
                className="w-12 h-12 rounded-full border border-slate-300 hover:bg-slate-100 flex items-center justify-center text-slate-700 transition-colors shadow-xs"
              >
                <Plus className="w-5 h-5" />
              </button>
            </div>

            {/* Quick preset chips */}
            <div className="flex justify-center gap-2 flex-wrap">
              {delayPresets.map((preset) => (
                <button
                  key={preset.label}
                  onClick={() => setDelayHours(preset.val)}
                  className={`px-3 py-1.5 rounded-full text-xs font-semibold border transition-colors ${
                    delayHours === preset.val
                      ? 'bg-blue-600 text-white border-blue-600 shadow-xs'
                      : 'bg-slate-100 hover:bg-slate-200 text-slate-700 border-slate-200'
                  }`}
                >
                  {preset.label}
                </button>
              ))}
            </div>

            <div className="pt-4 border-t border-slate-100 flex items-center justify-between">
              <button
                onClick={() => setDisruptionStep('what_happened')}
                className="text-xs text-slate-500 hover:text-slate-800 font-medium"
              >
                ← Back
              </button>
              <button
                onClick={handleStartAnalysis}
                className="px-6 py-2.5 bg-blue-700 hover:bg-blue-800 text-white rounded-xl text-xs font-semibold shadow-xs flex items-center gap-2 transition-colors"
              >
                <span>Analyze my trip</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        )}

        {/* STEP 3: Intelligent AI Analysis Transition */}
        {disruptionStep === 'analyzing' && (
          <div className="p-8 space-y-6 text-xs text-center">
            <div className="w-12 h-12 rounded-full bg-blue-50 border border-blue-200 flex items-center justify-center mx-auto text-blue-700 animate-pulse">
              <Sparkles className="w-6 h-6" />
            </div>

            <div>
              <h3 className="text-base font-bold text-slate-900">
                Evaluating Connected Itinerary
              </h3>
              <p className="text-xs text-slate-500 mt-0.5">
                Simulating downstream impact for a {delayHours}-hour flight delay...
              </p>
            </div>

            {/* Checklist */}
            <div className="space-y-2.5 max-w-sm mx-auto text-left">
              {checklistItems.map((item, idx) => {
                const isDone = idx < checklistIndex;
                const isCurrent = idx === checklistIndex;
                return (
                  <div
                    key={idx}
                    className={`flex items-center gap-2.5 text-xs transition-opacity duration-200 ${
                      isDone
                        ? 'text-slate-800 font-medium'
                        : isCurrent
                        ? 'text-blue-700 font-semibold'
                        : 'text-slate-300'
                    }`}
                  >
                    {isDone ? (
                      <Check className="w-4 h-4 text-emerald-600 shrink-0" />
                    ) : isCurrent ? (
                      <span className="w-4 h-4 rounded-full border-2 border-blue-600 border-t-transparent animate-spin shrink-0"></span>
                    ) : (
                      <span className="w-4 h-4 rounded-full border border-slate-200 shrink-0"></span>
                    )}
                    <span>{item}</span>
                  </div>
                );
              })}
            </div>

            <p className="text-[11px] text-blue-700 font-medium">Finding the best way forward...</p>
          </div>
        )}

        {/* STEP 4: Simple Impact Result */}
        {disruptionStep === 'impact_result' && (
          <div className="p-6 space-y-4 text-xs">
            <div className="bg-red-50 border border-red-200 rounded-xl p-3.5 flex items-center justify-between">
              <div>
                <span className="text-[10px] font-bold uppercase tracking-wider text-red-600 block">
                  Disruption Verified
                </span>
                <span className="text-sm font-bold text-red-950">
                  Your flight is delayed by {delayHours} {delayHours === 1 ? 'hour' : 'hours'}.
                </span>
              </div>
              <span className="text-xs font-mono font-bold px-2 py-0.5 rounded bg-red-200 text-red-800">
                3 bookings affected
              </span>
            </div>

            {/* Simple Affected Bookings List */}
            <div className="space-y-2">
              <div className="flex items-center justify-between p-3 rounded-xl bg-amber-50/60 border border-amber-200">
                <span className="font-semibold text-slate-800">Airport Transfer</span>
                <span className="font-bold text-amber-700 flex items-center gap-1">
                  <AlertTriangle className="w-3.5 h-3.5" /> At risk
                </span>
              </div>

              <div className="flex items-center justify-between p-3 rounded-xl bg-amber-50/60 border border-amber-200">
                <span className="font-semibold text-slate-800">Hotel Check-in</span>
                <span className="font-bold text-amber-700 flex items-center gap-1">
                  <Clock className="w-3.5 h-3.5" /> Check-in delayed
                </span>
              </div>

              <div className="flex items-center justify-between p-3 rounded-xl bg-red-50/60 border border-red-200">
                <span className="font-semibold text-slate-800">City Tour & Cruise</span>
                <span className="font-bold text-red-700 flex items-center gap-1">
                  <AlertTriangle className="w-3.5 h-3.5" /> At risk
                </span>
              </div>

              <div className="flex items-center justify-between p-3 rounded-xl bg-emerald-50/60 border border-emerald-200">
                <span className="font-semibold text-slate-800">Dinner at Le Bistro</span>
                <span className="font-bold text-emerald-700 flex items-center gap-1">
                  <CheckCircle2 className="w-3.5 h-3.5" /> Unaffected
                </span>
              </div>
            </div>

            <p className="text-xs text-slate-600 pt-1">
              We've synthesized 3 feasible options to recover your schedule and preserve activities.
            </p>

            <div className="pt-3 border-t border-slate-100 flex flex-col sm:flex-row items-center justify-between gap-2">
              <button
                onClick={handleViewImpactDetails}
                className="text-xs text-slate-500 hover:text-slate-800 font-medium"
              >
                View technical impact details →
              </button>
              <button
                onClick={handleGoToRecovery}
                className="w-full sm:w-auto px-5 py-2.5 bg-blue-700 hover:bg-blue-800 text-white rounded-xl text-xs font-semibold shadow-xs flex items-center justify-center gap-1.5 transition-colors"
              >
                <span>See recovery options</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
