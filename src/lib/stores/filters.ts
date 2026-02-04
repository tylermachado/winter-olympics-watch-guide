import { derived } from 'svelte/store';
import { page } from '$app/stores';
import { goto } from '$app/navigation';
import { get } from 'svelte/store';
import { browser } from '$app/environment';

export const filters = derived(page, ($page) => ({
  sport: browser ? $page.url.searchParams.get('sport') || null : null,
  liveOnly: browser ? $page.url.searchParams.get('live') === 'true' : false,
  goldMedalOnly: browser ? $page.url.searchParams.get('gold') === 'true' : false,
  usaOnly: browser ? $page.url.searchParams.get('usa') === 'true' : false
}));

export function updateFilter(key: string, value: string | boolean) {
  const currentPage = get(page);
  const params = new URLSearchParams(currentPage.url.searchParams);
  
  if (value && value !== '') {
    params.set(key, String(value));
  } else {
    params.delete(key);
  }
  
  goto(`?${params.toString()}`, { replaceState: true, noScroll: true });
}

export function clearFilters() {
  const currentPage = get(page);
  const baseUrl = currentPage.url.pathname.split('/').slice(0, -1).join('/') || '/';
  goto(baseUrl, { replaceState: true });
}

export const SPORTS = [
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
] as const;
