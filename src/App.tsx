import React from 'react';
import { TripProvider, useTrip } from './context/TripContext';
import { LandingPage } from './components/landing/LandingPage';
import { AuthModal } from './components/auth/AuthModal';
import { Sidebar } from './components/layout/Sidebar';
import { Topbar } from './components/layout/Topbar';
import { BottomNav } from './components/layout/BottomNav';
import { MyTripsHub } from './components/trips/MyTripsHub';
import { CreateTripModal } from './components/trips/CreateTripModal';
import { TimelineView } from './components/itinerary/TimelineView';
import { DependencyGraph } from './components/itinerary/DependencyGraph';
import { ImpactAnalysis } from './components/impact/ImpactAnalysis';
import { RecoveryOptions } from './components/recovery/RecoveryOptions';
import { WhatIfSimulator } from './components/demo/WhatIfSimulator';
import { AlertsView } from './components/alerts/AlertsView';
import { SettingsView } from './components/settings/SettingsView';
import { ReportDisruptionModal } from './components/disruption/ReportDisruptionModal';
import { ChangeHistoryDrawer } from './components/history/ChangeHistoryDrawer';
import { TripAssistant } from './components/assistant/TripAssistant';
import { BookingDetailModal } from './components/itinerary/BookingDetailModal';

const ProductApp: React.FC = () => {
  const { activeTab } = useTrip();

  return (
    <div className="flex h-screen w-screen overflow-hidden bg-slate-100 font-sans text-slate-900">
      {/* Persistent Desktop Sidebar */}
      <div className="hidden md:flex shrink-0">
        <Sidebar />
      </div>

      {/* Dynamic Main View Area */}
      <div className="flex-1 flex flex-col min-w-0 bg-[#f8fafc] overflow-y-auto">
        <Topbar />
        <main className="flex-1 p-4 md:p-6 lg:p-8 max-w-5xl w-full mx-auto pb-24 md:pb-12">
          {activeTab === 'trips_list' && <MyTripsHub />}
          {activeTab === 'mytrip' && <TimelineView />}
          {activeTab === 'graph' && <DependencyGraph />}
          {activeTab === 'impact' && <ImpactAnalysis />}
          {activeTab === 'recovery' && <RecoveryOptions />}
          {activeTab === 'whatif' && <WhatIfSimulator />}
          {activeTab === 'alerts' && <AlertsView />}
          {activeTab === 'settings' && <SettingsView />}
        </main>

        {/* Global Drawers & Modals */}
        <CreateTripModal />
        <ReportDisruptionModal />
        <ChangeHistoryDrawer />
        <TripAssistant />
        <BookingDetailModal />
        <BottomNav />
      </div>
    </div>
  );
};

const RootRouter: React.FC = () => {
  const { currentPage } = useTrip();

  if (currentPage === 'landing' || currentPage === 'auth') {
    return (
      <>
        <LandingPage />
        <AuthModal />
      </>
    );
  }

  return <ProductApp />;
};

export default function App() {
  return (
    <TripProvider>
      <RootRouter />
    </TripProvider>
  );
}
