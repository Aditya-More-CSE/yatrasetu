import React from 'react';
import { Plus, ArrowRight, MapPin, Calendar, AlertTriangle, ShieldCheck, Check } from 'lucide-react';
import { useTrip } from '../../context/TripContext';

export const MyTripsHub: React.FC = () => {
  const {
    trips,
    setCurrentTripId,
    setActiveTab,
    setIsCreateTripOpen,
    activeDisruption,
    isRecovered,
  } = useTrip();

  const handleOpenTrip = (tripId: string) => {
    setCurrentTripId(tripId);
    setActiveTab('mytrip');
  };

  return (
    <div className="space-y-6 max-w-4xl mx-auto pb-12">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-white border border-slate-200 rounded-2xl p-6 shadow-card">
        <div>
          <span className="text-[10px] uppercase font-bold tracking-wider px-2 py-0.5 rounded bg-blue-50 text-blue-700 border border-blue-200">
            Traveler Hub
          </span>
          <h1 className="text-2xl font-bold text-slate-900 mt-1">My Trips</h1>
          <p className="text-xs text-slate-500 mt-0.5">Your journeys in one place</p>
        </div>

        <button
          onClick={() => setIsCreateTripOpen(true)}
          className="px-4 py-2.5 bg-slate-900 hover:bg-slate-800 text-white rounded-xl text-xs font-semibold shadow-xs flex items-center gap-2 transition-colors self-start sm:self-center"
        >
          <Plus className="w-4 h-4" />
          <span>Create trip</span>
        </button>
      </div>

      {/* Trips Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
        {trips.map((trip) => {
          const hasDisruption = trip.id === 'trip-paris' && activeDisruption && !isRecovered;
          const isTripRecovered = trip.id === 'trip-paris' && isRecovered;

          return (
            <div
              key={trip.id}
              className={`bg-white rounded-2xl border transition-all p-6 flex flex-col justify-between shadow-card hover:shadow-elevated ${
                hasDisruption
                  ? 'border-amber-300 ring-1 ring-amber-300'
                  : isTripRecovered
                  ? 'border-emerald-300'
                  : 'border-slate-200'
              }`}
            >
              <div>
                <div className="flex items-center justify-between mb-3">
                  <span className="text-xs font-mono font-bold text-slate-400">
                    {trip.bookingCount} bookings
                  </span>
                  {hasDisruption ? (
                    <span className="inline-flex items-center gap-1 text-[10px] font-bold px-2 py-0.5 rounded bg-red-100 text-red-700">
                      <AlertTriangle className="w-3 h-3 text-red-600" />
                      1 disruption • 3 affected
                    </span>
                  ) : isTripRecovered ? (
                    <span className="inline-flex items-center gap-1 text-[10px] font-bold px-2 py-0.5 rounded bg-emerald-100 text-emerald-800">
                      <ShieldCheck className="w-3 h-3 text-emerald-600" />
                      Trip recovered
                    </span>
                  ) : (
                    <span className="inline-flex items-center gap-1 text-[10px] font-bold px-2 py-0.5 rounded bg-emerald-50 text-emerald-700">
                      <Check className="w-3 h-3 text-emerald-600" />
                      Trip ready
                    </span>
                  )}
                </div>

                <h3 className="text-lg font-bold text-slate-900">{trip.title}</h3>
                <p className="text-xs text-slate-500 flex items-center gap-1.5 mt-1">
                  <MapPin className="w-3.5 h-3.5 text-slate-400" />
                  <span>{trip.route}</span>
                </p>
                <p className="text-xs text-slate-500 flex items-center gap-1.5 mt-0.5">
                  <Calendar className="w-3.5 h-3.5 text-slate-400" />
                  <span>
                    {trip.startDate} — {trip.endDate}
                  </span>
                </p>
              </div>

              {/* Action Button */}
              <div className="mt-6 pt-4 border-t border-slate-100 flex items-center justify-between">
                <span className="text-[11px] text-slate-400 font-medium">
                  {hasDisruption ? 'Requires attention' : 'Ready to travel'}
                </span>
                <button
                  onClick={() => handleOpenTrip(trip.id)}
                  className={`px-4 py-2 rounded-xl text-xs font-semibold flex items-center gap-1.5 transition-colors shadow-xs ${
                    hasDisruption
                      ? 'bg-red-600 hover:bg-red-700 text-white'
                      : 'bg-slate-900 hover:bg-slate-800 text-white'
                  }`}
                >
                  <span>{hasDisruption ? 'Review Disruption' : 'Open trip'}</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
