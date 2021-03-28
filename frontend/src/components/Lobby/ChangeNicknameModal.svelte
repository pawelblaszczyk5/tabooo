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
	<p>Nickname is required to join a lobby</p>
	<form class="flex flex-col items-center" on:submit|preventDefault={changeNickname}>
		<Spacer y={5}>
			<TextInput placeholder="Enter nickname..." bind:value={nickname} />
		</Spacer>
		<Button>Save</Button>
	</form>
</div>
