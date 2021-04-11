<script lang="ts">
	import {toastr} from '../../stores/toastr';
	import Spacer from '../commons/Spacer.svelte';
	import Toastr from '../commons/Toastr.svelte';
</script>

<div class="fixed bottom-4 right-4">
	{#each $toastr as singleToastr (singleToastr.id)}
		<Spacer y={1}>
			<Toastr>{singleToastr.message}</Toastr>
		</Spacer>
	{/each}
</div>
