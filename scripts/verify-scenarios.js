// Verification script for YatraSetu dynamic delay and impact engine

function parseTimeToMinutes(timeStr) {
  if (!timeStr) return 0;
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

function formatMinutesToTime(totalMinutes) {
  const normalized = ((totalMinutes % 1440) + 1440) % 1440;
  const hours24 = Math.floor(normalized / 60);
  const minutes = normalized % 60;

  const meridiem = hours24 >= 12 ? 'PM' : 'AM';
  let hours12 = hours24 % 12;
  if (hours12 === 0) hours12 = 12;

  const minFormatted = minutes < 10 ? `0${minutes}` : `${minutes}`;
  return `${hours12}:${minFormatted} ${meridiem}`;
}

function calculateNewArrival(originalArrivalStr, delayMinutes) {
  const origMins = parseTimeToMinutes(originalArrivalStr);
  const totalMins = origMins + delayMinutes;
  const isNextDay = totalMins >= 1440;

  return {
    newTimeStr: formatMinutesToTime(totalMins) + (isNextDay ? ' (+1d)' : ''),
    newMinutes: totalMins,
    isNextDay,
  };
}

console.log('--- TEST 1: TIME CALCULATIONS ---');
console.log('4:15 PM + 30m:', calculateNewArrival('4:15 PM', 30).newTimeStr); // 4:45 PM
console.log('4:15 PM + 60m:', calculateNewArrival('4:15 PM', 60).newTimeStr); // 5:15 PM
console.log('4:15 PM + 120m:', calculateNewArrival('4:15 PM', 120).newTimeStr); // 6:15 PM
console.log('4:15 PM + 150m (2h 30m):', calculateNewArrival('4:15 PM', 150).newTimeStr); // 6:45 PM
console.log('4:15 PM + 180m (3h):', calculateNewArrival('4:15 PM', 180).newTimeStr); // 7:15 PM
console.log('4:15 PM + 240m (4h):', calculateNewArrival('4:15 PM', 240).newTimeStr); // 8:15 PM
console.log('4:15 PM + 300m (5h):', calculateNewArrival('4:15 PM', 300).newTimeStr); // 9:15 PM

// Assertions
if (calculateNewArrival('4:15 PM', 150).newTimeStr !== '6:45 PM') throw new Error('Failed 2h 30m test');
if (calculateNewArrival('4:15 PM', 180).newTimeStr !== '7:15 PM') throw new Error('Failed 3h test');
if (calculateNewArrival('4:15 PM', 240).newTimeStr !== '8:15 PM') throw new Error('Failed 4h test');
if (calculateNewArrival('4:15 PM', 300).newTimeStr !== '9:15 PM') throw new Error('Failed 5h test');

console.log('✅ All time calculation assertions passed successfully!');
