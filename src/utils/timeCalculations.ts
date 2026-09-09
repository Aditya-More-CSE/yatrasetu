/**
 * Time and downstream impact calculation utilities for YatraSetu
 */

export interface TimeBreakdown {
  hours: number;
  minutes: number;
}

/**
 * Parses "H:MM AM/PM" into minutes from midnight (0 to 1439).
 */
export function parseTimeToMinutes(timeStr: string): number {
  if (!timeStr) return 0;
  // Clean up any extraneous text, e.g. "10:40 AM (Dep)" -> "10:40 AM"
  const match = timeStr.match(/(\d{1,2}):(\d{2})\s*(AM|PM)/i);
  if (!match) return 0;

  let hours = parseInt(match[1], 10);
  const minutes = parseInt(match[2], 10);
  const meridiem = match[3].toUpperCase();

  if (meridiem === 'PM' && hours !== 12) {
    hours += 12;
  } else if (meridiem === 'AM' && hours === 12) {
    hours = 0;
  }

  return hours * 60 + minutes;
}

/**
 * Formats minutes from midnight into "H:MM AM/PM".
 */
export function formatMinutesToTime(totalMinutes: number): string {
  // Normalize into 24-hour cycle
  const normalized = ((totalMinutes % 1440) + 1440) % 1440;
  const hours24 = Math.floor(normalized / 60);
  const minutes = normalized % 60;

  const meridiem = hours24 >= 12 ? 'PM' : 'AM';
  let hours12 = hours24 % 12;
  if (hours12 === 0) hours12 = 12;

  const minFormatted = minutes < 10 ? `0${minutes}` : `${minutes}`;
  return `${hours12}:${minFormatted} ${meridiem}`;
}

/**
 * Calculates new arrival time given original arrival time and delay in minutes.
 */
export function calculateNewArrival(originalArrivalStr: string, delayMinutes: number): {
  newTimeStr: string;
  newMinutes: number;
  isNextDay: boolean;
} {
  const origMins = parseTimeToMinutes(originalArrivalStr);
  const totalMins = origMins + delayMinutes;
  const isNextDay = totalMins >= 1440;

  return {
    newTimeStr: formatMinutesToTime(totalMins) + (isNextDay ? ' (+1d)' : ''),
    newMinutes: totalMins,
    isNextDay,
  };
}

/**
 * Formats duration in minutes into clean readable string like "+2h 30m" or "+45m" or "+3 hours"
 */
export function formatDelayDuration(minutes: number): string {
  if (minutes === 0) return '0 min';
  const h = Math.floor(minutes / 60);
  const m = minutes % 60;
  if (h === 0) return `+${m} min`;
  if (m === 0) return `+${h} hour${h > 1 ? 's' : ''}`;
  return `+${h}h ${m}m`;
}
