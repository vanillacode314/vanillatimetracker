<script lang="ts">
	import { Button, FormField, Card, Modal, TextField } from 'attractions';
	import { tasks, selectedTask } from '$lib/stores/app';
	export let open: boolean = false;
	let description: string;
	let label: string;
	let id: number;

	$: if (open) loadData();

	function loadData() {
		label = $selectedTask?.label;
		description = $selectedTask?.description;
		id = $selectedTask?.id;
	}

	function update() {
		$selectedTask.label = label;
		$selectedTask.description = description;
		$selectedTask = $selectedTask;
		$tasks = $tasks;
		open = false;
	}
</script>

<Modal bind:open>
	<Card>
		<FormField name="ID">
			<TextField bind:value={id} disabled />
		</FormField>
		<FormField name="Label" required>
			<TextField bind:value={label} />
		</FormField>
		<FormField name="Description" optional>
			<TextField multiline bind:value={description} />
		</FormField>
		<div class="actions">
			<Button filled on:click={update}>Save</Button>
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
