<script lang="ts">
	import { flip } from 'svelte/animate';
	import { fade } from 'svelte/transition';
	import { page } from '$app/stores';
	import { tasks, selectedTask } from '$lib/stores/app';

	/// Components
	import { Button } from '@kahi-ui/framework';
	import ActivityCard from '$lib/components/Activity.svelte';
	import TaskDashboard from '$lib/components/TaskDashboard.svelte';
	import IconBack from '~icons/mdi/arrow-back';

	/// State
	$: id = $page.params.id;
	$: task = $tasks.find((task) => task.id === +id);

	$: $selectedTask = task;
</script>

<nav>
	<a href="/">
		<Button palette="accent">
			<IconBack />
		</Button>
	</a>
</nav>
<div class="content">
	<TaskDashboard {task} />
	<div class="log">
		{#each [...task.activities].reverse() as act (act.id)}
			<div animate:flip={{ duration: 300 }} transition:fade|local>
				<ActivityCard {act} />
			</div>
		{/each}
	</div>
</div>

<style lang="scss">
	.content {
		display: grid;
		grid-template-rows: auto auto;
		gap: 1rem;
	}
	.log {
		display: grid;
		gap: 1rem;
		grid-template-columns: repeat(auto-fill, minmax(360px, 1fr));
	}
</style>
