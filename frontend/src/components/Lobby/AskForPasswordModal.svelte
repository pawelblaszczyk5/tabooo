<script lang="ts">
	import {createEventDispatcher} from 'svelte';

	import Button from '../commons/Button.svelte';
	import Spacer from '../commons/Spacer.svelte';
	import TextInput from '../commons/TextInput.svelte';

	const dispatch = createEventDispatcher<{password: string}>();

	let nickname: string;

	const changeNickname = () => {
		dispatch('password', nickname);
	};
</script>

<div class="flex flex-col items-center">
	<p>This lobby is password protected</p>
	<Spacer y={5}>
		<TextInput placeholder="Enter password..." bind:value={nickname} />
	</Spacer>
	<Button on:click={changeNickname}>Join</Button>
</div>
