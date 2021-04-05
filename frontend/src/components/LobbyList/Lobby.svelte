<script lang="ts">
	import type {LobbyData} from '../../model/lobbyData';
	import FaLock from 'svelte-icons/fa/FaLock.svelte';
	import FaLockOpen from 'svelte-icons/fa/FaLockOpen.svelte';
	import Button from '../commons/Button.svelte';
	import {Language} from '../../model/language';
	import {push, link} from 'svelte-spa-router';
	export let lobby: LobbyData;
</script>

<a href="/lobby/{lobby.id}" use:link class="col-span-4 text-center">{lobby.name}</a>
<div class="col-span-2 flex justify-center">
	<div class="w-5 h-5 text-primaryFontColor">
		<svelte:component this={lobby.secured ? FaLock : FaLockOpen} />
	</div>
</div>
<p class="col-span-2 text-center">{lobby.language === Language.ENGLISH ? 'English' : 'Polish'}</p>
<div class="col-span-2 hidden sm:flex items-center">
	<Button on:click={() => push('/lobby/' + lobby.id)}>Join to lobby</Button>
</div>
