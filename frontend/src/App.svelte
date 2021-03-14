<script lang="ts">
	import Router from 'svelte-spa-router';
	import Tailwind from './components/Tailwind.svelte';
	import {routes} from './routes';
</script>

<main class="flex flex-col w-screen h-screen items-center bg-primary">
	<Router {routes} />
	<Tailwind />
</main>
