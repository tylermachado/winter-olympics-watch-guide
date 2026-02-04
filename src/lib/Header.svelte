<script lang="ts">
    import { page } from '$app/stores';
    import { goto } from '$app/navigation';
    
    export let title = 'Winter Olympics Watch Guide';

    // Get current filter values from URL
    $: sport = $page.url.searchParams.get('sport') || '';
    $: liveOnly = $page.url.searchParams.get('live') === 'true';
    $: goldMedalOnly = $page.url.searchParams.get('gold') === 'true';
    $: usaOnly = $page.url.searchParams.get('usa') === 'true';

    // Available sports for the dropdown
    const sports = [
        'Alpine Skiing',
        'Biathlon',
        'Bobsled',
        'Cross-Country Skiing',
        'Curling',
        'Figure Skating',
        'Freestyle Skiing',
        'Ice Hockey',
        'Luge',
        'Nordic Combined',
        'Short Track Speed Skating',
        'Skeleton',
        'Ski Jumping',
        'Snowboard',
        'Speed Skating'
    ];

    function updateFilter(key: string, value: string | boolean) {
        const params = new URLSearchParams($page.url.searchParams);
        
        if (value && value !== '') {
            params.set(key, String(value));
        } else {
            params.delete(key);
        }
        
        goto(`?${params.toString()}`, { replaceState: true, noScroll: true });
    }

    function clearFilters() {
        goto('/', { replaceState: true });
    }
</script>

<header class="bg-primary-800 text-white">
    <div class="container mx-auto px-4 py-4">
        <div class="flex items-center justify-between mb-4">
            <div class="flex items-center gap-3">
                <h1 class="text-lg font-semibold">{title}</h1>
            </div>
        </div>

        <!-- Filters -->
        <div class="flex flex-wrap gap-3 items-center">
            <select 
                value={sport}
                on:change={(e) => updateFilter('sport', e.currentTarget.value)}
                class="px-3 py-1.5 rounded bg-primary-700 text-white text-sm border border-primary-600 focus:outline-none focus:ring-2 focus:ring-primary-400"
            >
                <option value="">All Sports</option>
                {#each sports as sportOption}
                    <option value={sportOption}>{sportOption}</option>
                {/each}
            </select>

            <label class="flex items-center gap-2 text-sm cursor-pointer">
                <input 
                    type="checkbox" 
                    checked={liveOnly}
                    on:change={(e) => updateFilter('live', e.currentTarget.checked)}
                    class="rounded"
                />
                Live Only
            </label>

            <label class="flex items-center gap-2 text-sm cursor-pointer">
                <input 
                    type="checkbox" 
                    checked={goldMedalOnly}
                    on:change={(e) => updateFilter('gold', e.currentTarget.checked)}
                    class="rounded"
                />
                Gold Medal Events
            </label>

            <label class="flex items-center gap-2 text-sm cursor-pointer">
                <input 
                    type="checkbox" 
                    checked={usaOnly}
                    on:change={(e) => updateFilter('usa', e.currentTarget.checked)}
                    class="rounded"
                />
                USA Only
            </label>

            {#if sport || liveOnly || goldMedalOnly || usaOnly}
                <button 
                    on:click={clearFilters}
                    class="text-sm underline opacity-90 hover:opacity-100"
                >
                    Clear Filters
                </button>
            {/if}
        </div>
    </div>
</header>
