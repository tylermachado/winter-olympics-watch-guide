<script lang="ts">
  import type { Matchday } from './types';

  export let matchdays: Matchday[] = [];
  export let activeDate: string = '';
  export let scrollToDate: (id: string) => void = () => {};
  export let filteredMatchdays: Matchday[] = [];

  $: availableMatchdays = new Set(filteredMatchdays.map(matchday => matchday.id));
</script>

<nav class="sticky-nav">
  <div class="nav-container">
    {#each matchdays as matchday}
      {@const parts = matchday.shortDate.split(' ')}
      {@const isDisabled = !availableMatchdays.has(matchday.id)}
      <button 
        class:active={activeDate === matchday.id} 
        class:disabled={isDisabled}
        on:click={() => !isDisabled && scrollToDate(matchday.id)}
        disabled={isDisabled}>
        <span class="day-of-week">{parts[0]}</span>
        <span class="month">{parts[1]}</span>
        <span class="day">{parts[2]}</span>
      </button>
    {/each}
  </div>
</nav>

<style>
  .sticky-nav {
    position: fixed;
    bottom: 0;
    left: 0;
    right: 0;
    background: white;
    display: flex;
    overflow-x: auto;
    padding: 0;
    box-shadow: 0 -2px 5px rgba(0, 0, 0, 0.1);
  }

  .nav-container {
    display: flex;
    flex-wrap: nowrap;
    gap: 0;
    padding: 0;
  }

  .sticky-nav button {
    background: white;
    border: none;
    padding: 0.75rem 1.5rem;
    cursor: pointer;
    color: oklch(0.54 0.15 210);
    white-space: nowrap;
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 0.25rem;
    min-width: 90px;
    transition: background-color 0.2s, color 0.2s;
  }

  .sticky-nav button.disabled {
    background: oklch(0.9 0.02 210);
    color: oklch(0.7 0.02 210);
    cursor: not-allowed;
  }

  .sticky-nav button .day-of-week,
  .sticky-nav button .month {
    font-size: 0.75rem;
    font-weight: 500;
  }

  .sticky-nav button .day {
    font-size: 1.5rem;
    font-weight: 700;
  }

  .sticky-nav button.active {
    background: oklch(0.46 0.14 210);
    color: white;
  }

  .sticky-nav button:hover:not(.active):not(.disabled) {
    background: oklch(0.95 0.02 210);
  }
</style>
