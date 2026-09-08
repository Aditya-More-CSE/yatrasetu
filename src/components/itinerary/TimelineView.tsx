import React from 'react';
import {
  Plane,
  Car,
  Hotel,
  MapPin,
  Utensils,
  AlertTriangle,
  Clock,
  ArrowRight,
  ShieldCheck,
  ChevronRight,
  Sparkles,
  CheckCircle,
  AlertCircle,
  ArrowLeft,
  Plus,
} from 'lucide-react';
import { useTrip } from '../../context/TripContext';
import { Booking, BookingType } from '../../types/trip';

export const TimelineView: React.FC = () => {
  const {
    bookings,
    activeDisruption,
    isRecovered,
    selectedPlan,
    setActiveTab,
    setSelectedBooking,
    setIsDisruptionModalOpen,
    setDisruptionStep,
    setIsChangeHistoryOpen,
  } = useTrip();

  const getModalityIcon = (type: BookingType) => {
    switch (type) {
      case 'flight':
        return Plane;
      case 'transfer':
        return Car;
      case 'hotel':
        return Hotel;
      case 'activity':
        return MapPin;
      case 'restaurant':
        return Utensils;
      default:
        return MapPin;
    }
  };

  const getStatusBadge = (booking: Booking) => {
    switch (booking.status) {
      case 'delayed':
        return (
          <span className="inline-flex items-center gap-1 text-[11px] font-bold px-2 py-0.5 rounded bg-red-50 text-red-700 border border-red-200">
            {booking.statusLabel}
          </span>
        );
      case 'at_risk':
      case 'likely_missed':
        return (
          <span className="inline-flex items-center gap-1 text-[11px] font-bold px-2 py-0.5 rounded bg-amber-50 text-amber-700 border border-amber-200">
            <AlertTriangle className="w-3 h-3 text-amber-600" />
            {booking.statusLabel}
          </span>
        );
      case 'recovered':
        return (
          <span className="inline-flex items-center gap-1 text-[11px] font-bold px-2 py-0.5 rounded bg-emerald-50 text-emerald-700 border border-emerald-200">
            <ShieldCheck className="w-3 h-3 text-emerald-600" />
            {booking.statusLabel}
          </span>
        );
      default:
        return (
          <span className="inline-flex items-center gap-1 text-[11px] font-medium px-2 py-0.5 rounded bg-slate-100 text-slate-700">
            {booking.statusLabel}
          </span>
        );
    }
  };

  return (
    <div className="space-y-6 max-w-4xl mx-auto pb-12">
      {/* Top Breadcrumb */}
      <div className="flex items-center justify-between">
        <button
          onClick={() => setActiveTab('trips_list')}
          className="text-xs font-semibold text-slate-500 hover:text-slate-900 flex items-center gap-1.5 transition-colors"
        >
          <ArrowLeft className="w-3.5 h-3.5" />
          <span>All Trips</span>
        </button>

        {/* Action button to report disruption */}
        {!activeDisruption && (
          <button
            onClick={() => {
              setDisruptionStep('what_happened');
              setIsDisruptionModalOpen(true);
            }}
            className="text-xs font-medium text-amber-800 bg-amber-50 hover:bg-amber-100 border border-amber-200 px-3 py-1.5 rounded-lg flex items-center gap-1.5 transition-colors"
          >
            <AlertTriangle className="w-3.5 h-3.5 text-amber-600" />
            <span>Something changed? Report disruption</span>
          </button>
        )}
      </div>

      {/* Primary Journey Header */}
      <div className="bg-white border border-slate-200 rounded-2xl p-6 shadow-card">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <span className="text-[10px] uppercase font-bold tracking-wider px-2 py-0.5 rounded bg-blue-50 text-blue-700 border border-blue-200">
              Trip Journey
            </span>
            <h1 className="text-2xl font-bold text-slate-900 mt-1">Paris & Amsterdam</h1>
            <p className="text-xs text-slate-500 mt-0.5">
              12 Apr — 20 Apr 2025 • Mumbai (BOM) → Paris (CDG) → Amsterdam (AMS)
            </p>
          </div>

          {/* Status badge pill */}
          <div className="self-start sm:self-center">
            {isRecovered ? (
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-50 border border-emerald-200 text-emerald-800 text-xs font-semibold">
                <ShieldCheck className="w-4 h-4 text-emerald-600" />
                ✓ You're back on track
              </span>
            ) : activeDisruption ? (
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-red-50 border border-red-200 text-red-800 text-xs font-semibold">
                <AlertTriangle className="w-4 h-4 text-red-600" />
                1 active disruption • 3 bookings affected
              </span>
            ) : (
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-50 border border-emerald-200 text-emerald-800 text-xs font-semibold">
                <CheckCircle className="w-4 h-4 text-emerald-600" />
                ✓ All plans on schedule
              </span>
            )}
          </div>
        </div>

        {/* DISRUPTED BANNER: Simple prompt to resolve */}
        {activeDisruption && !isRecovered && (
          <div className="mt-5 p-4 rounded-xl bg-red-50 border border-red-200 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
            <div className="flex items-start gap-3">
              <div className="w-8 h-8 rounded-full bg-red-100 flex items-center justify-center shrink-0 mt-0.5">
                <AlertTriangle className="w-4 h-4 text-red-600" />
              </div>
              <div>
                <h4 className="text-xs font-bold text-red-950">
                  Flight AI-142 delayed by 2 hours
                </h4>
                <p className="text-xs text-red-700 mt-0.5">
                  Transfer and City Tour are at risk. We've synthesized 3 ways to recover.
                </p>
              </div>
            </div>

            <div className="flex items-center gap-2 shrink-0">
              <button
                onClick={() => setActiveTab('recovery')}
                className="px-4 py-2 text-xs font-semibold bg-blue-700 hover:bg-blue-800 text-white rounded-lg shadow-xs flex items-center gap-1.5 transition-colors"
              >
                <span>See recovery options</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>
        )}

        {/* RECOVERED CONFIRMATION BANNER */}
        {isRecovered && selectedPlan && (
          <div className="mt-5 p-4 rounded-xl bg-emerald-50 border border-emerald-200 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
            <div className="flex items-start gap-3">
              <div className="w-8 h-8 rounded-full bg-emerald-100 flex items-center justify-center shrink-0 mt-0.5">
                <CheckCircle className="w-4 h-4 text-emerald-600" />
              </div>
              <div>
                <h4 className="text-xs font-bold text-emerald-950">
                  ✓ Recovery plan applied: {selectedPlan.name} Plan
                </h4>
                <p className="text-xs text-emerald-700 mt-0.5">
                  Your journey has been updated. 2 changes made. City Tour preserved.
                </p>
              </div>
            </div>

            <button
              onClick={() => setIsChangeHistoryOpen(true)}
              className="px-3 py-1.5 text-xs font-semibold bg-white text-emerald-800 hover:bg-emerald-100/60 border border-emerald-300 rounded-lg transition-colors shrink-0"
            >
              See what changed
            </button>
          </div>
        )}

        {/* PROACTIVE RISK SENTINEL ALERT */}
        {isRecovered && (
          <div className="mt-3 p-3.5 rounded-xl bg-amber-50/70 border border-amber-200 flex items-center justify-between gap-3 text-xs">
            <div className="flex items-center gap-2.5">
              <Clock className="w-4 h-4 text-amber-600 shrink-0" />
              <div>
                <span className="font-bold text-amber-950">Upcoming Connection Buffer: Paris → Lyon</span>
                <p className="text-amber-800 text-[11px]">28 min buffer at Gare de Lyon on 15 Apr.</p>
              </div>
            </div>
            <button
              onClick={() => setActiveTab('alerts')}
              className="text-[11px] font-semibold text-amber-900 underline hover:text-amber-950 shrink-0"
            >
              Review alert
            </button>
          </div>
        )}
      </div>

      {/* Main Clean Vertical Timeline */}
      <div className="bg-white border border-slate-200 rounded-2xl p-6 shadow-card">
        <div className="flex items-center justify-between pb-4 border-b border-slate-100 mb-6">
          <div className="flex items-center gap-2">
            <span className="text-xs font-bold px-2 py-1 rounded bg-slate-900 text-white tracking-wider">
              12 APR 2025
            </span>
            <span className="text-xs text-slate-500 font-medium">Day 1 • Arrival in Paris</span>
          </div>

          <button
            onClick={() => setActiveTab('graph')}
            className="text-xs font-medium text-blue-700 hover:text-blue-800 flex items-center gap-1 hover:underline"
          >
            View Dependency Graph <ChevronRight className="w-3.5 h-3.5" />
          </button>
        </div>

        {/* Vertical Timeline List */}
        <div className="relative pl-6 md:pl-8 space-y-5 before:absolute before:top-3 before:bottom-3 before:left-3 md:before:left-4 before:w-[2px] before:bg-slate-200">
          {bookings.map((booking) => {
            const Icon = getModalityIcon(booking.type);
            const isDisruptedOrAtRisk =
              booking.status === 'delayed' ||
              booking.status === 'at_risk' ||
              booking.status === 'likely_missed';

            return (
              <div
                key={booking.id}
                onClick={() => setSelectedBooking(booking)}
                className={`group relative p-4 rounded-xl border transition-all cursor-pointer ${
                  isDisruptedOrAtRisk
                    ? 'border-amber-200 bg-amber-50/20 hover:bg-amber-50/40'
                    : booking.status === 'recovered'
                    ? 'border-emerald-200 bg-emerald-50/20 hover:bg-emerald-50/40'
                    : 'border-slate-200 bg-white hover:border-slate-300 shadow-subtle'
                }`}
              >
                {/* Node icon bubble */}
                <div
                  className={`absolute -left-[30px] md:-left-[38px] top-4 w-7 h-7 rounded-full border-2 flex items-center justify-center text-white shadow-xs ${
                    booking.status === 'delayed'
                      ? 'bg-red-600 border-white'
                      : isDisruptedOrAtRisk
                      ? 'bg-amber-500 border-white'
                      : booking.status === 'recovered'
                      ? 'bg-emerald-600 border-white'
                      : 'bg-slate-800 border-white'
                  }`}
                >
                  <Icon className="w-3.5 h-3.5" />
                </div>

                <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-3">
                  <div className="space-y-1">
                    <div className="flex items-center gap-2 flex-wrap">
                      <span className="font-mono text-sm font-bold text-slate-900">
                        {booking.startTime}
                      </span>
                      {booking.startTime !== booking.originalStartTime && (
                        <span className="text-xs line-through text-slate-400 font-mono">
                          {booking.originalStartTime}
                        </span>
                      )}
                      <span className="text-xs uppercase font-semibold text-slate-400">
                        • {booking.type}
                      </span>
                      {getStatusBadge(booking)}
                    </div>

                    <h3 className="text-sm font-bold text-slate-900 group-hover:text-blue-700 transition-colors">
                      {booking.title}
                    </h3>
                    <p className="text-xs text-slate-500 flex items-center gap-1.5">
                      <MapPin className="w-3 h-3 text-slate-400 shrink-0" />
                      <span>{booking.location}</span>
                    </p>
                  </div>

                  <div className="flex sm:flex-col items-center sm:items-end justify-between sm:justify-center gap-1 text-xs shrink-0 pt-2 sm:pt-0 border-t sm:border-t-0 border-slate-100">
                    <span className="font-semibold text-slate-700">
                      ₹{booking.cost.toLocaleString('en-IN')}
                    </span>
                    {booking.bufferMinutes !== undefined && (
                      <span
                        className={`text-[11px] font-medium ${
                          booking.bufferStatus === 'negative'
                            ? 'text-red-600 font-bold'
                            : booking.bufferStatus === 'low'
                            ? 'text-amber-600 font-semibold'
                            : 'text-slate-500'
                        }`}
                      >
                        Buffer: {booking.bufferMinutes}m
                      </span>
                    )}
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};
