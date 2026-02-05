<script lang="ts">
  import { onMount, onDestroy } from 'svelte';
  import Matchday from '$lib/Matchday.svelte';
  import StickyNav from '$lib/StickyNav.svelte';
  import { matchdays, filteredMatchdays } from '$lib/stores/matchdays';
  import { activeDate } from '$lib/stores/activeDate';
  import type { PageData } from './$types';

  export let data: PageData;

  // Use Svelte store for activeDate
  let observer: IntersectionObserver | null = null;
  let isScrolling = false;
  let scrollTimeout: ReturnType<typeof setTimeout> | null = null;
  let hasScrolledToToday = false;
  let isMounted = false;

  // Load data into store only when data.matchdays changes
  $: if (data.matchdays) {
    matchdays.set(data.matchdays);
  }

  // Auto-scroll to today when matchdays are loaded (only in browser)
  $: if (isMounted && $matchdays.length > 0 && !hasScrolledToToday) {
    hasScrolledToToday = true;
    const todayId = findTodayMatchday();
    if (todayId) {
      // Use setTimeout to ensure DOM elements are rendered
      setTimeout(() => {
        scrollToDate(todayId);
      }, 100);
    }
  }

  // Update observed elements when filtered matchdays change
  $: if (observer && $filteredMatchdays.length > 0) {
    // Disconnect all current observations
    observer.disconnect();
    
    // Observe all currently visible (filtered) matchdays
    $filteredMatchdays.forEach((matchday) => {
      const element = document.getElementById(matchday.id);
      if (element && observer) {
        observer.observe(element);
      }
    });
  }

  function findTodayMatchday(): string | null {
    const today = new Date();
    const todayString = today.toLocaleDateString('en-US', { 
      month: 'long', 
      day: 'numeric', 
      year: 'numeric' 
    });
    
    console.log('Today detected as:', todayString);
    console.log('Available matchday IDs:', $matchdays.map(m => m.id));
    console.log('Available matchday dates:', $matchdays.map(m => m.date));
    
    const todayMatchday = $matchdays.find(matchday => matchday.id === todayString);
    console.log('Found today matchday:', todayMatchday);
    return todayMatchday ? todayMatchday.id : null;
  }

  onMount(() => {
    isMounted = true;
    
    observer = new IntersectionObserver(
      (entries) => {
        // Skip observer updates during programmatic scrolling
        if (isScrolling) return;

        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            // Calculate how much of the viewport this section occupies
            const viewportHeight = window.innerHeight;
            const visibleHeight = entry.intersectionRect.height;
            const viewportRatio = visibleHeight / viewportHeight;
            
            // If this section takes up more than half the viewport, make it active
            if (viewportRatio > 0.5) {
              const target = entry.target;
              if (target instanceof HTMLElement) {
                activeDate.set(target.id);
              }
            }
          }
        });
      },
      {
        threshold: Array.from({ length: 101 }, (_, i) => i / 100)
      }
    );
  });

  onDestroy(() => {
    if (observer) {
      observer.disconnect();
      observer = null;
    }
    if (scrollTimeout) {
      clearTimeout(scrollTimeout);
    }
  });

  function scrollToDate(id: string): void {
    const element = document.getElementById(id);
    if (element) {
      // Set the active date immediately
      activeDate.set(id);
      
      // Disable observer during scroll
      isScrolling = true;
      
      // Clear any existing timeout
      if (scrollTimeout) {
        clearTimeout(scrollTimeout);
      }
      
      // Calculate position to place element about 1/3 down the viewport
      const elementTop = element.getBoundingClientRect().top + window.scrollY;
      const viewportHeight = window.innerHeight;
      const offset = viewportHeight / 3;
      const scrollPosition = elementTop - offset;
      
      window.scrollTo({ 
        top: scrollPosition, 
        behavior: 'smooth' 
      });
      
      // Re-enable observer after scroll completes
      // Smooth scroll typically takes 500-1000ms
      scrollTimeout = setTimeout(() => {
        isScrolling = false;
        scrollTimeout = null;
      }, 1000);
    } else {
      // Element doesn't exist (likely filtered out), but still set activeDate
      // so the UI can reflect the selection
      activeDate.set(id);
    }
  }
</script>

<section class="prose">
  {#each $filteredMatchdays as matchday}
    <div id={matchday.id}>
      <Matchday date={matchday.date} events={matchday.events} />
    </div>
  {/each}
</section>

<StickyNav matchdays={$matchdays} activeDate={$activeDate} {scrollToDate} filteredMatchdays={$filteredMatchdays} />
