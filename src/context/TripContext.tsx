import React, { createContext, useContext, useState, useMemo } from 'react';
import {
  Booking,
  DisruptionScenario,
  RecoveryPlan,
  PreferenceWeights,
  ImpactBreakdown,
  ChangeLogEntry,
  RiskAlert,
  TripSummary,
} from '../types/trip';
import { INITIAL_BOOKINGS, DISRUPTION_SCENARIOS, INITIAL_ALERTS } from '../data/seedData';
import { calculateRippleEffects } from '../engine/dependencyGraph';
import { BASE_RECOVERY_PLANS, rankRecoveryPlans } from '../engine/recoveryRanking';

interface TripContextType {
  currentPage: 'landing' | 'auth' | 'app';
  setCurrentPage: (page: 'landing' | 'auth' | 'app') => void;
  trips: TripSummary[];
  currentTripId: string;
  setCurrentTripId: (id: string) => void;
  isCreateTripOpen: boolean;
  setIsCreateTripOpen: (open: boolean) => void;
  createTrip: (trip: Omit<TripSummary, 'id' | 'hasDisruption' | 'statusText'>) => void;
  bookings: Booking[];
  disruptions: DisruptionScenario[];
  activeDisruption: DisruptionScenario | null;
  impact: ImpactBreakdown;
  recoveryPlans: RecoveryPlan[];
  selectedPlan: RecoveryPlan | null;
  isRecovered: boolean;
  weights: PreferenceWeights;
  changeHistory: ChangeLogEntry[];
  alerts: RiskAlert[];
  activeTab: 'mytrip' | 'impact' | 'recovery' | 'graph' | 'alerts' | 'settings' | 'whatif' | 'trips_list';
  selectedBooking: Booking | null;
  isAssistantOpen: boolean;
  isChangeHistoryOpen: boolean;
  isDisruptionModalOpen: boolean;
  disruptionStep: 'what_happened' | 'delay_amount' | 'analyzing' | 'impact_result';
  selectedDisruptionReason: string;
  delayHours: number;
  setActiveTab: (tab: 'mytrip' | 'impact' | 'recovery' | 'graph' | 'alerts' | 'settings' | 'whatif' | 'trips_list') => void;
  setSelectedBooking: (b: Booking | null) => void;
  setIsAssistantOpen: (open: boolean) => void;
  setIsChangeHistoryOpen: (open: boolean) => void;
  setIsDisruptionModalOpen: (open: boolean) => void;
  setDisruptionStep: (step: 'what_happened' | 'delay_amount' | 'analyzing' | 'impact_result') => void;
  setSelectedDisruptionReason: (reason: string) => void;
  setDelayHours: (hours: number) => void;
  applyReportedDisruption: (hours: number) => void;
  applyDisruption: (scenarioId: string) => void;
  resetTrip: () => void;
  updateWeights: (weights: Partial<PreferenceWeights>) => void;
  applyRecoveryPlan: (planId: string) => void;
}

const TripContext = createContext<TripContextType | undefined>(undefined);

