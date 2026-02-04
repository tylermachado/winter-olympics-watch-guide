/**
 * Converts Eastern Time to the user's local timezone
 * @param easternTime - Time string in Eastern Time (e.g., "2:30 PM")
 * @returns Formatted time string in user's local timezone
 */
export function convertEasternToLocal(easternTime: string): string {
  if (!easternTime) return '';

  // Parse the Eastern time string (e.g., "2:30 PM")
  const timeRegex = /(\d{1,2}):(\d{2})\s*(AM|PM)/i;
  const match = easternTime.match(timeRegex);

  if (!match) return easternTime;

  let hours = parseInt(match[1], 10);
  const minutes = parseInt(match[2], 10);
  const period = match[3].toUpperCase();

  // Convert to 24-hour format
  if (period === 'PM' && hours !== 12) hours += 12;
  if (period === 'AM' && hours === 12) hours = 0;

  // Create a date object for today (date doesn't matter for time conversion)
  // Using a fixed date to ensure consistent behavior
  const today = new Date();
  const easternDate = new Date(
    today.getFullYear(),
    today.getMonth(),
    today.getDate(),
    hours,
    minutes
  );

  // Get offset difference between Eastern and local timezone
  const easternFormatter = new Intl.DateTimeFormat('en-US', {
    hour: 'numeric',
    minute: '2-digit',
    hour12: false,
    timeZone: 'America/New_York',
  });

  const localFormatter = new Intl.DateTimeFormat('en-US', {
    hour: 'numeric',
    minute: '2-digit',
    hour12: false,
    timeZone: Intl.DateTimeFormat().resolvedOptions().timeZone,
  });

  const easternStr = easternFormatter.format(easternDate);
  const localStr = localFormatter.format(easternDate);

  const easternHours = parseInt(easternStr.split(':')[0], 10);
  const localHours = parseInt(localStr.split(':')[0], 10);
  const offsetHours = localHours - easternHours;

  // Apply offset to original time
  let adjustedHours = hours + offsetHours;

  // Handle day wraparound
  if (adjustedHours < 0) adjustedHours += 24;
  if (adjustedHours >= 24) adjustedHours -= 24;

  // Format the result
  const adjustedDate = new Date(
    today.getFullYear(),
    today.getMonth(),
    today.getDate(),
    adjustedHours,
    minutes
  );

  return new Intl.DateTimeFormat('en-US', {
    hour: 'numeric',
    minute: '2-digit',
    hour12: true,
  }).format(adjustedDate);
}
