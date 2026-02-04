<script lang="ts">
	export let title = 'Winter Olympics Watch Guide';
</script>

<header class="bg-sky-800 text-white">
	<div class="container mx-auto px-4 py-4 flex items-center justify-between">
		<div class="flex items-center gap-3">
			<img src="/favicon.svg" alt="logo" class="w-8 h-8" />
			<h1 class="text-lg font-semibold">{title}</h1>
		</div>

		<nav class="text-sm opacity-90">
			<a href="/" class="mr-4 hover:underline">Schedule</a>
			<a href="/about" class="hover:underline">About</a>
		</nav>
	</div>
</header>
