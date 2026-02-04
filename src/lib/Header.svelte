<script lang="ts">
    import { filters, updateFilter, clearFilters, SPORTS } from './stores/filters';
    
    export let title = 'Winter Olympics Watch Guide';
    let drawerOpen = false;
</script>

<header class="bg-primary-800 text-white sticky top-0 z-10">
    <div class="container mx-auto px-4 py-4">
        <div class="flex items-center justify-between mb-4">
            <div class="flex items-center gap-3">
                <h1 class="text-4xl font-bold">{title}</h1>
            </div>
        </div>

        <!-- Filters -->
        <div class="flex flex-col md:flex-row flex-wrap gap-3 items-center">
            <select 
                value={$filters.sport || ''}
                on:change={(e) => updateFilter('sport', e.currentTarget.value)}
                class="px-3 py-1.5 rounded bg-primary-700 text-white text-sm border border-primary-600 focus:outline-none focus:ring-2 focus:ring-primary-400"
            >
                <option value="">All Sports</option>
                {#each SPORTS as sport}
                    <option value={sport}>{sport}</option>
                {/each}
            </select>

            <!-- Checkbox filters: on mobile, full width below dropdown; on md+, inline -->
            <div class="flex flex-row w-full md:w-auto gap-2 md:gap-3 mt-2 md:mt-0">
                <label class="flex items-center gap-2 text-sm cursor-pointer">
                    <input 
                        type="checkbox" 
                        checked={$filters.liveOnly}
                        on:change={(e) => updateFilter('live', e.currentTarget.checked)}
                        class="rounded"
                    />
                    Live Only
                </label>

                <label class="flex items-center gap-2 text-sm cursor-pointer">
                    <input 
                        type="checkbox" 
                        checked={$filters.goldMedalOnly}
                        on:change={(e) => updateFilter('gold', e.currentTarget.checked)}
                        class="rounded"
                    />
                    Gold Medal Events
                </label>

                <label class="flex items-center gap-2 text-sm cursor-pointer">
                    <input 
                        type="checkbox" 
                        checked={$filters.usaOnly}
                        on:change={(e) => updateFilter('usa', e.currentTarget.checked)}
                        class="rounded"
                    />
                    USA Only
                </label>
            </div>

            {#if $filters.sport || $filters.liveOnly || $filters.goldMedalOnly || $filters.usaOnly}
                <button 
                    on:click={clearFilters}
                    class="text-sm underline opacity-90 hover:opacity-100"
                >
                    Clear Filters
                </button>
            {/if}
        </div>
        <!-- Drawer Toggle Button: lower right of header -->
        <button
            on:click={() => drawerOpen = !drawerOpen}
            class="absolute bottom-2 right-4 flex items-center gap-1 px-3 py-1.5 bg-primary-700 rounded shadow text-sm hover:bg-primary-600 focus:outline-none z-20"
            aria-expanded={drawerOpen}
            aria-controls="header-drawer"
        >
            <span>Credits</span>
            <svg class="w-4 h-4 transition-transform duration-200" style="transform: rotate({drawerOpen ? 180 : 0}deg);" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" d="M19 9l-7 7-7-7" />
            </svg>
        </button>

        {#if drawerOpen}
            <div 
                id="header-drawer"
                class="absolute left-0 right-0 bg-primary-900 text-white p-4 shadow-lg transition-all duration-300 z-20"
                style="top:100%"
            >
                <p class="text-sm opacity-90">Design and engineering by <a href="//tylermachado.com">tylermachado.com</a>. Data by <a href="https://www.reddit.com/r/olympics/comments/1qufpx4/printable_winter_olympics_2026_tv_schedule_us_est/">/u/moviesdirector</a>.</p>
            </div>
        {/if}
    </div>
</header>
