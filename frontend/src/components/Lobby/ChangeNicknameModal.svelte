<script lang="ts">
	import {createEventDispatcher} from 'svelte';

	import Button from '../commons/Button.svelte';
	import Spacer from '../commons/Spacer.svelte';
	import TextInput from '../commons/TextInput.svelte';

	const dispatch = createEventDispatcher<{nicknameSet: string}>();

	let nickname: string;

	const changeNickname = () => {
		dispatch('nicknameSet', nickname);
	};
</script>

<div class="flex flex-col items-center">
	<p>Please provide nickname before joining lobby</p>
	<Spacer y={5}>
		<TextInput placeholder="Enter nickname..." bind:value={nickname} />
	</Spacer>
	<Button on:click={changeNickname}>Save nickname</Button>
</div>
