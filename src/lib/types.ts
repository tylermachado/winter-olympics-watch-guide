export interface Team {
  team1: string;
  team2: string;
}

export interface Event {
  date: string;
  start_time: string;
  sport: string;
  event: string;
  is_live: boolean;
  is_replay: boolean;
  is_medal_event: boolean;
  broadcaster: string;
  teams?: Team;
}

export interface Matchday {
  date: string;
  shortDate: string;
  events: Event[];
  id: string;
}