<script lang="ts">
  import { page } from '$app/stores';
</script>

<div class="container mx-auto px-4 py-16 text-center">
  <h1 class="text-3xl font-bold mb-4 text-primary-800">Oops! Something went wrong</h1>
  <p class="text-gray-600 mb-6 text-lg">
    {$page.error?.message || 'An unexpected error occurred'}
  </p>
  <a 
    href="/" 
    class="inline-block px-6 py-3 bg-primary-600 text-white rounded-lg hover:bg-primary-700 transition-colors"
  >
    Go back home
  </a>
</div>
