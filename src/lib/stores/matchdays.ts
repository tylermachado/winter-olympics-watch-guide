import { derived, writable } from 'svelte/store';
import { filters } from './filters';
import type { Event, Matchday as MatchdayType } from '$lib/types';

export const matchdays = writable<MatchdayType[]>([]);

export const filteredMatchdays = derived([matchdays, filters], ([$matchdays, $filters]) => {
  return $matchdays.map(matchday => {
    const filteredEvents = matchday.events.filter((event: Event) => {
      // Apply sport filter (case-insensitive)
      if ($filters.sport && event.sport.toUpperCase() !== $filters.sport.toUpperCase()) {
        return false;
      }
      
      // Apply live only filter
      if ($filters.liveOnly && !event.is_live) {
        return false;
      }
      
      // Apply gold medal only filter
      if ($filters.goldMedalOnly && !event.is_medal_event) {
        return false;
      }
      
      // Apply USA only filter
      if ($filters.usaOnly) {
        if (!event.teams || (event.teams.team1 !== 'United States' && event.teams.team2 !== 'United States')) {
          return false;
        }
      }
      
      return true;
    });

    return {
      ...matchday,
      events: filteredEvents
    };
  }).filter(matchday => matchday.events.length > 0);
});
