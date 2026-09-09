import React from 'react';
import { useTrip } from '../../context/TripContext';
import { ShieldCheck, X, Sparkles, ArrowRight } from 'lucide-react';

export const SignInModal: React.FC = () => {
  const { isSignInModalOpen, setIsSignInModalOpen, loadDemoTrip, setScreen } = useTrip();

  if (!isSignInModalOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm animate-fade-in">
      <div className="bg-white rounded-2xl max-w-md w-full shadow-2xl border border-slate-200 overflow-hidden p-6 sm:p-8">
        <div className="flex items-center justify-between pb-4 border-b border-slate-100">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-full bg-emerald-50 text-emerald-600 flex items-center justify-center">
              <ShieldCheck className="w-5 h-5" />
            </div>
            <h3 className="text-lg font-semibold text-slate-900">Prototype Guest Access</h3>
          </div>
          <button
            onClick={() => setIsSignInModalOpen(false)}
            className="text-slate-400 hover:text-slate-600 p-1 rounded-lg transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="py-5 space-y-3">
          <p className="text-sm text-slate-600 leading-relaxed">
            Welcome to the <strong>YatraSetu Disruption Recovery Platform</strong> prototype.
          </p>
          <div className="p-3.5 bg-slate-50 rounded-xl border border-slate-200 text-xs text-slate-600 space-y-1.5">
            <div className="flex items-center gap-1.5 text-slate-900 font-medium">
              <span className="w-2 h-2 rounded-full bg-emerald-500"></span>
              Full Prototype Access Granted
            </div>
            <p>
              No login credentials or external travel APIs are required. All features, disruption simulations, downstream dependency cascades, and recovery plans are fully operational in this session.
            </p>
          </div>
        </div>

        <div className="flex flex-col gap-2.5 pt-2">
          <button
            onClick={() => {
              setIsSignInModalOpen(false);
              loadDemoTrip();
            }}
            className="w-full inline-flex items-center justify-center gap-2 bg-slate-900 hover:bg-slate-800 text-white font-medium py-2.5 px-4 rounded-xl transition-all shadow-sm text-sm"
          >
            <Sparkles className="w-4 h-4 text-blue-400" />
            <span>Load Demo Trip (Mumbai → Paris)</span>
            <ArrowRight className="w-4 h-4 ml-auto" />
          </button>
          <button
            onClick={() => {
              setIsSignInModalOpen(false);
              setScreen('create_trip');
            }}
            className="w-full inline-flex items-center justify-center gap-2 bg-white hover:bg-slate-50 text-slate-700 font-medium py-2 px-4 rounded-xl border border-slate-200 transition-colors text-sm"
          >
            Create Custom Trip
          </button>
        </div>
      </div>
    </div>
  );
};
