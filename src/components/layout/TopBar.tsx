import React from 'react';
import { useTrip } from '../../context/TripContext';
import { Menu, ShieldCheck, ChevronRight } from 'lucide-react';

export const TopBar: React.FC<{ onOpenMobileMenu: () => void }> = ({ onOpenMobileMenu }) => {
  const { screen, setScreen, trip, isRecovered, setIsSignInModalOpen } = useTrip();

  const getScreenBreadcrumb = () => {
    switch (screen) {
      case 'dashboard':
        return 'Trip Dashboard';
      case 'create_trip':
        return 'Create Trip & Itinerary';
      case 'disruption_sim':
        return 'Simulate Disruption';
      case 'impact_analysis':
        return 'Impact Analysis';
      case 'recovery_options':
        return 'Recovery Options';
      case 'plan_details':
        return 'Recovery Plan Details';
      case 'updated_itinerary':
        return 'Updated Itinerary';
      default:
        return 'Overview';
    }
  };

  return (
    <header className="h-14 bg-white border-b border-slate-200 px-4 sm:px-6 flex items-center justify-between gap-4 sticky top-0 z-30">
      {/* Left: Mobile menu button + Breadcrumbs */}
      <div className="flex items-center gap-3">
        <button
          onClick={onOpenMobileMenu}
          className="md:hidden p-1.5 rounded-lg text-slate-500 hover:text-slate-800 hover:bg-slate-100 transition-colors"
          title="Open Navigation Menu"
        >
          <Menu className="w-5 h-5" />
        </button>

        <nav className="flex items-center gap-1.5 text-xs font-medium">
          <button
            onClick={() => setScreen('dashboard')}
            className="text-slate-500 hover:text-slate-900 transition-colors truncate max-w-[140px] sm:max-w-[200px]"
          >
            {trip.name}
          </button>
          <ChevronRight className="w-3.5 h-3.5 text-slate-300 shrink-0" />
          <span className="text-slate-900 font-semibold">{getScreenBreadcrumb()}</span>
        </nav>
      </div>

      {/* Right: Status badge + Guest Avatar */}
      <div className="flex items-center gap-3">
        {/* Status Indicator */}
        <div className="hidden sm:flex items-center gap-1.5 text-xs font-medium px-2.5 py-1 rounded-full bg-slate-50 border border-slate-200">
          <span
            className={`w-2 h-2 rounded-full ${
              isRecovered
                ? 'bg-emerald-500'
                : trip.status === 'Disrupted'
                ? 'bg-rose-500'
                : 'bg-emerald-500'
            }`}
          ></span>
          <span className="text-slate-700">
            {isRecovered ? 'Stable / Recovered' : trip.status}
          </span>
        </div>

        {/* Small Profile/Avatar area */}
        <button
          onClick={() => setIsSignInModalOpen(true)}
          className="flex items-center gap-2 pl-2 border-l border-slate-200 text-left focus:outline-none group"
          title="Session Profile (Guest Mode)"
        >
          <div className="w-7 h-7 rounded-full bg-slate-900 text-white flex items-center justify-center text-[11px] font-bold shadow-xs">
            VS
          </div>
          <div className="hidden lg:block text-left">
            <div className="text-xs font-semibold text-slate-800 leading-none">Vedant S.</div>
            <div className="text-[10px] text-slate-400 font-medium leading-none mt-0.5">Guest Traveler</div>
          </div>
        </button>
      </div>
    </header>
  );
};
