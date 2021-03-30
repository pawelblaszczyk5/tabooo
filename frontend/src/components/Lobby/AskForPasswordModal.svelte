<script lang="ts">
	import {createEventDispatcher} from 'svelte';

	import Button from '../commons/Button.svelte';
	import Modal from '../commons/Modal.svelte';
	import Spacer from '../commons/Spacer.svelte';
	import TextInput from '../commons/TextInput.svelte';

	const dispatch = createEventDispatcher<{password: string}>();

	let password: string;

	const setPassword = () => {
		dispatch('password', password);
	};
</script>

<Modal preventExit={true}>
	<div class="flex flex-col items-center">
		<p>This lobby is password protected</p>
		<form class="flex flex-col items-center" on:submit|preventDefault={setPassword}>
			<Spacer y={5}>
				<TextInput placeholder="Enter password..." bind:value={password} />
			</Spacer>
			<Button>Join</Button>
		</form>
	</div>
</Modal>
