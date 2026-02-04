<script lang="ts">
	import type { Snippet } from 'svelte';
	import './layout.css';
	import favicon from '$lib/assets/favicon.svg';
	import Header from '$lib/Header.svelte';
	import { page } from '$app/stores';

	let { children }: { children: Snippet } = $props();

	const description = 'Watch guide for the Winter Olympics with schedules for USA viewers.';
</script>

<svelte:head>
	<title>Winter Olympics Watch Guide</title>
	<link rel="icon" href={favicon} />
	<meta name="viewport" content="width=device-width, initial-scale=1" />
	<meta name="description" content={description} />
	
	<!-- Open Graph for social sharing -->
	<meta property="og:title" content="Winter Olympics Watch Guide" />
	<meta property="og:description" content={description} />
	<meta property="og:url" content={$page.url.href} />
	<meta property="og:type" content="website" />
</svelte:head>

<a href="#main" class="sr-only focus:not-sr-only">Skip to main content</a>

<Header />

<main id="main" class="container mx-auto px-4 py-8">
	{@render children()}
</main>

