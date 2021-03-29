<script lang="ts">
	import {createEventDispatcher} from 'svelte';
	import Modal from './Modal.svelte';
	import Spacer from './Spacer.svelte';
	import TextInput from './TextInput.svelte';
	import Button from './Button.svelte';

	const dispatch = createEventDispatcher<{nicknameSet: string}>();

	let nickname: string;

	const changeNickname = () => {
		dispatch('nicknameSet', nickname);
	};
</script>

<Modal preventExit={true}>
	<div class="flex flex-col items-center">
		<p>Nickname is required to proceed</p>
		<form class="flex flex-col items-center" on:submit|preventDefault={changeNickname}>
			<Spacer y={5}>
				<TextInput placeholder="Enter nickname..." bind:value={nickname} />
			</Spacer>
			<Button>Save</Button>
		</form>
	</div>
</Modal>
