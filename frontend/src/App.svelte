<script lang="ts">
	import {link} from 'svelte-spa-router';
	import Router from 'svelte-spa-router';
	import Tailwind from './components/Tailwind.svelte';
	import {routes} from './routes';
</script>

<main class="flex flex-col w-full h-full items-center">
	<a href="/testA" use:link>Link A</a>
	<a href="/testB" use:link>Link B</a>
	<a href="/TestC" use:link>Link C</a>
	<p>Test asd</p>
	<Router {routes} />
	<Tailwind />
</main>
