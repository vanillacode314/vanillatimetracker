<script lang="ts">
	import { SnackbarContainer, Button, FormField, Card, Modal, TextField } from 'attractions';
	import { createTask } from '$lib/utils/tasks';
	export let open: boolean = false;
	let label: string = '';
	let description: string = '';

	function update() {
		if (!label) return;
		createTask(label, description);
		label = '';
		description = '';
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
