<script lang="ts">
	import Button, {ButtonType} from '../commons/Button.svelte';
	import Intro from './Intro.svelte';
</script>

<Intro />
<Button classes="my-5" type={ButtonType.PRIMARY} />
<Button type={ButtonType.SECONDARY} />
