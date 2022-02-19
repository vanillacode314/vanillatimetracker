<script lang="ts">
	import { tasks } from '$lib/stores/app';
	import Task from '$lib/components/Task.svelte';
</script>

<section class="tasks" aria-label="tasks list">
	{#each $tasks as task}
		<Task {task} />
	{/each}
</section>

<style lang="scss">
	section.tasks {
		display: grid;
		grid-template-columns: repeat(auto-fill, minmax(360px, 1fr));
		gap: 0.5rem;
	}
</style>
