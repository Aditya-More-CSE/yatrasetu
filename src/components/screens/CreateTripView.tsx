import React, { useState } from 'react';
import { useTrip } from '../../context/TripContext';
import {
  Plane,
  Building,
  Train,
  Car,
  Ticket,
  Plus,
  Trash2,
  Edit2,
  ArrowRight,
  ArrowLeft,
  CheckCircle2,
  AlertCircle,
  X,
} from 'lucide-react';
import { Booking, BookingType } from '../../types/trip';

export const CreateTripView: React.FC = () => {
  const { setScreen, updateTripMeta, addBooking, deleteBooking, updateBooking, trip } = useTrip();

  // Step 1: Base Trip Details
  const [tripName, setTripName] = useState(trip.name || 'Paris & Amsterdam');
  const [destination, setDestination] = useState(trip.destination || 'Paris, France');
  const [startDate, setStartDate] = useState(trip.startDate || '2026-09-18');
  const [endDate, setEndDate] = useState(trip.endDate || '2026-09-24');
  const [isBaseSaved, setIsBaseSaved] = useState(true);

  // Active form state for adding a component
  const [activeComponentType, setActiveComponentType] = useState<BookingType | null>(null);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [validationError, setValidationError] = useState<string | null>(null);

  // Dynamic component form state
  const [flightFrom, setFlightFrom] = useState('Mumbai (BOM)');
  const [flightTo, setFlightTo] = useState('Paris (CDG)');
  const [flightDep, setFlightDep] = useState('18 Sep, 10:40 AM');
  const [flightArr, setFlightArr] = useState('18 Sep, 4:15 PM');

  const [hotelName, setHotelName] = useState('Hotel Lumière');
  const [hotelLocation, setHotelLocation] = useState('9th Arr., Paris');
  const [hotelCheckIn, setHotelCheckIn] = useState('18 Sep, 9:00 PM');
  const [hotelCheckOut, setHotelCheckOut] = useState('20 Sep, 10:00 AM');

  const [trainFrom, setTrainFrom] = useState('Paris Gare du Nord');
  const [trainTo, setTrainTo] = useState('Amsterdam Centraal');
  const [trainTime, setTrainTime] = useState('20 Sep, 8:30 AM');

  const [transferPickup, setTransferPickup] = useState('Paris CDG Terminal 2E');
  const [transferDropoff, setTransferDropoff] = useState('Hotel Lumière');
  const [transferTime, setTransferTime] = useState('18 Sep, 7:30 PM');

  const [activityName, setActivityName] = useState('Eiffel Tower Tour');
  const [activityLocation, setActivityLocation] = useState('Champ de Mars, Paris');
  const [activityTime, setActivityTime] = useState('19 Sep, 10:00 AM');

  const handleSaveBaseTrip = (e: React.FormEvent) => {
    e.preventDefault();
    if (!tripName.trim()) {
      setValidationError('Please enter a trip name.');
      return;
    }
    if (!destination.trim()) {
      setValidationError('Please enter a destination.');
      return;
    }
    if (startDate > endDate) {
      setValidationError('Start date must be before or equal to end date.');
      return;
    }

    setValidationError(null);
    updateTripMeta({
      name: tripName.trim(),
      destination: destination.trim(),
      startDate,
      endDate,
    });
    setIsBaseSaved(true);
  };

  const handleAddComponent = (e: React.FormEvent) => {
    e.preventDefault();
    setValidationError(null);

    let newBooking: Omit<Booking, 'id'> | null = null;

    if (activeComponentType === 'flight') {
      if (!flightFrom || !flightTo) {
        setValidationError('Please provide origin and destination.');
        return;
      }
      newBooking = {
        type: 'flight',
        title: 'Flight',
        routeOrLocation: `${flightFrom} → ${flightTo}`,
        date: flightDep.split(',')[0] || '18 Sep',
        time: flightDep.split(',')[1]?.trim() || '10:40 AM',
        endTime: flightArr.split(',')[1]?.trim() || '4:15 PM',
        cost: 48500,
        status: 'confirmed',
        statusLabel: 'Confirmed',
        notes: `Departure: ${flightDep} • Arrival: ${flightArr}`,
      };
    } else if (activeComponentType === 'hotel') {
      if (!hotelName) {
        setValidationError('Please enter hotel name.');
        return;
      }
      newBooking = {
        type: 'hotel',
        title: hotelName,
        routeOrLocation: hotelLocation || 'City Center',
        date: hotelCheckIn.split(',')[0] || '18 Sep',
        time: hotelCheckIn.split(',')[1]?.trim() || '9:00 PM',
        cost: 36000,
        status: 'confirmed',
        statusLabel: 'Check-in',
        notes: `Check-in: ${hotelCheckIn} • Check-out: ${hotelCheckOut}`,
      };
    } else if (activeComponentType === 'train') {
      if (!trainFrom || !trainTo) {
        setValidationError('Please enter train route stations.');
        return;
      }
      newBooking = {
        type: 'train',
        title: 'Train',
        routeOrLocation: `${trainFrom} → ${trainTo}`,
        date: trainTime.split(',')[0] || '20 Sep',
        time: trainTime.split(',')[1]?.trim() || '8:30 AM',
        cost: 6800,
        status: 'confirmed',
        statusLabel: 'Confirmed',
        notes: `Departure: ${trainTime}`,
      };
    } else if (activeComponentType === 'transfer') {
      if (!transferPickup || !transferDropoff) {
        setValidationError('Please enter pickup and drop-off locations.');
        return;
      }
      newBooking = {
        type: 'transfer',
        title: 'Airport Transfer',
        routeOrLocation: `${transferPickup} → ${transferDropoff}`,
        date: transferTime.split(',')[0] || '18 Sep',
        time: transferTime.split(',')[1]?.trim() || '7:30 PM',
        cost: 3200,
        status: 'confirmed',
        statusLabel: 'Confirmed',
        notes: `Pickup: ${transferTime}`,
      };
    } else if (activeComponentType === 'activity') {
      if (!activityName) {
        setValidationError('Please enter activity name.');
        return;
      }
      newBooking = {
        type: 'activity',
        title: activityName,
        routeOrLocation: activityLocation || 'City Center',
        date: activityTime.split(',')[0] || '19 Sep',
        time: activityTime.split(',')[1]?.trim() || '10:00 AM',
        cost: 3500,
        status: 'confirmed',
        statusLabel: 'Confirmed',
        notes: `Scheduled: ${activityTime}`,
      };
    }

    if (newBooking) {
      if (editingId) {
        updateBooking(editingId, newBooking);
        setEditingId(null);
      } else {
        addBooking(newBooking);
      }
      setActiveComponentType(null);
    }
  };

  const startEditComponent = (b: Booking) => {
    setActiveComponentType(b.type);
    setEditingId(b.id);
    if (b.type === 'flight') {
      const parts = b.routeOrLocation.split('→');
      setFlightFrom(parts[0]?.trim() || 'Mumbai');
      setFlightTo(parts[1]?.trim() || 'Paris');
      setFlightDep(`${b.date}, ${b.time}`);
      setFlightArr(`${b.date}, ${b.endTime || '4:15 PM'}`);
    } else if (b.type === 'hotel') {
      setHotelName(b.title);
      setHotelLocation(b.routeOrLocation);
      setHotelCheckIn(`${b.date}, ${b.time}`);
    } else if (b.type === 'train') {
      const parts = b.routeOrLocation.split('→');
      setTrainFrom(parts[0]?.trim() || 'Paris');
      setTrainTo(parts[1]?.trim() || 'Amsterdam');
      setTrainTime(`${b.date}, ${b.time}`);
    } else if (b.type === 'transfer') {
      const parts = b.routeOrLocation.split('→');
      setTransferPickup(parts[0]?.trim() || 'Airport');
      setTransferDropoff(parts[1]?.trim() || 'Hotel');
      setTransferTime(`${b.date}, ${b.time}`);
    } else if (b.type === 'activity') {
      setActivityName(b.title);
      setActivityLocation(b.routeOrLocation);
      setActivityTime(`${b.date}, ${b.time}`);
    }
  };

  const handleContinueToTrip = () => {
    if (trip.bookings.length === 0) {
      setValidationError('Please add at least one booking component to your itinerary.');
      return;
    }
    setScreen('dashboard');
  };

  return (
    <div className="p-6 md:p-8 max-w-3xl mx-auto space-y-6 font-sans">
      {/* Validation Banner */}
      {validationError && (
        <div className="p-3.5 rounded-xl bg-rose-50 border border-rose-200 text-rose-800 text-xs flex items-center justify-between">
          <div className="flex items-center gap-2">
            <AlertCircle className="w-4 h-4 shrink-0 text-rose-600" />
            <span>{validationError}</span>
          </div>
          <button onClick={() => setValidationError(null)} className="text-rose-500 hover:text-rose-800">
            <X className="w-3.5 h-3.5" />
          </button>
        </div>
      )}

      {/* CARD 1: Base Trip Details */}
      <div className="bg-white rounded-xl p-6 border border-slate-200/90 shadow-xs space-y-4">
        <div className="flex items-center justify-between pb-3 border-b border-slate-100">
          <div>
            <span className="text-[10px] uppercase font-bold tracking-wider text-slate-400">
              Trip Details
            </span>
            <h1 className="text-lg font-bold text-slate-900 mt-0.5">Create your trip</h1>
          </div>
          {isBaseSaved && (
            <span className="text-xs font-semibold text-emerald-700 bg-emerald-50 px-2.5 py-0.5 rounded flex items-center gap-1">
              <CheckCircle2 className="w-3.5 h-3.5" /> Saved
            </span>
          )}
        </div>

        <form onSubmit={handleSaveBaseTrip} className="space-y-3.5">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">
                Trip name
              </label>
              <input
                type="text"
                value={tripName}
                onChange={(e) => setTripName(e.target.value)}
                placeholder="e.g. Paris & Amsterdam"
                required
                className="w-full px-3 py-2 text-xs border border-slate-300 rounded-lg focus:outline-none focus:ring-1 focus:ring-slate-900"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">
                Destination
              </label>
              <input
                type="text"
                value={destination}
                onChange={(e) => setDestination(e.target.value)}
                placeholder="e.g. Paris, France"
                required
                className="w-full px-3 py-2 text-xs border border-slate-300 rounded-lg focus:outline-none focus:ring-1 focus:ring-slate-900"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">
                Start date
              </label>
              <input
                type="date"
                value={startDate}
                onChange={(e) => setStartDate(e.target.value)}
                required
                className="w-full px-3 py-2 text-xs border border-slate-300 rounded-lg focus:outline-none focus:ring-1 focus:ring-slate-900"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">
                End date
              </label>
              <input
                type="date"
                value={endDate}
                onChange={(e) => setEndDate(e.target.value)}
                required
                className="w-full px-3 py-2 text-xs border border-slate-300 rounded-lg focus:outline-none focus:ring-1 focus:ring-slate-900"
              />
            </div>
          </div>

          <div className="flex justify-end pt-1">
            <button
              type="submit"
              className="px-4 py-2 bg-slate-900 hover:bg-slate-800 text-white rounded-lg text-xs font-semibold transition-colors shadow-2xs"
            >
              Save Details
            </button>
          </div>
        </form>
      </div>

      {/* CARD 2: Build Your Itinerary */}
      <div className="bg-white rounded-xl p-6 border border-slate-200/90 shadow-xs space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-3 border-b border-slate-100 gap-2">
          <div>
            <span className="text-[10px] uppercase font-bold tracking-wider text-slate-400">
              Components
            </span>
            <h2 className="text-lg font-bold text-slate-900 mt-0.5">Build your itinerary</h2>
          </div>

          {/* Quick Component Add Selectors */}
          <div className="flex flex-wrap items-center gap-1.5">
            <button
              type="button"
              onClick={() => { setActiveComponentType('flight'); setEditingId(null); }}
              className={`inline-flex items-center gap-1 px-2.5 py-1.5 rounded text-xs font-semibold border transition-colors ${
                activeComponentType === 'flight'
                  ? 'bg-slate-900 text-white border-slate-900'
                  : 'bg-white hover:bg-slate-50 text-slate-700 border-slate-200'
              }`}
            >
              <Plane className="w-3 h-3 text-blue-600" />
              <span>+ Flight</span>
            </button>

            <button
              type="button"
              onClick={() => { setActiveComponentType('transfer'); setEditingId(null); }}
              className={`inline-flex items-center gap-1 px-2.5 py-1.5 rounded text-xs font-semibold border transition-colors ${
                activeComponentType === 'transfer'
                  ? 'bg-slate-900 text-white border-slate-900'
                  : 'bg-white hover:bg-slate-50 text-slate-700 border-slate-200'
              }`}
            >
              <Car className="w-3 h-3 text-indigo-600" />
              <span>+ Transfer</span>
            </button>

            <button
              type="button"
              onClick={() => { setActiveComponentType('hotel'); setEditingId(null); }}
              className={`inline-flex items-center gap-1 px-2.5 py-1.5 rounded text-xs font-semibold border transition-colors ${
                activeComponentType === 'hotel'
                  ? 'bg-slate-900 text-white border-slate-900'
                  : 'bg-white hover:bg-slate-50 text-slate-700 border-slate-200'
              }`}
            >
              <Building className="w-3 h-3 text-slate-600" />
              <span>+ Hotel</span>
            </button>

            <button
              type="button"
              onClick={() => { setActiveComponentType('activity'); setEditingId(null); }}
              className={`inline-flex items-center gap-1 px-2.5 py-1.5 rounded text-xs font-semibold border transition-colors ${
                activeComponentType === 'activity'
                  ? 'bg-slate-900 text-white border-slate-900'
                  : 'bg-white hover:bg-slate-50 text-slate-700 border-slate-200'
              }`}
            >
              <Ticket className="w-3 h-3 text-amber-600" />
              <span>+ Activity</span>
            </button>

            <button
              type="button"
              onClick={() => { setActiveComponentType('train'); setEditingId(null); }}
              className={`inline-flex items-center gap-1 px-2.5 py-1.5 rounded text-xs font-semibold border transition-colors ${
                activeComponentType === 'train'
                  ? 'bg-slate-900 text-white border-slate-900'
                  : 'bg-white hover:bg-slate-50 text-slate-700 border-slate-200'
              }`}
            >
              <Train className="w-3 h-3 text-emerald-600" />
              <span>+ Train</span>
            </button>
          </div>
        </div>

        {/* ACTIVE COMPONENT FORM (Only appears when adding/editing) */}
        {activeComponentType && (
          <div className="p-4 bg-slate-50 rounded-lg border border-slate-200 space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-xs uppercase font-bold tracking-wider text-slate-700">
                {editingId ? 'Edit' : 'Add'} {activeComponentType}
              </span>
              <button
                type="button"
                onClick={() => { setActiveComponentType(null); setEditingId(null); }}
                className="text-xs text-slate-400 hover:text-slate-700"
              >
                Cancel
              </button>
            </div>

            <form onSubmit={handleAddComponent} className="space-y-3">
              {activeComponentType === 'flight' && (
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div>
                    <label className="block text-[11px] font-semibold text-slate-600 mb-1">From</label>
                    <input
                      type="text"
                      value={flightFrom}
                      onChange={(e) => setFlightFrom(e.target.value)}
                      placeholder="e.g. Mumbai (BOM)"
                      className="w-full px-3 py-1.5 text-xs border border-slate-300 rounded bg-white"
                      required
                    />
                  </div>
                  <div>
                    <label className="block text-[11px] font-semibold text-slate-600 mb-1">To</label>
                    <input
                      type="text"
                      value={flightTo}
                      onChange={(e) => setFlightTo(e.target.value)}
                      placeholder="e.g. Paris (CDG)"
                      className="w-full px-3 py-1.5 text-xs border border-slate-300 rounded bg-white"
                      required
                    />
                  </div>
                  <div>
                    <label className="block text-[11px] font-semibold text-slate-600 mb-1">Departure</label>
                    <input
                      type="text"
                      value={flightDep}
                      onChange={(e) => setFlightDep(e.target.value)}
                      placeholder="e.g. 18 Sep, 10:40 AM"
                      className="w-full px-3 py-1.5 text-xs border border-slate-300 rounded bg-white"
                      required
                    />
                  </div>
                  <div>
                    <label className="block text-[11px] font-semibold text-slate-600 mb-1">Arrival</label>
                    <input
                      type="text"
                      value={flightArr}
                      onChange={(e) => setFlightArr(e.target.value)}
                      placeholder="e.g. 18 Sep, 4:15 PM"
                      className="w-full px-3 py-1.5 text-xs border border-slate-300 rounded bg-white"
                      required
                    />
                  </div>
                </div>
              )}

              {activeComponentType === 'hotel' && (
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div>
                    <label className="block text-[11px] font-semibold text-slate-600 mb-1">Hotel name</label>
                    <input
                      type="text"
                      value={hotelName}
                      onChange={(e) => setHotelName(e.target.value)}
                      placeholder="e.g. Hotel Lumière"
                      className="w-full px-3 py-1.5 text-xs border border-slate-300 rounded bg-white"
                      required
                    />
                  </div>
                  <div>
                    <label className="block text-[11px] font-semibold text-slate-600 mb-1">Location</label>
                    <input
                      type="text"
                      value={hotelLocation}
                      onChange={(e) => setHotelLocation(e.target.value)}
                      placeholder="e.g. 9th Arr., Paris"
                      className="w-full px-3 py-1.5 text-xs border border-slate-300 rounded bg-white"
                      required
                    />
                  </div>
                  <div>
                    <label className="block text-[11px] font-semibold text-slate-600 mb-1">Check-in</label>
                    <input
                      type="text"
                      value={hotelCheckIn}
                      onChange={(e) => setHotelCheckIn(e.target.value)}
                      placeholder="e.g. 18 Sep, 9:00 PM"
                      className="w-full px-3 py-1.5 text-xs border border-slate-300 rounded bg-white"
                      required
                    />
                  </div>
                  <div>
                    <label className="block text-[11px] font-semibold text-slate-600 mb-1">Check-out</label>
                    <input
                      type="text"
                      value={hotelCheckOut}
                      onChange={(e) => setHotelCheckOut(e.target.value)}
                      placeholder="e.g. 20 Sep, 10:00 AM"
                      className="w-full px-3 py-1.5 text-xs border border-slate-300 rounded bg-white"
                      required
                    />
                  </div>
                </div>
              )}

              {activeComponentType === 'train' && (
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                  <div>
                    <label className="block text-[11px] font-semibold text-slate-600 mb-1">From</label>
                    <input
                      type="text"
                      value={trainFrom}
                      onChange={(e) => setTrainFrom(e.target.value)}
                      placeholder="e.g. Paris Gare du Nord"
                      className="w-full px-3 py-1.5 text-xs border border-slate-300 rounded bg-white"
                      required
                    />
                  </div>
                  <div>
                    <label className="block text-[11px] font-semibold text-slate-600 mb-1">To</label>
                    <input
                      type="text"
                      value={trainTo}
                      onChange={(e) => setTrainTo(e.target.value)}
                      placeholder="e.g. Amsterdam Centraal"
                      className="w-full px-3 py-1.5 text-xs border border-slate-300 rounded bg-white"
                      required
                    />
                  </div>
                  <div>
                    <label className="block text-[11px] font-semibold text-slate-600 mb-1">Date/time</label>
                    <input
                      type="text"
                      value={trainTime}
                      onChange={(e) => setTrainTime(e.target.value)}
                      placeholder="e.g. 20 Sep, 8:30 AM"
                      className="w-full px-3 py-1.5 text-xs border border-slate-300 rounded bg-white"
                      required
                    />
                  </div>
                </div>
              )}

              {activeComponentType === 'transfer' && (
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                  <div>
                    <label className="block text-[11px] font-semibold text-slate-600 mb-1">Pickup</label>
                    <input
                      type="text"
                      value={transferPickup}
                      onChange={(e) => setTransferPickup(e.target.value)}
                      placeholder="e.g. CDG Terminal 2E"
                      className="w-full px-3 py-1.5 text-xs border border-slate-300 rounded bg-white"
                      required
                    />
                  </div>
                  <div>
                    <label className="block text-[11px] font-semibold text-slate-600 mb-1">Drop-off</label>
                    <input
                      type="text"
                      value={transferDropoff}
                      onChange={(e) => setTransferDropoff(e.target.value)}
                      placeholder="e.g. Hotel Lumière"
                      className="w-full px-3 py-1.5 text-xs border border-slate-300 rounded bg-white"
                      required
                    />
                  </div>
                  <div>
                    <label className="block text-[11px] font-semibold text-slate-600 mb-1">Date/time</label>
                    <input
                      type="text"
                      value={transferTime}
                      onChange={(e) => setTransferTime(e.target.value)}
                      placeholder="e.g. 18 Sep, 7:30 PM"
                      className="w-full px-3 py-1.5 text-xs border border-slate-300 rounded bg-white"
                      required
                    />
                  </div>
                </div>
              )}

              {activeComponentType === 'activity' && (
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                  <div>
                    <label className="block text-[11px] font-semibold text-slate-600 mb-1">Activity</label>
                    <input
                      type="text"
                      value={activityName}
                      onChange={(e) => setActivityName(e.target.value)}
                      placeholder="e.g. Eiffel Tower Tour"
                      className="w-full px-3 py-1.5 text-xs border border-slate-300 rounded bg-white"
                      required
                    />
                  </div>
                  <div>
                    <label className="block text-[11px] font-semibold text-slate-600 mb-1">Location</label>
                    <input
                      type="text"
                      value={activityLocation}
                      onChange={(e) => setActivityLocation(e.target.value)}
                      placeholder="e.g. Champ de Mars"
                      className="w-full px-3 py-1.5 text-xs border border-slate-300 rounded bg-white"
                      required
                    />
                  </div>
                  <div>
                    <label className="block text-[11px] font-semibold text-slate-600 mb-1">Date/time</label>
                    <input
                      type="text"
                      value={activityTime}
                      onChange={(e) => setActivityTime(e.target.value)}
                      placeholder="e.g. 19 Sep, 10:00 AM"
                      className="w-full px-3 py-1.5 text-xs border border-slate-300 rounded bg-white"
                      required
                    />
                  </div>
                </div>
              )}

              <div className="flex justify-end gap-2 pt-1">
                <button
                  type="button"
                  onClick={() => { setActiveComponentType(null); setEditingId(null); }}
                  className="px-3 py-1.5 text-xs text-slate-600 hover:text-slate-900"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-1.5 bg-slate-900 hover:bg-slate-800 text-white rounded text-xs font-semibold shadow-2xs"
                >
                  {editingId ? 'Update' : 'Save Component'}
                </button>
              </div>
            </form>
          </div>
        )}

        {/* Existing Items in Itinerary */}
        <div className="space-y-2 pt-1">
          {trip.bookings.map((booking) => (
            <div
              key={booking.id}
              className="flex items-center justify-between p-3 bg-slate-50 border border-slate-200 rounded-lg text-xs"
            >
              <div className="flex items-center gap-3">
                <span className="font-bold text-slate-900">{booking.title}</span>
                <span className="text-slate-400">•</span>
                <span className="text-slate-600">{booking.routeOrLocation}</span>
                <span className="text-slate-400">•</span>
                <span className="font-mono text-slate-500">{booking.date}, {booking.time}</span>
              </div>

              <div className="flex items-center gap-1.5">
                <button
                  type="button"
                  onClick={() => startEditComponent(booking)}
                  className="p-1 text-slate-400 hover:text-slate-800 rounded"
                  title="Edit"
                >
                  <Edit2 className="w-3.5 h-3.5" />
                </button>
                <button
                  type="button"
                  onClick={() => deleteBooking(booking.id)}
                  className="p-1 text-slate-400 hover:text-rose-600 rounded"
                  title="Delete"
                >
                  <Trash2 className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* Action button */}
        <div className="pt-4 flex items-center justify-end border-t border-slate-100">
          <button
            type="button"
            onClick={handleContinueToTrip}
            className="inline-flex items-center gap-2 px-5 py-2.5 bg-slate-900 hover:bg-slate-800 text-white text-xs font-semibold rounded-lg shadow-xs"
          >
            <span>Continue to Trip</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>
    </div>
  );
};
