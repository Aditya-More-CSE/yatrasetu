import React from 'react';
import {
  AlertTriangle,
  AlertCircle,
  Info,
  CheckCircle2,
  Clock,
  ArrowRight,
  ShieldCheck,
  RotateCcw,
} from 'lucide-react';
import { useTrip } from '../../context/TripContext';
import { RiskAlert } from '../../types/trip';

export const AlertsView: React.FC = () => {
  const { alerts, isRecovered, setActiveTab } = useTrip();

  const getAlertIcon = (level: RiskAlert['level']) => {
    switch (level) {
      case 'critical':
        return <AlertCircle className="w-4 h-4 text-red-600" />;
      case 'warning':
        return <AlertTriangle className="w-4 h-4 text-amber-600" />;
      case 'resolved':
        return <CheckCircle2 className="w-4 h-4 text-emerald-600" />;
      case 'info':
      default:
        return <Info className="w-4 h-4 text-blue-600" />;
    }
  };

  const getAlertBadge = (level: RiskAlert['level']) => {
    switch (level) {
      case 'critical':
        return 'bg-red-50 text-red-700 border-red-200';
      case 'warning':
        return 'bg-amber-50 text-amber-700 border-amber-200';
      case 'resolved':
        return 'bg-emerald-50 text-emerald-700 border-emerald-200';
      case 'info':
      default:
        return 'bg-blue-50 text-blue-700 border-blue-200';
    }
  };

  return (
    <div className="space-y-6 max-w-4xl mx-auto pb-12">
      {/* Header */}
      <div className="bg-white border border-slate-200 rounded-xl p-5 shadow-card">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <div>
            <div className="flex items-center gap-2">
              <span className="text-[10px] uppercase font-bold tracking-wider px-2 py-0.5 rounded bg-amber-50 text-amber-700 border border-amber-200">
                Proactive Monitoring
              </span>
              <span className="text-xs text-slate-400">•</span>
              <span className="text-xs font-medium text-slate-500">Continuous Buffer Sentinel</span>
            </div>
            <h1 className="text-xl font-bold text-slate-900 mt-1">Upcoming Risks & Alerts</h1>
            <p className="text-xs text-slate-500 mt-0.5">
              YatraSetu scans future connections, customs queues, transit delays, and activity start times to catch compression before it strands you.
            </p>
          </div>

          <div className="flex items-center gap-2 text-xs">
            <span className="px-2.5 py-1 rounded bg-slate-100 text-slate-700 font-medium">
              Total Alerts: {alerts.length}
            </span>
          </div>
        </div>
      </div>

      {/* Alerts Feed */}
      <div className="space-y-3">
        {alerts.map((alert) => (
          <div
            key={alert.id}
            className={`p-4 rounded-xl border transition-all bg-white shadow-card flex flex-col sm:flex-row sm:items-center justify-between gap-4 ${
              alert.level === 'critical'
                ? 'border-red-200 hover:border-red-300'
                : alert.level === 'warning'
                ? 'border-amber-200 hover:border-amber-300'
                : alert.level === 'resolved'
                ? 'border-emerald-200 bg-emerald-50/20'
                : 'border-slate-200 hover:border-slate-300'
            }`}
          >
            <div className="flex items-start gap-3">
              <div className="mt-0.5 shrink-0">{getAlertIcon(alert.level)}</div>
              <div>
                <div className="flex items-center gap-2 mb-1 flex-wrap">
                  <span
                    className={`text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded border ${getAlertBadge(
                      alert.level
                    )}`}
                  >
                    {alert.level}
                  </span>
                  <span className="text-xs text-slate-400 font-mono">{alert.timestamp}</span>
                </div>
                <h3 className="text-sm font-bold text-slate-900">{alert.title}</h3>
                <p className="text-xs text-slate-600 mt-0.5">{alert.description}</p>
                {alert.bufferInfo && (
                  <p className="text-xs font-mono font-medium text-slate-500 mt-1 flex items-center gap-1">
                    <Clock className="w-3 h-3 text-slate-400" />
                    {alert.bufferInfo}
                  </p>
                )}
              </div>
            </div>

            <div className="shrink-0 self-end sm:self-center">
              {alert.level !== 'resolved' ? (
                <button
                  onClick={() => setActiveTab('recovery')}
                  className="px-3 py-1.5 rounded-lg text-xs font-semibold bg-blue-700 hover:bg-blue-800 text-white shadow-xs transition-colors flex items-center gap-1.5"
                >
                  <span>{alert.actionLabel || 'Analyze & Recover'}</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              ) : (
                <span className="text-xs font-semibold text-emerald-700 flex items-center gap-1 bg-emerald-100/60 px-2.5 py-1 rounded-md">
                  <ShieldCheck className="w-3.5 h-3.5" /> Safeguarded
                </span>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
