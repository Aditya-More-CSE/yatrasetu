import React, { useState } from 'react';
import { useTrip } from '../../context/TripContext';
import {
  ArrowRight,
  Sparkles,
  Plane,
  Car,
  Building,
  Ticket,
  Train,
  AlertTriangle,
  Clock,
  CheckCircle2,
  Layers,
  ArrowRightLeft,
  ChevronRight,
  TrendingDown,
  ShieldCheck,
} from 'lucide-react';

export const LandingPage: React.FC = () => {
  const { setScreen, loadDemoTrip } = useTrip();
  const [problemCascadeActive, setProblemCascadeActive] = useState(true);

  return (
    <div className="min-h-screen bg-slate-50/70 text-slate-900 flex flex-col font-sans">
      {/* HERO SECTION */}
      <section className="relative pt-12 pb-20 md:pt-20 md:pb-28 overflow-hidden bg-gradient-to-b from-white via-slate-50/40 to-slate-100/60 border-b border-slate-200/70">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-12 md:mb-16">
            {/* Top pill badge */}
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-slate-100 border border-slate-200 text-xs font-medium text-slate-700 mb-6 tracking-wide">
              <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
              Travel Disruption Recovery Intelligence
            </div>

            {/* Main Headline */}
            <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold tracking-tight text-slate-900 leading-[1.1] mb-6">
              Your trip changes.{' '}
              <span className="italic font-serif font-normal text-blue-900 block sm:inline">
                Your plan adapts.
              </span>
            </h1>

            {/* Supporting Text */}
            <p className="text-lg sm:text-xl text-slate-600 leading-relaxed max-w-2xl mx-auto font-normal">
              One disruption shouldn't derail your entire journey. Understand what's affected and find the best way forward.
            </p>

            {/* Hero CTAs */}
            <div className="mt-8 flex flex-col sm:flex-row items-center justify-center gap-3.5">
              <button
                onClick={() => setScreen('create_trip')}
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2.5 px-6 py-3.5 rounded-xl bg-slate-900 hover:bg-slate-800 text-white font-medium text-base shadow-sm transition-all hover:translate-y-[-1px]"
              >
                <span>Get Started</span>
                <ArrowRight className="w-4 h-4" />
              </button>

              <button
                onClick={loadDemoTrip}
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-xl bg-white hover:bg-slate-50 text-slate-800 font-medium text-base border border-slate-300 shadow-sm transition-all hover:translate-y-[-1px]"
              >
                <Sparkles className="w-4 h-4 text-blue-700" />
                <span>Try Demo Trip</span>
              </button>
            </div>

            <p className="text-xs text-slate-400 mt-3 font-medium">
              Immediate demo trip: Mumbai → Paris → Amsterdam • No registration required
            </p>
          </div>

          {/* HERO VISUAL: Connected Travel Itinerary Concept */}
          <div className="relative mx-auto max-w-4xl">
            {/* Visual Container */}
            <div className="bg-white rounded-2xl shadow-xl shadow-slate-200/50 border border-slate-200 p-6 md:p-8">
              <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between pb-6 mb-6 border-b border-slate-100 gap-2">
                <div>
                  <div className="text-xs font-semibold text-slate-400 uppercase tracking-wider">
                    Connected Journey Architecture
                  </div>
                  <div className="text-base font-semibold text-slate-900 flex items-center gap-2 mt-0.5">
                    <span>Mumbai</span>
                    <span className="text-slate-400">→</span>
                    <span>Paris</span>
                    <span className="text-slate-400">→</span>
                    <span>Amsterdam</span>
                  </div>
                </div>
                <div className="flex items-center gap-2 text-xs font-medium text-emerald-700 bg-emerald-50 px-3 py-1 rounded-full border border-emerald-200/60">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-600"></span>
                  Dynamic Dependency Tracking Active
                </div>
              </div>

              {/* Connected components: Flight → Transfer → Hotel → Activity → Train */}
              <div className="grid grid-cols-1 md:grid-cols-5 gap-3 relative">
                {/* Component 1: Flight */}
                <div className="p-4 rounded-xl bg-slate-50/80 border border-slate-200 hover:border-slate-300 transition-all flex flex-col justify-between relative group">
                  <div>
                    <div className="flex items-center justify-between mb-2">
                      <span className="p-2 rounded-lg bg-blue-50 text-blue-800">
                        <Plane className="w-4 h-4" />
                      </span>
                      <span className="text-[11px] font-semibold text-slate-500">18 SEP</span>
                    </div>
                    <div className="text-xs font-semibold text-slate-900">Flight</div>
                    <div className="text-[11px] text-slate-500 mt-0.5">Mumbai → Paris</div>
                  </div>
                  <div className="mt-4 pt-2 border-t border-slate-200/60 flex items-center justify-between text-[11px]">
                    <span className="text-slate-600 font-medium">10:40 AM</span>
                    <span className="text-emerald-700 font-medium">Confirmed</span>
                  </div>
                </div>

                {/* Component 2: Transfer */}
                <div className="p-4 rounded-xl bg-slate-50/80 border border-slate-200 hover:border-slate-300 transition-all flex flex-col justify-between">
                  <div>
                    <div className="flex items-center justify-between mb-2">
                      <span className="p-2 rounded-lg bg-indigo-50 text-indigo-800">
                        <Car className="w-4 h-4" />
                      </span>
                      <span className="text-[11px] font-semibold text-slate-500">18 SEP</span>
                    </div>
                    <div className="text-xs font-semibold text-slate-900">Airport Transfer</div>
                    <div className="text-[11px] text-slate-500 mt-0.5">CDG → Hotel</div>
                  </div>
                  <div className="mt-4 pt-2 border-t border-slate-200/60 flex items-center justify-between text-[11px]">
                    <span className="text-slate-600 font-medium">7:30 PM</span>
                    <span className="text-emerald-700 font-medium">Confirmed</span>
                  </div>
                </div>

                {/* Component 3: Hotel */}
                <div className="p-4 rounded-xl bg-slate-50/80 border border-slate-200 hover:border-slate-300 transition-all flex flex-col justify-between">
                  <div>
                    <div className="flex items-center justify-between mb-2">
                      <span className="p-2 rounded-lg bg-slate-100 text-slate-800">
                        <Building className="w-4 h-4" />
                      </span>
                      <span className="text-[11px] font-semibold text-slate-500">18 SEP</span>
                    </div>
                    <div className="text-xs font-semibold text-slate-900">Hotel</div>
                    <div className="text-[11px] text-slate-500 mt-0.5">Hotel Lumière</div>
                  </div>
                  <div className="mt-4 pt-2 border-t border-slate-200/60 flex items-center justify-between text-[11px]">
                    <span className="text-slate-600 font-medium">9:00 PM</span>
                    <span className="text-slate-700 font-medium">Check-in</span>
                  </div>
                </div>

                {/* Component 4: Activity */}
                <div className="p-4 rounded-xl bg-slate-50/80 border border-slate-200 hover:border-slate-300 transition-all flex flex-col justify-between">
                  <div>
                    <div className="flex items-center justify-between mb-2">
                      <span className="p-2 rounded-lg bg-amber-50 text-amber-800">
                        <Ticket className="w-4 h-4" />
                      </span>
                      <span className="text-[11px] font-semibold text-slate-500">19 SEP</span>
                    </div>
                    <div className="text-xs font-semibold text-slate-900">Eiffel Tower Tour</div>
                    <div className="text-[11px] text-slate-500 mt-0.5">Paris Summit Pass</div>
                  </div>
                  <div className="mt-4 pt-2 border-t border-slate-200/60 flex items-center justify-between text-[11px]">
                    <span className="text-slate-600 font-medium">10:00 AM</span>
                    <span className="text-emerald-700 font-medium">Confirmed</span>
                  </div>
                </div>

                {/* Component 5: Train */}
                <div className="p-4 rounded-xl bg-slate-50/80 border border-slate-200 hover:border-slate-300 transition-all flex flex-col justify-between">
                  <div>
                    <div className="flex items-center justify-between mb-2">
                      <span className="p-2 rounded-lg bg-emerald-50 text-emerald-800">
                        <Train className="w-4 h-4" />
                      </span>
                      <span className="text-[11px] font-semibold text-slate-500">20 SEP</span>
                    </div>
                    <div className="text-xs font-semibold text-slate-900">Train</div>
                    <div className="text-[11px] text-slate-500 mt-0.5">Paris → Amsterdam</div>
                  </div>
                  <div className="mt-4 pt-2 border-t border-slate-200/60 flex items-center justify-between text-[11px]">
                    <span className="text-slate-600 font-medium">8:30 AM</span>
                    <span className="text-emerald-700 font-medium">Confirmed</span>
                  </div>
                </div>
              </div>

              {/* Sub-bar showing connection arrows */}
              <div className="mt-5 hidden md:flex items-center justify-between px-4 text-xs text-slate-400 font-medium">
                <span>Flight</span>
                <span>→</span>
                <span>Transfer</span>
                <span>→</span>
                <span>Hotel</span>
                <span>→</span>
                <span>Activity</span>
                <span>→</span>
                <span>Train</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* SECTION 2: THE PROBLEM (One change can affect the entire journey) */}
      <section id="disruption-impact" className="py-20 bg-white border-b border-slate-200/80">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-12">
            <span className="text-xs font-bold uppercase tracking-wider text-rose-700 bg-rose-50 px-3 py-1 rounded-full border border-rose-200/60">
              The Reality of Connected Travel
            </span>
            <h2 className="text-3xl sm:text-4xl font-bold tracking-tight text-slate-900 mt-3 mb-4">
              One change can affect the{' '}
              <span className="italic font-serif font-normal text-blue-900">entire journey.</span>
            </h2>
            <p className="text-base text-slate-600 max-w-xl mx-auto">
              Travel bookings don’t exist in isolation. When one piece slips, downstream connections break in silent cascades.
            </p>

            {/* Interactive Cascade Toggle */}
            <div className="mt-6 inline-flex items-center gap-2 p-1 bg-slate-100 rounded-xl border border-slate-200 text-xs font-medium">
              <button
                onClick={() => setProblemCascadeActive(false)}
                className={`px-3 py-1.5 rounded-lg transition-all ${
                  !problemCascadeActive
                    ? 'bg-white text-slate-900 shadow-sm font-semibold'
                    : 'text-slate-500 hover:text-slate-800'
                }`}
              >
                Standard View
              </button>
              <button
                onClick={() => setProblemCascadeActive(true)}
                className={`px-3 py-1.5 rounded-lg transition-all flex items-center gap-1.5 ${
                  problemCascadeActive
                    ? 'bg-rose-900 text-white shadow-sm font-semibold'
                    : 'text-slate-500 hover:text-slate-800'
                }`}
              >
                <AlertTriangle className="w-3.5 h-3.5" />
                Disruption Propagation (+3h Flight Delay)
              </button>
            </div>
          </div>

          {/* Interactive Propagation Chain */}
          <div className="bg-slate-50/70 rounded-2xl border border-slate-200 p-6 md:p-8">
            <div className="space-y-4">
              {/* Item 1: Flight */}
              <div className={`p-4 rounded-xl border transition-all flex items-start justify-between gap-4 ${
                problemCascadeActive
                  ? 'bg-rose-50/50 border-rose-300 text-rose-950'
                  : 'bg-white border-slate-200 text-slate-900'
              }`}>
                <div className="flex items-start gap-3.5">
                  <div className={`p-2.5 rounded-lg mt-0.5 ${
                    problemCascadeActive ? 'bg-rose-100 text-rose-800' : 'bg-slate-100 text-slate-700'
                  }`}>
                    <Plane className="w-5 h-5" />
                  </div>
                  <div>
                    <div className="flex items-center gap-2">
                      <span className="font-semibold text-sm">Flight Mumbai → Paris</span>
                      {problemCascadeActive && (
                        <span className="text-xs font-semibold px-2 py-0.5 rounded-full bg-rose-600 text-white">
                          Delayed +3h
                        </span>
                      )}
                    </div>
                    <p className="text-xs text-slate-600 mt-1">
                      {problemCascadeActive
                        ? 'Arrival pushed from 4:15 PM to 7:15 PM due to air traffic clearance.'
                        : 'Original arrival scheduled at 4:15 PM at Paris CDG.'}
                    </p>
                  </div>
                </div>
                <div className="text-right text-xs shrink-0 font-medium">
                  {problemCascadeActive ? (
                    <span className="text-rose-700">7:15 PM Arr</span>
                  ) : (
                    <span className="text-slate-600">4:15 PM Arr</span>
                  )}
                </div>
              </div>

              {/* Cascade Arrow */}
              {problemCascadeActive && (
                <div className="flex items-center justify-center py-0.5 text-rose-500 font-bold text-xs gap-1.5">
                  <TrendingDown className="w-4 h-4 animate-bounce" />
                  <span>Downstream Impact Triggered</span>
                </div>
              )}

              {/* Item 2: Airport Transfer */}
              <div className={`p-4 rounded-xl border transition-all flex items-start justify-between gap-4 ${
                problemCascadeActive
                  ? 'bg-rose-50/40 border-rose-300 text-rose-950'
                  : 'bg-white border-slate-200 text-slate-900'
              }`}>
                <div className="flex items-start gap-3.5">
                  <div className={`p-2.5 rounded-lg mt-0.5 ${
                    problemCascadeActive ? 'bg-rose-100 text-rose-800' : 'bg-slate-100 text-slate-700'
                  }`}>
                    <Car className="w-5 h-5" />
                  </div>
                  <div>
                    <div className="flex items-center gap-2">
                      <span className="font-semibold text-sm">Airport Transfer (CDG → Hotel)</span>
                      {problemCascadeActive && (
                        <span className="text-xs font-semibold px-2 py-0.5 rounded-full bg-rose-600 text-white">
                          Pickup likely missed
                        </span>
                      )}
                    </div>
                    <p className="text-xs text-slate-600 mt-1">
                      {problemCascadeActive
                        ? 'Chauffeur scheduled for 7:30 PM. 15 minutes is insufficient for international deplaning & baggage.'
                        : 'Scheduled for 7:30 PM with comfortable buffer.'}
                    </p>
                  </div>
                </div>
                <div className="text-right text-xs shrink-0 font-medium">
                  <span className={problemCascadeActive ? 'text-rose-700' : 'text-slate-600'}>
                    7:30 PM Pickup
                  </span>
                </div>
              </div>

              {/* Cascade Arrow */}
              {problemCascadeActive && (
                <div className="flex items-center justify-center py-0.5 text-amber-500 font-bold text-xs gap-1.5">
                  <TrendingDown className="w-4 h-4" />
                  <span>Cascade to Accommodation</span>
                </div>
              )}

              {/* Item 3: Hotel */}
              <div className={`p-4 rounded-xl border transition-all flex items-start justify-between gap-4 ${
                problemCascadeActive
                  ? 'bg-amber-50/40 border-amber-300 text-amber-950'
                  : 'bg-white border-slate-200 text-slate-900'
              }`}>
                <div className="flex items-start gap-3.5">
                  <div className={`p-2.5 rounded-lg mt-0.5 ${
                    problemCascadeActive ? 'bg-amber-100 text-amber-800' : 'bg-slate-100 text-slate-700'
                  }`}>
                    <Building className="w-5 h-5" />
                  </div>
                  <div>
                    <div className="flex items-center gap-2">
                      <span className="font-semibold text-sm">Hotel Lumière</span>
                      {problemCascadeActive && (
                        <span className="text-xs font-semibold px-2 py-0.5 rounded-full bg-amber-600 text-white">
                          Check-in delayed
                        </span>
                      )}
                    </div>
                    <p className="text-xs text-slate-600 mt-1">
                      {problemCascadeActive
                        ? 'Expected property arrival pushed past 10:30 PM. Front desk notification required.'
                        : 'Scheduled 9:00 PM check-in.'}
                    </p>
                  </div>
                </div>
                <div className="text-right text-xs shrink-0 font-medium">
                  <span className={problemCascadeActive ? 'text-amber-800' : 'text-slate-600'}>
                    10:30 PM est.
                  </span>
                </div>
              </div>

              {/* Separator for Unaffected Component */}
              <div className="pt-2">
                <div className="p-4 rounded-xl border bg-white border-slate-200 text-slate-900 flex items-start justify-between gap-4">
                  <div className="flex items-start gap-3.5">
                    <div className="p-2.5 rounded-lg mt-0.5 bg-emerald-50 text-emerald-800">
                      <Train className="w-5 h-5" />
                    </div>
                    <div>
                      <div className="flex items-center gap-2">
                        <span className="font-semibold text-sm">Train Paris → Amsterdam (20 Sep)</span>
                        {problemCascadeActive && (
                          <span className="text-xs font-semibold px-2 py-0.5 rounded-full bg-emerald-100 text-emerald-800 border border-emerald-300">
                            No impact
                          </span>
                        )}
                      </div>
                      <p className="text-xs text-slate-600 mt-1">
                        Subsequent onward journey component remains fully operational without schedule conflicts.
                      </p>
                    </div>
                  </div>
                  <div className="text-right text-xs shrink-0 font-medium text-emerald-800">
                    8:30 AM Confirmed
                  </div>
                </div>
              </div>
            </div>

            {/* Problem section CTA */}
            <div className="mt-8 pt-6 border-t border-slate-200/80 flex flex-col sm:flex-row items-center justify-between gap-4">
              <div className="text-xs text-slate-600">
                <strong>{problemCascadeActive ? '3 connected bookings at risk.' : 'Itinerary stable.'}</strong>{' '}
                YatraSetu automatically identifies root causes and surfaces 3 clear recovery strategies.
              </div>
              <button
                onClick={loadDemoTrip}
                className="inline-flex items-center gap-2 text-xs font-semibold text-slate-900 hover:text-blue-900 bg-white hover:bg-slate-50 border border-slate-300 px-4 py-2 rounded-xl transition-all shadow-xs shrink-0"
              >
                <span>Simulate on Demo Trip</span>
                <ChevronRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* SECTION 3: HOW RECOVERY WORKS (3 Steps) */}
      <section id="how-it-works" className="py-20 bg-slate-50/60 border-b border-slate-200/80">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-2xl mx-auto mb-16">
            <span className="text-xs font-bold uppercase tracking-wider text-blue-800 bg-blue-50 px-3 py-1 rounded-full border border-blue-200/60">
              Clear Three-Step Process
            </span>
            <h2 className="text-3xl sm:text-4xl font-bold tracking-tight text-slate-900 mt-3 mb-3">
              How recovery works
            </h2>
            <p className="text-base text-slate-600">
              Three seamless steps from initial delay notification to confirmed itinerary recovery.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Step 01 */}
            <div className="bg-white rounded-2xl p-7 border border-slate-200/90 shadow-sm relative flex flex-col justify-between">
              <div>
                <div className="text-4xl font-bold text-slate-200 font-serif mb-4">01</div>
                <h3 className="text-lg font-semibold text-slate-900 mb-2">
                  Add your trip
                </h3>
                <p className="text-sm text-slate-600 leading-relaxed">
                  Enter your flights, hotels, transfers, trains, and activities. YatraSetu maps the operational dependencies between every segment.
                </p>
              </div>
              <div className="mt-6 pt-4 border-t border-slate-100 flex items-center gap-2 text-xs font-medium text-slate-500">
                <Layers className="w-4 h-4 text-blue-700" />
                <span>Multi-segment graph creation</span>
              </div>
            </div>

            {/* Step 02 */}
            <div className="bg-white rounded-2xl p-7 border border-slate-200/90 shadow-sm relative flex flex-col justify-between">
              <div>
                <div className="text-4xl font-bold text-slate-200 font-serif mb-4">02</div>
                <h3 className="text-lg font-semibold text-slate-900 mb-2">
                  Understand the impact
                </h3>
                <p className="text-sm text-slate-600 leading-relaxed">
                  When a delay or cancellation strikes, our dependency engine instantly traces every downstream connection and flags affected reservations.
                </p>
              </div>
              <div className="mt-6 pt-4 border-t border-slate-100 flex items-center gap-2 text-xs font-medium text-slate-500">
                <Clock className="w-4 h-4 text-amber-600" />
                <span>Downstream cascade analysis</span>
              </div>
            </div>

            {/* Step 03 */}
            <div className="bg-white rounded-2xl p-7 border border-slate-200/90 shadow-sm relative flex flex-col justify-between">
              <div>
                <div className="text-4xl font-bold text-slate-200 font-serif mb-4">03</div>
                <h3 className="text-lg font-semibold text-slate-900 mb-2">
                  Choose a recovery plan
                </h3>
                <p className="text-sm text-slate-600 leading-relaxed">
                  Compare practical recovery options: Recommended, Lowest Cost, or Fastest. Choose one and your entire schedule is updated in one click.
                </p>
              </div>
              <div className="mt-6 pt-4 border-t border-slate-100 flex items-center gap-2 text-xs font-medium text-slate-500">
                <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                <span>One-click itinerary sync</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* SECTION 4: FEATURES (Concise, minimal, commercial SaaS) */}
      <section id="features" className="py-16 bg-white border-b border-slate-200/80">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="flex items-start gap-4 p-5 rounded-xl border border-slate-100 bg-slate-50/50">
              <div className="p-2.5 rounded-lg bg-blue-50 text-blue-800 shrink-0">
                <ArrowRightLeft className="w-5 h-5" />
              </div>
              <div>
                <h4 className="text-sm font-semibold text-slate-900 mb-1">
                  Connected Booking Graph
                </h4>
                <p className="text-xs text-slate-600 leading-relaxed">
                  Treats multi-leg journeys as an interdependent network rather than disconnected calendar slots.
                </p>
              </div>
            </div>

            <div className="flex items-start gap-4 p-5 rounded-xl border border-slate-100 bg-slate-50/50">
              <div className="p-2.5 rounded-lg bg-emerald-50 text-emerald-800 shrink-0">
                <ShieldCheck className="w-5 h-5" />
              </div>
              <div>
                <h4 className="text-sm font-semibold text-slate-900 mb-1">
                  Differentiated Choices
                </h4>
                <p className="text-xs text-slate-600 leading-relaxed">
                  Presents real trade-offs: save budget with activity refunds, or preserve time with flight rebooking.
                </p>
              </div>
            </div>

            <div className="flex items-start gap-4 p-5 rounded-xl border border-slate-100 bg-slate-50/50">
              <div className="p-2.5 rounded-lg bg-indigo-50 text-indigo-800 shrink-0">
                <CheckCircle2 className="w-5 h-5" />
              </div>
              <div>
                <h4 className="text-sm font-semibold text-slate-900 mb-1">
                  Stateful Synchronization
                </h4>
                <p className="text-xs text-slate-600 leading-relaxed">
                  Applying a plan mutates the active trip state, keeping your dashboard permanently accurate and dependable.
                </p>
              </div>
            </div>
          </div>

          {/* Bottom Banner */}
          <div className="mt-12 p-8 rounded-2xl bg-slate-900 text-white text-center flex flex-col sm:flex-row items-center justify-between gap-6 shadow-sm">
            <div className="text-left">
              <h3 className="text-xl font-bold">Ready to test travel recovery?</h3>
              <p className="text-xs text-slate-300 mt-1">
                Explore how YatraSetu responds to a 3-hour flight delay on Mumbai → Paris.
              </p>
            </div>
            <div className="flex items-center gap-3 shrink-0">
              <button
                onClick={loadDemoTrip}
                className="px-5 py-2.5 rounded-xl bg-white hover:bg-slate-100 text-slate-900 font-semibold text-sm transition-all shadow-sm flex items-center gap-2"
              >
                <Sparkles className="w-4 h-4 text-blue-700" />
                <span>Launch Demo Trip</span>
              </button>
              <button
                onClick={() => setScreen('create_trip')}
                className="px-4 py-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-white font-medium text-sm border border-slate-700 transition-all"
              >
                Create Trip
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* FOOTER */}
      <footer className="py-8 bg-slate-50 text-slate-500 text-xs border-t border-slate-200">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <img
              src="/logo.jpg"
              alt="YatraSetu Logo"
              className="h-7 w-auto object-contain"
            />
            <span className="text-slate-400">|</span>
            <span>Travel Disruption Recovery Platform</span>
          </div>
          <div>
            <span>Hackathon Prototype • Vercel Ready</span>
          </div>
        </div>
      </footer>
    </div>
  );
};
