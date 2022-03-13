<script lang="ts">
	import { Form, TextInput, Button, Overlay, Card } from '@kahi-ui/framework';
	import { tasks, selectedActivity } from '$lib/stores/app';
	let logic_state: boolean = false;
	let comment: string;

	$: if (logic_state) loadData();

	function loadData() {
		comment = $selectedActivity?.comment;
	}

	function update() {
		$selectedActivity.comment = comment;
		$selectedActivity = $selectedActivity;
		$tasks = $tasks;
		logic_state = false;
	}
</script>

<Overlay.Container logic_id="comment-activity-overlay" dismissible bind:logic_state>
	<Overlay.Backdrop />

	<Overlay.Section>
		<Card.Container palette="auto" width={['50', 'mobile:75']}>
			<Card.Header>Comment Activity</Card.Header>

			<Card.Section>
				<Form.Control>
					<Form.Label>Comment</Form.Label>
					<TextInput bind:value={comment} required />
				</Form.Control>
			</Card.Section>

			<Card.Footer>
				<Overlay.Button palette="inverse" variation="clear">Cancel</Overlay.Button>
				<Button palette="affirmative" on:click={update}>Save</Button>
			</Card.Footer>
		</Card.Container>
	</Overlay.Section>
</Overlay.Container>
