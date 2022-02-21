<script lang="ts">
	import DurationUnitFormat from 'intl-unofficial-duration-unit-format';
	const duration = new DurationUnitFormat(undefined, {
		style: DurationUnitFormat.styles.LONG,
		format: '{days} {hours} {minutes} {seconds}'
	});

	import { add, exportToJsonFile, round } from '$lib/utils';
	import { endActivity, startActivity, type Task } from '$lib/utils/tasks';

	/// Components
	import { Switch, Button, Card, Headline, Subhead, Label } from 'attractions';
	import IconPlay from '~icons/mdi/play';
	import IconPause from '~icons/mdi/pause';

	/// State
	import { tasks, selectedTask, editModalOpen, removeTaskModalOpen } from '$lib/stores/app';
	import { tick } from 'svelte';
	export let task: Task;
	$: running = task.activities.some((act) => act.done === false);
	$: total_time_spent = duration.format(
		task.activities.map((act) => (act.done ? act.end - act.start : 0)).reduce(add, 0) / 1000
	);
	$: total_earnings = round(
		((task.rate / (60 * 60)) *
			task.activities.map((act) => (act.done ? act.end - act.start : 0)).reduce(add, 0)) /
			1000,
		2
	);

	/// Methods
	async function remove() {
		$selectedTask = task;
		$removeTaskModalOpen = true;
	}

	function toggle() {
		if (running) {
			endActivity(task.activities.find((act) => act.done === false));
		} else {
			startActivity(task);
		}
	}

	function exportTask() {
		exportToJsonFile(task, `${task.id}-${task.label}`.replaceAll(' ', '-'));
	}

	function edit() {
		$selectedTask = task;
		$editModalOpen = true;
	}

	function onPaidChanged() {
		tick().then(() => ($tasks = $tasks));
		if (task.paid) {
			alert('now you can set a rate in edit menu.');
		}
	}
</script>

<Card class="main--card">
	<Switch class="paid--switch" bind:value={task.paid} on:change={onPaidChanged}>Paid</Switch>
	<div>
		<Headline>{task.label}</Headline>
		<Subhead>ID: {task.id}</Subhead>
		<Label
			>Total Time Spent: <span class="neutral">
				{total_time_spent}
			</span></Label
		>
		{#if task.paid}
			<Label
				>Total Earnings: <span class="neutral">
					{task.currency}
					{total_earnings}
				</span></Label
			>
		{/if}
	</div>
	<div class="task--actions">
		<Button round filled on:click={toggle}
			><svelte:component this={running ? IconPause : IconPlay} /></Button
		>
		<span class="end">
			<Button on:click={edit}>Edit</Button>
			<Button danger on:click={remove}>Remove</Button>
			<Button on:click={exportTask}>Export</Button>
		</span>
	</div>
</Card>

<style lang="scss">
	span.neutral {
		color: var(--foreground-color);
	}
	:global(.main--card) {
		display: grid;
		gap: 1rem;
		justify-items: start;
	}
	.task--actions {
		display: flex;
		gap: 1rem;
		align-items: center;
		justify-content: space-between;
		width: 100%;
	}
	.end {
		display: flex;
		gap: 1rem;
	}
</style>
