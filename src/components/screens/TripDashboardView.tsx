import React from 'react';
import { useTrip } from '../../context/TripContext';
import {
  Plane,
  Building,
  Car,
  Ticket,
  Train,
  AlertTriangle,
  Edit2,
  Trash2,
  Calendar,
  Sparkles,
  RotateCcw,
  CheckCircle2,
  Check,
  Plus,
} from 'lucide-react';
import { Booking, BookingType } from '../../types/trip';

export const TripDashboardView: React.FC = () => {
  const { trip, setScreen, setEditingBooking, deleteBooking, isRecovered, resetDemo } = useTrip();

  // Counts for summary
  const totalCost = trip.bookings.reduce((sum, b) => sum + (b.cost || 0), 0);

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

  const getStatusBadge = (booking: Booking) => {
    if (booking.isUpdated || booking.status === 'updated') {
      return (
        <span className="inline-flex items-center gap-1 text-[11px] font-semibold text-blue-800 bg-blue-50 border border-blue-200 px-2 py-0.5 rounded">
          <Check className="w-3 h-3" />
          Updated
        </span>
      );
    }
    if (booking.status === 'delayed' || booking.status === 'likely_missed') {
      return (
        <span className="inline-flex items-center gap-1 text-[11px] font-semibold text-rose-800 bg-rose-50 border border-rose-200 px-2 py-0.5 rounded">
          <AlertTriangle className="w-3 h-3" />
          {booking.statusLabel}
        </span>
      );
    }
    if (booking.status === 'checkin_delayed' || booking.status === 'at_risk') {
      return (
        <span className="inline-flex items-center gap-1 text-[11px] font-semibold text-amber-800 bg-amber-50 border border-amber-200 px-2 py-0.5 rounded">
          <AlertTriangle className="w-3 h-3" />
          {booking.statusLabel}
        </span>
      );
    }
    if (booking.statusLabel === 'Check-in') {
      return (
        <span className="inline-flex items-center gap-1 text-[11px] font-medium text-slate-700 bg-slate-100 border border-slate-200 px-2 py-0.5 rounded">
          Check-in
        </span>
      );
    }
    return (
      <span className="inline-flex items-center gap-1 text-[11px] font-medium text-emerald-800 bg-emerald-50 border border-emerald-200/80 px-2 py-0.5 rounded">
        Confirmed
      </span>
    );
  };

  return (
    <div className="p-6 md:p-8 max-w-6xl mx-auto space-y-6 font-sans">
      {/* RECOVERED BANNER */}
      {isRecovered && (
        <div className="bg-emerald-50 border border-emerald-200 rounded-xl p-4 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 shadow-xs">
          <div className="flex items-center gap-3">
            <div className="w-7 h-7 rounded-full bg-emerald-100 text-emerald-700 flex items-center justify-center shrink-0">
              <CheckCircle2 className="w-4 h-4" />
            </div>
            <div>
              <h4 className="text-xs font-bold text-emerald-950">
                Itinerary Recovered & Synchronized
              </h4>
              <p className="text-xs text-emerald-700 mt-0.5">
                Recovery plan applied. Downstream connections have been safely rescheduled.
              </p>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <button
              onClick={() => setScreen('updated_itinerary')}
              className="text-xs font-semibold text-emerald-900 bg-emerald-100 hover:bg-emerald-200/70 px-3 py-1.5 rounded-lg transition-colors"
            >
              View Plan Summary
            </button>
            <button
              onClick={resetDemo}
              className="text-xs font-medium text-slate-600 hover:text-slate-900 bg-white border border-slate-200 px-2.5 py-1.5 rounded-lg transition-colors flex items-center gap-1"
              title="Reset trip to original schedule"
            >
              <RotateCcw className="w-3 h-3" />
              <span>Reset</span>
            </button>
          </div>
        </div>
      )}

      {/* DASHBOARD HEADER: Travel Command Center */}
      <div className="bg-white rounded-xl p-6 border border-slate-200/90 shadow-xs flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 text-xs font-medium text-slate-500 mb-1">
            <span
              className={`inline-flex items-center gap-1.5 font-bold ${
                isRecovered
                  ? 'text-emerald-700'
                  : trip.status === 'Disrupted'
                  ? 'text-rose-700'
                  : 'text-emerald-700'
              }`}
            >
              <span
                className={`w-2 h-2 rounded-full ${
                  isRecovered
                    ? 'bg-emerald-500'
                    : trip.status === 'Disrupted'
                    ? 'bg-rose-500'
                    : 'bg-emerald-500'
                }`}
              ></span>
              {isRecovered ? 'Stable / Recovered' : trip.status}
            </span>
            <span>•</span>
            <span>{trip.destination}</span>
          </div>

          <h1 className="text-2xl font-extrabold text-slate-900 tracking-tight">
            {trip.name}
          </h1>

          <div className="text-xs text-slate-500 mt-1 font-medium">
            {trip.startDate} — {trip.endDate}
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex items-center gap-2.5 shrink-0">
          <button
            onClick={() => setScreen('create_trip')}
            className="px-3.5 py-2 text-xs font-semibold text-slate-700 hover:text-slate-900 bg-white hover:bg-slate-50 border border-slate-300 rounded-lg transition-colors shadow-2xs flex items-center gap-1.5"
          >
            <Edit2 className="w-3.5 h-3.5 text-slate-500" />
            <span>Edit Trip</span>
          </button>

          <button
            onClick={() => setScreen('disruption_sim')}
            className="px-4 py-2 text-xs font-semibold text-white bg-slate-900 hover:bg-slate-800 rounded-lg transition-all shadow-xs flex items-center gap-2"
          >
            <AlertTriangle className="w-3.5 h-3.5 text-amber-400" />
            <span>Simulate Disruption</span>
          </button>
        </div>
      </div>

      {/* OPERATIONAL INTERFACE: TIMELINE (LEFT) & SUMMARY (RIGHT) */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* TIMELINE COLUMN */}
        <div className="lg:col-span-2 space-y-4">
          <div className="bg-white rounded-xl p-6 border border-slate-200/90 shadow-xs">
            <div className="flex items-center justify-between pb-4 border-b border-slate-100 mb-6">
              <div>
                <h2 className="text-xs uppercase font-bold tracking-wider text-slate-400">
                  Operational Timeline
                </h2>
                <div className="text-sm font-bold text-slate-900 mt-0.5">
                  Chronological Connection Rail
                </div>
              </div>

              <button
                onClick={() => setScreen('create_trip')}
                className="inline-flex items-center gap-1 text-xs font-semibold text-slate-700 hover:text-slate-900 bg-slate-50 hover:bg-slate-100 border border-slate-200 px-2.5 py-1 rounded-md transition-colors"
              >
                <Plus className="w-3 h-3" />
                <span>Add Item</span>
              </button>
            </div>

            {/* Vertical Rail Timeline */}
            {trip.bookings.length === 0 ? (
              <div className="p-8 text-center border-2 border-dashed border-slate-200 rounded-xl">
                <p className="text-xs text-slate-500 mb-3">No bookings added to this itinerary yet.</p>
                <button
                  onClick={() => setScreen('create_trip')}
                  className="px-3 py-1.5 bg-slate-900 text-white rounded-lg text-xs font-medium"
                >
                  Add First Booking
                </button>
              </div>
            ) : (
              <div className="relative pl-6 space-y-6 before:content-[''] before:absolute before:left-[35px] before:top-3 before:bottom-3 before:w-[2px] before:bg-slate-200">
                {trip.bookings.map((booking, idx) => (
                  <div key={booking.id} className="relative flex items-start gap-4 group">
                    {/* Time Column */}
                    <div className="w-16 shrink-0 text-right pt-0.5">
                      <span className="text-xs font-mono font-bold text-slate-700 block">
                        {booking.time.split(' ')[0]}
                      </span>
                      <span className="text-[10px] text-slate-400 uppercase font-medium">
                        {booking.time.split(' ')[1] || ''}
                      </span>
                    </div>

                    {/* Timeline Node Icon */}
                    <div className="relative z-10 w-7 h-7 rounded-full bg-white border-2 border-slate-300 flex items-center justify-center shrink-0 shadow-2xs group-hover:border-slate-800 transition-colors">
                      {getTypeIcon(booking.type)}
                    </div>

                    {/* Compact Item Data Row / Card */}
                    <div
                      className={`flex-1 p-3.5 rounded-lg border transition-all ${
                        booking.isUpdated
                          ? 'bg-blue-50/40 border-blue-200'
                          : 'bg-white hover:bg-slate-50/70 border-slate-200/80 shadow-2xs'
                      }`}
                    >
                      <div className="flex items-start justify-between gap-3">
                        <div>
                          <div className="flex items-center gap-2">
                            <span className="text-xs font-bold text-slate-900">
                              {booking.title}
                            </span>
                            {getStatusBadge(booking)}
                            <span className="text-[10px] text-slate-400 font-mono">
                              {booking.date}
                            </span>
                          </div>

                          <div className="text-xs text-slate-600 mt-1 font-medium">
                            {booking.routeOrLocation}
                          </div>

                          {booking.notes && (
                            <div className="text-[11px] text-slate-500 mt-1">
                              {booking.notes}
                            </div>
                          )}

                          {booking.changeNote && (
                            <div className="text-[11px] text-blue-800 font-medium mt-1.5 bg-blue-100/60 inline-block px-2 py-0.5 rounded">
                              ↳ {booking.changeNote}
                            </div>
                          )}
                        </div>

                        {/* Inline Actions */}
                        <div className="flex items-center gap-1 shrink-0 opacity-80 group-hover:opacity-100">
                          <button
                            onClick={() => setEditingBooking(booking)}
                            className="p-1 text-slate-400 hover:text-slate-800 hover:bg-slate-100 rounded transition-colors"
                            title="Edit"
                          >
                            <Edit2 className="w-3.5 h-3.5" />
                          </button>
                          <button
                            onClick={() => deleteBooking(booking.id)}
                            className="p-1 text-slate-400 hover:text-rose-600 hover:bg-rose-50 rounded transition-colors"
                            title="Delete"
                          >
                            <Trash2 className="w-3.5 h-3.5" />
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>

        {/* RIGHT SUMMARY PANEL */}
        <div className="space-y-4">
          <div className="bg-white rounded-xl p-5 border border-slate-200/90 shadow-xs space-y-4 sticky top-20">
            <div>
              <span className="text-[10px] uppercase font-bold tracking-wider text-slate-400">
                Summary
              </span>
              <h3 className="text-sm font-bold text-slate-900 mt-0.5">Trip Summary</h3>
            </div>

            <div className="space-y-2.5 py-3 border-y border-slate-100 text-xs">
              <div className="flex items-center justify-between">
                <span className="text-slate-500">Bookings count:</span>
                <span className="font-bold text-slate-900">{trip.bookings.length} bookings</span>
              </div>

              <div className="flex items-center justify-between">
                <span className="text-slate-500">Status:</span>
                <span className="font-bold text-emerald-700 flex items-center gap-1">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-600"></span>
                  {isRecovered ? 'Stable' : trip.status}
                </span>
              </div>

              <div className="flex items-center justify-between">
                <span className="text-slate-500">Tracked Cost:</span>
                <span className="font-mono font-bold text-slate-900">
                  ₹{totalCost.toLocaleString('en-IN')}
                </span>
              </div>
            </div>

            {/* Quick Actions */}
            <div className="pt-1 space-y-2">
              <button
                onClick={() => setScreen('disruption_sim')}
                className="w-full flex items-center justify-center gap-2 py-2.5 px-3 bg-slate-900 hover:bg-slate-800 text-white text-xs font-semibold rounded-lg shadow-xs transition-all"
              >
                <Sparkles className="w-3.5 h-3.5 text-blue-400" />
                <span>Simulate Disruption</span>
              </button>

              <button
                onClick={() => setScreen('create_trip')}
                className="w-full flex items-center justify-center gap-1.5 py-2 px-3 bg-white hover:bg-slate-50 border border-slate-200 text-slate-700 text-xs font-medium rounded-lg transition-colors"
              >
                <Plus className="w-3.5 h-3.5" />
                <span>Add Booking</span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