export const TripProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [currentPage, setCurrentPage] = useState<'landing' | 'auth' | 'app'>('landing');
  const [currentTripId, setCurrentTripId] = useState<string>('trip-paris');
  const [isCreateTripOpen, setIsCreateTripOpen] = useState<boolean>(false);

  const [trips, setTrips] = useState<TripSummary[]>([
    {
      id: 'trip-paris',
      title: 'Paris & Amsterdam',
      route: 'Mumbai → Paris → Amsterdam',
      origin: 'Mumbai (BOM)',
      destination: 'Paris (CDG)',
      startDate: '12 Apr 2025',
      endDate: '20 Apr 2025',
      bookingCount: 5,
      hasDisruption: true,
      bookingsAffected: 3,
      statusText: '⚠ 1 disruption • 3 bookings affected',
    },
  ]);

  const [activeDisruption, setActiveDisruption] = useState<DisruptionScenario | null>(
    DISRUPTION_SCENARIOS[0] // Pre-seeded 2h delay for realistic demo
  );
  const [isRecovered, setIsRecovered] = useState<boolean>(false);
  const [selectedPlan, setSelectedPlan] = useState<RecoveryPlan | null>(null);
  const [activeTab, setActiveTab] = useState<'mytrip' | 'impact' | 'recovery' | 'graph' | 'alerts' | 'settings' | 'whatif' | 'trips_list'>('mytrip');
  const [selectedBooking, setSelectedBooking] = useState<Booking | null>(null);
  const [isAssistantOpen, setIsAssistantOpen] = useState<boolean>(false);
  const [isChangeHistoryOpen, setIsChangeHistoryOpen] = useState<boolean>(false);

  // Disruption report wizard state
  const [isDisruptionModalOpen, setIsDisruptionModalOpen] = useState<boolean>(false);
  const [disruptionStep, setDisruptionStep] = useState<'what_happened' | 'delay_amount' | 'analyzing' | 'impact_result'>('what_happened');
  const [selectedDisruptionReason, setSelectedDisruptionReason] = useState<string>('Flight delayed');
  const [delayHours, setDelayHours] = useState<number>(2);

  const [weights, setWeights] = useState<PreferenceWeights>({
    budget: 5,
    time: 7,
    experience: 9,
    preserveActivities: true,
    avoidChangingHotels: true,
  });

  const [changeHistory, setChangeHistory] = useState<ChangeLogEntry[]>([
    {
      id: 'ch-1',
      time: '09:30 AM',
      bookingTitle: 'Itinerary Initialized',
      bookingType: 'flight',
      action: 'Synced',
      detail: 'Mumbai → Paris travel graph generated with 5 connected bookings.',
    },
    {
      id: 'ch-2',
      time: '12:00 PM',
      bookingTitle: 'Flight AI-142',
      bookingType: 'flight',
      action: 'Disruption Detected',
      detail: 'Inbound delay +2h announced. Automated dependency ripple analysis initiated.',
    },
  ]);

  const [alerts, setAlerts] = useState<RiskAlert[]>(INITIAL_ALERTS);

  // Calculate live bookings & impact
  const { bookings, impact } = useMemo(() => {
    if (isRecovered && selectedPlan) {
      const mutatedBookings = INITIAL_BOOKINGS.map((b) => {
        if (b.id === 'b-flight') {
          return {
            ...b,
            startTime: '12:00',
            endTime: '16:40',
            status: 'normal' as const,
            statusLabel: 'DELAYED (+2h)',
            notes: 'Accommodated in recovery plan.',
          };
        }
        if (b.id === 'b-transfer') {
          return {
            ...b,
            startTime: '16:55',
            endTime: '17:40',
            status: 'recovered' as const,
            statusLabel: 'RE-DISPATCHED (16:55)',
            bufferMinutes: 25,
            bufferStatus: 'safe' as const,
            notes: 'Chauffeur updated to flight touchdown at 16:40 + 15m customs buffer.',
          };
        }
        if (b.id === 'b-hotel') {
          return {
            ...b,
            startTime: '17:45',
            status: 'recovered' as const,
            statusLabel: 'CHECK-IN CONFIRMED',
            bufferMinutes: 90,
            bufferStatus: 'safe' as const,
            notes: 'Late check-in confirmed by Hotel Le Grand concierge.',
          };
        }
        if (b.id === 'b-activity') {
          return {
            ...b,
            startTime: selectedPlan.id === 'plan-cheapest' ? 'Tomorrow 10:00' : '19:15',
            endTime: selectedPlan.id === 'plan-cheapest' ? 'Tomorrow 12:00' : '20:45',
            status: 'recovered' as const,
            statusLabel: selectedPlan.id === 'plan-cheapest' ? 'RESCHEDULED (TOMORROW)' : 'SLOT SHIFTED (19:15)',
            bufferMinutes: 45,
            bufferStatus: 'safe' as const,
            notes: 'Seine cruise boarding confirmed. Priority pier pass preserved.',
          };
        }
        if (b.id === 'b-dinner') {
          return {
            ...b,
            startTime: '21:00',
            status: 'normal' as const,
            statusLabel: 'ON SCHEDULE',
            bufferMinutes: 75,
            bufferStatus: 'safe' as const,
          };
        }
        return b;
      });

      return {
        bookings: mutatedBookings,
        impact: {
          totalScore: 12,
          severity: 'LOW' as const,
          timeImpact: selectedPlan.timeImpactMinutes,
          costImpact: Math.round(selectedPlan.additionalCost / 200),
          bookingsAffected: 0,
          activityRisk: 0,
          affectedCount: 0,
          totalBookings: mutatedBookings.length,
          propagationPath: [],
        },
      };
    }

    return calculateRippleEffects(INITIAL_BOOKINGS, activeDisruption);
  }, [activeDisruption, isRecovered, selectedPlan]);

  const recoveryPlans = useMemo(() => {
    return rankRecoveryPlans(BASE_RECOVERY_PLANS, weights);
  }, [weights]);

  const createTrip = (tripData: Omit<TripSummary, 'id' | 'hasDisruption' | 'statusText'>) => {
    const newTrip: TripSummary = {
      ...tripData,
      id: `trip-${Date.now()}`,
      hasDisruption: false,
      statusText: '✓ Trip ready • All plans on schedule',
    };
    setTrips((prev) => [newTrip, ...prev]);
    setCurrentTripId(newTrip.id);
    setIsCreateTripOpen(false);
    setActiveTab('mytrip');
  };

  const applyReportedDisruption = (hours: number) => {
    let scenario = DISRUPTION_SCENARIOS[0]; // 2h default
    if (hours === 1) scenario = DISRUPTION_SCENARIOS[1];
    if (hours >= 4) scenario = DISRUPTION_SCENARIOS[2];

    setActiveDisruption(scenario);
    setIsRecovered(false);
    setSelectedPlan(null);

    setTrips((prev) =>
      prev.map((t) =>
        t.id === 'trip-paris'
          ? { ...t, hasDisruption: true, statusText: `⚠ 1 disruption • 3 bookings affected` }
          : t
      )
    );
  };

  const applyDisruption = (scenarioId: string) => {
    const scenario = DISRUPTION_SCENARIOS.find((s) => s.id === scenarioId) || null;
    setActiveDisruption(scenario);
    setIsRecovered(false);
    setSelectedPlan(null);
  };

  const resetTrip = () => {
    setActiveDisruption(null);
    setIsRecovered(false);
    setSelectedPlan(null);
    setAlerts(INITIAL_ALERTS.filter((a) => a.level === 'info'));
    setTrips((prev) =>
      prev.map((t) =>
        t.id === 'trip-paris'
          ? { ...t, hasDisruption: false, statusText: '✓ Trip ready • All plans on schedule' }
          : t
      )
    );
  };

  const updateWeights = (newWeights: Partial<PreferenceWeights>) => {
    setWeights((prev) => ({ ...prev, ...newWeights }));
  };

  const applyRecoveryPlan = (planId: string) => {
    const plan = recoveryPlans.find((p) => p.id === planId) || recoveryPlans[0];
    setSelectedPlan(plan);
    setIsRecovered(true);

    const now = new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
    const auditEntries: ChangeLogEntry[] = [
      {
        id: `ch-${Date.now()}-1`,
        time: now,
        bookingTitle: 'Airport Transfer',
        bookingType: 'transfer',
        action: 'Booking Replaced',
        detail: `Transferred to 16:55 pickup at Terminal 2E (+₹${plan.additionalCost}).`,
      },
      {
        id: `ch-${Date.now()}-2`,
        time: now,
        bookingTitle: 'Hotel Le Grand',
        bookingType: 'hotel',
        action: 'Check-in Recalculated',
        detail: 'Estimated arrival 17:45 logged. Concierge holds room safely.',
      },
      {
        id: `ch-${Date.now()}-3`,
        time: now,
        bookingTitle: 'Paris City Tour',
        bookingType: 'activity',
        action: plan.activitiesPreserved ? 'Slot Preserved' : 'Rescheduled',
        detail: plan.activitiesPreserved
          ? 'Twilight slot (19:15) assigned. Priority boarding active.'
          : 'Rescheduled to tomorrow 10:00 AM.',
      },
    ];

    setChangeHistory((prev) => [...auditEntries, ...prev]);

    setAlerts((prev) =>
      prev.map((alert) =>
        alert.relatedBookingId === 'b-transfer' || alert.relatedBookingId === 'b-activity'
          ? {
              ...alert,
              level: 'resolved' as const,
              title: `✓ Resolved: ${alert.title.replace('At Risk:', '').replace('Risk:', '')}`,
              description: `Accommodated by recovery plan: ${plan.name} (${plan.tagline}).`,
              bufferInfo: 'Buffer: Restored to safe margin',
            }
          : alert
      )
    );

    setTrips((prev) =>
      prev.map((t) =>
        t.id === 'trip-paris'
          ? { ...t, hasDisruption: false, statusText: '✓ Trip recovered • Back on track' }
          : t
      )
    );
  };

  return (
    <TripContext.Provider
      value={{
        currentPage,
        setCurrentPage,
        trips,
        currentTripId,
        setCurrentTripId,
        isCreateTripOpen,
        setIsCreateTripOpen,
        createTrip,
        bookings,
        disruptions: DISRUPTION_SCENARIOS,
        activeDisruption,
        impact,
        recoveryPlans,
        selectedPlan,
        isRecovered,
        weights,
        changeHistory,
        alerts,
        activeTab,
        selectedBooking,
        isAssistantOpen,
        isChangeHistoryOpen,
        isDisruptionModalOpen,
        disruptionStep,
        selectedDisruptionReason,
        delayHours,
        setActiveTab,
        setSelectedBooking,
        setIsAssistantOpen,
        setIsChangeHistoryOpen,
        setIsDisruptionModalOpen,
        setDisruptionStep,
        setSelectedDisruptionReason,
        setDelayHours,
        applyReportedDisruption,
        applyDisruption,
        resetTrip,
        updateWeights,
        applyRecoveryPlan,
      }}
    >
      {children}
    </TripContext.Provider>
  );
};

export const useTrip = () => {
  const context = useContext(TripContext);
  if (!context) {
    throw new Error('useTrip must be used within a TripProvider');
  }
  return context;
};
