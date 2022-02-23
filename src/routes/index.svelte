<script lang="ts">
	import Tasks from '$lib/layouts/Tasks.svelte';
	import Toolbar from '$lib/layouts/Toolbar.svelte';
</script>

<div class="wrapper">
	<div class="tasks">
		<Tasks />
	</div>
	<div class="toolbar">
		<Toolbar />
	</div>
</div>

<style lang="scss">
	.wrapper {
		display: grid;
		height: 100%;
		grid-template-rows: 1fr auto;
		gap: 1rem;
	}
	.tasks {
		overflow-y: auto;
	}
</style>
