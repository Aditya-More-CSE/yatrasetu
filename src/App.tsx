import React from 'react';
import { TripProvider, useTrip } from './context/TripContext';
import { LandingPage } from './components/screens/LandingPage';
import { CreateTripView } from './components/screens/CreateTripView';
import { TripDashboardView } from './components/screens/TripDashboardView';
import { DisruptionSimView } from './components/screens/DisruptionSimView';
import { ImpactAnalysisView } from './components/screens/ImpactAnalysisView';
import { RecoveryOptionsView } from './components/screens/RecoveryOptionsView';
import { RecoveryPlanDetailsView } from './components/screens/RecoveryPlanDetailsView';
import { UpdatedItineraryView } from './components/screens/UpdatedItineraryView';
import { AppShell } from './components/layout/AppShell';
import { SignInModal } from './components/modals/SignInModal';
import { EditBookingModal } from './components/modals/EditBookingModal';

const AppContent: React.FC = () => {
  const { screen } = useTrip();

  // Landing page has its own minimal editorial layout without sidebar
  if (screen === 'landing') {
    return (
      <>
        <LandingPage />
        <SignInModal />
      </>
    );
  }

  // Inside the application: Wrapped in persistent AppShell (Sidebar + TopBar)
  return (
    <AppShell>
      {screen === 'create_trip' && <CreateTripView />}
      {screen === 'dashboard' && <TripDashboardView />}
      {screen === 'disruption_sim' && <DisruptionSimView />}
      {screen === 'impact_analysis' && <ImpactAnalysisView />}
      {screen === 'recovery_options' && <RecoveryOptionsView />}
      {screen === 'plan_details' && <RecoveryPlanDetailsView />}
      {screen === 'updated_itinerary' && <UpdatedItineraryView />}

      {/* Global Modals */}
      <SignInModal />
      <EditBookingModal />
    </AppShell>
  );
};

export default function App() {
  return (
    <TripProvider>
      <AppContent />
    </TripProvider>
  );
}
