export type ScreenType = 
  | 'landing' 
  | 'create_trip' 
  | 'dashboard' 
  | 'disruption_sim' 
  | 'impact_analysis' 
  | 'recovery_options' 
  | 'plan_details' 
  | 'updated_itinerary';

export type BookingType = 'flight' | 'transfer' | 'hotel' | 'activity' | 'train';

export type BookingStatus = 
  | 'confirmed' 
  | 'delayed' 
  | 'likely_missed' 
  | 'checkin_delayed' 
  | 'at_risk' 
  | 'no_impact' 
  | 'updated';

export interface Booking {
  id: string;
  type: BookingType;
  title: string;
  routeOrLocation: string;
  date: string; // e.g. "18 SEP" or "2026-09-18"
  time: string; // e.g. "10:40 AM" or "7:30 PM"
  originalTime?: string;
  endTime?: string;
  cost: number; // in INR
  status: BookingStatus;
  statusLabel: string;
  notes?: string;
  isUpdated?: boolean;
  changeNote?: string;
}

export interface Trip {
  id: string;
  name: string;
  destination: string;
  startDate: string;
  endDate: string;
  status: 'On Track' | 'Disrupted' | 'Stable';
  bookings: Booking[];
}

export type DisruptionType = 
  | 'flight_delayed' 
  | 'flight_cancelled' 
  | 'train_delayed' 
  | 'hotel_unavailable' 
  | 'activity_cancelled';

export interface DisruptionConfig {
  type: DisruptionType;
  label: string;
  delayHours: number;
  description: string;
}

export interface ImpactDependencyItem {
  id: string;
  bookingId: string;
  title: string;
  type: BookingType;
  impactLevel: 'affected' | 'at_risk' | 'unaffected';
  statusLabel: string;
  detail: string;
  arrowToNext?: boolean;
}

export interface PlanItemChange {
  bookingId: string;
  title: string;
  type: BookingType;
  changeText: string;
  isUpdated: boolean;
  statusBadge: 'Updated' | 'No change' | 'Cancelled';
}

export interface RecoveryPlanOption {
  id: 'recommended' | 'lowest_cost' | 'fastest';
  tag: string;
  title: string;
  description: string;
  additionalCost: number; // INR
  refund?: number; // INR
  timeImpactText: string;
  bookingsChangedCount: number;
  bookingsUnchangedCount: number;
  changes: PlanItemChange[];
}
