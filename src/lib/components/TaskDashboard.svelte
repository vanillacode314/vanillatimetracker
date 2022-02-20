<script lang="ts">
	import { goto } from '$app/navigation';
	import DurationUnitFormat from 'intl-unofficial-duration-unit-format';
	const duration = new DurationUnitFormat(undefined, {
		style: DurationUnitFormat.styles.LONG,
		format: '{days} {hours} {minutes} {seconds}'
	});

	import { add, exportToJsonFile } from '$lib/utils';
	import { endActivity, removeTask, startActivity, type Task } from '$lib/utils/tasks';

	/// Components
	import { Button, Card, Headline, Subhead, Label } from 'attractions';
	import IconPlay from '~icons/mdi/play';
	import IconPause from '~icons/mdi/pause';

	/// State
	import { selectedTask, editModalOpen } from '$lib/stores/app';
	export let task: Task;
	$: running = task.activities.some((act) => act.done === false);

	/// Methods
	async function remove() {
		await goto('/');
		removeTask(task.id);
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
</script>

<Card class="main--card">
	<div>
		<Headline>{task.label}</Headline>
		<Subhead>ID: {task.id}</Subhead>
		<Label
			>Total Time Spent: <span class="neutral">
				{duration.format(
					task.activities.map((act) => (act.done ? act.end - act.start : 0)).reduce(add, 0) / 1000
				)}
			</span></Label
		>
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
