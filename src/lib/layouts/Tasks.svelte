<script lang="ts">
	import { fade } from 'svelte/transition';
	import { flip } from 'svelte/animate';
	import { tasks } from '$lib/stores/app';
	import Task from '$lib/components/Task.svelte';
</script>

<section class="tasks" aria-label="tasks list">
	{#each $tasks as task (task.id)}
		<div animate:flip={{ duration: 300 }} transition:fade|local>
			<Task {task} />
		</div>
	{/each}
</section>

<style lang="scss">
	section.tasks {
		display: grid;
		grid-template-columns: repeat(auto-fill, minmax(360px, 1fr));
		gap: 0.5rem;
	}
</style>
