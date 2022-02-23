<script lang="ts">
	import { goto } from '$app/navigation';

	import { selectedTask, tasks } from '$lib/stores/app';

	import { Button, Overlay, Card, Text } from '@kahi-ui/framework';

	let logic_state: boolean = false;

	async function remove() {
		await goto('/');
		$tasks = $tasks.filter((task) => task.id !== $selectedTask.id);
		logic_state = false;
	}
</script>

<Overlay.Container logic_id="task-delete-overlay" dismissible bind:logic_state>
	<Overlay.Backdrop />

	<Overlay.Section>
		<Card.Container palette="auto" max_width="75">
			<Card.Header>Create Task</Card.Header>

			<Card.Section>
				<Text>Are you sure want to delete this task and all of its activity logs?</Text>
			</Card.Section>

			<Card.Footer>
				<Overlay.Button palette="inverse" variation="clear">Cancel</Overlay.Button>
				<Button palette="negative" on:click={remove}>Delete</Button>
			</Card.Footer>
		</Card.Container>
	</Overlay.Section>
</Overlay.Container>
