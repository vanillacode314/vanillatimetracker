<script lang="ts">
	import { page } from '$app/stores';

	import { selectedActivity, tasks } from '$lib/stores/app';

	import { Modal, Dialog, Button } from 'attractions';
	import IconAlert from '~icons/mdi/alert';

	export let open: boolean = true;

	function remove() {
		let task = $tasks.find((t) => t.id === Number($page.params.id));
		task.activities = task.activities.filter((a) => a !== $selectedActivity);
		$tasks = $tasks;
		open = false;
	}
</script>

<Modal bind:open>
	<Dialog title="Delete Activity" closeCallback={() => (open = false)} danger>
		<div slot="title-icon">
			<IconAlert />
		</div>
		<p>Are you sure you want to delete this activity?</p>
		<span class="actions">
			<Button danger filled on:click={remove}>Yes</Button>
		</span>
	</Dialog>
</Modal>

<style lang="scss">
	.actions {
		margin-top: 1rem;
		display: flex;
		gap: 1rem;
	}
</style>
