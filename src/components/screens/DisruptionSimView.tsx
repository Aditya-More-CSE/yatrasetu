import React from 'react';
import { useTrip } from '../../context/TripContext';
import {
  Plane,
  ArrowRight,
  Clock,
  Minus,
  Plus,
} from 'lucide-react';
import { calculateNewArrival, formatDelayDuration } from '../../utils/timeCalculations';

export const DisruptionSimView: React.FC = () => {
  const {
    setScreen,
    delayMinutes,
    setDelayMinutes,
    runDisruptionSimulation,
    trip,
    selectedFlightId,
    setSelectedFlightId,
  } = useTrip();

  // Available flights in the trip
  const flights = trip.bookings.filter((b) => b.type === 'flight');
  const selectedFlight = flights.find((f) => f.id === selectedFlightId) || flights[0] || {
    id: 'b-flight',
    title: 'Flight',
    routeOrLocation: 'Mumbai → Paris',
    time: '10:40 AM',
    endTime: '4:15 PM',
  };

  const origArrival = selectedFlight.endTime || '4:15 PM';
  const liveCalculatedArrival = calculateNewArrival(origArrival, delayMinutes);
  const formattedDelay = formatDelayDuration(delayMinutes);

  const quickDelays = [
    { label: '30m', minutes: 30 },
    { label: '1h', minutes: 60 },
    { label: '2h', minutes: 120 },
    { label: '3h', minutes: 180 },
    { label: '5h', minutes: 300 },
  ];

  const handleDecrement = () => {
    setDelayMinutes(Math.max(15, delayMinutes - 30));
  };

  const handleIncrement = () => {
    setDelayMinutes(Math.min(720, delayMinutes + 30));
  };

  return (
    <div className="p-6 md:p-8 max-w-2xl mx-auto font-sans">
      <div className="bg-white rounded-xl p-6 sm:p-8 border border-slate-200/90 shadow-xs space-y-6">
        {/* Header */}
        <div className="pb-5 border-b border-slate-100">
          <div className="text-[10px] font-bold uppercase tracking-wider text-amber-700 bg-amber-50 border border-amber-200/80 px-2.5 py-0.5 rounded w-fit mb-2">
            Simulated Disruption Control
          </div>
          <h1 className="text-xl font-bold text-slate-900">SIMULATE DISRUPTION</h1>
          <p className="text-xs text-slate-500 mt-1">
            Change flight timing to trigger automated downstream dependency calculations.
          </p>
        </div>

        {/* 1. Affected Booking */}
        <div className="space-y-1.5">
          <label className="text-xs font-bold text-slate-600 uppercase tracking-wider block">
            Affected booking
          </label>
          {flights.length > 1 ? (
            <select
              value={selectedFlightId}
              onChange={(e) => setSelectedFlightId(e.target.value)}
              className="w-full px-3.5 py-2.5 text-xs font-semibold border border-slate-300 rounded-lg bg-white"
            >
              {flights.map((f) => (
                <option key={f.id} value={f.id}>
                  ✈ {f.title} — {f.routeOrLocation}
                </option>
              ))}
            </select>
          ) : (
            <div className="flex items-center gap-2.5 px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-lg text-xs font-bold text-slate-800">
              <Plane className="w-4 h-4 text-blue-700" />
              <span>Flight — Mumbai → Paris (Air India AI-142)</span>
            </div>
          )}
        </div>

        {/* 2. Disruption Type Card */}
        <div className="space-y-1.5">
          <label className="text-xs font-bold text-slate-600 uppercase tracking-wider block">
            Disruption
          </label>
          <div className="p-4 rounded-xl border border-slate-900 bg-slate-900 text-white shadow-xs">
            <div className="flex items-center gap-2">
              <span className="text-xs font-bold">Flight delayed</span>
              <span className="text-[10px] bg-amber-400 text-slate-950 font-bold px-1.5 py-0.2 rounded">
                Active
              </span>
            </div>
            <p className="text-xs text-slate-300 mt-1">
              Change the expected arrival time to evaluate impact on connected bookings.
            </p>
          </div>
        </div>

        {/* 3. Delay Stepper & Quick Options */}
        <div className="space-y-3 pt-2">
          <label className="text-xs font-bold text-slate-600 uppercase tracking-wider block">
            Delay duration
          </label>

          {/* Stepper Control: [-]   03h 30m   [+] */}
          <div className="flex items-center justify-between p-3 bg-slate-50 rounded-xl border border-slate-200">
            <button
              type="button"
              onClick={handleDecrement}
              className="w-9 h-9 rounded-lg bg-white border border-slate-200 hover:bg-slate-100 flex items-center justify-center text-slate-700 shadow-2xs transition-colors"
              title="Decrease by 30 min"
            >
              <Minus className="w-4 h-4" />
            </button>

            <div className="text-center">
              <div className="text-lg font-bold font-mono text-slate-900">
                {formattedDelay}
              </div>
              <div className="text-[10px] text-slate-400 uppercase font-medium">Selected Delay</div>
            </div>

            <button
              type="button"
              onClick={handleIncrement}
              className="w-9 h-9 rounded-lg bg-white border border-slate-200 hover:bg-slate-100 flex items-center justify-center text-slate-700 shadow-2xs transition-colors"
              title="Increase by 30 min"
            >
              <Plus className="w-4 h-4" />
            </button>
          </div>

          {/* Quick Buttons: 30m   1h   2h   3h   5h */}
          <div className="flex items-center gap-2 pt-1">
            <span className="text-xs font-medium text-slate-400 mr-1">Quick:</span>
            {quickDelays.map((q) => (
              <button
                key={q.minutes}
                type="button"
                onClick={() => setDelayMinutes(q.minutes)}
                className={`px-3 py-1.5 rounded-lg text-xs font-semibold border transition-all ${
                  delayMinutes === q.minutes
                    ? 'bg-slate-900 text-white border-slate-900 shadow-2xs'
                    : 'bg-white hover:bg-slate-100 text-slate-700 border-slate-200'
                }`}
              >
                {q.label}
              </button>
            ))}
          </div>
        </div>

        {/* 4. Expected Arrival Result Box */}
        <div className="p-4 bg-slate-50/80 rounded-xl border border-slate-200 flex items-center justify-between">
          <div>
            <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block">
              Expected Arrival
            </span>
            <div className="text-sm font-semibold text-slate-800 mt-0.5">
              <span className="line-through text-slate-400 mr-2">{origArrival}</span>
              <span className="text-slate-400 mr-2">→</span>
              <span className="font-bold text-rose-800 font-mono">
                {liveCalculatedArrival.newTimeStr}
              </span>
            </div>
          </div>
          <div className="text-right text-[11px] text-slate-500 font-medium">
            Terminal exit ~{calculateNewArrival(origArrival, delayMinutes + 60).newTimeStr}
          </div>
        </div>

        {/* Credibility Notice */}
        <div className="text-[11px] text-slate-400 font-medium">
          Prototype environment • Simulated disruption
        </div>

        {/* Primary CTA */}
        <div className="pt-2 flex items-center justify-end gap-3">
          <button
            onClick={() => setScreen('dashboard')}
            className="px-4 py-2 text-xs font-medium text-slate-600 hover:text-slate-900"
          >
            Cancel
          </button>

          <button
            onClick={runDisruptionSimulation}
            className="inline-flex items-center gap-2 px-5 py-2.5 bg-slate-900 hover:bg-slate-800 text-white text-xs font-semibold rounded-lg shadow-xs transition-all"
          >
            <span>Analyze Impact</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>
    </div>
  );
};
