import React from 'react';
import { TripProvider, useTrip } from './context/TripContext';
import { Navbar } from './components/navigation/Navbar';
import { LandingPage } from './components/screens/LandingPage';
import { CreateTripView } from './components/screens/CreateTripView';
import { TripDashboardView } from './components/screens/TripDashboardView';
import { DisruptionSimView } from './components/screens/DisruptionSimView';
import { ImpactAnalysisView } from './components/screens/ImpactAnalysisView';
import { RecoveryOptionsView } from './components/screens/RecoveryOptionsView';
import { RecoveryPlanDetailsView } from './components/screens/RecoveryPlanDetailsView';
import { UpdatedItineraryView } from './components/screens/UpdatedItineraryView';
import { SignInModal } from './components/modals/SignInModal';
import { EditBookingModal } from './components/modals/EditBookingModal';

const AppContent: React.FC = () => {
  const { screen } = useTrip();

  return (
    <div className="min-h-screen bg-slate-50 font-sans text-slate-900 flex flex-col selection:bg-blue-100 selection:text-blue-900">
      {/* Universal Topbar with Official Brand Logo & Global Actions */}
      <Navbar />

      {/* Main Dynamic View Area */}
      <main className="flex-1">
        {screen === 'landing' && <LandingPage />}
        {screen === 'create_trip' && <CreateTripView />}
        {screen === 'dashboard' && <TripDashboardView />}
        {screen === 'disruption_sim' && <DisruptionSimView />}
        {screen === 'impact_analysis' && <ImpactAnalysisView />}
        {screen === 'recovery_options' && <RecoveryOptionsView />}
        {screen === 'plan_details' && <RecoveryPlanDetailsView />}
        {screen === 'updated_itinerary' && <UpdatedItineraryView />}
      </main>

      {/* Global Action Modals */}
      <SignInModal />
      <EditBookingModal />
    </div>
  );
};

export default function App() {
  return (
    <TripProvider>
      <AppContent />
    </TripProvider>
  );
}
