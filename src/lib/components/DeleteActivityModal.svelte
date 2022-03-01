<script lang="ts">
	import { page } from '$app/stores';

	import { selectedActivity, tasks } from '$lib/stores/app';

	import { Button, Overlay, Card, Text } from '@kahi-ui/framework';

	let logic_state: boolean = false;

	function remove() {
		let task = $tasks.find((t) => t.id === Number($page.params.id));
		task.activities = task.activities.filter((a) => a !== $selectedActivity);
		$tasks = $tasks;
		logic_state = false;
	}
</script>

<Overlay.Container logic_id="activity-delete-overlay" dismissible bind:logic_state>
	<Overlay.Backdrop />

	<Overlay.Section>
		<Card.Container palette="auto" max_width="75">
			<Card.Header>Delete Activity</Card.Header>

			<Card.Section>
				<Text>Are you sure want to delete this activity log?</Text>
			</Card.Section>

			<Card.Footer>
				<Overlay.Button palette="inverse" variation="clear">Cancel</Overlay.Button>
				<Button palette="negative" on:click={remove}>Delete</Button>
			</Card.Footer>
		</Card.Container>
	</Overlay.Section>
</Overlay.Container>
