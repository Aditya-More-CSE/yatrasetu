import React, { createContext, useContext, useState, useEffect, useMemo } from 'react';
import {
  Trip,
  Booking,
  ScreenType,
  DisruptionType,
  RecoveryPlanOption,
} from '../types/trip';
import { INITIAL_DEMO_TRIP } from '../data/mockData';
import { computeDynamicImpact, DynamicImpactResult } from '../utils/impactEngine';

interface TripContextType {
  screen: ScreenType;
  setScreen: (s: ScreenType) => void;
  trip: Trip;
  delayMinutes: number;
  setDelayMinutes: (m: number) => void;
  disruptionChoice: DisruptionType;
  setDisruptionChoice: (d: DisruptionType) => void;
  selectedFlightId: string;
  setSelectedFlightId: (id: string) => void;
  selectedPlanId: 'recommended' | 'lowest_cost' | 'fastest';
  setSelectedPlanId: (id: 'recommended' | 'lowest_cost' | 'fastest') => void;
  isRecovered: boolean;
  impactResult: DynamicImpactResult;
  selectedPlan: RecoveryPlanOption;
  isApplyingPlan: boolean;
  loadDemoTrip: () => void;
  resetDemo: () => void;
  updateTripMeta: (meta: { name: string; destination: string; startDate: string; endDate: string }) => void;
  addBooking: (b: Omit<Booking, 'id'>) => void;
  updateBooking: (id: string, updates: Partial<Booking>) => void;
  deleteBooking: (id: string) => void;
  runDisruptionSimulation: () => void;
  applyRecoveryPlan: (planId: 'recommended' | 'lowest_cost' | 'fastest') => void;
  editingBooking: Booking | null;
  setEditingBooking: (b: Booking | null) => void;
  isSignInModalOpen: boolean;
  setIsSignInModalOpen: (open: boolean) => void;
}

const TripContext = createContext<TripContextType | undefined>(undefined);

