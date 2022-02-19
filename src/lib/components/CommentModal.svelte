<script lang="ts">
	import { Button, FormField, Card, Modal, TextField } from 'attractions';
	import { tasks, selectedActivity } from '$lib/stores/app';
	export let open: boolean = false;
	let comment: string;

	$: if (open) loadData();

	function loadData() {
		comment = $selectedActivity?.comment;
	}

	function update() {
		$selectedActivity.comment = comment;
		$selectedActivity = $selectedActivity;
		$tasks = $tasks;
		open = false;
	}
</script>

<Modal bind:open>
	<Card>
		<FormField name="Comment" optional>
			<TextField bind:value={comment} />
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
