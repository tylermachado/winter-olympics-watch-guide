<script>
  import { onMount } from 'svelte';
  import Matchday from '$lib/Matchday.svelte';

  let events = [];
  let dayOfWeek = '';

  onMount(async () => {
    const response = await fetch('/data/schedule.json');
    const data = await response.json();
    events = data.filter(event => event.date === 'February 4, 2026');

    const date = new Date('February 4, 2026');
    const options = { weekday: 'long' };
    dayOfWeek = new Intl.DateTimeFormat('en-US', options).format(date);
  });
</script>

<section class="prose">
  <h1>Winter Olympics Watch Guide</h1>
  <p>This demo shows a simple schedule and medal tracker. Use the header to navigate.</p>

  <Matchday date={`${dayOfWeek}, February 4`} events={events} />
</section>
