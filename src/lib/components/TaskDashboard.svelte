<script lang="ts">
	import DurationUnitFormat from 'intl-unofficial-duration-unit-format';
	const duration = new DurationUnitFormat(undefined, {
		style: DurationUnitFormat.styles.LONG,
		format: '{days} {hours} {minutes} {seconds}'
	});
	import { add, exportToJsonFile, round } from '$lib/utils';
	import { endActivity, startActivity, type Task } from '$lib/utils/tasks';

	/// Components
	import { Badge, Text, Spacer, Card, Button, Switch } from '@kahi-ui/framework';
	import IconPlay from '~icons/mdi/play';
	import IconPause from '~icons/mdi/pause';

	/// State
	import { tasks, selectedTask } from '$lib/stores/app';
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
	function toggle() {
		if (running) {
			endActivity(task.activities.find((act) => act.done === false));
		} else {
			startActivity(task);
		}
	}

	function exportTask() {
		exportToJsonFile(task, `${task.id}-${task.label}`.replace(/\s/g, '-'));
	}

	function onPaidChanged() {
		tick().then(() => ($tasks = $tasks));
		if (task.paid) {
			alert('now you can set a rate in edit menu.');
		}
	}
</script>

<Card.Container class="card-preview" palette="affirmative">
	<Card.Header>
		{task.label}
		<Spacer />
		<Badge shape="pill" palette="accent">ID: {task.id}</Badge>
	</Card.Header>

	<Card.Section>
		<Text>
			{task.description}
		</Text>
		<Text sizing="small">
			Total Time Spent: <strong>{total_time_spent}</strong>
		</Text>
		{#if task.paid}
			<Text palette="light" sizing="small">
				Total Earnings: <strong>{task.currency} {total_earnings}</strong>
			</Text>
		{:else}
			<Text palette="negative" sizing="small">Unpaid</Text>
		{/if}
	</Card.Section>

	<Card.Footer>
		<Button on:click={toggle} palette="accent">{running ? 'Stop' : 'Start'}</Button>
		<Button on:click={() => ($selectedTask = task)} for="task-edit-overlay">Edit</Button>
		<Button on:click={exportTask}>Export</Button>
		<Button palette="negative" on:click={() => ($selectedTask = task)} for="task-delete-overlay"
			>Delete</Button
		>
		<Switch bind:state={task.paid} on:change={onPaidChanged} palette="accent">Paid</Switch>
	</Card.Footer>
</Card.Container>
