<script lang="ts">
    import { filters, updateFilter, clearFilters, SPORTS } from './stores/filters';
    
    export let title = 'Winter Olympics Watch Guide';
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
                value={$filters.sport || ''}
                on:change={(e) => updateFilter('sport', e.currentTarget.value)}
                class="px-3 py-1.5 rounded bg-primary-700 text-white text-sm border border-primary-600 focus:outline-none focus:ring-2 focus:ring-primary-400"
            >
                <option value="">All Sports</option>
                {#each SPORTS as sport}
                    <option value={sport}>{sport}</option>
                {/each}
            </select>

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

            {#if $filters.sport || $filters.liveOnly || $filters.goldMedalOnly || $filters.usaOnly}
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
