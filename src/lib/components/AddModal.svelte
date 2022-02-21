<script lang="ts">
	import {
		SnackbarContainer,
		Button,
		FormField,
		Card,
		Modal,
		TextField,
		Switch
	} from 'attractions';
	import { createTask } from '$lib/utils/tasks';
	export let open: boolean = false;
	let label: string = '';
	let description: string = '';
	let paid: boolean = false;
	let currency: string = 'USD';
	let rate: number = 0;

	function update() {
		if (!label) return;
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
		open = false;
	}
</script>

<Modal bind:open>
	<Card>
		<FormField name="Label" required>
			<TextField bind:value={label} />
		</FormField>
		<FormField name="Description" optional>
			<TextField multiline bind:value={description} />
		</FormField>
		<Switch bind:value={paid}>Paid</Switch>
		{#if paid}
			<FormField name="Hourly Rate" required>
				<TextField type="number" bind:value={rate} />
			</FormField>
			<FormField name="Currency" required>
				<TextField bind:value={currency} />
			</FormField>
		{/if}
		<div class="actions">
			<Button filled on:click={update}>Create</Button>
			<Button on:click={() => (open = false)}>Cancel</Button>
		</div>
	</Card>
</Modal>

<style lang="scss">
	.actions {
		justify-content: end;
		display: flex;
		gap: 1rem;
	}
</style>
