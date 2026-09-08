import React from 'react';
import { X, MapPin, Clock, Shield, AlertTriangle, CheckCircle2, FileText, IndianRupee } from 'lucide-react';
import { useTrip } from '../../context/TripContext';

export const BookingDetailModal: React.FC = () => {
  const { selectedBooking, setSelectedBooking } = useTrip();

  if (!selectedBooking) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/40 backdrop-blur-xs p-4 animate-in fade-in duration-150">
      <div className="w-full max-w-lg bg-white rounded-2xl shadow-2xl border border-slate-200 overflow-hidden">
        {/* Header */}
        <div className="p-5 border-b border-slate-100 flex items-start justify-between bg-slate-50/70">
          <div>
            <div className="flex items-center gap-2 mb-1">
              <span className="text-[10px] uppercase font-bold tracking-wider px-2 py-0.5 rounded bg-blue-50 text-blue-700 border border-blue-200">
                {selectedBooking.type}
              </span>
              {selectedBooking.code && (
                <span className="font-mono text-xs font-semibold text-slate-500">
                  {selectedBooking.code}
                </span>
              )}
            </div>
            <h2 className="text-base font-bold text-slate-900">{selectedBooking.title}</h2>
          </div>
          <button
            onClick={() => setSelectedBooking(null)}
            className="p-1 rounded-md text-slate-400 hover:text-slate-700 hover:bg-slate-200 transition-colors"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Content */}
        <div className="p-5 space-y-4 text-xs">
          {/* Status Banner */}
          <div className="flex items-center justify-between p-3 rounded-lg bg-slate-50 border border-slate-200">
            <span className="text-slate-600 font-medium">Status & Safety</span>
            <span className="font-bold text-slate-900 font-mono">
              {selectedBooking.statusLabel}
            </span>
          </div>

          {/* Timing details */}
          <div className="grid grid-cols-2 gap-3">
            <div className="p-3 rounded-lg border border-slate-200 bg-slate-50/50">
              <span className="text-[10px] uppercase font-semibold text-slate-400 block">
                Scheduled Time
              </span>
              <span className="text-sm font-bold font-mono text-slate-900">
                {selectedBooking.startTime}
              </span>
              {selectedBooking.startTime !== selectedBooking.originalStartTime && (
                <span className="text-[11px] text-slate-400 line-through block mt-0.5">
                  Original: {selectedBooking.originalStartTime}
                </span>
              )}
            </div>

            <div className="p-3 rounded-lg border border-slate-200 bg-slate-50/50">
              <span className="text-[10px] uppercase font-semibold text-slate-400 block">
                Safety Buffer
              </span>
              <span className="text-sm font-bold font-mono text-slate-900">
                {selectedBooking.bufferMinutes !== undefined ? `${selectedBooking.bufferMinutes}m` : 'N/A'}
              </span>
              <span className="text-[11px] text-slate-500 block mt-0.5">
                Margin to next node
              </span>
            </div>
          </div>

          {/* Location & Provider */}
          <div className="space-y-2 border-t border-slate-100 pt-3">
            <div className="flex items-start gap-2 text-slate-600">
              <MapPin className="w-3.5 h-3.5 text-slate-400 shrink-0 mt-0.5" />
              <div>
                <span className="font-semibold text-slate-700">Location: </span>
                <span>{selectedBooking.location}</span>
              </div>
            </div>

            <div className="flex items-start gap-2 text-slate-600">
              <FileText className="w-3.5 h-3.5 text-slate-400 shrink-0 mt-0.5" />
              <div>
                <span className="font-semibold text-slate-700">Provider: </span>
                <span>{selectedBooking.provider}</span>
              </div>
            </div>
          </div>

          {/* Cancellation Policy */}
          <div className="p-3 rounded-lg border border-blue-100 bg-blue-50/60 space-y-1">
            <span className="text-[10px] uppercase font-bold text-blue-900 block">
              Policy & Rebooking Rules
            </span>
            <p className="text-blue-800 leading-relaxed text-[11px]">
              {selectedBooking.cancellationPolicy}
            </p>
          </div>

          {/* Downstream dependencies */}
          {selectedBooking.dependencies.length > 0 && (
            <div className="text-slate-500 text-[11px] flex items-center gap-1.5 pt-1">
              <span className="font-semibold text-slate-700">Depends on:</span>
              <span className="font-mono bg-slate-100 px-1.5 py-0.5 rounded text-slate-600">
                {selectedBooking.dependencies.join(', ')}
              </span>
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="p-4 border-t border-slate-100 bg-slate-50 flex items-center justify-between">
          <span className="text-xs font-semibold text-slate-700">
            Booking Cost: ₹{selectedBooking.cost.toLocaleString('en-IN')}
          </span>
          <button
            onClick={() => setSelectedBooking(null)}
            className="px-4 py-1.5 bg-slate-900 hover:bg-slate-800 text-white rounded-lg text-xs font-semibold transition-colors"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
};
