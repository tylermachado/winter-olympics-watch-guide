import type { Event, Matchday } from '$lib/types';

export function groupEventsByDate(events: Event[]): Matchday[] {
  const groupedEvents = events.reduce((acc: Record<string, Event[]>, event) => {
    if (!acc[event.date]) {
      acc[event.date] = [];
    }
    acc[event.date].push(event);
    return acc;
  }, {});

  return Object.entries(groupedEvents).map(([date, events]) => {
    const dateObj = new Date(date);
    return { 
      date: formatLongDate(dateObj, date),
      short_date: formatShortDate(dateObj),
      events, 
      id: date 
    };
  });
}

function formatLongDate(dateObj: Date, originalDate: string): string {
  const dayOfWeek = new Intl.DateTimeFormat('en-US', { weekday: 'long' }).format(dateObj);
  return `${dayOfWeek}, ${originalDate.split(', ')[0]}`;
}

function formatShortDate(dateObj: Date): string {
  const shortDayOfWeek = new Intl.DateTimeFormat('en-US', { weekday: 'short' }).format(dateObj).toUpperCase();
  const shortMonth = new Intl.DateTimeFormat('en-US', { month: 'short' }).format(dateObj).toUpperCase();
  const day = dateObj.getDate();
  return `${shortDayOfWeek} ${shortMonth} ${day}`;
}

export function extractUniqueSports(events: Event[]): string[] {
  const sportsSet = new Set(events.map(e => e.sport));
  return Array.from(sportsSet).sort();
}