export const TripProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [screen, setScreen] = useState<ScreenType>('landing');
  const [trip, setTrip] = useState<Trip>(INITIAL_DEMO_TRIP);
  const [delayMinutes, setDelayMinutes] = useState<number>(180); // Default 3 hours (180 mins)
  const [disruptionChoice, setDisruptionChoice] = useState<DisruptionType>('flight_delayed');
  const [selectedFlightId, setSelectedFlightId] = useState<string>('b-flight');
  const [selectedPlanId, setSelectedPlanId] = useState<'recommended' | 'lowest_cost' | 'fastest'>('recommended');
  const [isRecovered, setIsRecovered] = useState<boolean>(false);
  const [editingBooking, setEditingBooking] = useState<Booking | null>(null);
  const [isSignInModalOpen, setIsSignInModalOpen] = useState<boolean>(false);
  const [isApplyingPlan, setIsApplyingPlan] = useState<boolean>(false);

  // Persistence to local storage for page reload resilience
  useEffect(() => {
    try {
      const savedTrip = localStorage.getItem('yatrasetu_trip');
      const savedRecovered = localStorage.getItem('yatrasetu_recovered');
      const savedDelay = localStorage.getItem('yatrasetu_delay');
      if (savedTrip) {
        setTrip(JSON.parse(savedTrip));
      }
      if (savedRecovered) {
        setIsRecovered(savedRecovered === 'true');
      }
      if (savedDelay) {
        setDelayMinutes(Number(savedDelay));
      }
    } catch {
      // ignore
    }
  }, []);

  const persistTrip = (newTrip: Trip, recoveredState?: boolean, delayMins?: number) => {
    setTrip(newTrip);
    try {
      localStorage.setItem('yatrasetu_trip', JSON.stringify(newTrip));
      if (recoveredState !== undefined) {
        setIsRecovered(recoveredState);
        localStorage.setItem('yatrasetu_recovered', String(recoveredState));
      }
      if (delayMins !== undefined) {
        localStorage.setItem('yatrasetu_delay', String(delayMins));
      }
    } catch {
      // ignore
    }
  };

  // Dynamically calculated downstream impact based on user's selected delay
  const impactResult = useMemo(() => {
    return computeDynamicImpact(trip.bookings, delayMinutes);
  }, [trip.bookings, delayMinutes]);

  const selectedPlan = useMemo(() => {
    return impactResult.recoveryOptions.find((p) => p.id === selectedPlanId) || impactResult.recoveryOptions[0];
  }, [impactResult.recoveryOptions, selectedPlanId]);

  const loadDemoTrip = () => {
    persistTrip(INITIAL_DEMO_TRIP, false, 180);
    setDelayMinutes(180);
    setDisruptionChoice('flight_delayed');
    setSelectedPlanId('recommended');
    setScreen('dashboard');
  };

  const resetDemo = () => {
    persistTrip(INITIAL_DEMO_TRIP, false, 180);
    setDelayMinutes(180);
    setSelectedPlanId('recommended');
    setScreen('dashboard');
  };

  const updateTripMeta = (meta: { name: string; destination: string; startDate: string; endDate: string }) => {
    const updated: Trip = {
      ...trip,
      ...meta,
    };
    persistTrip(updated);
  };

  const addBooking = (b: Omit<Booking, 'id'>) => {
    const newBooking: Booking = {
      ...b,
      id: `b-${Date.now()}`,
    };
    const updated: Trip = {
      ...trip,
      bookings: [...trip.bookings, newBooking],
    };
    persistTrip(updated);
  };

  const updateBooking = (id: string, updates: Partial<Booking>) => {
    const updated: Trip = {
      ...trip,
      bookings: trip.bookings.map((b) => (b.id === id ? { ...b, ...updates } : b)),
    };
    persistTrip(updated);
  };

  const deleteBooking = (id: string) => {
    const updated: Trip = {
      ...trip,
      bookings: trip.bookings.filter((b) => b.id !== id),
    };
    persistTrip(updated);
  };

  const runDisruptionSimulation = () => {
    const updated: Trip = {
      ...trip,
      status: 'Disrupted',
      bookings: trip.bookings.map((b) => {
        if (b.type === 'flight') {
          return {
            ...b,
            status: 'delayed' as const,
            statusLabel: `Delayed (${impactResult.flight.delayFormatted})`,
            changeNote: `New arrival expected at ${impactResult.flight.newArrival}`,
          };
        }
        if (b.type === 'transfer') {
          const transferImpact = impactResult.impactChain.find((i) => i.type === 'transfer');
          if (transferImpact) {
            return {
              ...b,
              status: transferImpact.impactLevel === 'affected' ? ('likely_missed' as const) : ('at_risk' as const),
              statusLabel: transferImpact.statusLabel,
            };
          }
        }
        if (b.type === 'hotel') {
          const hotelImpact = impactResult.impactChain.find((i) => i.type === 'hotel');
          if (hotelImpact) {
            return {
              ...b,
              status: 'checkin_delayed' as const,
              statusLabel: hotelImpact.statusLabel,
            };
          }
        }
        if (b.type === 'activity') {
          const tourImpact = impactResult.impactChain.find((i) => i.type === 'activity');
          if (tourImpact) {
            return {
              ...b,
              status: 'at_risk' as const,
              statusLabel: tourImpact.statusLabel,
            };
          }
        }
        return b;
      }),
    };
    persistTrip(updated, false, delayMinutes);
    setScreen('impact_analysis');
  };

  const applyRecoveryPlan = (planId: 'recommended' | 'lowest_cost' | 'fastest') => {
    setSelectedPlanId(planId);
    setIsApplyingPlan(true);

    setTimeout(() => {
      let updatedBookings = [...trip.bookings];
      const plan = impactResult.recoveryOptions.find((p) => p.id === planId) || impactResult.recoveryOptions[0];

      if (planId === 'recommended') {
        const transferChange = plan.changes.find((c) => c.type === 'transfer');
        const tourChange = plan.changes.find((c) => c.type === 'activity');

        updatedBookings = updatedBookings.map((b) => {
          if (b.type === 'flight') {
            return {
              ...b,
              status: 'confirmed' as const,
              statusLabel: `Confirmed (${impactResult.flight.newArrival} Arr)`,
              time: `10:40 AM (Dep) / ${impactResult.flight.newArrival} (Arr)`,
              isUpdated: false,
              changeNote: `Delayed by ${impactResult.flight.delayFormatted} • Accommodated in recovery plan`,
            };
          }
          if (b.type === 'transfer') {
            // Extract the new time from change text e.g. "7:30 PM → 8:45 PM"
            const match = transferChange?.changeText.match(/→\s*([0-9:APM\s]+)/i);
            const newTime = match ? match[1].split('(')[0].trim() : '11:00 PM';
            return {
              ...b,
              time: newTime,
              status: 'updated' as const,
              statusLabel: 'Updated',
              isUpdated: true,
              changeNote: `Chauffeur re-dispatched to ${newTime} based on flight touchdown`,
            };
          }
          if (b.type === 'hotel') {
            return {
              ...b,
              status: 'updated' as const,
              statusLabel: 'Updated',
              isUpdated: true,
              changeNote: 'Late arrival check-in confirmed by Hotel Lumière concierge',
            };
          }
          if (b.type === 'activity') {
            if (tourChange?.isUpdated) {
              return {
                ...b,
                date: '20 SEP',
                time: '6:30 AM',
                status: 'updated' as const,
                statusLabel: 'Updated',
                isUpdated: true,
                changeNote: 'Moved from 19 Sep to 20 Sep (Morning slot)',
              };
            }
            return {
              ...b,
              status: 'confirmed' as const,
              statusLabel: 'Confirmed',
              isUpdated: false,
            };
          }
          if (b.type === 'train') {
            return {
              ...b,
              status: 'confirmed' as const,
              statusLabel: 'Confirmed',
              isUpdated: false,
            };
          }
          return b;
        });
      } else if (planId === 'lowest_cost') {
        const transferChange = plan.changes.find((c) => c.type === 'transfer');
        const match = transferChange?.changeText.match(/→\s*([0-9:APM\s]+)/i);
        const newTime = match ? match[1].split('(')[0].trim() : '11:00 PM';

        updatedBookings = updatedBookings.map((b) => {
          if (b.type === 'flight') {
            return {
              ...b,
              status: 'confirmed' as const,
              statusLabel: `Confirmed (${impactResult.flight.newArrival} Arr)`,
              time: `10:40 AM (Dep) / ${impactResult.flight.newArrival} (Arr)`,
              isUpdated: false,
            };
          }
          if (b.type === 'transfer') {
            return {
              ...b,
              time: newTime,
              status: 'updated' as const,
              statusLabel: 'Updated',
              isUpdated: true,
              changeNote: `Chauffeur rescheduled to ${newTime}`,
            };
          }
          if (b.type === 'hotel') {
            return {
              ...b,
              status: 'updated' as const,
              statusLabel: 'Updated',
              isUpdated: true,
              changeNote: 'Late check-in confirmed',
            };
          }
          if (b.type === 'activity') {
            return {
              ...b,
              status: 'delayed' as const,
              statusLabel: 'Cancelled',
              isUpdated: true,
              changeNote: 'Cancelled • ₹3,500 full refund credited',
            };
          }
          return b;
        });
      } else if (planId === 'fastest') {
        updatedBookings = updatedBookings.map((b) => {
          if (b.type === 'flight') {
            return {
              ...b,
              title: 'Flight (Air France AF-218)',
              time: '11:15 AM (Dep) / 4:35 PM (Arr)',
              status: 'updated' as const,
              statusLabel: 'Updated',
              isUpdated: true,
              changeNote: 'Rebooked onto direct Air France AF-218 (+₹6,800)',
            };
          }
          if (b.type === 'transfer') {
            return {
              ...b,
              time: '7:30 PM',
              status: 'confirmed' as const,
              statusLabel: 'Confirmed',
              isUpdated: false,
              changeNote: 'Original pickup retained',
            };
          }
          if (b.type === 'hotel') {
            return {
              ...b,
              time: '9:00 PM',
              status: 'confirmed' as const,
              statusLabel: 'Check-in',
              isUpdated: false,
            };
          }
          if (b.type === 'activity') {
            return {
              ...b,
              date: '19 SEP',
              time: '10:00 AM',
              status: 'confirmed' as const,
              statusLabel: 'Confirmed',
              isUpdated: false,
            };
          }
          return b;
        });
      }

      const updatedTrip: Trip = {
        ...trip,
        status: 'Stable',
        bookings: updatedBookings,
      };
      persistTrip(updatedTrip, true);
      setIsApplyingPlan(false);
      setScreen('updated_itinerary');
    }, 250); // fast, responsive micro-transition
  };

  return (
    <TripContext.Provider
      value={{
        screen,
        setScreen,
        trip,
        delayMinutes,
        setDelayMinutes,
        disruptionChoice,
        setDisruptionChoice,
        selectedFlightId,
        setSelectedFlightId,
        selectedPlanId,
        setSelectedPlanId,
        isRecovered,
        impactResult,
        selectedPlan,
        isApplyingPlan,
        loadDemoTrip,
        resetDemo,
        updateTripMeta,
        addBooking,
        updateBooking,
        deleteBooking,
        runDisruptionSimulation,
        applyRecoveryPlan,
        editingBooking,
        setEditingBooking,
        isSignInModalOpen,
        setIsSignInModalOpen,
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
