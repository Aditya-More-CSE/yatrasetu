import React, { useState } from 'react';
import {
  Plane,
  Car,
  Hotel,
  MapPin,
  Utensils,
  ArrowDown,
  AlertTriangle,
  CheckCircle2,
  Clock,
  ShieldCheck,
  Maximize2,
  Info,
} from 'lucide-react';
import { useTrip } from '../../context/TripContext';
import { Booking, BookingType } from '../../types/trip';

export const DependencyGraph: React.FC = () => {
  const { bookings, activeDisruption, isRecovered, setSelectedBooking, setActiveTab } = useTrip();
  const [orientation, setOrientation] = useState<'vertical' | 'horizontal'>('vertical');

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

  const getNodeTheme = (booking: Booking) => {
    if (booking.status === 'delayed' || booking.status === 'impossible') {
      return {
        border: 'border-red-400 bg-red-50/70',
        ring: 'ring-red-400/30',
        badge: 'bg-red-600 text-white',
        statusColor: 'text-red-700',
        glow: 'shadow-[0_0_15px_rgba(239,68,68,0.15)]',
        indicator: '🔴',
      };
    }
    if (booking.status === 'at_risk' || booking.status === 'likely_missed') {
      return {
        border: 'border-amber-400 bg-amber-50/70',
        ring: 'ring-amber-400/30',
        badge: 'bg-amber-500 text-white',
        statusColor: 'text-amber-700',
        glow: 'shadow-[0_0_15px_rgba(245,158,11,0.15)]',
        indicator: '🟠',
      };
    }
    if (booking.status === 'recovered') {
      return {
        border: 'border-emerald-400 bg-emerald-50/70',
        ring: 'ring-emerald-400/30',
        badge: 'bg-emerald-600 text-white',
        statusColor: 'text-emerald-700',
        glow: 'shadow-[0_0_15px_rgba(16,185,129,0.15)]',
        indicator: '🟢',
      };
    }
    return {
      border: 'border-slate-200 bg-white',
      ring: 'ring-transparent',
      badge: 'bg-slate-700 text-white',
      statusColor: 'text-slate-600',
      glow: 'shadow-sm',
      indicator: '🟢',
    };
  };

  return (
    <div className="space-y-6 max-w-4xl mx-auto pb-12">
      {/* Header & Controls */}
      <div className="bg-white border border-slate-200 rounded-xl p-5 shadow-card">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <div>
            <div className="flex items-center gap-2">
              <span className="text-[10px] uppercase font-bold tracking-wider px-2 py-0.5 rounded bg-blue-50 text-blue-700 border border-blue-200">
                Core Engine Concept
              </span>
              <span className="text-xs text-slate-400">•</span>
              <span className="text-xs font-medium text-slate-500">Live DAG Architecture</span>
            </div>
            <h1 className="text-xl font-bold text-slate-900 mt-1">Travel Dependency Graph</h1>
            <p className="text-xs text-slate-500 mt-0.5">
              Visualizes topological dependencies, ripple propagation, and buffer compression across bookings.
            </p>
          </div>

          <div className="flex items-center gap-2">
            <div className="bg-slate-100 p-1 rounded-lg flex items-center text-xs font-medium">
              <button
                onClick={() => setOrientation('vertical')}
                className={`px-2.5 py-1 rounded transition-colors ${
                  orientation === 'vertical'
                    ? 'bg-white text-slate-900 font-semibold shadow-sm'
                    : 'text-slate-500 hover:text-slate-900'
                }`}
              >
                Vertical Flow
              </button>
              <button
                onClick={() => setOrientation('horizontal')}
                className={`px-2.5 py-1 rounded transition-colors ${
                  orientation === 'horizontal'
                    ? 'bg-white text-slate-900 font-semibold shadow-sm'
                    : 'text-slate-500 hover:text-slate-900'
                }`}
              >
                Horizontal Flow
              </button>
            </div>
          </div>
        </div>

        {/* Legend */}
        <div className="flex items-center gap-4 text-xs mt-4 pt-3 border-t border-slate-100 flex-wrap">
          <span className="text-slate-400 font-medium">Legend:</span>
          <span className="flex items-center gap-1.5 text-slate-700">
            <span className="w-2.5 h-2.5 rounded-full bg-red-600"></span> Disruption Source
          </span>
          <span className="flex items-center gap-1.5 text-slate-700">
            <span className="w-2.5 h-2.5 rounded-full bg-amber-500"></span> Downstream Risk
          </span>
          <span className="flex items-center gap-1.5 text-slate-700">
            <span className="w-2.5 h-2.5 rounded-full bg-emerald-500"></span> Recovered / Safe
          </span>
          <span className="flex items-center gap-1.5 text-slate-700">
            <span className="w-2.5 h-2.5 rounded-full bg-slate-400"></span> On Schedule
          </span>
        </div>
      </div>

      {/* Visual Dependency DAG Container */}
      <div className="bg-white border border-slate-200 rounded-xl p-6 shadow-card overflow-x-auto">
        <div className="min-w-[600px] flex flex-col items-center">
          {bookings.map((booking, idx) => {
            const Icon = getModalityIcon(booking.type);
            const theme = getNodeTheme(booking);
            const isLast = idx === bookings.length - 1;

            return (
              <React.Fragment key={booking.id}>
                {/* Node Card */}
                <div
                  onClick={() => setSelectedBooking(booking)}
                  className={`w-full max-w-md p-4 rounded-xl border-2 transition-all cursor-pointer relative ${theme.border} ${theme.glow} hover:scale-[1.01]`}
                >
                  <div className="flex items-start justify-between gap-3">
                    <div className="flex items-center gap-3">
                      <div className={`w-9 h-9 rounded-lg flex items-center justify-center ${theme.badge} shadow-sm shrink-0`}>
                        <Icon className="w-4 h-4" />
                      </div>
                      <div>
                        <div className="flex items-center gap-2">
                          <span className="text-xs font-mono font-bold text-slate-900">
                            {booking.startTime}
                          </span>
                          <span className="text-xs text-slate-400 uppercase font-semibold">
                            {booking.type}
                          </span>
                          {booking.code && (
                            <span className="text-[10px] font-mono px-1 rounded bg-slate-100 text-slate-600">
                              {booking.code}
                            </span>
                          )}
                        </div>
                        <h3 className="text-sm font-bold text-slate-900">{booking.title}</h3>
                      </div>
                    </div>

                    <div className="text-right shrink-0">
                      <span className={`text-xs font-bold px-2 py-0.5 rounded ${theme.badge}`}>
                        {booking.statusLabel}
                      </span>
                    </div>
                  </div>

                  {/* Buffer & Dependency Details */}
                  <div className="mt-3 pt-2.5 border-t border-slate-200/60 flex items-center justify-between text-xs">
                    <span className="text-slate-500 truncate max-w-[220px]">
                      {booking.location}
                    </span>
                    {booking.bufferMinutes !== undefined && (
                      <span
                        className={`font-mono text-[11px] font-semibold flex items-center gap-1 ${
                          booking.bufferStatus === 'negative'
                            ? 'text-red-700 font-bold'
                            : booking.bufferStatus === 'low'
                            ? 'text-amber-700'
                            : 'text-emerald-700'
                        }`}
                      >
                        <Clock className="w-3 h-3" />
                        Buffer: {booking.bufferMinutes}m
                      </span>
                    )}
                  </div>
                </div>

                {/* Animated Edge Connection between nodes */}
                {!isLast && (
                  <div className="my-1.5 flex flex-col items-center relative py-1">
                    <svg width="24" height="40" className="overflow-visible">
                      <line
                        x1="12"
                        y1="0"
                        x2="12"
                        y2="34"
                        stroke={
                          activeDisruption && !isRecovered && idx < 3
                            ? '#f59e0b'
                            : isRecovered
                            ? '#10b981'
                            : '#94a3b8'
                        }
                        strokeWidth="2.5"
                        className={
                          activeDisruption && !isRecovered && idx < 3
                            ? 'animate-flow-dash'
                            : ''
                        }
                      />
                      <polygon
                        points="7,32 17,32 12,39"
                        fill={
                          activeDisruption && !isRecovered && idx < 3
                            ? '#f59e0b'
                            : isRecovered
                            ? '#10b981'
                            : '#94a3b8'
                        }
                      />
                    </svg>

                    {/* Edge Buffer Label Pill */}
                    <span
                      className={`text-[10px] font-mono px-2 py-0.5 rounded-full border shadow-xs -mt-1 z-10 ${
                        activeDisruption && !isRecovered && idx === 0
                          ? 'bg-red-50 text-red-700 border-red-200 font-bold'
                          : activeDisruption && !isRecovered && idx === 1
                          ? 'bg-amber-50 text-amber-700 border-amber-200 font-bold'
                          : 'bg-white text-slate-500 border-slate-200'
                      }`}
                    >
                      {idx === 0
                        ? activeDisruption
                          ? 'Delay +120m'
                          : 'Transfer link (30m buffer)'
                        : idx === 1
                        ? activeDisruption
                          ? 'Check-in delay (+105m)'
                          : 'Check-in link (60m buffer)'
                        : idx === 2
                        ? activeDisruption
                          ? 'Tight pier window (5m buffer)'
                          : 'Sightseeing link (150m buffer)'
                        : 'Dinner reservation (30m buffer)'}
                    </span>
                  </div>
                )}
              </React.Fragment>
            );
          })}
        </div>
      </div>

      {/* Direct Recovery CTA when graph shows disruptions */}
      {activeDisruption && !isRecovered && (
        <div className="p-4 rounded-xl bg-blue-50 border border-blue-200 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <Info className="w-5 h-5 text-blue-700 shrink-0" />
            <div>
              <h4 className="text-xs font-bold text-blue-950">Dependency Graph Resolved 3 Risks</h4>
              <p className="text-xs text-blue-700">
                The AI recovery engine has synthesized 3 feasible strategies to realign these dependencies.
              </p>
            </div>
          </div>
          <button
            onClick={() => setActiveTab('recovery')}
            className="px-4 py-2 rounded-lg bg-blue-700 hover:bg-blue-800 text-white text-xs font-semibold shadow-sm transition-colors shrink-0"
          >
            Review Recovery Options
          </button>
        </div>
      )}
    </div>
  );
};
