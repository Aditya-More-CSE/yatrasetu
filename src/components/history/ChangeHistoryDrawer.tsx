import React from 'react';
import { X, History, ArrowRight, CheckCircle2, AlertTriangle, RefreshCw } from 'lucide-react';
import { useTrip } from '../../context/TripContext';

export const ChangeHistoryDrawer: React.FC = () => {
  const { isChangeHistoryOpen, setIsChangeHistoryOpen, changeHistory } = useTrip();

  if (!isChangeHistoryOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex justify-end bg-slate-900/30 backdrop-blur-xs transition-opacity animate-in fade-in duration-200">
      <div className="w-full max-w-md bg-white h-full shadow-2xl flex flex-col border-l border-slate-200">
        {/* Drawer Header */}
        <div className="p-4 border-b border-slate-200 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <History className="w-4 h-4 text-blue-700" />
            <h2 className="text-sm font-bold text-slate-900">Trip Change History</h2>
            <span className="text-xs font-mono px-1.5 py-0.5 rounded bg-slate-100 text-slate-600">
              {changeHistory.length}
            </span>
          </div>
          <button
            onClick={() => setIsChangeHistoryOpen(false)}
            className="p-1 rounded-md text-slate-400 hover:text-slate-700 hover:bg-slate-100 transition-colors"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Audit Log Entries */}
        <div className="p-4 flex-1 overflow-y-auto space-y-4">
          <p className="text-xs text-slate-500">
            Immutable audit trail of all automated AI schedule adjustments, driver redispatches, and hotel notifications.
          </p>

          <div className="relative pl-6 space-y-5 before:absolute before:top-2 before:bottom-2 before:left-2.5 before:w-0.5 before:bg-slate-200">
            {changeHistory.map((item) => (
              <div key={item.id} className="relative group">
                {/* Node dot */}
                <div className="absolute -left-[23px] top-1.5 w-3 h-3 rounded-full bg-blue-600 border-2 border-white shadow-xs"></div>

                <div className="bg-slate-50 border border-slate-200/80 rounded-lg p-3 text-xs space-y-1">
                  <div className="flex items-center justify-between">
                    <span className="font-mono text-[11px] font-bold text-slate-500">
                      {item.time}
                    </span>
                    <span className="text-[10px] uppercase font-bold px-1.5 py-0.2 rounded bg-blue-50 text-blue-700 border border-blue-200">
                      {item.action}
                    </span>
                  </div>
                  <h4 className="font-bold text-slate-900">{item.bookingTitle}</h4>
                  <p className="text-slate-600 leading-relaxed text-[11px]">{item.detail}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Footer */}
        <div className="p-4 border-t border-slate-200 bg-slate-50 flex items-center justify-between text-xs text-slate-500">
          <span>YatraSetu Audit Sentinel</span>
          <span className="font-mono text-[11px]">Synced with Carrier APIs</span>
        </div>
      </div>
    </div>
  );
};
