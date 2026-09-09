import React from 'react';
import { useTrip } from '../../context/TripContext';
import {
  Plane,
  Car,
  Building,
  Ticket,
  Train,
  AlertTriangle,
  ArrowRight,
  ArrowLeft,
  ArrowDown,
  CheckCircle2,
  Calendar,
} from 'lucide-react';
import { BookingType } from '../../types/trip';

export const ImpactAnalysisView: React.FC = () => {
  const { setScreen, impactResult } = useTrip();

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
        return <Calendar className="w-4 h-4 text-slate-600" />;
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 py-10 px-4 sm:px-6 lg:px-8 font-sans">
      <div className="max-w-3xl mx-auto space-y-6">
        {/* Navigation back */}
        <div className="flex items-center justify-between">
          <button
            onClick={() => setScreen('disruption_sim')}
            className="inline-flex items-center gap-2 text-xs font-medium text-slate-500 hover:text-slate-900 transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Back to Simulation</span>
          </button>
          <span className="text-xs font-semibold text-rose-700 bg-rose-50 border border-rose-200 px-2.5 py-1 rounded-full uppercase tracking-wider">
            Downstream Impact Cascade
          </span>
        </div>

        {/* SECTION: WHAT HAPPENED */}
        <div className="bg-white rounded-2xl p-6 sm:p-8 border border-slate-200 shadow-sm">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-6 border-b border-slate-100 gap-4">
            <div>
              <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block mb-1">
                What Happened
              </span>
              <h1 className="text-2xl font-bold text-slate-900">Flight disruption detected</h1>
              <p className="text-xs text-slate-500 mt-1">
                Automated dependency engine identified downstream schedule displacements.
              </p>
            </div>

            {/* Delay Badge */}
            <div className="bg-rose-50 border border-rose-200 rounded-xl px-4 py-2.5 text-right shrink-0">
              <span className="text-[10px] font-bold text-rose-700 uppercase tracking-wider block">
                Total Flight Delay
              </span>
              <span className="text-2xl font-bold text-rose-800 font-mono">
                {impactResult.flight.delayFormatted}
              </span>
            </div>
          </div>

          {/* FLIGHT DETAILS CARD */}
          <div className="mt-6 p-5 rounded-xl bg-slate-50 border border-slate-200 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div className="flex items-center gap-3.5">
              <div className="w-10 h-10 rounded-xl bg-white border border-slate-200 flex items-center justify-center text-blue-700 shadow-xs shrink-0">
                <Plane className="w-5 h-5" />
              </div>
              <div>
                <div className="text-sm font-bold text-slate-900">Flight</div>
                <div className="text-xs text-slate-600 font-medium">
                  {impactResult.flight.route} (Air India AI-142)
                </div>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-6 text-xs font-medium sm:border-l sm:border-slate-200 sm:pl-6">
              <div>
                <span className="text-slate-400 block text-[10px] uppercase font-semibold">
                  Original arrival:
                </span>
                <span className="text-slate-700 line-through font-mono">
                  {impactResult.flight.originalArrival}
                </span>
              </div>
              <div>
                <span className="text-rose-600 block text-[10px] uppercase font-bold">
                  New arrival:
                </span>
                <span className="text-rose-800 font-bold text-sm font-mono">
                  {impactResult.flight.newArrival}
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* SECTION: IMPACT ON YOUR TRIP */}
        <div className="bg-white rounded-2xl p-6 sm:p-8 border border-slate-200 shadow-sm">
          <div className="pb-4 mb-6 border-b border-slate-100 flex flex-col sm:flex-row sm:items-center justify-between gap-2">
            <div>
              <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block mb-0.5">
                Impact On Your Trip
              </span>
              <h2 className="text-lg font-bold text-slate-900">Connected Dependency Chain</h2>
            </div>
            <div className="flex items-center gap-3 text-[11px] font-medium text-slate-500">
              <span className="inline-flex items-center gap-1">
                <span className="w-2 h-2 rounded-full bg-rose-600"></span> Affected
              </span>
              <span className="inline-flex items-center gap-1">
                <span className="w-2 h-2 rounded-full bg-amber-500"></span> At risk
              </span>
              <span className="inline-flex items-center gap-1">
                <span className="w-2 h-2 rounded-full bg-emerald-600"></span> Unaffected
              </span>
            </div>
          </div>

          {/* DYNAMIC DEPENDENCY CHAIN */}
          <div className="space-y-3">
            {impactResult.impactChain.map((item, index) => {
              const isAffected = item.impactLevel === 'affected';
              const isAtRisk = item.impactLevel === 'at_risk';

              return (
                <React.Fragment key={item.id}>
                  <div
                    className={`p-4 rounded-xl border transition-all flex flex-col sm:flex-row sm:items-center justify-between gap-3 ${
                      isAffected
                        ? 'bg-rose-50/50 border-rose-200/90'
                        : isAtRisk
                        ? 'bg-amber-50/50 border-amber-200/90'
                        : 'bg-white border-slate-200'
                    }`}
                  >
                    <div className="flex items-start gap-3.5">
                      <div
                        className={`w-9 h-9 rounded-lg flex items-center justify-center shrink-0 mt-0.5 ${
                          isAffected
                            ? 'bg-rose-100 text-rose-800'
                            : isAtRisk
                            ? 'bg-amber-100 text-amber-800'
                            : 'bg-slate-100 text-slate-700'
                        }`}
                      >
                        {getTypeIcon(item.type)}
                      </div>
                      <div>
                        <div className="text-xs font-bold text-slate-900">{item.title}</div>
                        <p className="text-xs text-slate-600 mt-0.5 leading-relaxed">
                          {item.detail}
                        </p>
                      </div>
                    </div>

                    <div className="shrink-0 flex items-center justify-end">
                      <span
                        className={`text-xs font-bold px-2.5 py-1 rounded-full flex items-center gap-1.5 ${
                          isAffected
                            ? 'text-rose-800 bg-rose-100'
                            : isAtRisk
                            ? 'text-amber-800 bg-amber-100'
                            : 'text-emerald-800 bg-emerald-100'
                        }`}
                      >
                        <span
                          className={`w-2 h-2 rounded-full ${
                            isAffected
                              ? 'bg-rose-600'
                              : isAtRisk
                              ? 'bg-amber-600'
                              : 'bg-emerald-600'
                          }`}
                        ></span>
                        {item.statusLabel}
                      </span>
                    </div>
                  </div>

                  {item.arrowToNext && index < impactResult.impactChain.length - 1 && (
                    <div className="flex items-center justify-center py-0.5 text-slate-400">
                      <ArrowDown className="w-4 h-4" />
                    </div>
                  )}
                </React.Fragment>
              );
            })}
          </div>

          {/* UNAFFECTED ITEMS */}
          {impactResult.unaffectedItems.length > 0 && (
            <div className="mt-6 pt-6 border-t border-slate-100">
              <div className="text-[10px] font-bold text-slate-400 uppercase tracking-wider mb-2">
                Unaffected Journey Components
              </div>
              <div className="space-y-2">
                {impactResult.unaffectedItems.map((item) => (
                  <div
                    key={item.id}
                    className="p-3.5 rounded-xl bg-emerald-50/40 border border-emerald-200/80 flex items-center justify-between gap-4"
                  >
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 rounded-lg bg-emerald-100 text-emerald-800 flex items-center justify-center shrink-0">
                        {getTypeIcon(item.type)}
                      </div>
                      <div>
                        <div className="text-xs font-bold text-slate-900">{item.title}</div>
                        <div className="text-[11px] text-slate-600">{item.detail}</div>
                      </div>
                    </div>
                    <span className="text-xs font-semibold text-emerald-800 bg-emerald-100 px-2.5 py-1 rounded-full flex items-center gap-1.5 shrink-0">
                      <CheckCircle2 className="w-3.5 h-3.5 text-emerald-700" />
                      {item.statusLabel}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* SUMMARY & PRIMARY CTA */}
        <div className="p-6 bg-slate-900 rounded-2xl text-white flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 shadow-sm">
          <div>
            <div className="text-base font-bold flex items-center gap-2">
              <span className="w-2.5 h-2.5 rounded-full bg-rose-500 animate-pulse"></span>
              {impactResult.affectedCount} itinerary item{impactResult.affectedCount === 1 ? '' : 's'} affected
            </div>
            <p className="text-xs text-slate-300 mt-1">
              Downstream connections recalculated for a {impactResult.flight.delayFormatted} delay. Practical recovery options are ready.
            </p>
          </div>

          <button
            onClick={() => setScreen('recovery_options')}
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-3 bg-white hover:bg-slate-100 text-slate-900 font-semibold text-sm rounded-xl transition-all shadow-sm shrink-0"
          >
            <span>Find Recovery Options</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  );
};
