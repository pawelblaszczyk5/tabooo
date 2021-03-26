<script lang="ts">
	export let x = 0;
	export let y = 0;
</script>

<div class="mx-{x} my-{y}">
	<slot />
</div>
