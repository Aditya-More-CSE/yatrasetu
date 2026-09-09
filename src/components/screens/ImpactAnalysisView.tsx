import React from 'react';
import { useTrip } from '../../context/TripContext';
import {
  Plane,
  Car,
  Building,
  Ticket,
  Train,
  ArrowRight,
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
    <div className="p-6 md:p-8 max-w-3xl mx-auto space-y-6 font-sans">
      {/* 1. WHAT HAPPENED */}
      <div className="bg-white rounded-xl p-6 border border-slate-200/90 shadow-xs space-y-4">
        <div className="flex items-center justify-between pb-4 border-b border-slate-100">
          <div>
            <div className="text-[10px] font-bold uppercase tracking-wider text-slate-400">
              Root Event
            </div>
            <h1 className="text-base font-bold text-slate-900 mt-0.5">WHAT HAPPENED</h1>
          </div>
          <span className="text-xs font-bold text-rose-800 bg-rose-50 border border-rose-200/80 px-2.5 py-1 rounded font-mono">
            {impactResult.flight.delayFormatted} Delay
          </span>
        </div>

        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 p-4 rounded-lg bg-slate-50 border border-slate-200/80">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-lg bg-white border border-slate-200 flex items-center justify-center text-blue-700 shrink-0">
              <Plane className="w-4 h-4" />
            </div>
            <div>
              <div className="text-xs font-bold text-slate-900">Flight</div>
              <div className="text-xs text-slate-600">{impactResult.flight.route} (AI-142)</div>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-6 text-xs sm:border-l sm:border-slate-200 sm:pl-6">
            <div>
              <span className="text-[10px] uppercase font-semibold text-slate-400 block">Original arrival</span>
              <span className="text-slate-600 line-through font-mono font-medium">{impactResult.flight.originalArrival}</span>
            </div>
            <div>
              <span className="text-[10px] uppercase font-bold text-rose-700 block">New arrival</span>
              <span className="text-rose-800 font-bold font-mono">{impactResult.flight.newArrival}</span>
            </div>
          </div>
        </div>
      </div>

      {/* 2. IMPACT ON YOUR TRIP */}
      <div className="bg-white rounded-xl p-6 border border-slate-200/90 shadow-xs space-y-5">
        <div className="flex items-center justify-between pb-3 border-b border-slate-100">
          <div>
            <div className="text-[10px] font-bold uppercase tracking-wider text-slate-400">
              Analysis
            </div>
            <h2 className="text-base font-bold text-slate-900 mt-0.5">IMPACT ON YOUR TRIP</h2>
          </div>
          <div className="flex items-center gap-3 text-[11px] font-medium text-slate-500">
            <span className="flex items-center gap-1">
              <span className="w-2 h-2 rounded-full bg-rose-600"></span> Affected
            </span>
            <span className="flex items-center gap-1">
              <span className="w-2 h-2 rounded-full bg-amber-500"></span> At Risk
            </span>
            <span className="flex items-center gap-1">
              <span className="w-2 h-2 rounded-full bg-emerald-600"></span> Unaffected
            </span>
          </div>
        </div>

        {/* Connected Flow */}
        <div className="space-y-2.5">
          {impactResult.impactChain.map((item, index) => {
            const isAffected = item.impactLevel === 'affected';
            const isAtRisk = item.impactLevel === 'at_risk';

            return (
              <React.Fragment key={item.id}>
                <div
                  className={`p-3.5 rounded-lg border transition-all flex items-start justify-between gap-3 ${
                    isAffected
                      ? 'bg-rose-50/40 border-rose-200'
                      : isAtRisk
                      ? 'bg-amber-50/40 border-amber-200'
                      : 'bg-white border-slate-200'
                  }`}
                >
                  <div className="flex items-start gap-3">
                    <div
                      className={`w-7 h-7 rounded-md flex items-center justify-center shrink-0 mt-0.5 ${
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

                  <span
                    className={`text-[11px] font-semibold px-2 py-0.5 rounded shrink-0 ${
                      isAffected
                        ? 'text-rose-800 bg-rose-100 border border-rose-200'
                        : isAtRisk
                        ? 'text-amber-800 bg-amber-100 border border-amber-200'
                        : 'text-emerald-800 bg-emerald-100 border border-emerald-200'
                    }`}
                  >
                    {item.statusLabel}
                  </span>
                </div>

                {item.arrowToNext && index < impactResult.impactChain.length - 1 && (
                  <div className="flex items-center justify-center text-slate-400 py-0.5">
                    <ArrowDown className="w-3.5 h-3.5" />
                  </div>
                )}
              </React.Fragment>
            );
          })}
        </div>

        {/* Unaffected Items Separately */}
        {impactResult.unaffectedItems.length > 0 && (
          <div className="pt-4 border-t border-slate-100">
            <div className="text-[10px] font-bold uppercase tracking-wider text-slate-400 mb-2">
              Unaffected
            </div>
            <div className="space-y-2">
              {impactResult.unaffectedItems.map((item) => (
                <div
                  key={item.id}
                  className="p-3 rounded-lg bg-slate-50 border border-slate-200 flex items-center justify-between gap-3"
                >
                  <div className="flex items-center gap-2.5">
                    <div className="w-6 h-6 rounded bg-white border border-slate-200 flex items-center justify-center text-emerald-700 shrink-0">
                      {getTypeIcon(item.type)}
                    </div>
                    <span className="text-xs font-semibold text-slate-800">{item.title}</span>
                    <span className="text-slate-400">•</span>
                    <span className="text-xs text-slate-500">{item.detail}</span>
                  </div>
                  <span className="text-[11px] font-medium text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded shrink-0 flex items-center gap-1">
                    <CheckCircle2 className="w-3 h-3 text-emerald-600" />
                    {item.statusLabel}
                  </span>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* CTA Bar */}
        <div className="pt-4 flex items-center justify-between border-t border-slate-100">
          <button
            onClick={() => setScreen('disruption_sim')}
            className="text-xs font-medium text-slate-600 hover:text-slate-900"
          >
            ← Modify Delay
          </button>

          <button
            onClick={() => setScreen('recovery_options')}
            className="inline-flex items-center gap-2 px-5 py-2.5 bg-slate-900 hover:bg-slate-800 text-white text-xs font-semibold rounded-lg shadow-xs transition-all"
          >
            <span>Find Recovery Options</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>
    </div>
  );
};
