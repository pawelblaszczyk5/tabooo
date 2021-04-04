<script lang="ts">
	import {createEventDispatcher} from 'svelte';
	import {fly} from 'svelte/transition';
	import Modal from './Modal.svelte';
	import Spacer from './Spacer.svelte';
	import TextInput from './TextInput.svelte';
	import Button from './Button.svelte';

	const dispatch = createEventDispatcher<{nicknameSet: string}>();

	let nickname = '';
	let triedToSubmit = false;

	const changeNickname = () => {
		valid ? dispatch('nicknameSet', nickname) : (triedToSubmit = true);
	};

	$: valid = nickname.trim() !== '';
</script>

<Modal preventExit={true}>
	<div class="flex flex-col items-center">
		<p>Nickname is required to proceed</p>
		<form class="flex flex-col items-center" on:submit|preventDefault={changeNickname}>
			<Spacer y={5}>
				<div class="flex flex-col items-center">
					<TextInput placeholder="Enter nickname..." bind:value={nickname} />
					{#if triedToSubmit}
						<p in:fly={{duration: 300}} class="mt-2 font-semibold">Please provide non-empty nickname</p>
					{/if}
				</div>
			</Spacer>
			<Button>Save</Button>
		</form>
	</div>
</Modal>
