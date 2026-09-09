import React from 'react';
import { useTrip } from '../../context/TripContext';
import {
  CheckCircle2,
  Check,
  RefreshCw,
  ArrowRight,
  Plane,
  Car,
  Building,
  Ticket,
  Train,
  Calendar,
} from 'lucide-react';
import { BookingType } from '../../types/trip';

export const UpdatedItineraryView: React.FC = () => {
  const { setScreen, trip, selectedPlan } = useTrip();

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
        return <Calendar className="w-3.5 h-3.5 text-slate-500" />;
    }
  };

  const updatedCount = trip.bookings.filter((b) => b.isUpdated).length;
  const unchangedCount = trip.bookings.length - updatedCount;

  return (
    <div className="p-6 md:p-8 max-w-3xl mx-auto space-y-6 font-sans">
      <div className="bg-white rounded-xl p-6 sm:p-8 border border-slate-200/90 shadow-xs space-y-6">
        {/* Success Header */}
        <div className="flex items-center justify-between pb-5 border-b border-slate-100">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-full bg-emerald-50 border border-emerald-200 text-emerald-600 flex items-center justify-center shrink-0">
              <CheckCircle2 className="w-5 h-5" />
            </div>
            <div>
              <h1 className="text-xl font-bold text-slate-900">Trip recovered</h1>
              <p className="text-xs text-slate-500 mt-0.5">Your itinerary has been updated.</p>
            </div>
          </div>

          <div className="text-right">
            <span className="text-[11px] font-bold text-emerald-800 bg-emerald-50 border border-emerald-200 px-2.5 py-1 rounded">
              Status: Stable
            </span>
          </div>
        </div>

        {/* Updated Timeline */}
        <div className="space-y-3">
          <div className="flex items-center justify-between text-xs text-slate-500 pb-1">
            <span className="font-semibold uppercase tracking-wider text-[10px] text-slate-400">
              Synchronized Itinerary
            </span>
            <span>
              {updatedCount} updated • {unchangedCount} confirmed
            </span>
          </div>

          {trip.bookings.map((booking) => {
            const isUpdated = booking.isUpdated;

            return (
              <div
                key={booking.id}
                className={`p-3.5 rounded-lg border transition-all flex items-center justify-between gap-3 ${
                  isUpdated
                    ? 'bg-blue-50/40 border-blue-200 shadow-2xs'
                    : 'bg-white border-slate-200/80 shadow-2xs'
                }`}
              >
                <div className="flex items-start gap-3">
                  <div className="w-7 h-7 rounded-md bg-slate-100 flex items-center justify-center shrink-0 mt-0.5">
                    {getTypeIcon(booking.type)}
                  </div>
                  <div>
                    <div className="flex items-center gap-2">
                      <span className="text-xs font-bold text-slate-900">{booking.title}</span>
                      <span className="text-[10px] text-slate-400 font-mono">{booking.date}</span>
                    </div>
                    <div className="text-xs text-slate-600 font-medium mt-0.5">
                      {booking.time} • {booking.routeOrLocation}
                    </div>
                    {booking.changeNote && (
                      <div className="text-[11px] text-blue-800 font-medium mt-1 bg-blue-100/60 inline-block px-1.5 py-0.2 rounded">
                        ↳ {booking.changeNote}
                      </div>
                    )}
                  </div>
                </div>

                <div className="shrink-0">
                  {isUpdated ? (
                    <span className="inline-flex items-center gap-1 text-[11px] font-semibold text-blue-800 bg-blue-100 px-2 py-0.5 rounded">
                      <RefreshCw className="w-3 h-3" />
                      Updated
                    </span>
                  ) : (
                    <span className="inline-flex items-center gap-1 text-[11px] font-medium text-emerald-800 bg-emerald-50 px-2 py-0.5 rounded">
                      <Check className="w-3 h-3 text-emerald-600" />
                      Confirmed
                    </span>
                  )}
                </div>
              </div>
            );
          })}
        </div>

        {/* Actions */}
        <div className="pt-2 flex items-center justify-end gap-3 border-t border-slate-100">
          <button
            onClick={() => setScreen('dashboard')}
            className="px-4 py-2 text-xs font-medium text-slate-600 hover:text-slate-900 bg-white border border-slate-200 rounded-lg shadow-2xs"
          >
            Back to Dashboard
          </button>

          <button
            onClick={() => setScreen('dashboard')}
            className="inline-flex items-center gap-1.5 px-5 py-2 bg-slate-900 hover:bg-slate-800 text-white text-xs font-semibold rounded-lg shadow-xs transition-all"
          >
            <span>View Full Trip</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>
    </div>
  );
};
