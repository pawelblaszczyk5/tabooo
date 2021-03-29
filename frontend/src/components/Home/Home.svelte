<script lang="ts">
	import Button, {ButtonType} from '../commons/Button.svelte';
	import Spacer from '../commons/Spacer.svelte';
	import Intro from './Intro.svelte';
	import {password} from '../../stores/password';
	import {push} from 'svelte-spa-router';

	password.clearPassword();
</script>

<div class="flex flex-col items-center">
	<Intro />
	<Spacer y={3}>
		<Button on:click={() => push('/lobbyCreator')} type={ButtonType.PRIMARY}>Create lobby</Button>
	</Spacer>
	<Spacer y={3}>
		<Button on:click={() => push('/lobbyList')} type={ButtonType.SECONDARY}>Join a lobby</Button>
	</Spacer>
</div>
