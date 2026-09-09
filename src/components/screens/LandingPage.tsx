import React from 'react';
import { useTrip } from '../../context/TripContext';
import {
  ArrowRight,
  Sparkles,
  Plane,
  Car,
  Building,
  Ticket,
  Train,
  CheckCircle2,
  Clock,
} from 'lucide-react';

export const LandingPage: React.FC = () => {
  const { setScreen, loadDemoTrip, setIsSignInModalOpen } = useTrip();

  return (
    <div className="min-h-screen bg-[#fafbfc] text-slate-900 flex flex-col font-sans selection:bg-blue-100 selection:text-blue-900">
      {/* NAVBAR */}
      <header className="h-16 px-4 sm:px-8 max-w-7xl mx-auto w-full flex items-center justify-between border-b border-slate-200/60 bg-transparent">
        {/* Brand Logo */}
        <div className="flex items-center gap-3">
          <img
            src="/logo.jpg"
            alt="YatraSetu"
            className="h-10 w-auto object-contain"
          />
        </div>

        {/* Minimal Nav Links */}
        <nav className="flex items-center gap-6 text-sm font-medium text-slate-600">
          <button
            onClick={() => {
              const el = document.getElementById('preview');
              if (el) el.scrollIntoView({ behavior: 'smooth' });
            }}
            className="hidden sm:inline-block hover:text-slate-900 transition-colors"
          >
            How it works
          </button>
          <button
            onClick={() => setIsSignInModalOpen(true)}
            className="hover:text-slate-900 transition-colors text-xs font-semibold px-3 py-1.5 rounded-lg border border-slate-200 bg-white shadow-xs"
          >
            Sign in
          </button>
        </nav>
      </header>

      {/* HERO SECTION */}
      <main className="flex-1 max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 pt-16 pb-20 sm:pt-24 sm:pb-28 text-center flex flex-col items-center">
        {/* Editorial Pill */}
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white border border-slate-200 text-xs font-medium text-slate-700 mb-8 shadow-xs">
          <span className="w-1.5 h-1.5 rounded-full bg-emerald-500"></span>
          Intelligent Travel Disruption Recovery
        </div>

        {/* Headline */}
        <h1 className="text-4xl sm:text-5xl md:text-6xl font-extrabold tracking-tight text-slate-900 leading-[1.12] mb-6 max-w-3xl">
          Your trip changes.{' '}
          <span className="italic font-serif font-normal text-blue-900 block sm:inline">
            Your plan adapts.
          </span>
        </h1>

        {/* Short Supporting Line */}
        <p className="text-lg sm:text-xl text-slate-600 max-w-xl mx-auto font-normal leading-relaxed mb-10">
          Stay ahead when travel plans don't go as planned.
        </p>

        {/* CTAs */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-3.5 w-full sm:w-auto mb-14">
          <button
            onClick={() => setScreen('create_trip')}
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-7 py-3.5 rounded-xl bg-slate-900 hover:bg-slate-800 text-white font-semibold text-sm shadow-sm transition-all"
          >
            <span>Get Started</span>
            <ArrowRight className="w-4 h-4" />
          </button>

          <button
            onClick={loadDemoTrip}
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-7 py-3.5 rounded-xl bg-white hover:bg-slate-50 text-slate-800 font-semibold text-sm border border-slate-200 shadow-xs transition-all"
          >
            <Sparkles className="w-4 h-4 text-blue-700" />
            <span>Try Demo</span>
          </button>
        </div>

        {/* HERO VISUAL: ONE STRONG PREMIUM TRAVEL VISUAL / COMPOSITION */}
        <div className="w-full max-w-3xl mx-auto">
          <div className="bg-white rounded-2xl border border-slate-200/90 shadow-xl shadow-slate-200/40 p-6 sm:p-8 text-left">
            <div className="flex items-center justify-between pb-5 mb-6 border-b border-slate-100">
              <div>
                <span className="text-[10px] uppercase font-bold tracking-wider text-slate-400">
                  Live Itinerary Rail
                </span>
                <div className="text-sm font-bold text-slate-900 mt-0.5">
                  Mumbai → Paris → Amsterdam
                </div>
              </div>
              <div className="flex items-center gap-1.5 text-xs font-semibold text-emerald-700 bg-emerald-50 px-2.5 py-1 rounded-full border border-emerald-200/60">
                <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
                Protected Itinerary
              </div>
            </div>

            {/* Connected Journey Concept: Flight → Transfer → Hotel → Activity → Train */}
            <div className="grid grid-cols-2 sm:grid-cols-5 gap-3">
              <div className="p-3.5 rounded-xl bg-slate-50 border border-slate-200/70">
                <div className="p-2 rounded-lg bg-blue-50 text-blue-700 w-fit mb-2">
                  <Plane className="w-4 h-4" />
                </div>
                <div className="text-xs font-bold text-slate-900">Flight</div>
                <div className="text-[11px] text-slate-500">10:40 AM</div>
                <div className="text-[10px] text-emerald-700 font-semibold mt-2">Confirmed</div>
              </div>

              <div className="p-3.5 rounded-xl bg-slate-50 border border-slate-200/70">
                <div className="p-2 rounded-lg bg-indigo-50 text-indigo-700 w-fit mb-2">
                  <Car className="w-4 h-4" />
                </div>
                <div className="text-xs font-bold text-slate-900">Transfer</div>
                <div className="text-[11px] text-slate-500">7:30 PM</div>
                <div className="text-[10px] text-emerald-700 font-semibold mt-2">Confirmed</div>
              </div>

              <div className="p-3.5 rounded-xl bg-slate-50 border border-slate-200/70">
                <div className="p-2 rounded-lg bg-slate-100 text-slate-700 w-fit mb-2">
                  <Building className="w-4 h-4" />
                </div>
                <div className="text-xs font-bold text-slate-900">Hotel</div>
                <div className="text-[11px] text-slate-500">9:00 PM</div>
                <div className="text-[10px] text-slate-700 font-semibold mt-2">Check-in</div>
              </div>

              <div className="p-3.5 rounded-xl bg-slate-50 border border-slate-200/70">
                <div className="p-2 rounded-lg bg-amber-50 text-amber-700 w-fit mb-2">
                  <Ticket className="w-4 h-4" />
                </div>
                <div className="text-xs font-bold text-slate-900">Activity</div>
                <div className="text-[11px] text-slate-500">19 Sep</div>
                <div className="text-[10px] text-emerald-700 font-semibold mt-2">Confirmed</div>
              </div>

              <div className="p-3.5 rounded-xl bg-slate-50 border border-slate-200/70 col-span-2 sm:col-span-1">
                <div className="p-2 rounded-lg bg-emerald-50 text-emerald-700 w-fit mb-2">
                  <Train className="w-4 h-4" />
                </div>
                <div className="text-xs font-bold text-slate-900">Train</div>
                <div className="text-[11px] text-slate-500">20 Sep</div>
                <div className="text-[10px] text-emerald-700 font-semibold mt-2">Confirmed</div>
              </div>
            </div>
          </div>
        </div>

        {/* SUBTLE VALUE / CREDIBILITY SECTION */}
        <section id="preview" className="mt-20 pt-12 border-t border-slate-200/70 w-full max-w-2xl text-center">
          <h2 className="text-xl font-bold text-slate-900 mb-2">
            One place for your changing itinerary.
          </h2>
          <p className="text-sm text-slate-600 leading-relaxed mb-6">
            When a delay happens, YatraSetu recalculates your downstream connections and presents clear recovery plans so you stay moving.
          </p>
          <button
            onClick={loadDemoTrip}
            className="inline-flex items-center gap-2 text-xs font-semibold text-slate-900 hover:text-blue-900 bg-white border border-slate-300 px-4 py-2 rounded-xl transition-all shadow-xs"
          >
            <span>Explore Demo Itinerary</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </section>
      </main>

      {/* MINIMAL FOOTER */}
      <footer className="py-6 border-t border-slate-200 bg-white text-xs text-slate-500 text-center">
        <div className="max-w-7xl mx-auto px-4 flex flex-col sm:flex-row items-center justify-between gap-2">
          <div className="flex items-center gap-2">
            <img src="/logo.jpg" alt="Logo" className="h-6 w-auto object-contain" />
            <span className="text-slate-400">|</span>
            <span>Travel Disruption Recovery Platform</span>
          </div>
          <span>Prototype Environment • Vercel Ready</span>
        </div>
      </footer>
    </div>
  );
};
