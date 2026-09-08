import React, { useState } from 'react';
import { X, ArrowRight, Plane, Hotel, Car, MapPin, Plus, Check } from 'lucide-react';
import { useTrip } from '../../context/TripContext';

export const CreateTripModal: React.FC = () => {
  const { isCreateTripOpen, setIsCreateTripOpen, createTrip } = useTrip();

  const [step, setStep] = useState<1 | 2>(1);
  const [origin, setOrigin] = useState('Mumbai (BOM)');
  const [destination, setDestination] = useState('Tokyo (HND)');
  const [startDate, setStartDate] = useState('05 May 2025');
  const [endDate, setEndDate] = useState('14 May 2025');

  const [addedItems, setAddedItems] = useState<string[]>([
    'Direct Flight BOM → HND',
    'Airport Express Transfer to Shinjuku',
  ]);

  if (!isCreateTripOpen) return null;

  const handleAddItem = (item: string) => {
    if (!addedItems.includes(item)) {
      setAddedItems([...addedItems, item]);
    }
  };

  const handleFinish = () => {
    createTrip({
      title: `${destination.split(' ')[0]} Journey`,
      route: `${origin.split(' ')[0]} → ${destination.split(' ')[0]}`,
      origin,
      destination,
      startDate,
      endDate,
      bookingCount: addedItems.length + 1,
    });
    setStep(1);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/40 backdrop-blur-xs p-4 animate-in fade-in duration-150">
      <div className="w-full max-w-lg bg-white rounded-2xl shadow-2xl border border-slate-200 overflow-hidden">
        {/* Modal Header */}
        <div className="p-5 border-b border-slate-100 flex items-center justify-between bg-slate-50/70">
          <div>
            <span className="text-[10px] uppercase font-bold tracking-wider px-2 py-0.5 rounded bg-blue-50 text-blue-700 border border-blue-200">
              Trip Builder • Step {step} of 2
            </span>
            <h2 className="text-base font-bold text-slate-900 mt-1">
              {step === 1 ? 'Where are you going?' : 'Build your journey'}
            </h2>
          </div>
          <button
            onClick={() => setIsCreateTripOpen(false)}
            className="p-1 rounded-md text-slate-400 hover:text-slate-700 hover:bg-slate-200 transition-colors"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Step 1: Origin & Destination */}
        {step === 1 ? (
          <div className="p-6 space-y-4 text-xs">
            <div>
              <label className="text-xs font-semibold text-slate-700 block mb-1">From</label>
              <input
                type="text"
                value={origin}
                onChange={(e) => setOrigin(e.target.value)}
                placeholder="e.g. Mumbai (BOM)"
                className="w-full bg-slate-50 border border-slate-300 rounded-lg p-2.5 text-xs text-slate-900 font-medium focus:ring-1 focus:ring-blue-500 focus:outline-none"
              />
            </div>

            <div>
              <label className="text-xs font-semibold text-slate-700 block mb-1">To</label>
              <input
                type="text"
                value={destination}
                onChange={(e) => setDestination(e.target.value)}
                placeholder="e.g. Tokyo (HND) or Paris (CDG)"
                className="w-full bg-slate-50 border border-slate-300 rounded-lg p-2.5 text-xs text-slate-900 font-medium focus:ring-1 focus:ring-blue-500 focus:outline-none"
              />
            </div>

            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="text-xs font-semibold text-slate-700 block mb-1">Start Date</label>
                <input
                  type="text"
                  value={startDate}
                  onChange={(e) => setStartDate(e.target.value)}
                  className="w-full bg-slate-50 border border-slate-300 rounded-lg p-2.5 text-xs text-slate-900 font-medium focus:ring-1 focus:ring-blue-500 focus:outline-none"
                />
              </div>
              <div>
                <label className="text-xs font-semibold text-slate-700 block mb-1">End Date</label>
                <input
                  type="text"
                  value={endDate}
                  onChange={(e) => setEndDate(e.target.value)}
                  className="w-full bg-slate-50 border border-slate-300 rounded-lg p-2.5 text-xs text-slate-900 font-medium focus:ring-1 focus:ring-blue-500 focus:outline-none"
                />
              </div>
            </div>

            <div className="pt-3 border-t border-slate-100 flex justify-end">
              <button
                onClick={() => setStep(2)}
                className="px-5 py-2.5 bg-slate-900 hover:bg-slate-800 text-white rounded-xl text-xs font-semibold shadow-xs flex items-center gap-1.5 transition-colors"
              >
                <span>Continue</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>
        ) : (
          /* Step 2: Build Journey (Add bookings) */
          <div className="p-6 space-y-4 text-xs">
            <p className="text-slate-500 text-xs">
              Quickly add itinerary components to build your connected dependency graph.
            </p>

            <div className="grid grid-cols-2 gap-2">
              <button
                onClick={() => handleAddItem(`Flight ${origin.split(' ')[0]} → ${destination.split(' ')[0]}`)}
                className="p-3 rounded-lg border border-slate-200 hover:border-blue-400 hover:bg-blue-50/40 text-left transition-colors flex items-center gap-2"
              >
                <Plane className="w-4 h-4 text-blue-600" />
                <span className="font-semibold text-slate-800">+ Add Flight</span>
              </button>

              <button
                onClick={() => handleAddItem(`Hotel in ${destination.split(' ')[0]}`)}
                className="p-3 rounded-lg border border-slate-200 hover:border-blue-400 hover:bg-blue-50/40 text-left transition-colors flex items-center gap-2"
              >
                <Hotel className="w-4 h-4 text-blue-600" />
                <span className="font-semibold text-slate-800">+ Add Hotel</span>
              </button>

              <button
                onClick={() => handleAddItem(`Airport Transfer`)}
                className="p-3 rounded-lg border border-slate-200 hover:border-blue-400 hover:bg-blue-50/40 text-left transition-colors flex items-center gap-2"
              >
                <Car className="w-4 h-4 text-blue-600" />
                <span className="font-semibold text-slate-800">+ Add Transfer</span>
              </button>

              <button
                onClick={() => handleAddItem(`Guided City Sightseeing Tour`)}
                className="p-3 rounded-lg border border-slate-200 hover:border-blue-400 hover:bg-blue-50/40 text-left transition-colors flex items-center gap-2"
              >
                <MapPin className="w-4 h-4 text-blue-600" />
                <span className="font-semibold text-slate-800">+ Add Activity</span>
              </button>
            </div>

            {/* Added list preview */}
            <div className="bg-slate-50 rounded-xl p-3 border border-slate-200 space-y-1.5">
              <span className="text-[10px] uppercase font-bold text-slate-400 block">
                Connected Bookings ({addedItems.length}):
              </span>
              {addedItems.map((item, idx) => (
                <div key={idx} className="flex items-center gap-2 text-slate-700 font-medium">
                  <Check className="w-3.5 h-3.5 text-emerald-600" />
                  <span>{item}</span>
                </div>
              ))}
            </div>

            <div className="pt-3 border-t border-slate-100 flex items-center justify-between">
              <button
                onClick={() => setStep(1)}
                className="text-xs text-slate-500 hover:text-slate-800 font-medium"
              >
                ← Back
              </button>
              <button
                onClick={handleFinish}
                className="px-5 py-2.5 bg-blue-700 hover:bg-blue-800 text-white rounded-xl text-xs font-semibold shadow-xs flex items-center gap-1.5 transition-colors"
              >
                <span>Save & View Journey</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
