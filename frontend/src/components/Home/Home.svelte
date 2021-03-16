<script lang="ts">
	import Button, {ButtonType} from '../commons/Button.svelte';
	import Intro from './Intro.svelte';
</script>

<Intro />
<Button classes="my-5" type={ButtonType.PRIMARY}>Test</Button>
<Button type={ButtonType.SECONDARY}>Test</Button>
<div class="w-52 h-52 bg-primaryFirstTeam transition-colors duration-300" />
<div class="w-52 h-52 bg-primarySecondTeam transition-colors duration-300" />
