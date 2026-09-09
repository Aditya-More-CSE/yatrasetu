import React, { useState } from 'react';
import { useTrip } from '../../context/TripContext';
import {
  Plane,
  Train,
  Building,
  Ticket,
  AlertOctagon,
  ArrowLeft,
  ArrowRight,
  Clock,
  Info,
  Sliders,
} from 'lucide-react';
import { DisruptionType } from '../../types/trip';
import { calculateNewArrival, formatDelayDuration } from '../../utils/timeCalculations';

export const DisruptionSimView: React.FC = () => {
  const {
    setScreen,
    delayMinutes,
    setDelayMinutes,
    disruptionChoice,
    setDisruptionChoice,
    runDisruptionSimulation,
    trip,
    selectedFlightId,
    setSelectedFlightId,
  } = useTrip();

  const [isCustomMode, setIsCustomMode] = useState(false);
  const [customHours, setCustomHours] = useState(Math.floor(delayMinutes / 60));
  const [customMins, setCustomMins] = useState(delayMinutes % 60);

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
    { label: '+30 min', minutes: 30 },
    { label: '+1 hour', minutes: 60 },
    { label: '+2 hours', minutes: 120 },
    { label: '+3 hours', minutes: 180 },
    { label: '+5 hours', minutes: 300 },
  ];

  const handleQuickSelect = (mins: number) => {
    setIsCustomMode(false);
    setDelayMinutes(mins);
    setCustomHours(Math.floor(mins / 60));
    setCustomMins(mins % 60);
  };

  const handleCustomHoursChange = (val: string) => {
    const num = Math.max(0, Math.min(24, parseInt(val, 10) || 0));
    setCustomHours(num);
    const total = num * 60 + customMins;
    setDelayMinutes(Math.max(15, total));
  };

  const handleCustomMinsChange = (val: string) => {
    const num = Math.max(0, Math.min(59, parseInt(val, 10) || 0));
    setCustomMins(num);
    const total = customHours * 60 + num;
    setDelayMinutes(Math.max(15, total));
  };

  const choices: {
    type: DisruptionType;
    label: string;
    description: string;
    icon: React.ReactNode;
  }[] = [
    {
      type: 'flight_delayed',
      label: 'Flight delayed',
      description: 'Inbound or departing flight delayed. Dynamically propagates to downstream transfers and hotels.',
      icon: <Plane className="w-4 h-4 text-blue-700" />,
    },
    {
      type: 'flight_cancelled',
      label: 'Flight cancelled',
      description: 'Scheduled flight cancelled. Rebooking required on the next available partner flight.',
      icon: <AlertOctagon className="w-4 h-4 text-rose-700" />,
    },
    {
      type: 'train_delayed',
      label: 'Train delayed',
      description: 'High-speed rail corridor track maintenance creates schedule displacement.',
      icon: <Train className="w-4 h-4 text-emerald-700" />,
    },
    {
      type: 'hotel_unavailable',
      label: 'Hotel unavailable',
      description: 'Property maintenance issue forces room reallocation or delayed check-in.',
      icon: <Building className="w-4 h-4 text-slate-700" />,
    },
    {
      type: 'activity_cancelled',
      label: 'Activity cancelled',
      description: 'Attraction temporarily closed for preservation inspection or weather.',
      icon: <Ticket className="w-4 h-4 text-amber-700" />,
    },
  ];

  return (
    <div className="min-h-screen bg-slate-50 py-10 px-4 sm:px-6 lg:px-8 font-sans">
      <div className="max-w-3xl mx-auto">
        {/* Navigation back */}
        <div className="mb-6 flex items-center justify-between">
          <button
            onClick={() => setScreen('dashboard')}
            className="inline-flex items-center gap-2 text-xs font-medium text-slate-500 hover:text-slate-900 transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Back to Dashboard</span>
          </button>
          <span className="text-xs font-semibold text-slate-400 uppercase tracking-wider">
            Disruption Simulator
          </span>
        </div>

        {/* Main Card */}
        <div className="bg-white rounded-2xl p-6 sm:p-8 border border-slate-200 shadow-sm">
          <div className="pb-6 border-b border-slate-100">
            <div className="inline-flex items-center gap-2 text-xs font-bold text-amber-800 bg-amber-50 px-3 py-1 rounded-full border border-amber-200/80 mb-3">
              <Clock className="w-3.5 h-3.5" />
              Interactive Disruption Trigger
            </div>
            <h1 className="text-2xl font-bold text-slate-900">Simulate a disruption</h1>
            <p className="text-sm text-slate-500 mt-1">
              Select an itinerary disruption event to trigger real-time downstream dependency calculations.
            </p>
          </div>

          {/* DISRUPTION CHOICES */}
          <div className="py-6 space-y-3">
            <label className="block text-xs font-bold uppercase tracking-wider text-slate-500 mb-2">
              Select Disruption Type
            </label>

            {choices.map((choice) => {
              const isSelected = disruptionChoice === choice.type;
              return (
                <div
                  key={choice.type}
                  onClick={() => setDisruptionChoice(choice.type)}
                  className={`p-4 rounded-xl border transition-all cursor-pointer flex items-start justify-between gap-4 ${
                    isSelected
                      ? 'bg-slate-900 text-white border-slate-900 shadow-sm'
                      : 'bg-white hover:bg-slate-50 text-slate-800 border-slate-200'
                  }`}
                >
                  <div className="flex items-start gap-3.5">
                    <div
                      className={`w-9 h-9 rounded-lg flex items-center justify-center shrink-0 mt-0.5 ${
                        isSelected ? 'bg-slate-800 text-white' : 'bg-slate-100'
                      }`}
                    >
                      {choice.icon}
                    </div>
                    <div>
                      <div className="flex items-center gap-2">
                        <span className="font-semibold text-sm">{choice.label}</span>
                        {choice.type === 'flight_delayed' && (
                          <span
                            className={`text-[10px] font-bold uppercase px-2 py-0.5 rounded ${
                              isSelected
                                ? 'bg-amber-400 text-slate-950 font-bold'
                                : 'bg-blue-50 text-blue-800 border border-blue-200'
                            }`}
                          >
                            Primary Demo
                          </span>
                        )}
                      </div>
                      <p
                        className={`text-xs mt-1 leading-relaxed ${
                          isSelected ? 'text-slate-300' : 'text-slate-500'
                        }`}
                      >
                        {choice.description}
                      </p>
                    </div>
                  </div>

                  <div className="pt-1 shrink-0">
                    <div
                      className={`w-4 h-4 rounded-full border flex items-center justify-center ${
                        isSelected
                          ? 'border-white bg-white'
                          : 'border-slate-300 bg-transparent'
                      }`}
                    >
                      {isSelected && <span className="w-2 h-2 rounded-full bg-slate-900"></span>}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>

          {/* DELAY CONTROLS (For Flight Delay) */}
          {disruptionChoice === 'flight_delayed' && (
            <div className="p-5 bg-slate-50 rounded-xl border border-slate-200 mb-6 space-y-4 animate-fade-in">
              {/* Flight Selection if multiple flights */}
              {flights.length > 1 && (
                <div>
                  <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
                    Select Affected Flight
                  </label>
                  <select
                    value={selectedFlightId}
                    onChange={(e) => setSelectedFlightId(e.target.value)}
                    className="w-full px-3 py-2 text-xs font-medium border border-slate-300 rounded-lg bg-white"
                  >
                    {flights.map((f) => (
                      <option key={f.id} value={f.id}>
                        {f.title} ({f.routeOrLocation}) • Scheduled Arrival: {f.endTime || '4:15 PM'}
                      </option>
                    ))}
                  </select>
                </div>
              )}

              {/* Quick Select Buttons */}
              <div>
                <div className="flex items-center justify-between mb-2">
                  <label className="text-xs font-bold text-slate-700 uppercase tracking-wider">
                    Select Delay Duration
                  </label>
                  <span className="text-xs font-bold text-blue-900 font-mono">
                    {formattedDelay}
                  </span>
                </div>

                <div className="grid grid-cols-5 gap-2">
                  {quickDelays.map((q) => {
                    const isSelected = !isCustomMode && delayMinutes === q.minutes;
                    return (
                      <button
                        key={q.minutes}
                        type="button"
                        onClick={() => handleQuickSelect(q.minutes)}
                        className={`py-2 px-1.5 rounded-xl text-xs font-bold border transition-all text-center ${
                          isSelected
                            ? 'bg-slate-900 text-white border-slate-900 shadow-sm'
                            : 'bg-white hover:bg-slate-100 text-slate-700 border-slate-200'
                        }`}
                      >
                        {q.label}
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Custom Delay Option */}
              <div className="pt-2 border-t border-slate-200/70">
                <button
                  type="button"
                  onClick={() => setIsCustomMode(!isCustomMode)}
                  className="inline-flex items-center gap-1.5 text-xs font-semibold text-blue-900 hover:text-blue-950"
                >
                  <Sliders className="w-3.5 h-3.5" />
                  <span>{isCustomMode ? 'Use Quick Presets' : 'Specify Custom Delay Duration'}</span>
                </button>

                {isCustomMode && (
                  <div className="mt-3 p-3 bg-white rounded-xl border border-slate-200 flex items-center gap-4 animate-fade-in">
                    <div className="flex items-center gap-2">
                      <input
                        type="number"
                        min="0"
                        max="24"
                        value={customHours}
                        onChange={(e) => handleCustomHoursChange(e.target.value)}
                        className="w-16 px-2.5 py-1.5 text-sm font-mono font-bold text-center border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-slate-900"
                      />
                      <span className="text-xs font-medium text-slate-600">hours</span>
                    </div>

                    <span className="text-slate-300 font-bold">:</span>

                    <div className="flex items-center gap-2">
                      <input
                        type="number"
                        min="0"
                        max="59"
                        step="5"
                        value={customMins}
                        onChange={(e) => handleCustomMinsChange(e.target.value)}
                        className="w-16 px-2.5 py-1.5 text-sm font-mono font-bold text-center border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-slate-900"
                      />
                      <span className="text-xs font-medium text-slate-600">minutes</span>
                    </div>

                    <div className="ml-auto text-xs text-slate-500 font-medium">
                      Total: <strong>{formattedDelay}</strong>
                    </div>
                  </div>
                )}
              </div>

              {/* DYNAMIC REAL-TIME PREVIEW CARD */}
              <div className="mt-4 p-4 bg-white rounded-xl border border-slate-200/90 shadow-xs">
                <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block mb-2">
                  Live Arrival Calculation Preview
                </span>
                <div className="grid grid-cols-3 gap-2 text-center text-xs">
                  <div className="p-2 bg-slate-50 rounded-lg">
                    <span className="text-slate-500 block text-[10px]">Original arrival</span>
                    <span className="font-semibold text-slate-800 font-mono mt-0.5 block">
                      {origArrival}
                    </span>
                  </div>
                  <div className="p-2 bg-amber-50 text-amber-900 rounded-lg border border-amber-200/50">
                    <span className="block text-[10px] font-bold uppercase">Selected Delay</span>
                    <span className="font-bold font-mono mt-0.5 block">
                      {formattedDelay}
                    </span>
                  </div>
                  <div className="p-2 bg-rose-50 text-rose-900 rounded-lg border border-rose-200/50">
                    <span className="block text-[10px] font-bold uppercase">New expected arrival</span>
                    <span className="font-bold font-mono mt-0.5 block">
                      {liveCalculatedArrival.newTimeStr}
                    </span>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* PROTOTYPE NOTICE */}
          <div className="p-4 bg-slate-50 rounded-xl border border-slate-200 mb-8 flex items-start gap-3 text-xs text-slate-600">
            <Info className="w-4 h-4 text-slate-400 shrink-0 mt-0.5" />
            <p>
              <strong>Interactive Simulation:</strong> Downstream dependency calculations, buffer warnings, and recovery recommendations update dynamically based on your chosen delay duration.
            </p>
          </div>

          {/* PRIMARY ACTION BUTTON */}
          <div className="pt-2 flex items-center justify-between">
            <button
              onClick={() => setScreen('dashboard')}
              className="px-4 py-2.5 text-xs font-medium text-slate-600 hover:text-slate-800 transition-colors"
            >
              Cancel
            </button>

            <button
              onClick={runDisruptionSimulation}
              className="inline-flex items-center gap-2 px-6 py-3 bg-slate-900 hover:bg-slate-800 text-white text-sm font-semibold rounded-xl transition-all shadow-sm"
            >
              <span>Analyze Impact</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
