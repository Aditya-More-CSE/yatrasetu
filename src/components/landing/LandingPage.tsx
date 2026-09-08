import React from 'react';
import {
  ArrowRight,
  ShieldCheck,
  Plane,
  Car,
  Hotel,
  MapPin,
  Utensils,
  AlertTriangle,
  Clock,
  Sparkles,
  ChevronRight,
  Check,
  Compass,
} from 'lucide-react';
import { useTrip } from '../../context/TripContext';

export const LandingPage: React.FC = () => {
  const { setCurrentPage } = useTrip();

  const handleGetStarted = () => {
    setCurrentPage('auth');
  };

  const scrollToSection = (id: string) => {
    const el = document.getElementById(id);
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <div className="min-h-screen bg-[#f5f9fd] text-slate-900 font-sans selection:bg-blue-100 selection:text-blue-900">
      {/* Sticky Minimal Navbar */}
      <header className="sticky top-0 z-40 bg-white/80 backdrop-blur-md border-b border-slate-200/60">
        <div className="max-w-6xl mx-auto px-6 h-16 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="h-9 w-9 rounded-lg overflow-hidden bg-white border border-slate-200/80 shadow-xs flex items-center justify-center p-0.5">
              <img
                src="/yatrasetu-logo.jpg"
                alt="YatraSetu"
                className="w-full h-full object-contain"
              />
            </div>
            <div className="flex flex-col">
              <span className="font-bold text-base text-slate-900 tracking-tight leading-none">
                YatraSetu
              </span>
              <span className="text-[10px] text-slate-500 font-medium mt-0.5">
                Your Journey. Our Priority.
              </span>
            </div>
          </div>

          <nav className="hidden md:flex items-center gap-8 text-xs font-medium text-slate-600">
            <button
              onClick={() => scrollToSection('connected-journey')}
              className="hover:text-slate-900 transition-colors"
            >
              Product
            </button>
            <button
              onClick={() => scrollToSection('how-it-works')}
              className="hover:text-slate-900 transition-colors"
            >
              How it works
            </button>
            <button
              onClick={() => scrollToSection('recovery-plans')}
              className="hover:text-slate-900 transition-colors"
            >
              Recovery
            </button>
          </nav>

          <div className="flex items-center gap-3">
            <button
              onClick={handleGetStarted}
              className="text-xs font-semibold text-slate-700 hover:text-slate-900 px-3 py-1.5 transition-colors"
            >
              Log in
            </button>
            <button
              onClick={handleGetStarted}
              className="px-4 py-2 rounded-full bg-slate-900 text-white text-xs font-semibold hover:bg-slate-800 transition-all shadow-xs flex items-center gap-1.5 group"
            >
              <span>Get started</span>
              <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 transition-transform" />
            </button>
          </div>
        </div>
      </header>

      {/* 1. HERO SECTION */}
      <section className="pt-16 pb-20 px-6 max-w-5xl mx-auto text-center">
        {/* Subtle pill badge */}
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white border border-slate-200 shadow-subtle mb-6">
          <span className="w-2 h-2 rounded-full bg-blue-600 animate-pulse"></span>
          <span className="text-xs font-medium text-slate-600">
            Connected Travel Disruption Recovery Engine
          </span>
        </div>

        {/* Editorial Heading */}
        <h1 className="text-4xl sm:text-5xl md:text-6xl font-normal tracking-tight text-slate-900 max-w-4xl mx-auto leading-[1.15]">
          When your journey changes,{' '}
          <span className="italic font-serif font-normal text-blue-700">
            YatraSetu finds the way forward.
          </span>
        </h1>

        <p className="mt-5 text-base sm:text-lg text-slate-600 max-w-2xl mx-auto font-normal leading-relaxed">
          Your entire trip, connected. When a delay or cancellation happens, understand its impact in seconds and find the best way to recover.
        </p>

        {/* Hero CTAs */}
        <div className="mt-8 flex flex-col sm:flex-row items-center justify-center gap-3">
          <button
            onClick={handleGetStarted}
            className="w-full sm:w-auto px-7 py-3 rounded-full bg-slate-900 text-white text-sm font-semibold hover:bg-slate-800 transition-all shadow-card flex items-center justify-center gap-2 group"
          >
            <span>Plan my trip</span>
            <ArrowRight className="w-4 h-4 group-hover:translate-x-0.5 transition-transform" />
          </button>
          <button
            onClick={() => scrollToSection('how-it-works')}
            className="w-full sm:w-auto px-6 py-3 rounded-full bg-white text-slate-700 text-sm font-semibold hover:bg-slate-50 border border-slate-200 transition-all shadow-subtle"
          >
            See how it works
          </button>
        </div>

        {/* Hero Visual Mockup */}
        <div className="mt-14 max-w-3xl mx-auto">
          <div className="bg-white rounded-2xl border border-slate-200/80 shadow-elevated p-6 text-left">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-4 border-b border-slate-100 gap-2">
              <div>
                <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400">
                  Live Itinerary
                </span>
                <h3 className="text-base font-bold text-slate-900">Paris & Amsterdam</h3>
                <p className="text-xs text-slate-500 font-mono">12 Apr — 20 Apr 2025 • Mumbai → Paris</p>
              </div>

              {/* Disruption Alert Pill */}
              <div className="flex items-center gap-2 px-3 py-1.5 rounded-lg bg-red-50 border border-red-200 text-red-700 text-xs font-semibold">
                <AlertTriangle className="w-3.5 h-3.5 text-red-600" />
                <span>Flight delayed +2h • 3 bookings affected</span>
              </div>
            </div>

            {/* Compact timeline snapshot */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mt-4 text-xs">
              <div className="p-3 rounded-xl bg-red-50/50 border border-red-200">
                <span className="text-red-700 font-bold block mb-1">✈ Flight AI-142</span>
                <span className="text-slate-500 line-through text-[11px] block">10:00 Dep</span>
                <span className="text-red-700 font-mono font-bold text-xs">12:00 Delayed</span>
              </div>

              <div className="p-3 rounded-xl bg-amber-50/50 border border-amber-200">
                <span className="text-amber-800 font-bold block mb-1">🚗 CDG Transfer</span>
                <span className="text-slate-500 text-[11px] block">15:10 Pickup</span>
                <span className="text-amber-700 font-bold text-[11px]">At risk (-90m)</span>
              </div>

              <div className="p-3 rounded-xl bg-amber-50/50 border border-amber-200">
                <span className="text-amber-800 font-bold block mb-1">🏨 Hotel Le Grand</span>
                <span className="text-slate-500 text-[11px] block">16:00 Check-in</span>
                <span className="text-amber-700 font-bold text-[11px]">Delayed to 17:45</span>
              </div>

              <div className="p-3 rounded-xl bg-amber-50/50 border border-amber-200">
                <span className="text-amber-800 font-bold block mb-1">📍 Paris City Tour</span>
                <span className="text-slate-500 text-[11px] block">18:30 Pier</span>
                <span className="text-amber-700 font-bold text-[11px]">Tight buffer (5m)</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 2. "YOUR JOURNEY, CONNECTED" SECTION */}
      <section id="connected-journey" className="py-20 bg-white border-y border-slate-200/70 px-6">
        <div className="max-w-5xl mx-auto">
          <div className="text-center max-w-2xl mx-auto mb-14">
            <span className="text-xs font-bold uppercase tracking-wider text-blue-700">
              The Connected Travel Graph
            </span>
            <h2 className="text-3xl sm:text-4xl font-normal text-slate-900 mt-2">
              Your journey isn't a{' '}
              <span className="italic font-serif text-blue-700">list of bookings.</span>
            </h2>
            <p className="mt-3 text-sm sm:text-base text-slate-600 leading-relaxed">
              YatraSetu connects flights, transfers, hotels and activities so it understands how one disruption ripples through the rest of your trip.
            </p>
          </div>

          {/* Connected Graph Flow */}
          <div className="bg-[#f8fafc] border border-slate-200 rounded-2xl p-6 sm:p-10 shadow-card">
            <div className="flex flex-col md:flex-row items-center justify-between gap-4">
              {/* Node 1: Flight */}
              <div className="flex-1 w-full bg-white p-4 rounded-xl border border-red-300 shadow-xs">
                <div className="flex items-center gap-2 mb-2">
                  <div className="w-6 h-6 rounded bg-red-100 text-red-700 flex items-center justify-center">
                    <Plane className="w-3.5 h-3.5" />
                  </div>
                  <span className="text-[11px] uppercase font-bold text-red-700">Disruption</span>
                </div>
                <h4 className="text-xs font-bold text-slate-900">Flight Mumbai → Paris</h4>
                <p className="text-[11px] text-red-600 font-mono mt-0.5">Delayed +2 hours</p>
              </div>

              <div className="rotate-90 md:rotate-0 text-slate-300 font-bold">
                <ArrowRight className="w-5 h-5 text-amber-500" />
              </div>

              {/* Node 2: Transfer */}
              <div className="flex-1 w-full bg-white p-4 rounded-xl border border-amber-300 shadow-xs">
                <div className="flex items-center gap-2 mb-2">
                  <div className="w-6 h-6 rounded bg-amber-100 text-amber-700 flex items-center justify-center">
                    <Car className="w-3.5 h-3.5" />
                  </div>
                  <span className="text-[11px] uppercase font-bold text-amber-700">At Risk</span>
                </div>
                <h4 className="text-xs font-bold text-slate-900">Airport Transfer</h4>
                <p className="text-[11px] text-amber-600 mt-0.5">Buffer compressed by 90m</p>
              </div>

              <div className="rotate-90 md:rotate-0 text-slate-300 font-bold">
                <ArrowRight className="w-5 h-5 text-amber-500" />
              </div>

              {/* Node 3: Hotel */}
              <div className="flex-1 w-full bg-white p-4 rounded-xl border border-amber-300 shadow-xs">
                <div className="flex items-center gap-2 mb-2">
                  <div className="w-6 h-6 rounded bg-amber-100 text-amber-700 flex items-center justify-center">
                    <Hotel className="w-3.5 h-3.5" />
                  </div>
                  <span className="text-[11px] uppercase font-bold text-amber-700">Delayed</span>
                </div>
                <h4 className="text-xs font-bold text-slate-900">Hotel Le Grand</h4>
                <p className="text-[11px] text-amber-600 mt-0.5">Check-in moved to 17:45</p>
              </div>

              <div className="rotate-90 md:rotate-0 text-slate-300 font-bold">
                <ArrowRight className="w-5 h-5 text-amber-500" />
              </div>

              {/* Node 4: Tour */}
              <div className="flex-1 w-full bg-white p-4 rounded-xl border border-amber-300 shadow-xs">
                <div className="flex items-center gap-2 mb-2">
                  <div className="w-6 h-6 rounded bg-amber-100 text-amber-700 flex items-center justify-center">
                    <MapPin className="w-3.5 h-3.5" />
                  </div>
                  <span className="text-[11px] uppercase font-bold text-amber-700">At Risk</span>
                </div>
                <h4 className="text-xs font-bold text-slate-900">Paris City Tour</h4>
                <p className="text-[11px] text-amber-600 mt-0.5">5m pier departure margin</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 3. "WHEN PLANS CHANGE" SECTION */}
      <section className="py-20 px-6 max-w-5xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
          <div>
            <span className="text-xs font-bold uppercase tracking-wider text-blue-700">
              Ripple Effect Analysis
            </span>
            <h2 className="text-3xl sm:text-4xl font-normal text-slate-900 mt-2 leading-tight">
              A two-hour delay shouldn't{' '}
              <span className="italic font-serif text-blue-700">ruin an entire trip.</span>
            </h2>
            <p className="mt-4 text-sm sm:text-base text-slate-600 leading-relaxed">
              Traditional apps send a flight delay notification and leave you to figure out the rest. YatraSetu traces downstream dependencies automatically, evaluating buffers, non-refundable tickets, and late hotel arrival rules.
            </p>
            <button
              onClick={handleGetStarted}
              className="mt-6 text-sm font-semibold text-blue-700 hover:text-blue-800 flex items-center gap-1.5 group"
            >
              <span>See the recovery process</span>
              <ArrowRight className="w-4 h-4 group-hover:translate-x-0.5 transition-transform" />
            </button>
          </div>

          {/* Right Product Mockup */}
          <div className="bg-white rounded-2xl border border-slate-200/80 p-6 shadow-card space-y-3">
            <div className="flex items-center justify-between pb-3 border-b border-slate-100">
              <span className="text-xs font-bold text-slate-900">Flight AI-142 delayed +2h</span>
              <span className="text-[11px] font-mono px-2 py-0.5 rounded bg-red-100 text-red-700 font-bold">
                Impact Traced
              </span>
            </div>

            <div className="space-y-2 text-xs">
              <div className="flex items-center justify-between p-2.5 rounded-lg bg-amber-50/60 border border-amber-200">
                <span className="font-semibold text-slate-800">Airport Transfer</span>
                <span className="font-bold text-amber-700">At risk</span>
              </div>
              <div className="flex items-center justify-between p-2.5 rounded-lg bg-amber-50/60 border border-amber-200">
                <span className="font-semibold text-slate-800">Hotel Check-in</span>
                <span className="font-bold text-amber-700">Delayed</span>
              </div>
              <div className="flex items-center justify-between p-2.5 rounded-lg bg-red-50/60 border border-red-200">
                <span className="font-semibold text-slate-800">City Tour & Cruise</span>
                <span className="font-bold text-red-700">At risk</span>
              </div>
              <div className="flex items-center justify-between p-2.5 rounded-lg bg-emerald-50/60 border border-emerald-200">
                <span className="font-semibold text-slate-800">Dinner at Le Bistro</span>
                <span className="font-bold text-emerald-700">Safe (21:00)</span>
              </div>
            </div>

            <p className="text-[11px] text-slate-500 pt-2 border-t border-slate-100">
              YatraSetu traces the impact automatically so you don't scramble at the gate.
            </p>
          </div>
        </div>
      </section>

      {/* 4. "WE FIND YOUR BEST WAY FORWARD" SECTION */}
      <section id="recovery-plans" className="py-20 bg-white border-y border-slate-200/70 px-6">
        <div className="max-w-5xl mx-auto">
          <div className="text-center max-w-2xl mx-auto mb-12">
            <span className="text-xs font-bold uppercase tracking-wider text-blue-700">
              Recovery Engine
            </span>
            <h2 className="text-3xl sm:text-4xl font-normal text-slate-900 mt-2">
              We find your{' '}
              <span className="italic font-serif text-blue-700">best way forward.</span>
            </h2>
            <p className="mt-3 text-sm sm:text-base text-slate-600">
              Compare trade-offs and choose what matters most to you: budget, speed, or experience.
            </p>
          </div>

          {/* 3 Recovery Cards */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {/* Cheapest */}
            <div className="bg-[#f8fafc] border border-slate-200 rounded-2xl p-6 shadow-subtle flex flex-col justify-between">
              <div>
                <span className="text-[10px] uppercase font-bold tracking-wider px-2 py-0.5 rounded bg-slate-200 text-slate-700">
                  Cheapest
                </span>
                <div className="my-4">
                  <span className="text-3xl font-bold text-slate-900 font-mono">₹800</span>
                  <span className="text-xs text-slate-500 ml-1">add'l cost</span>
                </div>
                <div className="space-y-1 text-xs text-slate-600 mb-4">
                  <p className="font-semibold text-slate-800">+35 min schedule impact</p>
                  <p>1 booking changed</p>
                  <p className="text-amber-700">Tour moved to tomorrow</p>
                </div>
              </div>
              <button
                onClick={handleGetStarted}
                className="w-full py-2 rounded-lg bg-white hover:bg-slate-100 text-xs font-semibold border border-slate-300 transition-colors"
              >
                Select Option
              </button>
            </div>

            {/* Fastest */}
            <div className="bg-[#f8fafc] border border-slate-200 rounded-2xl p-6 shadow-subtle flex flex-col justify-between">
              <div>
                <span className="text-[10px] uppercase font-bold tracking-wider px-2 py-0.5 rounded bg-slate-200 text-slate-700">
                  Fastest
                </span>
                <div className="my-4">
                  <span className="text-3xl font-bold text-slate-900 font-mono">₹1,600</span>
                  <span className="text-xs text-slate-500 ml-1">add'l cost</span>
                </div>
                <div className="space-y-1 text-xs text-slate-600 mb-4">
                  <p className="font-semibold text-slate-800">+5 min schedule impact</p>
                  <p>2 bookings changed</p>
                  <p className="text-emerald-700 font-medium">✓ Tour preserved today</p>
                </div>
              </div>
              <button
                onClick={handleGetStarted}
                className="w-full py-2 rounded-lg bg-white hover:bg-slate-100 text-xs font-semibold border border-slate-300 transition-colors"
              >
                Select Option
              </button>
            </div>

            {/* Best Experience */}
            <div className="bg-blue-50/50 border-2 border-blue-600 rounded-2xl p-6 shadow-card flex flex-col justify-between relative">
              <span className="absolute -top-3 right-5 text-[10px] font-bold uppercase tracking-wider px-2.5 py-0.5 rounded-full bg-blue-600 text-white shadow-xs">
                ★ Recommended
              </span>
              <div>
                <span className="text-[10px] uppercase font-bold tracking-wider px-2 py-0.5 rounded bg-blue-100 text-blue-800">
                  Best Experience
                </span>
                <div className="my-4">
                  <span className="text-3xl font-bold text-slate-900 font-mono">₹1,200</span>
                  <span className="text-xs text-slate-500 ml-1">add'l cost</span>
                </div>
                <div className="space-y-1 text-xs text-slate-600 mb-4">
                  <p className="font-semibold text-slate-800">+15 min schedule impact</p>
                  <p>1 booking changed</p>
                  <p className="text-emerald-700 font-semibold">✓ Tour preserved (Twilight slot)</p>
                </div>
              </div>
              <button
                onClick={handleGetStarted}
                className="w-full py-2.5 rounded-lg bg-blue-700 hover:bg-blue-800 text-white text-xs font-semibold transition-colors shadow-xs"
              >
                Choose Recommended
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* 5. "HOW IT WORKS" (4 STEPS) */}
      <section id="how-it-works" className="py-20 px-6 max-w-5xl mx-auto">
        <div className="text-center max-w-2xl mx-auto mb-14">
          <span className="text-xs font-bold uppercase tracking-wider text-blue-700">
            Simplicity by Design
          </span>
          <h2 className="text-3xl sm:text-4xl font-normal text-slate-900 mt-2">
            How YatraSetu{' '}
            <span className="italic font-serif text-blue-700">works for you.</span>
          </h2>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-subtle">
            <span className="font-mono text-xs font-bold text-blue-700 block mb-3">01</span>
            <h3 className="text-base font-bold text-slate-900 mb-1">Build your trip</h3>
            <p className="text-xs text-slate-500 leading-relaxed">
              Add your flights, hotels, transfers and activities into a connected itinerary.
            </p>
          </div>

          <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-subtle">
            <span className="font-mono text-xs font-bold text-blue-700 block mb-3">02</span>
            <h3 className="text-base font-bold text-slate-900 mb-1">Tell us what changed</h3>
            <p className="text-xs text-slate-500 leading-relaxed">
              Report a delay, cancellation, or missed connection in two quick clicks.
            </p>
          </div>

          <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-subtle">
            <span className="font-mono text-xs font-bold text-blue-700 block mb-3">03</span>
            <h3 className="text-base font-bold text-slate-900 mb-1">We analyze impact</h3>
            <p className="text-xs text-slate-500 leading-relaxed">
              YatraSetu traces the ripple effect and calculates downstream buffer margins.
            </p>
          </div>

          <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-subtle">
            <span className="font-mono text-xs font-bold text-blue-700 block mb-3">04</span>
            <h3 className="text-base font-bold text-slate-900 mb-1">Choose best recovery</h3>
            <p className="text-xs text-slate-500 leading-relaxed">
              Pick the optimal recovery plan and continue your journey without stress.
            </p>
          </div>
        </div>
      </section>

      {/* 6. FINAL CTA & FOOTER */}
      <section className="py-20 bg-slate-900 text-white px-6 text-center">
        <div className="max-w-3xl mx-auto">
          <h2 className="text-3xl sm:text-4xl font-normal leading-tight">
            Your trip can change.{' '}
            <span className="italic font-serif text-blue-300">
              Your plans don't have to fall apart.
            </span>
          </h2>
          <p className="mt-4 text-sm text-slate-400 max-w-xl mx-auto">
            Experience the peace of mind of an intelligent travel recovery engine.
          </p>
          <button
            onClick={handleGetStarted}
            className="mt-8 px-8 py-3.5 rounded-full bg-blue-600 hover:bg-blue-500 text-white text-sm font-semibold transition-all shadow-card inline-flex items-center gap-2 group"
          >
            <span>Start my trip</span>
            <ArrowRight className="w-4 h-4 group-hover:translate-x-0.5 transition-transform" />
          </button>
        </div>
      </section>

      {/* Minimal Footer */}
      <footer className="py-8 bg-slate-950 text-slate-500 text-xs border-t border-slate-800 px-6">
        <div className="max-w-6xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-2">
            <img src="/yatrasetu-logo.jpg" alt="Logo" className="w-5 h-5 object-contain" />
            <span className="font-bold text-slate-300">YatraSetu</span>
            <span>— AI-powered Travel Disruption Recovery Engine</span>
          </div>
          <p>© 2025 YatraSetu. Your Journey. Our Priority.</p>
        </div>
      </footer>
    </div>
  );
};
