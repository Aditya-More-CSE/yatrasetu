import { Booking, DisruptionScenario, ImpactBreakdown } from '../types/trip';

export function calculateRippleEffects(
  originalBookings: Booking[],
  disruption: DisruptionScenario | null
): { bookings: Booking[]; impact: ImpactBreakdown } {
  // Deep clone bookings
  const bookings = originalBookings.map((b) => ({ ...b }));

  if (!disruption || disruption.type === 'none') {
    return {
      bookings: originalBookings,
      impact: {
        totalScore: 0,
        severity: 'LOW',
        timeImpact: 0,
        costImpact: 0,
        bookingsAffected: 0,
        activityRisk: 0,
        affectedCount: 0,
        totalBookings: bookings.length,
        propagationPath: [],
      },
    };
  }

  const path: string[] = [];

  if (disruption.type === 'delay_2h') {
    // Flight delayed 2 hours: 10:00 -> 12:00, arrival 14:40 -> 16:40
    const flight = bookings.find((b) => b.id === 'b-flight');
    if (flight) {
      flight.startTime = '12:00';
      flight.endTime = '16:40';
      flight.status = 'delayed';
      flight.statusLabel = 'DELAYED +2h';
      path.push(flight.title);
    }

    // Airport transfer: was 15:10, but flight lands at 16:40! Buffer: -90m
    const transfer = bookings.find((b) => b.id === 'b-transfer');
    if (transfer) {
      transfer.status = 'at_risk';
      transfer.statusLabel = 'AT RISK';
      transfer.bufferMinutes = -90;
      transfer.bufferStatus = 'negative';
      transfer.notes = 'Pickup scheduled at 15:10, but flight now lands at 16:40. Connection impossible without rescheduling.';
      path.push(transfer.title);
    }

    // Hotel check-in: was 16:00, estimated arrival pushed to 17:45
    const hotel = bookings.find((b) => b.id === 'b-hotel');
    if (hotel) {
      hotel.startTime = '17:45';
      hotel.status = 'delayed';
      hotel.statusLabel = 'CHECK-IN DELAYED';
      hotel.bufferMinutes = 45;
      hotel.bufferStatus = 'low';
      hotel.notes = 'Late check-in notification needed. Hotel held safely.';
      path.push(hotel.title);
    }

    // City Tour: was 18:30. Only 45 mins buffer after hotel check-in at 17:45. Pier travel takes 40 mins.
    const tour = bookings.find((b) => b.id === 'b-activity');
    if (tour) {
      tour.status = 'at_risk';
      tour.statusLabel = 'AT RISK';
      tour.bufferMinutes = 5;
      tour.bufferStatus = 'low';
      tour.notes = 'Extremely low safety margin (5 min). Non-refundable pier ticket at risk.';
      path.push(tour.title);
    }

    // Dinner: 21:00. Unaffected!
    const dinner = bookings.find((b) => b.id === 'b-dinner');
    if (dinner) {
      dinner.status = 'normal';
      dinner.statusLabel = 'ON SCHEDULE';
      dinner.bufferMinutes = 90;
      dinner.bufferStatus = 'safe';
    }

    return {
      bookings,
      impact: {
        totalScore: 72,
        severity: 'HIGH',
        timeImpact: 30,
        costImpact: 15,
        bookingsAffected: 15,
        activityRisk: 12,
        affectedCount: 3,
        totalBookings: bookings.length,
        propagationPath: path,
      },
    };
  }

  if (disruption.type === 'delay_1h') {
    const flight = bookings.find((b) => b.id === 'b-flight');
    if (flight) {
      flight.startTime = '11:00';
      flight.endTime = '15:40';
      flight.status = 'delayed';
      flight.statusLabel = 'DELAYED +1h';
      path.push(flight.title);
    }

    const transfer = bookings.find((b) => b.id === 'b-transfer');
    if (transfer) {
      transfer.status = 'at_risk';
      transfer.statusLabel = 'TIGHT BUFFER';
      transfer.bufferMinutes = 15;
      transfer.bufferStatus = 'low';
      path.push(transfer.title);
    }

    const hotel = bookings.find((b) => b.id === 'b-hotel');
    if (hotel) {
      hotel.startTime = '16:45';
      hotel.status = 'delayed';
      hotel.statusLabel = 'CHECK-IN +45m';
      hotel.bufferMinutes = 60;
      hotel.bufferStatus = 'safe';
      path.push(hotel.title);
    }

    const tour = bookings.find((b) => b.id === 'b-activity');
    if (tour) {
      tour.status = 'normal';
      tour.statusLabel = 'ON SCHEDULE';
      tour.bufferMinutes = 45;
      tour.bufferStatus = 'safe';
    }

    return {
      bookings,
      impact: {
        totalScore: 42,
        severity: 'MEDIUM',
        timeImpact: 18,
        costImpact: 8,
        bookingsAffected: 10,
        activityRisk: 6,
        affectedCount: 2,
        totalBookings: bookings.length,
        propagationPath: path,
      },
    };
  }

  if (disruption.type === 'delay_4h') {
    const flight = bookings.find((b) => b.id === 'b-flight');
    if (flight) {
      flight.startTime = '14:00';
      flight.endTime = '18:40';
      flight.status = 'delayed';
      flight.statusLabel = 'DELAYED +4h';
      path.push(flight.title);
    }

    const transfer = bookings.find((b) => b.id === 'b-transfer');
    if (transfer) {
      transfer.status = 'impossible';
      transfer.statusLabel = 'MISSED';
      transfer.bufferMinutes = -210;
      transfer.bufferStatus = 'negative';
      path.push(transfer.title);
    }

    const hotel = bookings.find((b) => b.id === 'b-hotel');
    if (hotel) {
      hotel.startTime = '19:45';
      hotel.status = 'delayed';
      hotel.statusLabel = 'LATE CHECK-IN';
      path.push(hotel.title);
    }

    const tour = bookings.find((b) => b.id === 'b-activity');
    if (tour) {
      tour.status = 'impossible';
      tour.statusLabel = 'MISSED';
      tour.bufferMinutes = -75;
      tour.bufferStatus = 'negative';
      path.push(tour.title);
    }

    const dinner = bookings.find((b) => b.id === 'b-dinner');
    if (dinner) {
      dinner.status = 'at_risk';
      dinner.statusLabel = 'TIGHT BUFFER';
      dinner.bufferMinutes = 15;
      dinner.bufferStatus = 'low';
      path.push(dinner.title);
    }

    return {
      bookings,
      impact: {
        totalScore: 91,
        severity: 'CRITICAL',
        timeImpact: 35,
        costImpact: 22,
        bookingsAffected: 20,
        activityRisk: 14,
        affectedCount: 4,
        totalBookings: bookings.length,
        propagationPath: path,
      },
    };
  }

  if (disruption.type === 'flight_cancelled') {
    bookings.forEach((b) => {
      b.status = 'impossible';
      b.statusLabel = 'DISRUPTED';
    });
    return {
      bookings,
      impact: {
        totalScore: 98,
        severity: 'CRITICAL',
        timeImpact: 40,
        costImpact: 25,
        bookingsAffected: 20,
        activityRisk: 13,
        affectedCount: 5,
        totalBookings: bookings.length,
        propagationPath: bookings.map((b) => b.title),
      },
    };
  }

  if (disruption.type === 'transfer_unavailable') {
    const transfer = bookings.find((b) => b.id === 'b-transfer');
    if (transfer) {
      transfer.status = 'at_risk';
      transfer.statusLabel = 'DRIVER CANCELLED';
      path.push(transfer.title);
    }
    const hotel = bookings.find((b) => b.id === 'b-hotel');
    if (hotel) {
      hotel.status = 'at_risk';
      hotel.statusLabel = 'DELAYED ARRIVAL';
      path.push(hotel.title);
    }
    return {
      bookings,
      impact: {
        totalScore: 48,
        severity: 'MEDIUM',
        timeImpact: 15,
        costImpact: 12,
        bookingsAffected: 12,
        activityRisk: 9,
        affectedCount: 2,
        totalBookings: bookings.length,
        propagationPath: path,
      },
    };
  }

  if (disruption.type === 'activity_cancelled') {
    const tour = bookings.find((b) => b.id === 'b-activity');
    if (tour) {
      tour.status = 'cancelled';
      tour.statusLabel = 'CANCELLED BY OPERATOR';
      path.push(tour.title);
    }
    return {
      bookings,
      impact: {
        totalScore: 35,
        severity: 'LOW',
        timeImpact: 5,
        costImpact: 10,
        bookingsAffected: 5,
        activityRisk: 15,
        affectedCount: 1,
        totalBookings: bookings.length,
        propagationPath: path,
      },
    };
  }

  return {
    bookings,
    impact: {
      totalScore: 0,
      severity: 'LOW',
      timeImpact: 0,
      costImpact: 0,
      bookingsAffected: 0,
      activityRisk: 0,
      affectedCount: 0,
      totalBookings: bookings.length,
      propagationPath: [],
    },
  };
}
