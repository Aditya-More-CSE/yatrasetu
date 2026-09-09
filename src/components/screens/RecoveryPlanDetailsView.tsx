import React from 'react';
import { useTrip } from '../../context/TripContext';
import {
  Check,
  CheckCircle2,
  RefreshCw,
  XCircle,
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
        return <Plane className="w-3.5 h-3.5 text-blue-600" />;
      case 'hotel':
        return <Building className="w-3.5 h-3.5 text-slate-600" />;
      case 'transfer':
        return <Car className="w-3.5 h-3.5 text-indigo-600" />;
      case 'activity':
        return <Ticket className="w-3.5 h-3.5 text-amber-600" />;
      case 'train':
        return <Train className="w-3.5 h-3.5 text-emerald-600" />;
      default:
        return <Check className="w-3.5 h-3.5 text-slate-600" />;
    }
  };

  return (
    <div className="p-6 md:p-8 max-w-3xl mx-auto space-y-6 font-sans">
      <div className="bg-white rounded-xl p-6 sm:p-8 border border-slate-200/90 shadow-xs space-y-6">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-5 border-b border-slate-100 gap-4">
          <div>
            <div className="text-[10px] font-bold uppercase tracking-wider text-slate-400">
              {selectedPlan.tag} Specification
            </div>
            <h1 className="text-xl font-bold text-slate-900 mt-0.5">Recovery Plan Details</h1>
            <p className="text-xs text-slate-500 mt-1">
              {selectedPlan.description}
            </p>
          </div>

          <div className="text-right shrink-0 bg-slate-50 border border-slate-200 px-3.5 py-2 rounded-lg">
            <span className="text-[10px] uppercase font-bold text-slate-400 block">Net Cost</span>
            <span className="text-lg font-bold text-slate-900 font-mono">
              {selectedPlan.additionalCost === 0 ? '₹0' : `₹${selectedPlan.additionalCost.toLocaleString('en-IN')}`}
            </span>
            {selectedPlan.refund && (
              <span className="text-[11px] text-emerald-700 font-semibold block">
                +₹{selectedPlan.refund.toLocaleString('en-IN')} Refund
              </span>
            )}
          </div>
        </div>

        {/* Clear BEFORE -> AFTER Adjustments */}
        <div className="space-y-3">
          <div className="text-xs font-bold uppercase tracking-wider text-slate-500 mb-2">
            Schedule Modifications (Before → After)
          </div>

          {selectedPlan.changes.map((item, idx) => {
            const isUpdated = item.isUpdated;
            const isCancelled = item.statusBadge === 'Cancelled';

            return (
              <div
                key={idx}
                className={`p-3.5 rounded-lg border transition-all flex flex-col sm:flex-row sm:items-center justify-between gap-3 ${
                  isUpdated
                    ? 'bg-blue-50/40 border-blue-200 shadow-2xs'
                    : isCancelled
                    ? 'bg-rose-50/40 border-rose-200 shadow-2xs'
                    : 'bg-white border-slate-200/70 opacity-75'
                }`}
              >
                <div className="flex items-start gap-3">
                  <div
                    className={`w-7 h-7 rounded-md flex items-center justify-center shrink-0 mt-0.5 ${
                      isUpdated
                        ? 'bg-blue-100 text-blue-800'
                        : isCancelled
                        ? 'bg-rose-100 text-rose-800'
                        : 'bg-slate-100 text-slate-600'
                    }`}
                  >
                    {getTypeIcon(item.type)}
                  </div>
                  <div>
                    <div className="text-xs font-bold text-slate-900 flex items-center gap-2">
                      <span>{item.title}</span>
                      {isUpdated && (
                        <span className="text-[10px] uppercase font-bold text-blue-800 bg-blue-100 px-1.5 py-0.2 rounded">
                          Modified
                        </span>
                      )}
                    </div>
                    <div className="text-xs text-slate-700 mt-0.5 font-medium">
                      {item.changeText}
                    </div>
                  </div>
                </div>

                <div className="shrink-0 flex items-center justify-end">
                  {isUpdated ? (
                    <span className="inline-flex items-center gap-1 text-[11px] font-semibold text-blue-800 bg-blue-100 px-2 py-0.5 rounded">
                      <RefreshCw className="w-3 h-3" />
                      Updated
                    </span>
                  ) : isCancelled ? (
                    <span className="inline-flex items-center gap-1 text-[11px] font-semibold text-rose-800 bg-rose-100 px-2 py-0.5 rounded">
                      <XCircle className="w-3 h-3" />
                      Cancelled
                    </span>
                  ) : (
                    <span className="inline-flex items-center gap-1 text-[11px] font-medium text-emerald-800 bg-emerald-50 px-2 py-0.5 rounded">
                      <Check className="w-3 h-3 text-emerald-600" />
                      Unchanged
                    </span>
                  )}
                </div>
              </div>
            );
          })}
        </div>

        {/* Summary Footer Bar */}
        <div className="p-3.5 bg-slate-50 rounded-lg border border-slate-200 flex items-center justify-between text-xs text-slate-600">
          <div>
            <strong>{selectedPlan.bookingsChangedCount} bookings changed</strong>, {selectedPlan.bookingsUnchangedCount} unchanged
          </div>
          <div className="font-medium text-slate-700">
            Time Impact: <strong>{selectedPlan.timeImpactText}</strong>
          </div>
        </div>

        {/* Actions */}
        <div className="pt-2 flex items-center justify-between border-t border-slate-100">
          <button
            onClick={() => setScreen('recovery_options')}
            className="text-xs font-medium text-slate-600 hover:text-slate-900"
          >
            ← Back to Options
          </button>

          <button
            disabled={isApplyingPlan}
            onClick={() => applyRecoveryPlan(selectedPlanId)}
            className="inline-flex items-center gap-2 px-5 py-2.5 bg-slate-900 hover:bg-slate-800 disabled:bg-slate-700 text-white text-xs font-semibold rounded-lg shadow-xs transition-all"
          >
            {isApplyingPlan ? (
              <>
                <Loader2 className="w-3.5 h-3.5 animate-spin text-blue-400" />
                <span>Applying Recovery Plan...</span>
              </>
            ) : (
              <>
                <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />
                <span>Apply Recovery Plan</span>
              </>
            )}
          </button>
        </div>
      </div>
    </div>
  );
};
