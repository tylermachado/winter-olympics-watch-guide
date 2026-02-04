<script lang="ts">
  import Event from './Event.svelte';
  import type { Event as EventType } from './types';

  export let date = '';
  export let events: EventType[] = [];
</script>

<div class="matchday">
  <h2>{date}</h2>
  {#each events as event}
    <Event 
      startTime={event.start_time} 
      sport={event.sport} 
      event={event.event} 
      isLive={event.is_live} 
      isReplay={event.is_replay} 
      broadcaster={event.broadcaster}
      teams={event.teams} />
  {/each}
</div>

<style>
  .matchday {
    margin-bottom: 2rem;
  }

  h2 {
    font-size: 1.5rem;
    font-weight: bold; /* Make the date text bolder */
    color: white; /* White text */
    background-color: var(--color-primary-800); /* Dark background */
    padding: 0.5rem; /* Add padding for better appearance */
    margin: 0; /* Remove margin to make it touch the first event */
    text-align: left; /* Default alignment for desktop */
  }

  .matchday :global(.event + .event) {
    border-top: none;
  }

  .matchday :global(.event:first-of-type) {
    border-radius: 0; /* Remove top corners' border-radius */
  }

  .matchday :global(.event:last-of-type) {
    border-radius: 0 0 0.5rem 0.5rem;
  }

  .matchday :global(.event:only-of-type) {
    border-radius: 0 0 0.5rem 0.5rem; /* Only bottom corners rounded */
  }

  @media (max-width: 767px) {
    h2 {
      text-align: center; /* Center align on mobile */
    }
  }
</style>
