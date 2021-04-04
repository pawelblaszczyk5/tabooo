<script lang="ts">
	import {createEventDispatcher} from 'svelte';
	import {fly} from 'svelte/transition';
	import Button from '../commons/Button.svelte';
	import Modal from '../commons/Modal.svelte';
	import Spacer from '../commons/Spacer.svelte';
	import TextInput from '../commons/TextInput.svelte';

	const dispatch = createEventDispatcher<{password: string}>();

	let password = '';
	let triedToSubmit = false;

	const setPassword = () => {
		valid ? dispatch('password', password) : (triedToSubmit = true);
	};

	$: valid = password !== '';
</script>

<Modal preventExit={true}>
	<div class="flex flex-col items-center">
		<p>This lobby is password protected</p>
		<form class="flex flex-col items-center" on:submit|preventDefault={setPassword}>
			<Spacer y={5}>
				<div class="flex flex-col items-center">
					<TextInput placeholder="Enter password..." bind:value={password} />
					{#if triedToSubmit}
						<p in:fly={{duration: 300}} class="mt-2 font-semibold">Password is required to join this lobby</p>
					{/if}
				</div>
			</Spacer>
			<Button>Join</Button>
		</form>
	</div>
</Modal>
