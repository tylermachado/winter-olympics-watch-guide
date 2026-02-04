<script>
  import Event from './Event.svelte';
  export let date = '';
  export let events = /** @type {Array<{start_time: string, sport: string, event: string, is_live: boolean, is_replay: boolean, broadcaster: string}>} */ ([]);
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
      broadcaster={event.broadcaster} />
  {/each}
</div>

<style>
  .matchday {
    margin-bottom: 2rem;
  }

  h2 {
    font-size: 1.5rem;
    margin-bottom: 1rem;
  }
</style>
