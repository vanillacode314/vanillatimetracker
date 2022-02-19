<script lang="ts">
	import { Label, H3, Card, Button } from 'attractions';
	import { goto } from '$app/navigation';
	import { removeTask } from '$lib/utils/tasks';
	import type { Task } from '$lib/utils/tasks';
	import { selectedTask, editModalOpen } from '$lib/stores/app';

	// Icons
	import IconPlay from '~icons/mdi/play';
	import IconPause from '~icons/mdi/pause';
	// import IconPencil from '~icons/mdi/pencil';
	// import IconTrash from '~icons/mdi/trash';
	import IconChevronRight from '~icons/mdi/chevron-right';
	export let task: Task;
	// $: running = task.activities.some((act) => act.done === false);
	let running = false;

	$: last_run = task.activities.length ? task.activities.at(-1).start : null;
	function remove() {
		removeTask(task.id);
	}

	function gotoTask() {
		goto(`/task/${task.id}`);
	}

	function toggle() {
		running = !running;
	}

	function edit() {
		$selectedTask = task;
		$editModalOpen = true;
	}
</script>

<Card>
	<div>
		<section class="content">
			<H3>{task.label}</H3>
			<span class="last--run">
				<Label small>Last Run:</Label>
				<span>
					{last_run
						? new Date(last_run).toLocaleString(undefined, {
								timeStyle: 'medium',
								dateStyle: 'long'
						  })
						: 'Never'}
				</span>
			</span>
		</section>
		<section class="actions">
			<Button round filled on:click={toggle}
				><svelte:component this={running ? IconPause : IconPlay} /></Button
			>
			<Button round neutral on:click={gotoTask}><IconChevronRight /></Button>
		</section>
	</div>
</Card>

<style lang="scss">
	div {
		display: grid;
		grid-template-columns: auto auto;
		align-items: end;
		justify-content: space-between;
		gap: 1rem;
		@media screen and (max-width: 720px) {
			grid-template-columns: 1fr;
		}
		height: 100%;
	}
	.actions {
		display: flex;
		gap: 0.5rem;
	}
	span.last--run {
		& > span {
			font-size: 0.75rem;
		}
		display: flex;
		gap: 0.5rem;
		align-items: center;
	}
</style>
