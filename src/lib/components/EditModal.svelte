<script lang="ts">
	import { Form, TextInput, Button, Overlay, Card, Switch, NumberInput } from '@kahi-ui/framework';
	import { tasks, selectedTask } from '$lib/stores/app';
	let logic_state: boolean = false;
	let description: string;
	let label: string;
	let id: number;
	let rate: number;
	let currency: string;

	$: if (logic_state) loadData();

	function loadData() {
		label = $selectedTask?.label;
		rate = $selectedTask?.rate;
		currency = $selectedTask?.currency;
		description = $selectedTask?.description;
		id = $selectedTask?.id;
	}

	function update() {
		$selectedTask.label = label;
		$selectedTask.rate = rate || 0;
		$selectedTask.currency = currency || 'USD';
		$selectedTask.description = description;
		$selectedTask = $selectedTask;
		$tasks = $tasks;
		logic_state = false;
	}
</script>

<Overlay.Container logic_id="task-edit-overlay" dismissible bind:logic_state>
	<Overlay.Backdrop />

	<Overlay.Section>
		<Card.Container palette="auto" width={['50', 'mobile:75']}>
			<Card.Header>Edit Task</Card.Header>

			<Card.Section>
				<Form.Control>
					<Form.Label>ID</Form.Label>
					<NumberInput bind:value={id} disabled />
					<Form.Label>Label</Form.Label>
					<TextInput bind:value={label} required />
					<Form.Label>Description</Form.Label>
					<TextInput is="textarea" bind:value={description} />
					{#if $selectedTask?.paid}
						<Form.Label>Hourly Rate</Form.Label>
						<NumberInput bind:value={rate} />
						<Form.Label>Currency</Form.Label>
						<TextInput bind:value={currency} />
					{/if}
				</Form.Control>
			</Card.Section>

			<Card.Footer>
				<Overlay.Button palette="inverse" variation="clear">Cancel</Overlay.Button>
				<Button palette="affirmative" on:click={update}>Edit</Button>
			</Card.Footer>
		</Card.Container>
	</Overlay.Section>
</Overlay.Container>
