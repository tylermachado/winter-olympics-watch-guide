<script>
  import { onMount } from 'svelte';
  import Event from '$lib/Event.svelte';

  let events = [];

  onMount(async () => {
    const response = await fetch('/data/schedule.json');
    const data = await response.json();
    events = data.filter(event => event.date === 'February 4, 2026');
  });
</script>

<section class="prose">
  <h1>Winter Olympics Watch Guide</h1>
  <p>This demo shows a simple schedule and medal tracker. Use the header to navigate.</p>

  {#each events as event}
    <Event 
      startTime={event.start_time} 
      sport={event.sport} 
      event={event.event} 
      isLive={event.is_live} 
      isReplay={event.is_replay} 
      broadcaster={event.broadcaster} />
  {/each}
</section>
