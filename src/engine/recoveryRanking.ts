import { RecoveryPlan, PreferenceWeights } from '../types/trip';

export const BASE_RECOVERY_PLANS: RecoveryPlan[] = [
  {
    id: 'plan-cheapest',
    name: 'Cheapest',
    badge: 'Budget Optimized',
    tagline: 'Prioritizes lowest out-of-pocket expenses while ensuring hotel arrival.',
    additionalCost: 800,
    timeImpactMinutes: 35,
    bookingsChanged: 1,
    activitiesPreserved: false,
    hotelPreserved: true,
    riskScore: 'Medium',
    convenienceRating: 3,
    calculatedScore: 78,
    bulletPoints: [
      'Replaces private transfer with pre-booked RER B train ticket (-₹1,400 net savings).',
      'Moves City Tour to tomorrow 10:00 AM (₹800 rebooking fee applied).',
      'Hotel Le Grand check-in updated to 17:30 with zero late penalty.',
      'Dinner at Le Bistro Paris remains 100% on schedule at 21:00.',
    ],
    whyRecommended: 'Lowest extra cost (₹800) and preserves budget, but requires rescheduling the Seine cruise to tomorrow morning.',
    confidence: 82,
    changes: [
      {
        bookingId: 'b-transfer',
        bookingTitle: 'Airport Transfer',
        action: 'replace',
        description: 'Replaced with RER B Express + local taxi link',
        oldValue: 'Paris Shuttle VIP (15:10)',
        newValue: 'RER B + Direct Taxi (16:55)',
        costDelta: -1000,
      },
      {
        bookingId: 'b-activity',
        bookingTitle: 'Paris City Tour & Seine Cruise',
        action: 'reschedule',
        description: 'Rescheduled to tomorrow 10:00 AM',
        oldValue: 'Today 18:30',
        newValue: 'Tomorrow 10:00 AM',
        costDelta: 800,
      },
      {
        bookingId: 'b-hotel',
        bookingTitle: 'Hotel Le Grand',
        action: 'reschedule',
        description: 'Automated late check-in notification transmitted',
        oldValue: 'Check-in: 16:00',
        newValue: 'Check-in: 17:30',
        costDelta: 0,
      }
    ],
  },
  {
    id: 'plan-fastest',
    name: 'Fastest',
    badge: 'Zero Time Lost',
    tagline: 'Minimizes travel delays and guarantees all activities proceed today.',
    additionalCost: 1600,
    timeImpactMinutes: 5,
    bookingsChanged: 2,
    activitiesPreserved: true,
    hotelPreserved: true,
    riskScore: 'Low',
    convenienceRating: 4,
    calculatedScore: 84,
    bulletPoints: [
      'Upgrades to CDG Moto-Taxi express bypass (+₹1,600) skipping ring-road congestion.',
      'Luggage delivered directly to Hotel Le Grand concierge via VIP baggage transfer.',
      'Traveler arrives at Pont de l’Alma Pier by 18:15 with 15-minute safety buffer.',
      'Both City Tour (18:30) and Dinner (21:00) preserved without schedule changes.',
    ],
    whyRecommended: 'Only 5 minutes of total schedule impact. Keeps every single activity today by utilizing express terminal transfer.',
    confidence: 89,
    changes: [
      {
        bookingId: 'b-transfer',
        bookingTitle: 'Airport Transfer',
        action: 'replace',
        description: 'Upgraded to CDG Moto/Express VIP direct dispatch',
        oldValue: 'Paris Shuttle VIP (15:10)',
        newValue: 'Express Airport Transfer (16:45)',
        costDelta: 1600,
      },
      {
        bookingId: 'b-hotel',
        bookingTitle: 'Hotel Le Grand',
        action: 'reschedule',
        description: 'Direct express luggage check-in by concierge',
        oldValue: 'Check-in: 16:00',
        newValue: 'Check-in: 17:15',
        costDelta: 0,
      }
    ],
  },
  {
    id: 'plan-best-experience',
    name: 'Best Experience',
    badge: 'AI Recommended',
    tagline: 'Balances optimal comfort, reasonable cost, and complete itinerary preservation.',
    additionalCost: 1200,
    timeImpactMinutes: 15,
    bookingsChanged: 1,
    activitiesPreserved: true,
    hotelPreserved: true,
    riskScore: 'Low',
    convenienceRating: 5,
    calculatedScore: 94,
    bulletPoints: [
      'Transfers rescheduled seamlessly to 16:55 private Mercedes sedan with same chauffeur company (+₹1,200).',
      'Hotel Le Grand check-in auto-adjusted to 17:45; room guaranteed ready upon arrival.',
      'City Tour shifted to 19:15 twilight departure slot with identical pier priority boarding.',
      'Preserves all bookings, avoids public transit luggage hauling, and adds only 15 minutes of downtime.',
    ],
    whyRecommended: 'Recommended because: Preserves your main activity (City Tour), only modifies one booking, adds only 15 minutes, and maintains luxury private transport at moderate cost.',
    confidence: 87,
    changes: [
      {
        bookingId: 'b-transfer',
        bookingTitle: 'Airport Transfer',
        action: 'replace',
        description: 'Driver pickup adjusted to flight touchdown at 16:55',
        oldValue: 'Paris Shuttle VIP (15:10)',
        newValue: 'Paris Shuttle VIP Rescheduled (16:55)',
        costDelta: 1200,
      },
      {
        bookingId: 'b-hotel',
        bookingTitle: 'Hotel Le Grand',
        action: 'reschedule',
        description: 'Guaranteed check-in time adjusted to 17:45',
        oldValue: 'Check-in: 16:00',
        newValue: 'Check-in: 17:45',
        costDelta: 0,
      },
      {
        bookingId: 'b-activity',
        bookingTitle: 'Paris City Tour & Seine Cruise',
        action: 'reschedule',
        description: 'Slot shifted to twilight 19:15 sailing (Zero fee via partner waiver)',
        oldValue: '18:30 Departure',
        newValue: '19:15 Twilight Departure',
        costDelta: 0,
      }
    ],
  },
];

export function rankRecoveryPlans(
  plans: RecoveryPlan[],
  weights: PreferenceWeights
): RecoveryPlan[] {
  return plans
    .map((plan) => {
      // Normalize cost score (lower cost = higher score, max cost ~ 2500)
      const costScore = Math.max(0, 10 - (plan.additionalCost / 2500) * 10);
      
      // Normalize time score (lower minutes = higher score, max min ~ 60)
      const timeScore = Math.max(0, 10 - (plan.timeImpactMinutes / 60) * 10);
      
      // Experience score based on convenience rating and preservation
      let experienceScore = plan.convenienceRating * 2; // scale 1-5 to 2-10
      if (weights.preserveActivities && plan.activitiesPreserved) experienceScore += 2;
      if (weights.avoidChangingHotels && plan.hotelPreserved) experienceScore += 1;
      experienceScore = Math.min(10, experienceScore);

      // Multi-objective weighted formula
      const totalWeight = weights.budget + weights.time + weights.experience;
      const weightedSum =
        (costScore * weights.budget) +
        (timeScore * weights.time) +
        (experienceScore * weights.experience);

      const calculatedScore = Math.round((weightedSum / (totalWeight * 10)) * 100);

      return {
        ...plan,
        calculatedScore,
      };
    })
    .sort((a, b) => b.calculatedScore - a.calculatedScore);
}
