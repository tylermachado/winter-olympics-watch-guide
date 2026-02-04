import type { PageServerLoad } from './$types';
import type { Event } from '$lib/types';
import { groupEventsByDate } from '$lib/utils/dataProcessing';

export const prerender = true;

export const load: PageServerLoad = async ({ fetch }) => {
  const response = await fetch('/data/schedule.json');
  
  if (!response.ok) {
    throw new Error(`Failed to load schedule data: ${response.status} ${response.statusText}`);
  }
  
  const events: Event[] = await response.json();
  const matchdays = groupEventsByDate(events);
  
  return {
    matchdays
  };
};