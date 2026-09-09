import { Booking, ImpactDependencyItem, RecoveryPlanOption } from '../types/trip';
import { calculateNewArrival, formatDelayDuration, formatMinutesToTime, parseTimeToMinutes } from './timeCalculations';

export interface DynamicImpactResult {
  flight: {
    bookingId: string;
    route: string;
    originalArrival: string;
    newArrival: string;
    delayFormatted: string;
    delayMinutes: number;
  };
  impactChain: ImpactDependencyItem[];
  unaffectedItems: ImpactDependencyItem[];
  affectedCount: number;
  recoveryOptions: RecoveryPlanOption[];
}

export function computeDynamicImpact(
  bookings: Booking[],
  delayMinutes: number
): DynamicImpactResult {
  // Find flight
  const flight = bookings.find((b) => b.type === 'flight') || {
    id: 'b-flight',
    title: 'Flight',
    routeOrLocation: 'Mumbai → Paris',
    time: '10:40 AM',
    endTime: '4:15 PM',
  };

  const origArrivalStr = flight.endTime || '4:15 PM';
  const newArrival = calculateNewArrival(origArrivalStr, delayMinutes);
  const delayFormatted = formatDelayDuration(delayMinutes);

  // CDG Exit time calculation: touchdown + 60 min (customs, immigration, bags)
  const exitTerminalMinutes = newArrival.newMinutes + 60;
  const exitTerminalStr = formatMinutesToTime(exitTerminalMinutes);

  // Transfer scheduled pickup: 7:30 PM (1170 mins)
  const transferScheduledMins = parseTimeToMinutes('7:30 PM');
  const transferBuffer = transferScheduledMins - exitTerminalMinutes;

  // Hotel arrival time: exitTerminal + 45 min drive
  const estHotelArrivalMinutes = exitTerminalMinutes + 45;
  const estHotelArrivalStr = formatMinutesToTime(estHotelArrivalMinutes);

  const impactChain: ImpactDependencyItem[] = [];
  const unaffectedItems: ImpactDependencyItem[] = [];
  let affectedCount = 0;

  // 1. FLIGHT
  if (delayMinutes > 0) {
    affectedCount++;
    impactChain.push({
      id: 'imp-flight',
      bookingId: flight.id,
      title: 'Flight',
      type: 'flight',
      impactLevel: 'affected',
      statusLabel: `Delayed (${delayFormatted})`,
      detail: `Delayed by ${delayFormatted}. Inbound touchdown at Paris CDG is now expected at ${newArrival.newTimeStr}.`,
      arrowToNext: true,
    });
  } else {
    unaffectedItems.push({
      id: 'imp-flight',
      bookingId: flight.id,
      title: 'Flight',
      type: 'flight',
      impactLevel: 'unaffected',
      statusLabel: 'On Schedule',
      detail: `Arriving on schedule at ${origArrivalStr} at Paris CDG.`,
    });
  }

  // 2. AIRPORT TRANSFER
  if (transferBuffer < 0) {
    affectedCount++;
    impactChain.push({
      id: 'imp-transfer',
      bookingId: 'b-transfer',
      title: 'Airport Transfer',
      type: 'transfer',
      impactLevel: 'affected',
      statusLabel: 'Pickup likely missed',
      detail: `Scheduled pickup at 7:30 PM occurs before your expected terminal exit at ${exitTerminalStr} (${Math.abs(transferBuffer)}m gap).`,
      arrowToNext: true,
    });
  } else if (transferBuffer < 45) {
    affectedCount++;
    impactChain.push({
      id: 'imp-transfer',
      bookingId: 'b-transfer',
      title: 'Airport Transfer',
      type: 'transfer',
      impactLevel: 'at_risk',
      statusLabel: 'Tight buffer',
      detail: `Expected terminal exit at ${exitTerminalStr} leaves only ${transferBuffer} minutes before 7:30 PM pickup. Baggage delays may cause a miss.`,
      arrowToNext: true,
    });
  } else {
    unaffectedItems.push({
      id: 'imp-transfer',
      bookingId: 'b-transfer',
      title: 'Airport Transfer',
      type: 'transfer',
      impactLevel: 'unaffected',
      statusLabel: 'Safe buffer',
      detail: `Expected terminal exit at ${exitTerminalStr} leaves a comfortable ${transferBuffer}m margin before 7:30 PM pickup.`,
    });
  }

  // 3. HOTEL
  if (estHotelArrivalMinutes > 1380) {
    // past 11:00 PM
    affectedCount++;
    impactChain.push({
      id: 'imp-hotel',
      bookingId: 'b-hotel',
      title: 'Hotel',
      type: 'hotel',
      impactLevel: 'affected',
      statusLabel: 'Late arrival notice needed',
      detail: `Estimated arrival at Hotel Lumière pushed to ${estHotelArrivalStr}. Night concierge hold required to protect booking.`,
      arrowToNext: true,
    });
  } else if (estHotelArrivalMinutes > 1290) {
    // past 9:30 PM
    affectedCount++;
    impactChain.push({
      id: 'imp-hotel',
      bookingId: 'b-hotel',
      title: 'Hotel',
      type: 'hotel',
      impactLevel: 'at_risk',
      statusLabel: 'Check-in delayed',
      detail: `Estimated arrival at Hotel Lumière pushed to ${estHotelArrivalStr}. Front desk notice recommended.`,
      arrowToNext: true,
    });
  } else {
    unaffectedItems.push({
      id: 'imp-hotel',
      bookingId: 'b-hotel',
      title: 'Hotel',
      type: 'hotel',
      impactLevel: 'unaffected',
      statusLabel: 'Check-in on track',
      detail: `Expected hotel check-in at ${estHotelArrivalStr} is within standard reception hours.`,
    });
  }

  // 4. ACTIVITY (Eiffel Tower Tour - 19 Sep, 10:00 AM)
  if (estHotelArrivalMinutes > 1440) {
    // after midnight
    affectedCount++;
    impactChain.push({
      id: 'imp-tour',
      bookingId: 'b-tour',
      title: 'Activity',
      type: 'activity',
      impactLevel: 'affected',
      statusLabel: 'Severe fatigue risk',
      detail: `Arrival after midnight leaves inadequate rest before the 10:00 AM Eiffel Tower guided tour tomorrow.`,
      arrowToNext: false,
    });
  } else if (estHotelArrivalMinutes > 1350) {
    // after 10:30 PM
    affectedCount++;
    impactChain.push({
      id: 'imp-tour',
      bookingId: 'b-tour',
      title: 'Activity',
      type: 'activity',
      impactLevel: 'at_risk',
      statusLabel: 'At risk',
      detail: `Late evening arrival leaves compressed turnaround time before 10:00 AM tour tomorrow morning.`,
      arrowToNext: false,
    });
  } else {
    unaffectedItems.push({
      id: 'imp-tour',
      bookingId: 'b-tour',
      title: 'Activity',
      type: 'activity',
      impactLevel: 'unaffected',
      statusLabel: 'No impact',
      detail: `Sufficient rest buffer before 10:00 AM tour tomorrow morning.`,
    });
  }

  // 5. TRAIN (Always unaffected)
  unaffectedItems.push({
    id: 'imp-train',
    bookingId: 'b-train',
    title: 'Train',
    type: 'train',
    impactLevel: 'unaffected',
    statusLabel: 'No impact',
    detail: 'Eurostar departure on 20 Sep at 8:30 AM remains completely unaffected.',
  });

  // Calculate dynamic recovery options based on delay
  const newTransferTimeStr = formatMinutesToTime(Math.ceil((exitTerminalMinutes + 15) / 15) * 15);
  const isTourShiftNeeded = estHotelArrivalMinutes > 1320; // past 10:00 PM

  const recoveryOptions: RecoveryPlanOption[] = [
    {
      id: 'recommended',
      tag: 'Recommended',
      title: isTourShiftNeeded
        ? 'Keep flight, Move airport transfer, Reschedule Eiffel Tower tour'
        : 'Keep flight, Move airport transfer, Keep tour',
      description: isTourShiftNeeded
        ? `Keeps your current flight. Re-dispatches chauffeur to ${newTransferTimeStr} and reschedules Eiffel Tower tour to morning of 20 Sep.`
        : `Keeps your flight and shifts chauffeur pickup to ${newTransferTimeStr}. Tour stays on 19 Sep.`,
      additionalCost: 1200,
      timeImpactText: '+45 min',
      bookingsChangedCount: isTourShiftNeeded ? 2 : 1,
      bookingsUnchangedCount: isTourShiftNeeded ? 3 : 4,
      changes: [
        {
          bookingId: flight.id,
          title: `Flight (${flight.routeOrLocation})`,
          type: 'flight',
          changeText: `No change (Touchdown at ${newArrival.newTimeStr})`,
          isUpdated: false,
          statusBadge: 'No change',
        },
        {
          bookingId: 'b-transfer',
          title: 'Airport Transfer',
          type: 'transfer',
          changeText: `7:30 PM → ${newTransferTimeStr} (Re-dispatched chauffeur)`,
          isUpdated: true,
          statusBadge: 'Updated',
        },
        {
          bookingId: 'b-hotel',
          title: 'Hotel (Hotel Lumière)',
          type: 'hotel',
          changeText: `Check-in unchanged (Late arrival ~${estHotelArrivalStr} notified)`,
          isUpdated: false,
          statusBadge: 'No change',
        },
        {
          bookingId: 'b-tour',
          title: 'Eiffel Tower Tour',
          type: 'activity',
          changeText: isTourShiftNeeded
            ? '19 Sep → 20 Sep (Rescheduled to morning slot)'
            : '19 Sep 10:00 AM (Unchanged)',
          isUpdated: isTourShiftNeeded,
          statusBadge: isTourShiftNeeded ? 'Updated' : 'No change',
        },
        {
          bookingId: 'b-train',
          title: 'Train (Paris → Amsterdam)',
          type: 'train',
          changeText: '8:30 AM departure unchanged',
          isUpdated: false,
          statusBadge: 'No change',
        },
      ],
    },
    {
      id: 'lowest_cost',
      tag: 'Lowest Cost',
      title: 'Keep flight, Cancel tour, Claim activity refund',
      description: `Maintains current flight and re-dispatches transfer to ${newTransferTimeStr}. Cancels Eiffel Tower tour with ₹3,500 refund credit.`,
      additionalCost: 0,
      refund: 3500,
      timeImpactText: '0 min',
      bookingsChangedCount: 2,
      bookingsUnchangedCount: 3,
      changes: [
        {
          bookingId: flight.id,
          title: `Flight (${flight.routeOrLocation})`,
          type: 'flight',
          changeText: `No change (Touchdown at ${newArrival.newTimeStr})`,
          isUpdated: false,
          statusBadge: 'No change',
        },
        {
          bookingId: 'b-transfer',
          title: 'Airport Transfer',
          type: 'transfer',
          changeText: `7:30 PM → ${newTransferTimeStr} (Re-dispatched chauffeur)`,
          isUpdated: true,
          statusBadge: 'Updated',
        },
        {
          bookingId: 'b-hotel',
          title: 'Hotel (Hotel Lumière)',
          type: 'hotel',
          changeText: `Check-in unchanged (Late arrival ~${estHotelArrivalStr} notified)`,
          isUpdated: false,
          statusBadge: 'No change',
        },
        {
          bookingId: 'b-tour',
          title: 'Eiffel Tower Tour',
          type: 'activity',
          changeText: 'Cancelled with ₹3,500 full refund credited',
          isUpdated: true,
          statusBadge: 'Cancelled',
        },
        {
          bookingId: 'b-train',
          title: 'Train (Paris → Amsterdam)',
          type: 'train',
          changeText: '8:30 AM departure unchanged',
          isUpdated: false,
          statusBadge: 'No change',
        },
      ],
    },
    {
      id: 'fastest',
      tag: 'Fastest',
      title: 'Change flight, Keep transfer, Keep activity',
      description: `Rebooks to direct alternate flight (Air France AF-218) landing on time at 4:35 PM. Completely eliminates the ${delayFormatted} delay.`,
      additionalCost: 6800,
      timeImpactText: `Time saved: ${delayFormatted.replace('+', '')}`,
      bookingsChangedCount: 1,
      bookingsUnchangedCount: 4,
      changes: [
        {
          bookingId: flight.id,
          title: `Flight (${flight.routeOrLocation})`,
          type: 'flight',
          changeText: 'Switched to Air France AF-218 (Arrival 4:35 PM)',
          isUpdated: true,
          statusBadge: 'Updated',
        },
        {
          bookingId: 'b-transfer',
          title: 'Airport Transfer',
          type: 'transfer',
          changeText: '7:30 PM pickup preserved as scheduled',
          isUpdated: false,
          statusBadge: 'No change',
        },
        {
          bookingId: 'b-hotel',
          title: 'Hotel (Hotel Lumière)',
          type: 'hotel',
          changeText: '9:00 PM check-in preserved as scheduled',
          isUpdated: false,
          statusBadge: 'No change',
        },
        {
          bookingId: 'b-tour',
          title: 'Eiffel Tower Tour',
          type: 'activity',
          changeText: '19 Sep 10:00 AM preserved as scheduled',
          isUpdated: false,
          statusBadge: 'No change',
        },
        {
          bookingId: 'b-train',
          title: 'Train (Paris → Amsterdam)',
          type: 'train',
          changeText: '20 Sep 8:30 AM preserved as scheduled',
          isUpdated: false,
          statusBadge: 'No change',
        },
      ],
    },
  ];

  return {
    flight: {
      bookingId: flight.id,
      route: flight.routeOrLocation,
      originalArrival: origArrivalStr,
      newArrival: newArrival.newTimeStr,
      delayFormatted,
      delayMinutes,
    },
    impactChain,
    unaffectedItems,
    affectedCount,
    recoveryOptions,
  };
}
