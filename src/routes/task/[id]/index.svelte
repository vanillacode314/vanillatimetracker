<script lang="ts">
	import DurationUnitFormat from 'intl-unofficial-duration-unit-format';
	const duration = new DurationUnitFormat(undefined, {
		style: DurationUnitFormat.styles.LONG,
		format: '{days} {hours} {minutes} {seconds}'
	});
	import { add } from '$lib/utils';
	import { page } from '$app/stores';
	import { tasks, selectedTask, selectedActivity, commentModalOpen } from '$lib/stores/app';
	import { endActivity, startActivity, type Activity } from '$lib/utils/tasks';
	import { Headline, Subhead, H3, Label, Button, Card } from 'attractions';
	import IconBack from '~icons/mdi/arrow-back';
	import IconPlay from '~icons/mdi/play';
	import IconPause from '~icons/mdi/pause';
	import ActivityCard from '$lib/components/Activity.svelte';

	$: id = $page.params.id;
	$: task = $tasks.find((task) => task.id === +id);
	$: running = task.activities.some((act) => act.done === false);

	$selectedTask = task;
	function toggle() {
		if (running) {
			endActivity(task.activities.find((act) => act.done === false));
		} else {
			startActivity(task);
		}
	}
</script>

<nav>
	<a href="/">
		<Button round filled>
			<IconBack />
		</Button>
	</a>
</nav>
<div class="content">
	<Card class="main--card">
		<div>
			<Headline>{task.label}</Headline>
			<Subhead>ID: {task.id}</Subhead>
			<Label
				>Total Time Spent: {duration.format(
					task.activities.map((act) => (act.done ? act.end - act.start : 0)).reduce(add, 0) / 1000
				)}</Label
			>
		</div>
		<Button round filled on:click={toggle}
			><svelte:component this={running ? IconPause : IconPlay} /></Button
		>
	</Card>
	<Card class="log">
		{#each [...task.activities].reverse() as act}
			<ActivityCard {act} />
		{/each}
	</Card>
</div>

<style lang="scss">
	.content {
		display: grid;
		grid-template-rows: auto auto;
		gap: 1rem;
	}
	:global(.main--card) {
		display: grid;
		gap: 1rem;
		justify-items: start;
	}
	:global(.log) {
		display: grid;
		gap: 1rem;
		grid-template-columns: repeat(auto-fit, minmax(500px, 1fr));
	}
</style>
