<script lang="ts">
	import {
		Form,
		TextInput,
		Button,
		Overlay,
		Card,
		Text,
		Code,
		Switch,
		NumberInput
	} from '@kahi-ui/framework';
	import { createTask } from '$lib/utils/tasks';
	let logic_state: boolean = false;
	let label: string = '';
	let description: string = '';
	let paid: boolean = false;
	let currency: string = 'USD';
	let rate: number = 0;

	function update() {
		if (!label) return;
		if (paid) {
			if (!rate || !currency) return;
		}
		createTask({
			label,
			description,
			paid,
			rate,
			currency
		});
		label = '';
		description = '';
		rate = 0;
		currency = 'USD';
		paid = false;
		logic_state = false;
	}
</script>

<Overlay.Container logic_id="create-task-overlay" dismissible bind:logic_state>
	<Overlay.Backdrop />

	<Overlay.Section>
		<Card.Container palette="auto" width={['50', 'mobile:75']}>
			<Card.Header>Create Task</Card.Header>

			<Card.Section>
				<Form.Control>
					<Form.Label>Label</Form.Label>
					<TextInput bind:value={label} required />
					<Form.Label>Description</Form.Label>
					<TextInput is="textarea" bind:value={description} />
					<Switch palette="auto" bind:state={paid}>Paid</Switch>
					{#if paid}
						<Form.FieldSet>
							<Form.Legend>Payment Details</Form.Legend>
							<Form.Label>Hourly Rate</Form.Label>
							<NumberInput bind:value={rate} />
							<Form.Label>Currency</Form.Label>
							<TextInput bind:value={currency} />
						</Form.FieldSet>
					{/if}
				</Form.Control>
			</Card.Section>

			<Card.Footer>
				<Overlay.Button palette="inverse" variation="clear">Cancel</Overlay.Button>

				<Button palette="affirmative" on:click={update}>Create</Button>
			</Card.Footer>
		</Card.Container>
	</Overlay.Section>
</Overlay.Container>
