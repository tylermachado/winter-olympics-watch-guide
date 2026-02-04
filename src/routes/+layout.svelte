<script lang="ts">
	import type { Snippet } from 'svelte';
	import './layout.css';
	import favicon from '$lib/assets/favicon.svg';
	import Header from '$lib/Header.svelte';

	let { children }: { children: Snippet } = $props();
</script>

<svelte:head>
	<link rel="icon" href={favicon} />
	<meta name="viewport" content="width=device-width, initial-scale=1" />
	<meta name="description" content="Winter Olympics Watch Guide" />
</svelte:head>

<a href="#main" class="sr-only focus:not-sr-only">Skip to main content</a>

<Header />

<main id="main" class="container mx-auto px-4 py-8">
	{@render children()}
</main>

