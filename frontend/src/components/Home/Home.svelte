<script lang="ts">
	import Button, {ButtonType} from '../commons/Button.svelte';
	import Spacer from '../commons/Spacer.svelte';
	import Intro from './Intro.svelte';
</script>

<Intro />
<Spacer y={3}>
	<Button type={ButtonType.PRIMARY} />
</Spacer>
<Spacer y={3}>
	<Button type={ButtonType.SECONDARY} />
</Spacer>
