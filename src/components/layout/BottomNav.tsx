import React from 'react';
import { Compass, AlertTriangle, RotateCcw, GitBranch, Settings } from 'lucide-react';
import { useTrip } from '../../context/TripContext';

export const BottomNav: React.FC = () => {
  const { activeTab, setActiveTab, alerts, isRecovered } = useTrip();
  const alertCount = alerts.filter((a) => a.level === 'critical' || a.level === 'warning').length;

  const items = [
    { id: 'mytrip' as const, label: 'Trip', icon: Compass },
    { id: 'alerts' as const, label: 'Alerts', icon: AlertTriangle, badge: alertCount || null },
    { id: 'recovery' as const, label: 'Recovery', icon: RotateCcw, badge: isRecovered ? '✓' : null },
    { id: 'graph' as const, label: 'Graph', icon: GitBranch },
    { id: 'settings' as const, label: 'Settings', icon: Settings },
  ];

  return (
    <nav className="md:hidden fixed bottom-0 left-0 right-0 h-14 bg-white border-t border-slate-200 flex items-center justify-around z-30 px-2 shadow-lg">
      {items.map((item) => {
        const Icon = item.icon;
        const isActive = activeTab === item.id;
        return (
          <button
            key={item.id}
            onClick={() => setActiveTab(item.id)}
            className={`flex flex-col items-center justify-center py-1 px-3 relative ${
              isActive ? 'text-blue-700 font-semibold' : 'text-slate-500'
            }`}
          >
            <Icon className="w-4 h-4 mb-0.5" />
            <span className="text-[10px]">{item.label}</span>
            {item.badge && (
              <span className="absolute top-0.5 right-2 w-4 h-4 bg-amber-500 text-white rounded-full text-[9px] flex items-center justify-center font-bold">
                {item.badge}
              </span>
            )}
          </button>
        );
      })}
    </nav>
  );
};
