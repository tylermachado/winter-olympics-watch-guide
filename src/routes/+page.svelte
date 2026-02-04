<script lang="ts">
  import { onMount, onDestroy } from 'svelte';
  import Matchday from '$lib/Matchday.svelte';
  import StickyNav from '$lib/StickyNav.svelte';
  import { matchdays, filteredMatchdays, loadMatchdays } from '$lib/stores/matchdays';

  let activeDate = '';
  let observer: IntersectionObserver | null = null;

  onMount(async () => {
    const allMatchdays = await loadMatchdays();

    observer = new IntersectionObserver(
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
        observer!.observe(element);
      }
    });
  });

  onDestroy(() => {
    if (observer) {
      observer.disconnect();
    }
  });

  function scrollToDate(id: string) {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
      activeDate = id;
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

<StickyNav matchdays={$matchdays} {activeDate} {scrollToDate} filteredMatchdays={$filteredMatchdays} />
