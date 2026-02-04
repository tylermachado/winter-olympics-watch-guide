<script>
  import { onMount } from 'svelte';
  import Matchday from '$lib/Matchday.svelte';

  let matchdays = [];
  let activeDate = '';

  onMount(async () => {
    const response = await fetch('/data/schedule.json');
    const data = await response.json();

    const groupedEvents = data.reduce((acc, event) => {
      if (!acc[event.date]) {
        acc[event.date] = [];
      }
      acc[event.date].push(event);
      return acc;
    }, {});

    matchdays = Object.entries(groupedEvents).map(([date, events]) => {
      const dateObj = new Date(date);
      const dayOfWeek = new Intl.DateTimeFormat('en-US', { weekday: 'long' }).format(dateObj);
      const shortDayOfWeek = new Intl.DateTimeFormat('en-US', { weekday: 'short' }).format(dateObj).toUpperCase();
      const shortMonth = new Intl.DateTimeFormat('en-US', { month: 'short' }).format(dateObj).toUpperCase();
      const day = dateObj.getDate();
      return { 
        date: `${dayOfWeek}, ${date.split(', ')[0]}`, 
        shortDate: `${shortDayOfWeek} ${shortMonth} ${day}`, 
        events, 
        id: date 
      };
    });

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            activeDate = entry.target.id;
          }
        });
      },
      { threshold: 0.5 }
    );

    matchdays.forEach((matchday) => {
      const element = document.getElementById(matchday.id);
      if (element) {
        observer.observe(element);
      }
    });
  });

  function scrollToDate(id) {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
      activeDate = id;
    }
  }
</script>

<section class="prose">
  {#each matchdays as matchday}
    <div id={matchday.id}>
      <Matchday date={matchday.date} events={matchday.events} />
    </div>
  {/each}
</section>

<nav class="sticky-nav">
  <div class="nav-container">
    {#each matchdays as matchday}
      <button 
        class:active={activeDate === matchday.id} 
        on:click={() => scrollToDate(matchday.id)}>
        {matchday.shortDate}
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
    padding: 1rem 0;
    box-shadow: 0 -2px 5px rgba(0, 0, 0, 0.1);
  }

  .nav-container {
    display: flex;
    flex-wrap: nowrap;
    gap: 1rem;
    padding: 0 1rem;
  }

  .sticky-nav button {
    background: none;
    border: none;
    padding: 0.5rem 1rem;
    cursor: pointer;
    font-size: 1rem;
    color: #007acc;
    white-space: nowrap;
  }

  .sticky-nav button.active {
    font-weight: bold;
    color: #0056b3;
    text-decoration: underline;
  }

  .sticky-nav button:hover {
    text-decoration: underline;
  }
</style>
