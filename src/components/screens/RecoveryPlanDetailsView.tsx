import React from 'react';
import { useTrip } from '../../context/TripContext';
import {
  ArrowLeft,
  Check,
  CheckCircle2,
  RefreshCw,
  XCircle,
  ShieldCheck,
  Plane,
  Car,
  Building,
  Ticket,
  Train,
  Loader2,
} from 'lucide-react';
import { BookingType } from '../../types/trip';

export const RecoveryPlanDetailsView: React.FC = () => {
  const { setScreen, selectedPlan, selectedPlanId, applyRecoveryPlan, isApplyingPlan } = useTrip();

  const getTypeIcon = (type: BookingType) => {
    switch (type) {
      case 'flight':
        return <Plane className="w-4 h-4 text-blue-700" />;
      case 'hotel':
        return <Building className="w-4 h-4 text-slate-700" />;
      case 'transfer':
        return <Car className="w-4 h-4 text-indigo-700" />;
      case 'activity':
        return <Ticket className="w-4 h-4 text-amber-700" />;
      case 'train':
        return <Train className="w-4 h-4 text-emerald-700" />;
      default:
        return <Check className="w-4 h-4 text-slate-700" />;
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 py-10 px-4 sm:px-6 lg:px-8 font-sans">
      <div className="max-w-3xl mx-auto space-y-6">
        {/* Navigation back */}
        <div className="flex items-center justify-between">
          <button
            onClick={() => setScreen('recovery_options')}
            className="inline-flex items-center gap-2 text-xs font-medium text-slate-500 hover:text-slate-900 transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Back to Options</span>
          </button>
          <span className="text-xs font-semibold text-slate-400 uppercase tracking-wider">
            Plan Review
          </span>
        </div>

        {/* HEADER */}
        <div className="bg-white rounded-2xl p-6 sm:p-8 border border-slate-200 shadow-sm">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-6 border-b border-slate-100 gap-4">
            <div>
              <span className="inline-flex items-center gap-1.5 text-xs font-bold text-slate-900 bg-slate-100 px-3 py-1 rounded-full border border-slate-200 mb-2">
                <ShieldCheck className="w-3.5 h-3.5 text-blue-700" />
                {selectedPlan.tag} Plan Specification
              </span>
              <h1 className="text-2xl font-bold text-slate-900">Recovery Plan</h1>
              <p className="text-xs text-slate-500 mt-1 leading-relaxed">
                {selectedPlan.description}
              </p>
            </div>

            {/* Plan Cost Box */}
            <div className="bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 text-right shrink-0">
              <span className="text-[10px] font-bold text-slate-500 uppercase tracking-wider block">
                Additional Cost
              </span>
              <span className="text-2xl font-bold text-slate-900 font-mono">
                {selectedPlan.additionalCost === 0 ? '₹0' : `₹${selectedPlan.additionalCost.toLocaleString('en-IN')}`}
              </span>
              {selectedPlan.refund !== undefined && (
                <span className="text-[11px] text-emerald-700 font-semibold block mt-0.5">
                  +₹{selectedPlan.refund.toLocaleString('en-IN')} Refund Credit
                </span>
              )}
            </div>
          </div>

          {/* EXACT BEFORE -> AFTER CHANGES BREAKDOWN */}
          <div className="mt-6 space-y-3.5">
            <h2 className="text-xs font-bold uppercase tracking-wider text-slate-400 mb-3">
              Itinerary Adjustments (Before → After)
            </h2>

            {selectedPlan.changes.map((item, index) => {
              const isUpdated = item.isUpdated;
              const isCancelled = item.statusBadge === 'Cancelled';

              return (
                <div
                  key={index}
                  className={`p-4 rounded-xl border transition-all flex flex-col sm:flex-row sm:items-center justify-between gap-3 ${
                    isUpdated
                      ? 'bg-blue-50/40 border-blue-200 shadow-xs'
                      : isCancelled
                      ? 'bg-rose-50/40 border-rose-200 shadow-xs'
                      : 'bg-white border-slate-200 opacity-80'
                  }`}
                >
                  <div className="flex items-start gap-3.5">
                    <div
                      className={`w-9 h-9 rounded-lg flex items-center justify-center shrink-0 mt-0.5 ${
                        isUpdated
                          ? 'bg-blue-100 text-blue-800'
                          : isCancelled
                          ? 'bg-rose-100 text-rose-800'
                          : 'bg-slate-100 text-slate-700'
                      }`}
                    >
                      {getTypeIcon(item.type)}
                    </div>
                    <div>
                      <div className="text-xs font-bold text-slate-900 flex items-center gap-2">
                        <span>{item.title}</span>
                        {isUpdated && (
                          <span className="text-[10px] uppercase font-bold text-blue-800 bg-blue-100 px-1.5 py-0.5 rounded">
                            Modified
                          </span>
                        )}
                      </div>
                      <div className="text-xs text-slate-700 mt-1 font-medium">
                        {item.changeText}
                      </div>
                    </div>
                  </div>

                  <div className="shrink-0 flex items-center justify-end">
                    {isUpdated ? (
                      <span className="inline-flex items-center gap-1 text-xs font-bold text-blue-800 bg-blue-100 px-3 py-1 rounded-full border border-blue-200">
                        <RefreshCw className="w-3 h-3" />
                        Updated
                      </span>
                    ) : isCancelled ? (
                      <span className="inline-flex items-center gap-1 text-xs font-bold text-rose-800 bg-rose-100 px-3 py-1 rounded-full border border-rose-200">
                        <XCircle className="w-3 h-3" />
                        Cancelled
                      </span>
                    ) : (
                      <span className="inline-flex items-center gap-1 text-xs font-medium text-emerald-800 bg-emerald-50 px-3 py-1 rounded-full border border-emerald-200">
                        <Check className="w-3 h-3 text-emerald-700" />
                        Unchanged
                      </span>
                    )}
                  </div>
                </div>
              );
            })}
          </div>

          {/* SUMMARY STATS ROW */}
          <div className="mt-8 pt-6 border-t border-slate-100 grid grid-cols-3 gap-4 text-center">
            <div className="p-3 bg-slate-50 rounded-xl border border-slate-200">
              <span className="text-[10px] uppercase font-bold text-slate-400 block">
                Additional cost
              </span>
              <span className="text-base font-bold text-slate-900 font-mono mt-0.5 block">
                {selectedPlan.additionalCost === 0 ? '₹0' : `₹${selectedPlan.additionalCost.toLocaleString('en-IN')}`}
              </span>
            </div>

            <div className="p-3 bg-slate-50 rounded-xl border border-slate-200">
              <span className="text-[10px] uppercase font-bold text-slate-400 block">
                Bookings changed
              </span>
              <span className="text-base font-bold text-blue-900 mt-0.5 block">
                {selectedPlan.bookingsChangedCount}
              </span>
            </div>

            <div className="p-3 bg-slate-50 rounded-xl border border-slate-200">
              <span className="text-[10px] uppercase font-bold text-slate-400 block">
                Bookings unchanged
              </span>
              <span className="text-base font-bold text-emerald-800 mt-0.5 block">
                {selectedPlan.bookingsUnchangedCount}
              </span>
            </div>
          </div>

          {/* PRIMARY & SECONDARY ACTIONS */}
          <div className="mt-8 pt-6 border-t border-slate-100 flex flex-col sm:flex-row items-center justify-between gap-3">
            <button
              onClick={() => setScreen('recovery_options')}
              className="w-full sm:w-auto px-5 py-2.5 text-xs font-medium text-slate-600 hover:text-slate-800 rounded-xl transition-colors border border-transparent sm:border-slate-200"
            >
              Back to Options
            </button>

            <button
              disabled={isApplyingPlan}
              onClick={() => applyRecoveryPlan(selectedPlanId)}
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-3 bg-slate-900 hover:bg-slate-800 disabled:bg-slate-700 text-white text-sm font-semibold rounded-xl transition-all shadow-sm"
            >
              {isApplyingPlan ? (
                <>
                  <Loader2 className="w-4 h-4 animate-spin text-blue-400" />
                  <span>Applying Recovery Plan...</span>
                </>
              ) : (
                <>
                  <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                  <span>Apply Recovery Plan</span>
                </>
              )}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
