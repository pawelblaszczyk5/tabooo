<script lang="ts">
	import type {Player} from '../../model/player';
	import {admin} from '../../stores/admin';
	import RangeInput from '../commons/RangeInput.svelte';
	import Spacer from '../commons/Spacer.svelte';
	import FaTimes from 'svelte-icons/fa/FaTimes.svelte';
	import {Team} from '../../model/team';
	import {get} from 'svelte/store';
	import {socket} from '../../stores/socket';
	import RemoteAudio from './RemoteAudio.svelte';

	export let player: Player;

	const isSelf = player.id === get(socket)?.id;

	const kickPlayer = () => {
		get(socket)?.emit('playerKick', player.id);
	};
</script>

<div
	class="{player.team === Team.FIRST
		? 'bg-primaryFirstTeam'
		: player.team === Team.SECOND
		? 'bg-primarySecondTeam'
		: ''} border border-gray-200 border-opacity-40 rounded-md p-6 relative">
	{#if $admin && !isSelf}
		<div
			on:click={kickPlayer}
			class="{player.team === Team.FIRST
				? 'text-secondaryFontColor'
				: player.team === Team.SECOND
				? 'text-secondaryFontColor'
				: ''} absolute top-3 right-3 w-4 h-4 cursor-pointer transform hover:scale-125 transition-transform duration-500">
			<FaTimes />
		</div>
	{/if}
	<p
		class="{player.team === Team.FIRST || player.team === Team.SECOND
			? 'text-secondaryFontColor'
			: ''} 
		font-semibold overflow-ellipsis h-6 text-base overflow-hidden whitespace-nowrap w-full">
		Nickname: {player.nickname}
	</p>
	{#if isSelf}
		<p class={player.team === Team.FIRST || player.team === Team.SECOND ? 'text-secondaryFontColor' : ''}>It's you!</p>
	{:else}
		<Spacer y={1}>
			<RangeInput bind:value={player.volume} />
		</Spacer>
		<RemoteAudio mediaStream={player.mediaStream} volume={player.volume} />
	{/if}
</div>
