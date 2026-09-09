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
  MapPin,
  Sparkles,
  RotateCcw,
  CheckCircle2,
  Check,
  Plus,
} from 'lucide-react';
import { Booking, BookingType } from '../../types/trip';

export const TripDashboardView: React.FC = () => {
  const { trip, setScreen, setEditingBooking, deleteBooking, isRecovered, resetDemo } = useTrip();

  // Group bookings by date for chronological timeline view
  const groupedBookings = trip.bookings.reduce((acc, booking) => {
    const key = booking.date || 'Upcoming';
    if (!acc[key]) acc[key] = [];
    acc[key].push(booking);
    return acc;
  }, {} as Record<string, Booking[]>);

  // Counts for sidebar summary
  const flightCount = trip.bookings.filter((b) => b.type === 'flight').length;
  const hotelCount = trip.bookings.filter((b) => b.type === 'hotel').length;
  const trainCount = trip.bookings.filter((b) => b.type === 'train').length;
  const transferCount = trip.bookings.filter((b) => b.type === 'transfer').length;
  const activityCount = trip.bookings.filter((b) => b.type === 'activity').length;
  const totalCost = trip.bookings.reduce((sum, b) => sum + (b.cost || 0), 0);

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

  const getStatusBadge = (booking: Booking) => {
    if (booking.isUpdated || booking.status === 'updated') {
      return (
        <span className="inline-flex items-center gap-1 text-[11px] font-semibold text-blue-800 bg-blue-50 border border-blue-200 px-2 py-0.5 rounded-full">
          <Check className="w-3 h-3" />
          Updated
        </span>
      );
    }
    if (booking.status === 'delayed' || booking.status === 'likely_missed') {
      return (
        <span className="inline-flex items-center gap-1 text-[11px] font-semibold text-rose-800 bg-rose-50 border border-rose-200 px-2 py-0.5 rounded-full">
          <AlertTriangle className="w-3 h-3" />
          {booking.statusLabel}
        </span>
      );
    }
    if (booking.status === 'checkin_delayed' || booking.status === 'at_risk') {
      return (
        <span className="inline-flex items-center gap-1 text-[11px] font-semibold text-amber-800 bg-amber-50 border border-amber-200 px-2 py-0.5 rounded-full">
          <AlertTriangle className="w-3 h-3" />
          {booking.statusLabel}
        </span>
      );
    }
    if (booking.statusLabel === 'Check-in') {
      return (
        <span className="inline-flex items-center gap-1 text-[11px] font-semibold text-slate-700 bg-slate-100 border border-slate-200 px-2 py-0.5 rounded-full">
          Check-in
        </span>
      );
    }
    return (
      <span className="inline-flex items-center gap-1 text-[11px] font-semibold text-emerald-800 bg-emerald-50 border border-emerald-200 px-2 py-0.5 rounded-full">
        Confirmed
      </span>
    );
  };

  return (
    <div className="min-h-screen bg-slate-50 py-8 px-4 sm:px-6 lg:px-8 font-sans">
      <div className="max-w-6xl mx-auto space-y-6">
        {/* TOP STATUS BANNER (If Recovered) */}
        {isRecovered && (
          <div className="bg-emerald-50 border border-emerald-200/80 rounded-2xl p-4 sm:p-5 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 animate-fade-in shadow-xs">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-full bg-emerald-100 text-emerald-700 flex items-center justify-center shrink-0">
                <CheckCircle2 className="w-5 h-5" />
              </div>
              <div>
                <h4 className="text-sm font-semibold text-emerald-950">
                  Itinerary Recovered & Synchronized
                </h4>
                <p className="text-xs text-emerald-700 mt-0.5">
                  Recovery plan applied. Downstream bookings have been safely updated and confirmed.
                </p>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <button
                onClick={() => setScreen('updated_itinerary')}
                className="text-xs font-semibold text-emerald-900 bg-emerald-100/80 hover:bg-emerald-100 px-3 py-1.5 rounded-lg transition-colors"
              >
                View Recovery Summary
              </button>
              <button
                onClick={resetDemo}
                className="text-xs font-medium text-slate-600 hover:text-slate-900 bg-white border border-slate-200 px-3 py-1.5 rounded-lg transition-colors flex items-center gap-1"
                title="Reset trip to original schedule"
              >
                <RotateCcw className="w-3 h-3" />
                <span>Reset Demo</span>
              </button>
            </div>
          </div>
        )}

        {/* HEADER SECTION */}
        <div className="bg-white rounded-2xl p-6 sm:p-8 border border-slate-200 shadow-sm flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div>
            <div className="flex items-center gap-2.5 mb-2">
              <span
                className={`inline-flex items-center gap-1.5 text-xs font-bold px-2.5 py-0.5 rounded-full ${
                  isRecovered
                    ? 'bg-emerald-100 text-emerald-800'
                    : trip.status === 'Disrupted'
                    ? 'bg-rose-100 text-rose-800'
                    : 'bg-emerald-100 text-emerald-800'
                }`}
              >
                <span
                  className={`w-1.5 h-1.5 rounded-full ${
                    isRecovered
                      ? 'bg-emerald-600'
                      : trip.status === 'Disrupted'
                      ? 'bg-rose-600'
                      : 'bg-emerald-600'
                  }`}
                ></span>
                {isRecovered ? 'Stable / Recovered' : trip.status}
              </span>
              <span className="text-xs text-slate-400">•</span>
              <span className="text-xs font-medium text-slate-500">Trip ID: {trip.id}</span>
            </div>

            <h1 className="text-2xl sm:text-3xl font-bold text-slate-900 tracking-tight">
              {trip.name}
            </h1>

            <div className="flex flex-wrap items-center gap-4 text-xs font-medium text-slate-600 mt-2">
              <div className="flex items-center gap-1.5">
                <MapPin className="w-3.5 h-3.5 text-slate-400" />
                <span>{trip.destination}</span>
              </div>
              <span className="text-slate-300">|</span>
              <div className="flex items-center gap-1.5">
                <Calendar className="w-3.5 h-3.5 text-slate-400" />
                <span>
                  {trip.startDate} — {trip.endDate}
                </span>
              </div>
            </div>
          </div>

          {/* ACTIONS */}
          <div className="flex items-center gap-3 shrink-0">
            <button
              onClick={() => setScreen('create_trip')}
              className="inline-flex items-center gap-1.5 px-4 py-2.5 text-xs font-medium text-slate-700 bg-white hover:bg-slate-50 border border-slate-300 rounded-xl transition-colors shadow-xs"
            >
              <Edit2 className="w-3.5 h-3.5 text-slate-500" />
              <span>Edit Trip</span>
            </button>

            <button
              onClick={() => setScreen('disruption_sim')}
              className="inline-flex items-center gap-2 px-5 py-2.5 text-xs font-semibold text-white bg-slate-900 hover:bg-slate-800 rounded-xl transition-all shadow-sm"
            >
              <AlertTriangle className="w-4 h-4 text-amber-400" />
              <span>Simulate Disruption</span>
            </button>
          </div>
        </div>

        {/* MAIN LAYOUT: TIMELINE (LEFT) & SIDEBAR SUMMARY (RIGHT) */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* TIMELINE COLUMN */}
          <div className="lg:col-span-2 space-y-6">
            <div className="bg-white rounded-2xl p-6 sm:p-8 border border-slate-200 shadow-sm">
              <div className="flex items-center justify-between pb-6 border-b border-slate-100 mb-6">
                <div>
                  <h2 className="text-lg font-bold text-slate-900">Itinerary Timeline</h2>
                  <p className="text-xs text-slate-500 mt-0.5">
                    Chronological schedule of confirmed travel segments.
                  </p>
                </div>
                <button
                  onClick={() => setScreen('create_trip')}
                  className="inline-flex items-center gap-1 text-xs font-semibold text-slate-700 hover:text-slate-900 bg-slate-50 hover:bg-slate-100 border border-slate-200 px-3 py-1.5 rounded-lg transition-colors"
                >
                  <Plus className="w-3.5 h-3.5" />
                  <span>Add Booking</span>
                </button>
              </div>

              {/* TIMELINE DAYS */}
              {trip.bookings.length === 0 ? (
                <div className="p-12 text-center border-2 border-dashed border-slate-200 rounded-xl">
                  <p className="text-sm text-slate-500 mb-3">
                    You haven't added any bookings to this itinerary yet.
                  </p>
                  <button
                    onClick={() => setScreen('create_trip')}
                    className="inline-flex items-center gap-2 px-4 py-2 bg-slate-900 text-white rounded-xl text-xs font-medium"
                  >
                    <Plus className="w-3.5 h-3.5" />
                    <span>Build Itinerary</span>
                  </button>
                </div>
              ) : (
                <div className="space-y-8">
                  {Object.entries(groupedBookings).map(([date, bookingsForDay]) => (
                    <div key={date} className="relative">
                      {/* Day Header Badge */}
                      <div className="flex items-center gap-3 mb-4">
                        <div className="px-3 py-1 bg-slate-900 text-white text-xs font-bold tracking-wider rounded-md uppercase">
                          {date}
                        </div>
                        <div className="flex-1 h-[1px] bg-slate-200"></div>
                      </div>

                      {/* Bookings within this day */}
                      <div className="space-y-3.5 pl-2 sm:pl-4 border-l-2 border-slate-200 ml-3">
                        {bookingsForDay.map((booking) => (
                          <div
                            key={booking.id}
                            className={`p-4 rounded-xl border transition-all relative ${
                              booking.isUpdated
                                ? 'bg-blue-50/40 border-blue-200/90 shadow-xs'
                                : 'bg-white hover:bg-slate-50/60 border-slate-200 shadow-xs'
                            }`}
                          >
                            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                              <div className="flex items-start gap-3.5">
                                {/* Type Icon */}
                                <div className="w-9 h-9 rounded-lg bg-slate-100 border border-slate-200/80 flex items-center justify-center shrink-0 mt-0.5">
                                  {getTypeIcon(booking.type)}
                                </div>

                                <div>
                                  <div className="flex flex-wrap items-center gap-2">
                                    <span className="text-sm font-semibold text-slate-900">
                                      {booking.title}
                                    </span>
                                    {getStatusBadge(booking)}
                                  </div>

                                  <div className="text-xs text-slate-600 mt-1 flex flex-wrap items-center gap-2">
                                    <span className="font-semibold text-slate-800">
                                      {booking.time}
                                    </span>
                                    <span className="text-slate-300">•</span>
                                    <span>{booking.routeOrLocation}</span>
                                  </div>

                                  {booking.notes && (
                                    <p className="text-[11px] text-slate-500 mt-1">
                                      {booking.notes}
                                    </p>
                                  )}

                                  {booking.changeNote && (
                                    <p className="text-[11px] font-medium text-blue-800 mt-1.5 bg-blue-100/60 inline-block px-2 py-0.5 rounded">
                                      ↳ {booking.changeNote}
                                    </p>
                                  )}
                                </div>
                              </div>

                              {/* Right Actions: Edit & Delete Component */}
                              <div className="flex items-center justify-end gap-1.5 pt-2 sm:pt-0 border-t sm:border-t-0 border-slate-100">
                                <button
                                  onClick={() => setEditingBooking(booking)}
                                  className="inline-flex items-center gap-1 text-xs font-medium text-slate-600 hover:text-slate-900 bg-slate-50 hover:bg-slate-100 px-2.5 py-1.5 rounded-lg border border-slate-200 transition-colors"
                                  title="Edit booking timing or details"
                                >
                                  <Edit2 className="w-3 h-3 text-slate-500" />
                                  <span>Edit</span>
                                </button>
                                <button
                                  onClick={() => deleteBooking(booking.id)}
                                  className="p-1.5 text-slate-400 hover:text-rose-600 hover:bg-slate-100 rounded-lg transition-colors"
                                  title="Delete booking"
                                >
                                  <Trash2 className="w-3.5 h-3.5" />
                                </button>
                              </div>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>

          {/* SIDEBAR SUMMARY COLUMN */}
          <div className="space-y-6">
            <div className="bg-white rounded-2xl p-6 border border-slate-200 shadow-sm space-y-6">
              <div>
                <h3 className="text-base font-bold text-slate-900">Trip Summary</h3>
                <p className="text-xs text-slate-500 mt-0.5">
                  Overview of current reservation metrics.
                </p>
              </div>

              {/* Counts Breakdown */}
              <div className="space-y-3 pt-2">
                <div className="flex items-center justify-between text-xs py-1.5 border-b border-slate-100">
                  <span className="text-slate-600 font-medium">Total Itinerary Items</span>
                  <span className="font-bold text-slate-900">{trip.bookings.length}</span>
                </div>

                <div className="flex items-center justify-between text-xs py-1.5 border-b border-slate-100">
                  <div className="flex items-center gap-2 text-slate-600">
                    <Plane className="w-3.5 h-3.5 text-blue-700" />
                    <span>Flight segments</span>
                  </div>
                  <span className="font-semibold text-slate-800">{flightCount}</span>
                </div>

                <div className="flex items-center justify-between text-xs py-1.5 border-b border-slate-100">
                  <div className="flex items-center gap-2 text-slate-600">
                    <Building className="w-3.5 h-3.5 text-slate-700" />
                    <span>Hotel nights</span>
                  </div>
                  <span className="font-semibold text-slate-800">{hotelCount}</span>
                </div>

                <div className="flex items-center justify-between text-xs py-1.5 border-b border-slate-100">
                  <div className="flex items-center gap-2 text-slate-600">
                    <Car className="w-3.5 h-3.5 text-indigo-700" />
                    <span>Airport transfers</span>
                  </div>
                  <span className="font-semibold text-slate-800">{transferCount}</span>
                </div>

                <div className="flex items-center justify-between text-xs py-1.5 border-b border-slate-100">
                  <div className="flex items-center gap-2 text-slate-600">
                    <Ticket className="w-3.5 h-3.5 text-amber-700" />
                    <span>Activities & tours</span>
                  </div>
                  <span className="font-semibold text-slate-800">{activityCount}</span>
                </div>

                <div className="flex items-center justify-between text-xs py-1.5 border-b border-slate-100">
                  <div className="flex items-center gap-2 text-slate-600">
                    <Train className="w-3.5 h-3.5 text-emerald-700" />
                    <span>Train connections</span>
                  </div>
                  <span className="font-semibold text-slate-800">{trainCount}</span>
                </div>
              </div>

              {/* Total Trip Cost */}
              <div className="p-4 bg-slate-50 rounded-xl border border-slate-200">
                <span className="text-[11px] font-semibold text-slate-500 uppercase tracking-wider block">
                  Total Tracked Trip Cost
                </span>
                <div className="text-2xl font-bold text-slate-900 mt-1">
                  ₹{totalCost.toLocaleString('en-IN')}
                </div>
                <span className="text-[11px] text-slate-500 mt-0.5 block">
                  Includes airfare, chauffeur, hotel & tours.
                </span>
              </div>

              {/* Quick Simulation CTA */}
              <div className="pt-2">
                <button
                  onClick={() => setScreen('disruption_sim')}
                  className="w-full flex items-center justify-center gap-2 px-4 py-3 bg-slate-900 hover:bg-slate-800 text-white rounded-xl text-xs font-semibold transition-all shadow-sm"
                >
                  <Sparkles className="w-3.5 h-3.5 text-blue-400" />
                  <span>Simulate Disruption</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
