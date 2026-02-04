<script>
  export let startTime = '';
  export let sport = '';
  export let event = '';
  export let isLive = false;
  export let isReplay = false;
  export let broadcaster = '';
  export let teams = /** @type {{team1: string, team2: string} | undefined} */ (undefined);
  
  // Create display name with teams if available
  // Skip teams if they contain underscores (placeholder for unknown teams)
  $: displayEvent = teams && !teams.team1.includes('_') && !teams.team2.includes('_')
    ? `${event} (${teams.team1} vs ${teams.team2})`.trim()
    : event;
</script>

<div class="event">
  <div class="start-time">{startTime}</div>
  <div class="event-details">
    <div class="sport">{sport}</div>
    <div class="event-name">{displayEvent}</div>
    <div class="status">
      {#if isLive}
        <span>Live</span>
      {:else if isReplay}
        <span>Replay</span>
      {/if}
    </div>
    <div class="broadcaster">{broadcaster}</div>
  </div>
</div>

<style>
  .event {
    display: flex;
    align-items: center;
    margin-bottom: 1rem;
  }

  .start-time {
    font-weight: bold;
    margin-right: 1rem;
  }

  .event-details {
    display: flex;
    flex-direction: column;
  }

  .sport {
    font-size: 0.9rem;
    color: gray;
  }

  .event-name {
    font-size: 1.1rem;
    font-weight: bold;
  }

  .status {
    font-size: 0.9rem;
    color: red;
  }

  .broadcaster {
    font-size: 0.9rem;
    color: blue;
  }
</style>
