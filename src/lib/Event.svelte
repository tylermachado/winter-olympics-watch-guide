<script lang="ts">
  import type { Team } from './types';

  export let startTime = '';
  export let sport = '';
  export let event = '';
  export let isLive = false;
  export let isReplay = false;
  export let broadcaster = '';
  export let teams: Team | undefined = undefined;
  
  // Create display name with teams if available
  // Skip teams if they contain underscores (placeholder for unknown teams)
  $: displayEvent = teams && !teams.team1.includes('_') && !teams.team2.includes('_')
    ? `${event} (${teams.team1} vs ${teams.team2})`.trim()
    : event;
</script>

<div class="event">
  <div class="start-time">{startTime}</div>
  <div class="event-content">
    <div class="event-header">
      <div class="pills">
        <span class="pill sport-pill">{sport}</span>
        {#if isLive}
          <span class="pill live-pill">Live</span>
        {:else if isReplay}
          <span class="pill replay-pill">Replay</span>
        {/if}
      </div>
    </div>
    <div class="event-details">
      <div class="event-name">{displayEvent}</div>
      <div class="broadcaster">{broadcaster}</div>
    </div>
  </div>
</div>

<style>
  .event {
    display: flex;
    align-items: stretch;
    border: 1px solid var(--color-primary-200);
    overflow: hidden;
  }

  .start-time {
    font-weight: bold;
    padding: 1rem;
    background-color: var(--color-primary-100);
    width: 7rem;
    flex-shrink: 0;
    display: flex;
    align-items: center;
    justify-content: center;
  }

  .event-content {
    display: flex;
    flex-direction: column;
    flex: 1;
    padding: 1rem;
  }

  .event-header {
    display: flex;
    gap: 0.25rem;
  }

  .event-details {
    display: flex;
    flex-direction: column;
  }

  .pills {
    display: flex;
    gap: 0.5rem;
  }

  .pill {
    padding: 0.125rem 0.5rem;
    border-radius: 1rem;
    font-size: 0.85rem;
    font-weight: 500;
  }

  .sport-pill {
    background-color: var(--color-gray-200);
    color: var(--color-primary-700);
    font-weight: 700;
  }

  .live-pill {
    background-color: var(--color-accent-200);
    color: var(--color-primary-800);
  }

  .replay-pill {
    background-color: white;
    color: var(--color-primary-700);
    border: 1px solid var(--color-primary-200);
  }

  .event-name {
    font-size: 1.2rem;
    font-weight: bold;
  }

  .broadcaster {
    font-size: 0.9rem;
    color: var(--color-primary-600);
  }

  @media (max-width: 767px) {
    .event {
      display: flex;
      flex-direction: column;
      align-items: center; /* Center all content horizontally */
      text-align: center; /* Center text */
    }

    .start-time {
      width: auto;
      padding: 0.5rem 0;
      background-color: transparent;
      text-align: center; /* Center time text */
    }

    .event-content {
      padding: 0 0.75rem 0.75rem 0.75rem;
      display: flex;
      flex-direction: column;
      align-items: center; /* Center content horizontally */
    }

    .event-header {
      padding: 0.75rem 0;
      display: flex;
      justify-content: center; /* Center pills horizontally */
      align-items: center; /* Center pills vertically */
    }

    .pills {
      justify-content: center; /* Center pills horizontally */
      align-items: center; /* Center pills vertically */
      gap: 0.25rem; /* Reduce gap between pills */
    }

    .event-details {
      gap: 0.5rem;
      display: flex;
      flex-direction: column;
      align-items: center; /* Center details horizontally */
    }
  }
</style>
