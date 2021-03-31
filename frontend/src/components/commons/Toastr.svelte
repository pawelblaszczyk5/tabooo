<script lang="ts">
	import {fly} from 'svelte/transition';
	import FaExclamationTriangle from 'svelte-icons/fa/FaExclamationTriangle.svelte';
</script>

<div class="w-64 p-3 bg-primaryAccent rounded flex items-center" in:fly={{x: -300, duration: 1000}} out:fly={{x: 300, duration: 1000}}>
	<div class="w-5 h-5 mr-2 flex-shrink-0"><FaExclamationTriangle /></div>
	<p class="text-base font-semibold"><slot /></p>
</div>
