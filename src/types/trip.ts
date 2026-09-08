export type BookingType = 'flight' | 'transfer' | 'hotel' | 'activity' | 'restaurant' | 'train';

export type BookingStatus = 
  | 'normal' 
  | 'delayed' 
  | 'at_risk' 
  | 'likely_missed' 
  | 'impossible' 
  | 'recovered' 
  | 'cancelled';

export type ImportanceLevel = 'critical' | 'high' | 'medium' | 'low';

export interface Booking {
  id: string;
  type: BookingType;
  title: string;
  code?: string;
  location: string;
  origin?: string;
  destination?: string;
  originalStartTime: string;
  originalEndTime: string;
  startTime: string;
  endTime: string;
  cost: number; // in INR
  status: BookingStatus;
  statusLabel: string;
  importance: ImportanceLevel;
  provider: string;
  cancellationPolicy: string;
  notes?: string;
  bufferMinutes?: number;
  bufferStatus?: 'safe' | 'low' | 'negative';
  dependencies: string[]; // IDs of preceding bookings
}

export interface TripSummary {
  id: string;
  title: string;
  route: string;
  origin: string;
  destination: string;
  startDate: string;
  endDate: string;
  bookingCount: number;
  hasDisruption: boolean;
  bookingsAffected?: number;
  statusText: string;
}

export interface DisruptionScenario {
  id: string;
  label: string;
  type: 'delay_1h' | 'delay_2h' | 'delay_4h' | 'flight_cancelled' | 'transfer_unavailable' | 'activity_cancelled' | 'none';
  affectedBookingId: string;
  delayMinutes: number;
  description: string;
}

export interface RecoveryPlanChange {
  bookingId: string;
  bookingTitle: string;
  action: 'replace' | 'reschedule' | 'cancel' | 'preserve';
  description: string;
  oldValue?: string;
  newValue?: string;
  costDelta: number;
}

export interface RecoveryPlan {
  id: string;
  name: 'Cheapest' | 'Fastest' | 'Best Experience';
  badge: string;
  tagline: string;
  additionalCost: number; // INR
  timeImpactMinutes: number;
  bookingsChanged: number;
  activitiesPreserved: boolean;
  hotelPreserved: boolean;
  riskScore: 'Low' | 'Medium' | 'High';
  convenienceRating: number; // 1-5
  calculatedScore: number;
  bulletPoints: string[];
  whyRecommended: string;
  confidence: number;
  changes: RecoveryPlanChange[];
}

export interface PreferenceWeights {
  budget: number; // 1 to 10
  time: number; // 1 to 10
  experience: number; // 1 to 10
  preserveActivities: boolean;
  avoidChangingHotels: boolean;
}

export interface ImpactBreakdown {
  totalScore: number;
  severity: 'LOW' | 'MEDIUM' | 'HIGH' | 'CRITICAL';
  timeImpact: number;
  costImpact: number;
  bookingsAffected: number;
  activityRisk: number;
  affectedCount: number;
  totalBookings: number;
  propagationPath: string[];
}

export interface ChangeLogEntry {
  id: string;
  time: string;
  bookingTitle: string;
  bookingType: BookingType;
  action: string;
  detail: string;
}

export interface RiskAlert {
  id: string;
  level: 'info' | 'warning' | 'critical' | 'resolved';
  title: string;
  description: string;
  bufferInfo?: string;
  actionLabel?: string;
  actionType?: 'view_recovery' | 'view_details';
  relatedBookingId?: string;
  timestamp: string;
}

export interface WhatIfOption {
  id: string;
  title: string;
  departure: string;
  carrier: string;
  additionalCost: number;
  hotelPreserved: boolean;
  transferPreserved: boolean;
  tourPreserved: boolean;
  disruptionLevel: 'LOW' | 'MEDIUM' | 'HIGH';
  timeSavingsMinutes: number;
  feasibilityNotes: string;
}
