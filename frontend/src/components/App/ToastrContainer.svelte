<script lang="ts">
	import {toastr} from '../../stores/toastr';
	import Toastr from '../commons/Toastr.svelte';
</script>

<div class="absolute bottom-4 right-4">
	{#each $toastr as singleToastr}
		<Toastr>{singleToastr.message}</Toastr>
	{/each}
</div>
