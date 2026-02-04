<script>
  import { onMount } from 'svelte';
  import Matchday from '$lib/Matchday.svelte';
  import { page } from '$app/stores';
  import { goto } from '$app/navigation';
  import { derived, writable } from 'svelte/store';

  let matchdays = writable([]);
  let activeDate = '';

  // Derive filters directly from URL
  let filters = derived(page, ($page) => ({
    sport: $page.url.searchParams.get('sport') || null,
    liveOnly: $page.url.searchParams.get('live') === 'true',
    goldMedalOnly: $page.url.searchParams.get('gold') === 'true',
    usaOnly: $page.url.searchParams.get('usa') === 'true'
  }));

  // Filtered matchdays based on current filters
  let filteredMatchdays = derived([matchdays, page], ([$matchdays, $page]) => {
    const currentFilters = {
      sport: $page.url.searchParams.get('sport') || null,
      liveOnly: $page.url.searchParams.get('live') === 'true',
      goldMedalOnly: $page.url.searchParams.get('gold') === 'true',
      usaOnly: $page.url.searchParams.get('usa') === 'true'
    };

    return $matchdays.map(matchday => {
      const filteredEvents = matchday.events.filter(event => {
        // Apply sport filter (case-insensitive)
        if (currentFilters.sport && event.sport.toUpperCase() !== currentFilters.sport.toUpperCase()) {
          return false;
        }
        
        // Apply live only filter
        if (currentFilters.liveOnly && !event.is_live) {
          return false;
        }
        
        // Apply gold medal only filter - check is_medal_event field
        if (currentFilters.goldMedalOnly && !event.is_medal_event) {
          return false;
        }
        
        // Apply USA only filter - check for "United States"
        if (currentFilters.usaOnly) {
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
    }).filter(matchday => matchday.events.length > 0); // Only include days with events
  });

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

    const allMatchdays = Object.entries(groupedEvents).map(([date, events]) => {
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

    matchdays.set(allMatchdays);

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

    allMatchdays.forEach((matchday) => {
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

  // Update URL to change filters
  function updateFilter(key, value) {
    const params = new URLSearchParams($page.url.searchParams);
    if (value) {
      params.set(key, value);
    } else {
      params.delete(key);
    }
    goto(`?${params.toString()}`, { replaceState: true, noScroll: true });
  }
</script>

<section class="prose">
  {#each $filteredMatchdays as matchday}
    <div id={matchday.id}>
      <Matchday date={matchday.date} events={matchday.events} />
    </div>
  {/each}
</section>

<nav class="sticky-nav">
  <div class="nav-container">
    {#each $filteredMatchdays as matchday}
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
    color: oklch(0.54 0.15 210);
    white-space: nowrap;
  }

  .sticky-nav button.active {
    font-weight: bold;
    color: oklch(0.46 0.14 210);
    text-decoration: underline;
  }

  .sticky-nav button:hover {
    text-decoration: underline;
  }
</style>
