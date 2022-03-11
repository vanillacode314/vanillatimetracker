<script lang="ts">
	import { goto } from '$app/navigation';
	import { endActivity, startActivity, type Task } from '$lib/utils/tasks';

	// Icons
	import IconPlay from '~icons/mdi/play';
	import IconPause from '~icons/mdi/pause';
	// import IconPencil from '~icons/mdi/pencil';
	// import IconTrash from '~icons/mdi/trash';
	import IconChevronRight from '~icons/mdi/chevron-right';
	import { Tile, Button, Text, Badge } from '@kahi-ui/framework';
	export let task: Task;
	// $: running = task.activities.some((act) => act.done === false);
	$: last_run = task.activities.length ? task.activities.at(-1).start : null;
	$: running = task.activities.some((act) => act.done === false);

	/// Methods

	function toggle() {
		if (running) {
			endActivity(task.activities.find((act) => act.done === false));
		} else {
			startActivity(task);
		}
	}

	function gotoTask() {
		goto(`/task/${task.id}`);
	}
</script>

<Tile.Container palette="auto" on:click={gotoTask} style="cursor: pointer">
	<Tile.Section>
		<Tile.Header>{task.label}<Badge palette="accent" shape="rounded">{task.id}</Badge></Tile.Header>
		<Text>
			<Text is="small">
				Last Run: {last_run
					? new Date(last_run).toLocaleString(undefined, {
							timeStyle: 'medium',
							dateStyle: 'long'
					  })
					: 'Never'}
			</Text>
		</Text>
	</Tile.Section>

	<Tile.Footer>
		<Button palette="affirmative" on:click={toggle}>
			<svelte:component this={running ? IconPause : IconPlay} />
		</Button>
		<!-- <Button variation="clear" palette="negative" on:click={gotoTask}>More</Button> -->
	</Tile.Footer>
</Tile.Container>
