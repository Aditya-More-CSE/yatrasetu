import React from 'react';
import { useTrip } from '../../context/TripContext';
import {
  CheckCircle2,
  Check,
  RefreshCw,
  ArrowRight,
  LayoutDashboard,
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

  // Group updated bookings by date
  const groupedBookings = trip.bookings.reduce((acc, booking) => {
    const key = booking.date || 'Upcoming';
    if (!acc[key]) acc[key] = [];
    acc[key].push(booking);
    return acc;
  }, {} as Record<string, typeof trip.bookings>);

  const updatedCount = trip.bookings.filter((b) => b.isUpdated).length;
  const unchangedCount = trip.bookings.length - updatedCount;

  return (
    <div className="min-h-screen bg-slate-50 py-10 px-4 sm:px-6 lg:px-8 font-sans">
      <div className="max-w-3xl mx-auto space-y-6">
        {/* SUCCESS STATE HEADER */}
        <div className="bg-white rounded-2xl p-6 sm:p-8 border border-slate-200 shadow-sm text-center">
          <div className="w-14 h-14 rounded-2xl bg-emerald-50 border border-emerald-200 text-emerald-600 flex items-center justify-center mx-auto mb-4">
            <CheckCircle2 className="w-8 h-8" />
          </div>

          <h1 className="text-2xl sm:text-3xl font-bold text-slate-900">Trip recovered</h1>
          <p className="text-sm text-slate-600 mt-1">Your itinerary has been updated.</p>

          <div className="mt-4 inline-flex items-center gap-2 px-3 py-1 rounded-full bg-slate-100 text-slate-700 text-xs font-semibold">
            <span>Applied: {selectedPlan.tag} Plan</span>
            <span className="text-slate-400">•</span>
            <span>All downstream conflicts eliminated</span>
          </div>
        </div>

        {/* UPDATED TIMELINE */}
        <div className="bg-white rounded-2xl p-6 sm:p-8 border border-slate-200 shadow-sm">
          <div className="flex items-center justify-between pb-6 mb-6 border-b border-slate-100">
            <div>
              <h2 className="text-lg font-bold text-slate-900">Recovered Itinerary Schedule</h2>
              <p className="text-xs text-slate-500 mt-0.5">
                Updated bookings are highlighted with blue indicators.
              </p>
            </div>
            <span className="text-xs font-bold text-emerald-800 bg-emerald-50 px-2.5 py-1 rounded-full border border-emerald-200">
              Trip Status: Stable
            </span>
          </div>

          {/* Chronological Recovered Days */}
          <div className="space-y-8">
            {Object.entries(groupedBookings).map(([date, items]) => (
              <div key={date} className="relative">
                {/* Date header */}
                <div className="flex items-center gap-3 mb-4">
                  <div className="px-3 py-1 bg-slate-900 text-white text-xs font-bold tracking-wider rounded-md uppercase">
                    {date}
                  </div>
                  <div className="flex-1 h-[1px] bg-slate-200"></div>
                </div>

                {/* Day bookings */}
                <div className="space-y-3 pl-3 sm:pl-4 border-l-2 border-slate-200 ml-3">
                  {items.map((booking) => {
                    const isUpdated = booking.isUpdated;

                    return (
                      <div
                        key={booking.id}
                        className={`p-4 rounded-xl border transition-all ${
                          isUpdated
                            ? 'bg-blue-50/40 border-blue-200 shadow-xs'
                            : 'bg-white border-slate-200 shadow-xs'
                        }`}
                      >
                        <div className="flex items-start justify-between gap-3">
                          <div className="flex items-start gap-3.5">
                            <div className="w-9 h-9 rounded-lg bg-slate-100 border border-slate-200 flex items-center justify-center shrink-0 mt-0.5">
                              {getTypeIcon(booking.type)}
                            </div>

                            <div>
                              <div className="flex items-center gap-2">
                                <span className="text-sm font-bold text-slate-900">
                                  {booking.title}
                                </span>

                                {isUpdated ? (
                                  <span className="inline-flex items-center gap-1 text-[11px] font-bold text-blue-800 bg-blue-100 px-2 py-0.5 rounded-full border border-blue-200">
                                    <RefreshCw className="w-3 h-3" />
                                    Updated
                                  </span>
                                ) : (
                                  <span className="inline-flex items-center gap-1 text-[11px] font-semibold text-emerald-800 bg-emerald-50 px-2 py-0.5 rounded-full border border-emerald-200">
                                    <Check className="w-3 h-3 text-emerald-700" />
                                    Confirmed
                                  </span>
                                )}
                              </div>

                              <div className="text-xs text-slate-600 mt-1 font-medium">
                                <span>{booking.time}</span>
                                <span className="text-slate-300 mx-2">•</span>
                                <span>{booking.routeOrLocation}</span>
                              </div>

                              {booking.changeNote && (
                                <p className="text-[11px] font-medium text-blue-800 mt-1 bg-blue-100/70 inline-block px-2 py-0.5 rounded">
                                  ↳ {booking.changeNote}
                                </p>
                              )}
                            </div>
                          </div>

                          <div className="text-right text-xs font-mono font-medium text-slate-500 shrink-0">
                            ₹{(booking.cost || 0).toLocaleString('en-IN')}
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            ))}
          </div>

          {/* SUMMARY BOX */}
          <div className="mt-8 pt-6 border-t border-slate-100 grid grid-cols-3 gap-4 text-center">
            <div className="p-3 bg-slate-50 rounded-xl border border-slate-200">
              <span className="text-[10px] uppercase font-bold text-slate-400 block">
                Trip Status
              </span>
              <span className="text-base font-bold text-emerald-800 mt-0.5 block">
                Stable
              </span>
            </div>

            <div className="p-3 bg-slate-50 rounded-xl border border-slate-200">
              <span className="text-[10px] uppercase font-bold text-slate-400 block">
                Bookings Updated
              </span>
              <span className="text-base font-bold text-blue-900 mt-0.5 block">
                {updatedCount}
              </span>
            </div>

            <div className="p-3 bg-slate-50 rounded-xl border border-slate-200">
              <span className="text-[10px] uppercase font-bold text-slate-400 block">
                Bookings Unchanged
              </span>
              <span className="text-base font-bold text-slate-800 mt-0.5 block">
                {unchangedCount}
              </span>
            </div>
          </div>

          {/* BUTTONS */}
          <div className="mt-8 pt-6 border-t border-slate-100 flex flex-col sm:flex-row items-center justify-end gap-3">
            <button
              onClick={() => setScreen('dashboard')}
              className="w-full sm:w-auto px-5 py-2.5 text-xs font-medium text-slate-700 bg-white hover:bg-slate-50 border border-slate-300 rounded-xl transition-colors shadow-xs"
            >
              Back to Dashboard
            </button>

            <button
              onClick={() => setScreen('dashboard')}
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-2.5 bg-slate-900 hover:bg-slate-800 text-white text-xs font-semibold rounded-xl transition-all shadow-sm"
            >
              <span>View Full Trip</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
